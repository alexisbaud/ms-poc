import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk action for adding a reaction
export const addReaction = createAsyncThunk(
  'interactions/addReaction',
  async ({ postId, reactionType, userId }, { rejectWithValue }) => {
    try {
      // This would be an actual API call in a real app
      // For now, let's simulate success
      return { 
        id: `reaction-${Date.now()}`,
        postId,
        reactionType,
        userId,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add reaction');
    }
  }
);

// Interactions slice
const interactionsSlice = createSlice({
  name: 'interactions',
  initialState: {
    reactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeReaction: (state, action) => {
      const { postId, userId } = action.payload;
      state.reactions = state.reactions.filter(
        reaction => !(reaction.postId === postId && reaction.userId === userId)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReaction.fulfilled, (state, action) => {
        state.loading = false;
        
        // Remove any existing reaction from this user on this post
        state.reactions = state.reactions.filter(
          reaction => !(reaction.postId === action.payload.postId && reaction.userId === action.payload.userId)
        );
        
        // Add the new reaction
        state.reactions.push(action.payload);
      })
      .addCase(addReaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add reaction';
      });
  },
});

export const { removeReaction } = interactionsSlice.actions;
export default interactionsSlice.reducer; 