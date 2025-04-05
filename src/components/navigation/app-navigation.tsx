import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../../redux/hooks/hooks";
import SuccessScreen from "../../ui-screens/success";
import JacketAllocationScreen from "../../ui-screens/jacket-allocation";
import LoginScreen from "../../ui-screens/authentication/signin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppColorConstants from "../../constants/app_color_constants";
import PhoneAllocationScreen from "../../ui-screens/phone-allocation";
import PosAllocationScreen from "../../ui-screens/pos-allocation";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator initialRouteName="login">
      <AuthStack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: AppColorConstants.app_dark,
          height: 70,
        },
        tabBarActiveTintColor: AppColorConstants.white,
        tabBarInactiveTintColor: "#888",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          bottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Jacket Allocation"
        component={JacketAllocationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="shirt-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Phone Allocation"
        component={PhoneAllocationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="phone-portrait-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="POS Allocation"
        component={PosAllocationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="card-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
          <Stack.Navigator initialRouteName="apptabs">
            <Stack.Screen
              name="apptabs"
              options={{ headerShown: false }}
              component={AppTabs}
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
