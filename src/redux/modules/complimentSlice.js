import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialID = 1;

//초기 상태값
const initialState = {
  comps: [],
  isLoading: false,
  error: null,
  comp: {},
};

export const __getComps = createAsyncThunk(
  "comps/getComps",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comps");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComps = createAsyncThunk(
  "comps/postComps",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/comps", {
        id: initialID++,
        content: payload.content,
        toWho: payload.toWho,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComps = createAsyncThunk(
  "comps/deleteComps",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://localhost:3001/comps/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComp = createAsyncThunk(
  "comps/editComp",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        `http://localhost:3001/comps/${payload.id}`,
        { content: payload.editedContent }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const complimentSlice = createSlice({
  name: "comps",
  initialState,
  reducers: {
    getCompById(state, action) {
      return {
        ...state,
        comp: state.comps.find((comp) => {
          return comp.id === action.payload;
        }),
      };
    },
  },
  extraReducers: {
    [__getComps.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComps.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comps = action.payload;
    },
    [__getComps.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComps.fulfilled]: (state, action) => {
      state.comps.push(action.payload);
    },
    [__deleteComps.fulfilled]: (state, action) => {
      return {
        ...state,
        comps: state.comps.filter((comp) => comp.id !== action.payload),
      };
    },
    [__editComp.fulfilled]: (state, action) => {
      return {
        ...state,
        comps: state.comps.map((comp) =>
          comp.id === action.payload.id
            ? { ...comp, content: action.payload.editedContent }
            : comp
        ),
      };
    },
  },
});

export const { getCompById } = complimentSlice.actions;
export default complimentSlice.reducer;
