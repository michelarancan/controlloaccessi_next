import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SediService } from '../../../sedi/services/sedi.service';
import { SedeForm } from '../../../sedi/components/sede-form/sede-form.component';
import { Sede } from '../../../sedi/models/sede.model';

import { DashboardPresentiInterni } from '../../models/dashboard.model';
import { DashboardPresentiEsterni } from '../../models/dashboard.model';
import { DashboardBadge } from '../../models/dashboard.model';
import { DashboardChiavi } from '../../models/dashboard.model';
import { DashboardAccessi } from '../../models/dashboard.model';

import { IngressoStabilimento } from '../../../ingressi-stabilimento/models/ingresso-stabilimento.model';

import { IngressiStabilimentoService } from '../../../ingressi-stabilimento/services/ingressi-stabilimento.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SedeForm],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardComponent implements OnInit {

  //---------------------------- variabili -----------------

  sedi: Sede[] = [];
  idSede = 1; //default

  presentiInterni: IngressoStabilimento[] = [];
  presentiEsterni: IngressoStabilimento[] = [];
  badges: DashboardBadge[] = [];
  chiavi: DashboardChiavi[] = [];
  accessi: IngressoStabilimento[] = [];

  oggi = new Date().toLocaleDateString('it-IT');

  private sediService = inject(SediService);
  private ingressiService = inject(IngressiStabilimentoService);

  private cdr = inject(ChangeDetectorRef);

  //---------------------------- funzioni --------------------

  ngOnInit(): void {
    this.loadSedi();

    this.loadAccessi();
    this.loadBadge();
    this.loadChiavi();
    this.loadPresentiEsterni();
    this.loadPresentiInterni();
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
    this.loadAccessi();
    this.loadBadge();
    this.loadChiavi();
    this.loadPresentiEsterni();
    this.loadPresentiInterni();
  }

  loadPresentiInterni(): void {
    this.ingressiService.getAllByData(this.idSede, this.oggi, this.oggi).subscribe({
      next: (data) => {
        this.accessi = data;

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

  loadPresentiEsterni(): void {
    
  }

  loadBadge(): void {
    
  }

  loadChiavi(): void {
    
  }

  loadAccessi(): void {
    
  }
}