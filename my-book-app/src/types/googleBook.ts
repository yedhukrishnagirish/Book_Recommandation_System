export interface GoogleBook {
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    averageRating?: number;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}