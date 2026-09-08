import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Update } from './pages/update/update';
import { Details } from './pages/details/details';

export const routes: Routes = [
    {path:'register', component: Register},
    {path:'', component: Home},
    {path:'update/:id', component: Update},
    {path:'details/:id', component: Details}
];
