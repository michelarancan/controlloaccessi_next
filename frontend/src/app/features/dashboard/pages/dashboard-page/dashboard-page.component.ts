import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SediService } from '../../../sedi/services/sedi.service';
import { Sede } from '../../../sedi/models/sede.model';

import { Badge } from '../../../badge/models/badge.model';
import { BadgeService } from '../../../badge/services/badge.service';

import { IngressoStabilimento } from '../../../ingressi-stabilimento/models/ingresso-stabilimento.model';

import { IngressiStabilimentoService } from '../../../ingressi-stabilimento/services/ingressi-stabilimento.service';

import { ReportForm } from './components/report-form/report-form.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReportForm, ToastComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardComponent implements OnInit {

  //---------------------------- variabili -----------------

  sedi: Sede[] = [];
  idSede = 1; //default

  //form
  showForm = false;

  //toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  presentiInterni: IngressoStabilimento[] = [];
  presentiEsterni: IngressoStabilimento[] = [];
  badges: Badge[] = [];
  chiavi: string[] = [];  //CAMBIA
  accessiInterni: IngressoStabilimento[] = [];
  accessiEsterni: IngressoStabilimento[] = [];

  showOggi = new Date().toLocaleDateString('it-IT');
  oggi = new Date().toLocaleDateString('sv-SE');

  oraInizioInterni: string = '';
  oraFineInterni: string = '';

  oraInizioEsterni: string = '';
  oraFineEsterni: string = '';

  private sediService = inject(SediService);
  private ingressiService = inject(IngressiStabilimentoService);
  private badgeService = inject(BadgeService);

  private cdr = inject(ChangeDetectorRef);

  //---------------------------- funzioni --------------------

  ngOnInit(): void {
    this.oraInizioInterni = '08:00:00';
    this.oraFineInterni = '18:00:00';

    this.oraInizioEsterni = '08:00:00';
    this.oraFineEsterni = '18:00:00';

    this.loadSedi();

    this.loadAccessi();
    this.loadBadge();
    this.loadChiavi();
    this.loadPresenti();
  }

  loadSedi(): void {
    this.sediService.getAll().subscribe({
      next: (data) => {
        this.sedi = data;
        this.cdr.detectChanges(); //applica changes

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSedeChange() {
    this.oraInizioInterni = '08:00:00';
    this.oraFineInterni = '18:00:00';

    this.oraInizioEsterni = '08:00:00';
    this.oraFineEsterni = '18:00:00';

    this.loadAccessi();
    this.loadBadge();
    this.loadChiavi();
    this.loadPresenti();
  }

  onOrarioChange() {
    this.loadAccessi();
  }

  generaReport(dati: {data: string}) {
    
    //generazione report

    this.chiudiForm();
    this.mostraToast('Report generato correttamente');
  }

  apriForm() {
    //rendi form visibile
    this.showForm = true;
  }

  chiudiForm() {
    //rendi form invisibile
    this.showForm = false;
  }

  loadPresenti(): void {
    this.ingressiService.getAllByData(this.idSede, this.oggi, this.oggi).subscribe({
      next: (data) => {
        const presenti = data.filter(x => !x.dataUscita);

        this.presentiEsterni = presenti.filter(x => !!x.azienda);
        this.presentiInterni = presenti.filter(x => !x.azienda);

        this.cdr.detectChanges(); //applica changes

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadBadge(): void {
    this.badgeService.getAllAround(this.idSede).subscribe({
      next: (data) => {
        this.badges = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadChiavi(): void {
    
  }

  loadAccessi(): void {
    this.loadAccessiEsterni();
    this.loadAccessiInterni();
  }

  loadAccessiInterni(): void {
    this.ingressiService.getAllByOra(this.idSede, this.oraInizioInterni, this.oraFineInterni, this.oggi).subscribe({
      next: (data) => {
        const accessi = data;

        this.accessiInterni = accessi.filter(x => !x.azienda);

        this.cdr.detectChanges(); //applica changes
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadAccessiEsterni(): void {
    this.ingressiService.getAllByOra(this.idSede, this.oraInizioEsterni, this.oraFineEsterni, this.oggi).subscribe({
      next: (data) => {
        const accessi = data;

        this.accessiEsterni = accessi.filter(x => !!x.azienda);

        this.cdr.detectChanges(); //applica changes
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  mostraToast(messaggio: string, tipo: 'success' | 'error' = 'success') {
    this.toastMessage = messaggio;
    this.toastType = tipo;
    this.showToast = true;

    this.cdr.detectChanges();

    //si chiude dopo 3 secondi
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}