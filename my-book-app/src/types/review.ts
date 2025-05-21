export interface Review {
  bookId: string;
  rating: number;
  text: string;
}

export interface ReviewsState {
  reviews: Review[];
}

export const initialState: ReviewsState = {
  reviews: [],
};