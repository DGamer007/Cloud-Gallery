import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    images: []
};

export const fetchAllImages = createAsyncThunk(
    'images/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/get/images');
            const data = await response.json();
            return { data: data.body };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);

export const uploadImages = createAsyncThunk(
    'images/upload',
    async (images, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

            const response = await fetch('/api/save/images', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            return { data: data.body };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'images/delete',
    async (key, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/delete/image/${key}`, { method: 'DELETE' });
            const data = await response.json();

            return { data: data.body };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);


const imagesSlice = createSlice({
    name: 'images',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllImages.fulfilled, (state, { payload }) => {
            state.images = [...payload.data];
        });
        builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
            state.images = [...payload.data, ...state.images];
        });
        builder.addCase(deleteImage.fulfilled, (state, { payload }) => {
            state.images = state.images.filter(image => image !== payload.data);
        });
    }
});


export default imagesSlice.reducer;