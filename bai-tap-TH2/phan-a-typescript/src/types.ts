export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

export type BookField = 'title' | 'author' | 'genre' | 'year';

export type NewBook = Omit<Book, 'id'>;
