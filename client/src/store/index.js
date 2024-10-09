import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["user/getCurrentUserAsync/fulfilled"],
  //       ignoredPaths: ["payload.headers"], // Ignore the headers path
  //     },
  //   }),
});
