import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'src/screens/Home.screen';
import { MainStackParamList } from 'src/types/navigation.types';
import DetailsScreen from 'src/screens/Details.screen';

interface MainStackProps {}

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC<MainStackProps> = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);
export default MainStack;
