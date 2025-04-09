import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // This would be an actual API call in a real app
      // For now, let's simulate success
      return [
        {
          id: 'post1',
          title: 'Premier post',
          content: 'Contenu du premier post',
          userId: 'user1',
          createdAt: new Date().toISOString(),
          hashtags: ['tech', 'innovation']
        },
        {
          id: 'post2',
          title: 'Deuxième post',
          content: 'Contenu du deuxième post',
          userId: 'user2',
          createdAt: new Date().toISOString(),
          hashtags: ['design', 'UX']
        }
      ];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      // This would be an actual API call in a real app
      return {
        ...postData,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch posts';
      })
      
      // Handle create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add to the beginning of the array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create post';
      });
  },
});

export default postsSlice.reducer; 