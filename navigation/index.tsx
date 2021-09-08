/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

//import Colors from '../constants/Colors';
//import useColorScheme from '../hooks/useColorScheme';
import BarCodeRefScreen from '../screens/BarCodeRefScreen';
import CreateNewPlantScreen from '../screens/CreateNewPlantScreen';
import ModalScreen from '../screens/ModalScreen';
import NewPlantButtonScreen from '../screens/NewPlantButtonScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

export default function Navigation({ theme }: any) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}
      theme={theme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  let theme = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{
          headerStyle:{backgroundColor: theme?.colors.surface},
          title:"detail view"
        }}/>
        <Stack.Screen name="NewPlantButton" component={NewPlantButtonScreen} options={{headerStyle:{backgroundColor: theme?.colors.surface}}}/>
        <Stack.Screen name="CreateNewPlant" component={CreateNewPlantScreen} options={{
          headerStyle:{backgroundColor: theme?.colors.surface},
          title: "Create new plant"
        }}/>
        <Stack.Screen name="BarCodeRef" component={BarCodeRefScreen} options={{
          headerStyle:{backgroundColor: theme?.colors.surface},
          title:"QR-code scanner"
        }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: theme?.colors.primary,
        tabBarActiveBackgroundColor: theme?.colors.disabled,
        tabBarInactiveBackgroundColor: theme?.colors.background,       
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: theme?.colors.placeholder
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIconMCI name="flower" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Options',
          tabBarIcon: ({ color }) => <TabBarIconMI name="settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIconMCI(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIconFA(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIconMI(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
