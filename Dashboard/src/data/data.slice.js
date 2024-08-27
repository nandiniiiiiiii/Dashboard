import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllData } from './data.api';

const initialState = {
    status: 'idle',
    items: [],
};

export const allDataAsync = createAsyncThunk(
    'data/allData',
    async () => {
        const response = await fetchAllData()
        return response.data
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })

    }
})

export const selectData = (state) => state.data.items;

export default dataSlice.reducer;