import { Routes } from '@angular/router';
import { SediComponent } from './features/sedi/pages/sedi-page/sedi-page.component';
import { OperatoriComponent } from './features/operatori/pages/operatori-page/operatori-page.component';
import { PersoneInterneComponent } from './features/persone-interne/pages/persone-interne-page/persone-interne-page.component';
import { PersoneAutorizzateInterneComponent } from './features/persone-autorizzate-interne/pages/persone-autorizzate-interne-page/persone-autorizzate-interne-page.component';
import { IngressiStabilimentoComponent } from './features/ingressi-stabilimento/pages/ingressi-stabilimento-page/ingressi-stabilimento-page.component';

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
    },
    {
        path: 'persone-interne',
        component: PersoneInterneComponent
    },
    {
        path: 'persone-autorizzate-interne',
        component: PersoneAutorizzateInterneComponent
    },
    {
        path: 'ingressi-stabilimento',
        component: IngressiStabilimentoComponent
    }
];
