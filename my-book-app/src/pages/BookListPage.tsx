import React, { useState } from 'react';
import { Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';

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


const BookListPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Book> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Average Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating: number) => rating.toFixed(1),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <Input.Search
        placeholder="Search by Title or Author"
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredBooks}
        rowKey="id"
        pagination={{ pageSize: 20 }}
          onRow={(record) => ({
          onDoubleClick: () => navigate(`/books/${record.id}`), 
        })}
      />
    </div>
  );
};

export default BookListPage;
