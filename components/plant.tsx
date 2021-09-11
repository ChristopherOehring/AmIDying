import { int32ARGBColor } from "react-native-svg";

export class Plant {
    id: string;
    name: string;
    last_watered: WateringEvent|null ;
    water_freq:number;
    modified: boolean;

    constructor(id:string, name:string, water_freq:number, last_watered:WateringEvent|null, 
        ){
        this.id = id;
        this.name = name;
        this.last_watered = last_watered;
        this.modified = true;
        this.water_freq = water_freq;
    }
}

export class WateringEvent {
    date: number;
    username: string;

    constructor(date:number, name:string){
        this.date = date;
        this.username = name;
    }
}