import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../../redux/hooks/hooks";
import SuccessScreen from "../../ui-screens/success";
import JacketAllocationScreen from "../../ui-screens/jacket-allocation";
import LoginScreen from "../../ui-screens/authentication/signin";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return(
    <AuthStack.Navigator initialRouteName="login">
      <AuthStack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {token === null ? (
        <Auth />
      ) : (
        <>
          <Stack.Navigator initialRouteName="membershipdetails">
            <Stack.Screen
              name="membershipdetails"
              options={{ headerShown: false }}
              component={JacketAllocationScreen}
            />

            <Stack.Screen
              name="success"
              options={{ headerShown: false }}
              component={SuccessScreen}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
