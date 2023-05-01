import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './AppTabs';

const Index: React.FC = () => {
    return (
        <NavigationContainer>
            <AppTabs />
        </NavigationContainer>
    );
};

export default Index;