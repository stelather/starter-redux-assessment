import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
    createAsyncThunk(
        /* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
        'suggestion/fetchSuggestion', // Unique action type string
        async () => {
            try{
                const response = await fetch('http://localhost:3004/api/suggestion');
                if (!response.ok) {
                    throw new Error('Failed to fetch suggestion');
                }

                return response.json(); // The data fetched from the URL
            }
            catch (error) {
                console.log('error');
                throw error; // Rethrow the error to be handled in the rejected state
            }
        }
    );

const initialState = {
    suggestion: '',
    loading: false,
    error: true,
};

const options = {
    name: 'suggestion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
        builder
            .addCase(fetchSuggestion.pending, (state) => {
                // Handle pending state (e.g., set loading flag)
                state.loading = true;
            })
            .addCase(fetchSuggestion.fulfilled, (state, action) => {
                // Handle fulfilled state (e.g., update state with fetched data)
                state.loading = false;
                state.error = false;
                state.suggestion = action.payload;
            })
            .addCase(fetchSuggestion.rejected, (state, action) => {
                // Handle rejected state (e.g., set error and loading flag)
                state.loading = false;
                state.error = action.error.message;
            });
    },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;



export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;