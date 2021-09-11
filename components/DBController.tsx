import { List } from 'react-native-paper';
import { exp } from 'react-native-reanimated';
import uuid from 'react-native-uuid'
import { Plant, WateringEvent } from './plant';

export function sendPlant(plant:Plant):Promise<boolean>{
    var requests:Promise<Response>[] = [];
    requests.push(
        fetch(
            'https://jb4p894di5.execute-api.eu-central-1.amazonaws.com/default/addPlant', 
            {
                method: 'POST',
                body: JSON.stringify({
                    id: plant.id,
                    name: plant.name,
                    water_freq: plant.water_freq,
                })
            }
        )
    );
    if (plant.last_watered) {
        requests.push(
            fetch(
                'https://3m2xevdbyb.execute-api.eu-central-1.amazonaws.com/default/addEvent',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        id: plant.id,
                        name: plant.last_watered?.username,
                        date: plant.last_watered?.date,
                    })
                }
            )
        );
    };
    return Promise.all(requests)
        .then(() => {
            plant.modified = false;
            return true;
        })
        .catch(() => {return false;})
}

//TODO make a better api, so I can fetch in bulk
export function getPlant(id:string) {
    console.log("fetching: "+ id )
    return fetch(
        "https://y0tqrvi3wa.execute-api.eu-central-1.amazonaws.com/default/getPlant", 
        {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
        }
    ).then((response) => response.json())
    .then((body) => {
        console.log(body)
        try {
            const id = body.plant.ID;
            const name = body.plant.name;
            const water_freq = body.plant.water_freq; 
            var events = body.event.Items;
            const latest_event = events[events.length-1];
            const latest_event_name = latest_event.name;
            const latest_event_date = latest_event.date;
            var event = new WateringEvent(
                latest_event_date, latest_event_name)
            return new Plant(id, name, water_freq, event)
        } catch (err) {
            console.error("could not parse results:")
            console.error(err)
            return null
        }
        
    } )

}

export function synchronizePlants(plants:Plant[]) {
    var result = [];
    for(const plant of plants) {
        if(plant.modified) {
            sendPlant(plant);
            result.push(plant);
        } else {
            const newPlant = getPlant(plant.id);
            result.push(newPlant);
        }
    }
}

export function addPlant(newPlant:Plant, plants:Plant[]) {
    return sendPlant(newPlant)
        .then(() => {
            console.log(newPlant)
            plants.push(newPlant);
            return plants;
        })
}