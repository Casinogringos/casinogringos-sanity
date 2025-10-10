import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/src/store/menuSlice";
import toggleReducer from "@/src/store/toggleSlice";
import faqReducer from "@/src/store/faqSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menu: menuReducer,
      toggle: toggleReducer,
      faq: faqReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
