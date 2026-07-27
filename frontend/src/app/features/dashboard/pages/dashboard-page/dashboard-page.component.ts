import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SediService } from '../../../sedi/services/sedi.service';
import { Sede } from '../../../sedi/models/sede.model';

import { Badge } from '../../../badge/models/badge.model';
import { BadgeService } from '../../../badge/services/badge.service';

import { IngressoStabilimento } from '../../../ingressi-stabilimento/models/ingresso-stabilimento.model';

import { IngressiStabilimentoService } from '../../../ingressi-stabilimento/services/ingressi-stabilimento.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardComponent implements OnInit {

  //---------------------------- variabili -----------------

  sedi: Sede[] = [];
  idSede = 1; //default

  presentiInterni: IngressoStabilimento[] = [];
  presentiEsterni: IngressoStabilimento[] = [];
  badges: Badge[] = [];
  chiavi: string[] = [];  //CAMBIA
  accessi: IngressoStabilimento[] = [];

  showOggi = new Date().toLocaleDateString('it-IT');
  oggi = new Date().toISOString().split('T')[0];

  oraInizio: string = '';
  oraFine: string = '';

  private sediService = inject(SediService);
  private ingressiService = inject(IngressiStabilimentoService);
  private badgeService = inject(BadgeService);

  private cdr = inject(ChangeDetectorRef);

  //---------------------------- funzioni --------------------

  ngOnInit(): void {
    this.oraInizio = '08:00:00';
    this.oraFine = '18:00:00';

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
    this.oraInizio = '08:00:00';
    this.oraFine = '18:00:00';

    this.loadAccessi();
    this.loadBadge();
    this.loadChiavi();
    this.loadPresenti();
  }

  onOrarioChange() {
    this.loadAccessi();
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
    this.ingressiService.getAllByOra(this.idSede, this.oraInizio, this.oraFine).subscribe({
      next: (data) => {
        this.accessi = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}