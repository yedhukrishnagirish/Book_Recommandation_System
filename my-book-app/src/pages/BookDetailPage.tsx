import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../features/reviews/reviewsSlice';
import type { AppDispatch, RootState } from '../store/store';

interface GoogleBook {
  id: string;
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

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [book, setBook] = useState<GoogleBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const existingReview = useSelector((state: RootState) =>
    state.reviews.reviews.find(r => r.bookId === id)
  );

  const [rating, setRating] = React.useState<number>(existingReview?.rating || 0);
  const [text, setText] = React.useState<string>(existingReview?.text || '');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch book data');
        return res.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Sync local state when review changes
  React.useEffect(() => {
    setRating(existingReview?.rating || 0);
    setText(existingReview?.text || '');
  }, [existingReview]);

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }
    dispatch(addReview({ bookId: id!, rating, text }));
    alert('Review Saved Successfully');
  };

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  const { volumeInfo } = book;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>{volumeInfo.title}</h1>
      <p><strong>Author(s):</strong> {volumeInfo.authors?.join(', ') || 'Unknown'}</p>
      <p><strong>Genre(s):</strong> {volumeInfo.categories?.join(', ') || 'Unknown'}</p>
      <p><strong>Average Rating:</strong> {volumeInfo.averageRating ? volumeInfo.averageRating.toFixed(1) : 'N/A'}</p>

      {volumeInfo.imageLinks?.thumbnail && (
        <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} style={{ marginBottom: 20 }} />
      )}

      <p>{volumeInfo.description}</p>

      <h3>Your Review:</h3>
      <Rate allowClear={false} value={rating} onChange={setRating} />
      <TextArea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review here..."
        style={{ marginTop: 10 }}
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
        Submit Review
      </Button>

      <Button onClick={() => navigate(-1)} style={{ marginTop: 20 }}>
        Back to list
      </Button>
    </div>
  );
};

export default BookDetailPage;
