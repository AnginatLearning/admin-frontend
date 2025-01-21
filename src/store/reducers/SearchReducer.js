import { createSlice } from '@reduxjs/toolkit';

// Initial state for search
const initialState = {
    query: '',
  };
  
  const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      // Synchronous action to set the query
      setQuery(state, action) {
        state.query = action.payload;
      },
    },
  });
  
  // Export the action and reducer
  export const { setQuery } = searchSlice.actions;
  export default searchSlice.reducer;