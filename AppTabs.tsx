import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import App from './App';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return (
                        <Image
                            source={require('./img/q.png')}
                            style={{
                                width: size,
                                height: size,
                            }}
                        />
                    );
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}> 
            <Tab.Screen name="Build 1" component={App} />
            <Tab.Screen name="Build 2" component={App} />
            <Tab.Screen name="Build 3" component={App} />
        </Tab.Navigator>
    );
};

export default AppTabs;
