import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AuthReducer from "./slices/authSlice";
import AppReducer from "./slices/appSlice";

const authPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    app: AppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
