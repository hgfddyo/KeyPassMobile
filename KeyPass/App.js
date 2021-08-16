import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginComponent from "./src/LoginComponent/login_component";



const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={LoginComponent} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;
