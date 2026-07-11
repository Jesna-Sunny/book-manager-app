import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  books: Book[] = [];
  searchTerm = '';
  loading = true;
  toastMessage = '';
  showToast = false;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadBooks();
    this.route.queryParams.subscribe((params) => {
      if (params['added']) this.triggerToast('Book added successfully');
      if (params['updated']) this.triggerToast('Book updated successfully');
    });
  }

  get filteredBooks(): Book[] {
    if (!this.searchTerm.trim()) return this.books;
    const term = this.searchTerm.toLowerCase();
    return this.books.filter(
      (b) => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
    );
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load books', err);
        this.loading = false;
      },
    });
  }

  deleteBook(id: number): void {
    if (confirm('Delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
          this.triggerToast('Book deleted successfully');
        },
        error: (err) => console.error('Failed to delete book', err),
      });
    }
  }

  triggerToast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}