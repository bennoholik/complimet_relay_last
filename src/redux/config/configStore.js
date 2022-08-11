import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/commentSlice";
import compliments from "../modules/complimentSlice";

export const store = configureStore({
  reducer: {
    compliments: compliments,
    comments: comments,
  },
});
