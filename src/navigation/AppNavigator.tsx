import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UserListScreen from "../screens/UserListScreen";

export type RootStackParamList = {
  UserList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: "Users" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
