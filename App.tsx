import React from "react";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import AppNavigator from "./src/components/navigation/app-navigation";

import { persistor, store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>

      <FlashMessage position="top" />
    </Provider>
  );
}
