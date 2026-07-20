import { Routes } from '@angular/router';
import { SediComponent } from './features/sedi/pages/sedi-page/sedi-page.component';
import { OperatoriComponent } from './features/operatori/pages/operatori-page/operatori-page.component';

export const routes: Routes = [/*
    {
        path: '',
        redirectTo: 'sedi',
        pathMatch: 'full'
    },*/
    {
        path: 'sedi',
        component: SediComponent
    }, 
    {
        path: 'operatori',
        component: OperatoriComponent
    }
];
