import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '../../types/review';

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: [],
};

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
  },
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
