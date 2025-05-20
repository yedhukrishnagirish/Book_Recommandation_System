import React, { useEffect, useState } from 'react';
import { Table, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import "../../src/utils/css/BookListPage.css";
import axios from 'axios';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  averageRating: number;
};

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const navigate = useNavigate();

useEffect(() => {
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40'
      );
      
      const data = response.data;
      
      const booksFromApi: Book[] = data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title || 'No title',
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
        genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown',
        averageRating: item.volumeInfo.averageRating ?? 0,
      })) || [];

      setBooks(booksFromApi);
    } catch (error: any) {
      message.error(error.message || 'Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Book> = [
    {
      title: 'Index',
      key: 'index',
      render: (_text, _record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
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
      render: (rating: number) => rating ? rating.toFixed(1) : 'N/A',
      sorter: (a, b) => a.averageRating - b.averageRating,
      defaultSortOrder: 'descend',
    },
  ];

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Book List</h2>
      <Input.Search
        placeholder="Search by Title or Author"
        allowClear
        onChange={(e) => {
          setSearchText(e.target.value);
          setPagination((prev) => ({ ...prev, current: 1 }));
        }}
        className="book-list-search"
        loading={loading}
      />
      <Table
        columns={columns}
        dataSource={filteredBooks}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredBooks.length,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
        }}
        onRow={(record) => ({
          onDoubleClick: () => navigate(`/books/${record.id}`),
        })}
      />
    </div>
);

};

export default BookListPage;
