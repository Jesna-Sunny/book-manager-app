import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookForm } from './pages/book-form/book-form';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MyQuotes } from './pages/my-quotes/my-quotes';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books/add', component: BookForm },
  { path: 'books/edit/:id', component: BookForm },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'quotes', component: MyQuotes },
  { path: '**', redirectTo: '' }
];