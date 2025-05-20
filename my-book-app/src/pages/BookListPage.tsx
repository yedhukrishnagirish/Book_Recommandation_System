import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { RowDoubleClickedEvent } from 'ag-grid-community';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../src/utils/css/BookListPage.css";
import {Input, message } from 'antd';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';   
import type { Book } from '../types/book';
ModuleRegistry.registerModules([ AllCommunityModule ]);

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  // Filter books by title or author searchText
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      headerName: 'Index',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
    },
    {
      headerName: 'Title',
      field: 'title',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: 'Author',
      field: 'author',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: 'Genre',
      field: 'genre',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: 'Average Rating',
      field: 'averageRating',
      sortable: true,
      filter: true,
      flex: 1,
      valueFormatter: (params: any) =>
        params.value ? params.value.toFixed(1) : 'N/A',
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
        }}
        className="book-list-search"
        loading={loading}
      />

      <div
        className="ag-theme-alpine"
        style={{ height: '580px', width: '100%' }}
      >
        <AgGridReact
          rowData={filteredBooks}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
          suppressCellFocus={true}
          onRowDoubleClicked={(event: RowDoubleClickedEvent) => {
              navigate(`/books/${event.data.id}`);
          }}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Loading...</span>'
          }
          overlayNoRowsTemplate={
            '<span class="ag-overlay-loading-center">No books found</span>'
          }
          loadingOverlayComponentParams={{ loadingMessage: 'Loading...' }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BookListPage;
