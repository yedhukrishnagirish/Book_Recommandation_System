import { useParams, useNavigate } from 'react-router-dom';
import type { Book } from '../types/book';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Button, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addReview } from '../features/reviews/reviewsSlice';

const booksData: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', averageRating: 4.2 },
  { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian', averageRating: 4.5 },
  { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', averageRating: 4.3 },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', averageRating: 4.4 },
  { id: '5', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', averageRating: 4.6 },
  { id: '6', title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', averageRating: 3.8 },
  { id: '7', title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical', averageRating: 4.1 },
  { id: '8', title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Classic', averageRating: 3.9 },
  { id: '9', title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', averageRating: 4.0 },
  { id: '10', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', averageRating: 4.7 },
  { id: '11', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', averageRating: 4.8 },
  { id: '12', title: 'Animal Farm', author: 'George Orwell', genre: 'Satire', averageRating: 4.2 },
  { id: '13', title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', averageRating: 4.1 },
  { id: '14', title: 'The Chronicles of Narnia', author: 'C.S. Lewis', genre: 'Fantasy', averageRating: 4.3 },
  { id: '15', title: 'The Grapes of Wrath', author: 'John Steinbeck', genre: 'Historical', averageRating: 4.0 },
  { id: '16', title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', averageRating: 4.0 },
  { id: '17', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Philosophical', averageRating: 4.1 },
  { id: '18', title: 'Dracula', author: 'Bram Stoker', genre: 'Horror', averageRating: 3.9 },
  { id: '19', title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Drama', averageRating: 4.5 },
  { id: '20', title: 'Les Misérables', author: 'Victor Hugo', genre: 'Historical', averageRating: 4.3 },
  { id: '21', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Adventure', averageRating: 4.0 },
  { id: '22', title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Thriller', averageRating: 3.9 },
  { id: '23', title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Dystopian', averageRating: 4.4 },
  { id: '24', title: 'The Fault in Our Stars', author: 'John Green', genre: 'Romance', averageRating: 4.2 },
  { id: '25', title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller', averageRating: 4.1 },
];

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const book = booksData.find(b => b.id === id);

  if (!book) {
    return <div>Book not found</div>;
  }
  
  const existingReview = useSelector((state: RootState) =>
    state.reviews.reviews.find(r => r.bookId === id)
  );


  const [rating, setRating] = React.useState<number>(existingReview?.rating || 0);
  const [text, setText] = React.useState<string>(existingReview?.text || '');

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }

    dispatch(addReview({ bookId: id!, rating, text }));
     alert('Review Saved Successfully');
  };

 return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Average Rating:</strong> {book.averageRating.toFixed(1)}</p>

      <h3>Your Review:</h3>
      <Rate
        allowClear={false}
        value={rating}
        onChange={setRating}
      />
      <TextArea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review here..."
        style={{ marginTop: 10 }}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 10 }}
      >
        Submit Review
      </Button>

      <Button
        onClick={() => navigate(-1)}
        style={{ marginTop: 20 }}
      >
        Back to list
      </Button>
    </div>
  );
};


export default BookDetailPage;
