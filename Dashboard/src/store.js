import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './data/data.slice.js'

export const store = configureStore({
  reducer: {
    data: dataReducer
  },
});