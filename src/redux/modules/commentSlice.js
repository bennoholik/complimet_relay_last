import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialID = 1;

//초기 상태값
const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __getCommment = createAsyncThunk(
  "comments/getComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comments");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComment = createAsyncThunk(
  "comments/postComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/comments", {
        id: initialID++,
        postId: payload.postId,
        commentContent: payload.commentContent,
        fromWho: payload.fromWho,
      });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://localhost:3001/comments/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "comments/editComment",
  async (payload, thunkAPI) => {
    try {
      console.log(payload.id);
      const data = await axios.patch(
        `http://localhost:3001/comments/${payload.id}`,
        { commentContent: payload.cmEditContent }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commmentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__getCommment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCommment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      console.log(state.comments);
    },
    [__getCommment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
    },
    [__deleteComment.fulfilled]: (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    },
    [__editComment.fulfilled]: (state, action) => {
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? { ...comment, commentContent: action.payload.cmEditContent }
            : comment
        ),
      };
    },
  },
});

export const {} = commmentSlice.actions;
export default commmentSlice.reducer;
