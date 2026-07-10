import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Quote {
  id: number;
  text: string;
}

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.scss',
})
export class MyQuotes implements OnInit {
  quotes: Quote[] = [];
  newQuoteText = '';
  editingId: number | null = null;
  editingText = '';
  private storageKey = 'my_quotes';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.storageKey);
    this.quotes = saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: 'The only way to do great work is to love what you do.' },
          { id: 2, text: 'In the middle of difficulty lies opportunity.' },
          { id: 3, text: 'Simplicity is the ultimate sophistication.' },
          { id: 4, text: 'The journey of a thousand miles begins with a single step.' },
          { id: 5, text: 'Stay hungry, stay foolish.' },
        ];
    this.save();
  }

  save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.quotes));
  }

  addQuote(): void {
    if (!this.newQuoteText.trim()) return;
    const nextId = this.quotes.length ? Math.max(...this.quotes.map((q) => q.id)) + 1 : 1;
    this.quotes.push({ id: nextId, text: this.newQuoteText.trim() });
    this.newQuoteText = '';
    this.save();
  }

  startEdit(quote: Quote): void {
    this.editingId = quote.id;
    this.editingText = quote.text;
  }

  saveEdit(id: number): void {
    const quote = this.quotes.find((q) => q.id === id);
    if (quote) quote.text = this.editingText;
    this.editingId = null;
    this.save();
  }

  removeQuote(id: number): void {
    this.quotes = this.quotes.filter((q) => q.id !== id);
    this.save();
  }
}