import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm implements OnInit {
  book: Partial<Book> = { title: '', author: '', publicationDate: '' };
  isEditMode = false;
  bookId: number | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = +idParam;
      this.bookService.getBook(this.bookId).subscribe({
        next: (data) => (this.book = data),
        error: (err) => console.error('Failed to load book', err),
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.bookId !== null) {
      this.bookService.updateBook(this.bookId, this.book as Book).subscribe({
        next: () => this.router.navigate(['/'], { queryParams: { updated: '1' } }),
        error: (err) => console.error('Failed to update book', err),
      });
    } else {
      this.bookService.addBook(this.book).subscribe({
        next: () => this.router.navigate(['/'], { queryParams: { added: '1' } }),
        error: (err) => console.error('Failed to add book', err),
      });
    }
  }
}