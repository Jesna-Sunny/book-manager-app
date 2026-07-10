import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookForm } from './pages/book-form/book-form';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MyQuotes } from './pages/my-quotes/my-quotes';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'books/add', component: BookForm, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookForm, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'quotes', component: MyQuotes, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];