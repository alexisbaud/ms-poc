import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action for adding a comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData, { rejectWithValue }) => {
    try {
      // This would be an actual API call in a real app
      // For now, let's simulate success and return the comment data with an ID
      // const response = await axios.post('/api/comments', commentData);
      // return response.data;
      
      // Simulate API response
      return { 
        ...commentData, 
        id: `comment-${Date.now()}`,
        createdAt: new Date().toISOString(),
        user: {
          id: commentData.userId,
          // Other user data would come from the API in a real implementation
        }
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add comment');
    }
  }
);

// Comments slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add comment';
      });
  },
});

export default commentsSlice.reducer; 