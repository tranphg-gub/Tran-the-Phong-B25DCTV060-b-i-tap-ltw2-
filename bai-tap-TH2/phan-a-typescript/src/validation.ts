import type { BookField } from './types.js';

export function validateField(name: BookField, value: string): string {
  const text = value.trim();
  if (name === 'title' && text.length < 3) return 'Tên sách phải có ít nhất 3 ký tự.';
  if (name === 'author' && !text) return 'Vui lòng nhập tác giả.';
  if (name === 'genre' && !text) return 'Vui lòng chọn thể loại.';
  if (name === 'year') {
    const year = Number(text);
    const currentYear = new Date().getFullYear();
    if (!text || !Number.isInteger(year) || year < 1900 || year > currentYear) {
      return `Năm xuất bản phải là số nguyên từ 1900 đến ${currentYear}.`;
    }
  }
  return '';
}
