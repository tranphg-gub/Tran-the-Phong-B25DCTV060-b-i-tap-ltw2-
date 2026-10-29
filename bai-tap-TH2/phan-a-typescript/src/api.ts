import { BOOKS_API_URL } from '../api-config.js';
import type { Book, NewBook } from './types.js';

const endpoint = BOOKS_API_URL.trim().replace(/\/+$/, '');
export const usingMockApi = Boolean(endpoint);

async function request(url: string | URL, options: RequestInit = {}): Promise<unknown> {
  try {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`Không thực hiện được yêu cầu (HTTP ${response.status}). Vui lòng thử lại.`);
    if (options.method === 'DELETE') return;
    return await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error('Thư viện trả về dữ liệu JSON không hợp lệ.');
    if (error instanceof TypeError || (error instanceof DOMException && error.name === 'TimeoutError')) {
      throw new Error('Không kết nối được thư viện. Kiểm tra mạng rồi thử lại.');
    }
    throw error;
  }
}

function parseBook(value: unknown): Book {
  if (typeof value !== 'object' || value === null) throw new Error('Dữ liệu sách không đúng định dạng.');
  const book = value as Record<string, unknown>;
  const validId = (typeof book.id === 'string' || typeof book.id === 'number') && String(book.id).trim();
  const validText = ['title', 'author', 'genre'].every(key => typeof book[key] === 'string' && String(book[key]).trim());
  const year = typeof book.year === 'number' || typeof book.year === 'string' ? Number(book.year) : NaN;
  if (!validId || !validText || !Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) {
    throw new Error('Dữ liệu sách không đúng định dạng. Cần có id, title, author, genre và year hợp lệ.');
  }
  return { id: String(book.id), title: String(book.title).trim(), author: String(book.author).trim(), genre: String(book.genre).trim(), year };
}

export async function loadBooks(): Promise<Book[]> {
  const data = await request(endpoint || new URL('./books.json', import.meta.url));
  if (!Array.isArray(data)) throw new Error('Danh sách sách phải là một mảng JSON.');
  const books = data.map(parseBook);
  if (new Set(books.map(book => book.id)).size !== books.length) throw new Error('Danh sách có mã sách trùng nhau.');
  return books;
}

export async function createBook(book: NewBook): Promise<Book> {
  if (!usingMockApi) return { ...book, id: crypto.randomUUID() };
  const data = await request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return parseBook(data);
}

export async function deleteBook(id: string): Promise<void> {
  if (usingMockApi) await request(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
