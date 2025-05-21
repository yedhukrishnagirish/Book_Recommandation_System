import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialState, type Review } from '../../types/review';


const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      const { bookId, rating, text } = action.payload;
      const existingIndex = state.reviews.findIndex(r => r.bookId === bookId);

      if (existingIndex !== -1) {
        // Update existing review
        state.reviews[existingIndex] = { bookId, rating, text };
      } else {
        // Add new review
        state.reviews.push({ bookId, rating, text });
      }
    },
    clearReviews(state) {
      state.reviews = [];
    },
  },
});

export const { addReview, clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
