import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducers, { UserState } from "@/feature/user/userSlice";
import themeReducers, { ThemeState } from "@/feature/theme/themeSlice";

// Define the RootState interface
export interface RootState {
  user: UserState;
  theme: ThemeState;
}

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducers,
  theme: themeReducers,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
