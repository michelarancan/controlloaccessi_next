import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IngressiStabilimentoService } from '../../services/ingressi-stabilimento.service';
import { SediService } from '../../../sedi/services/sedi.service';
import { IngressoStabilimentoForm } from '../../components/ingresso-stabilimento-form/ingresso-stabilimento-form.component';
import { IngressoStabilimento } from '../../models/ingresso-stabilimento.model';
import { Sede } from '../../../sedi/models/sede.model';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { Badge } from '../../../badge/models/badge.model';

@Component({
  selector: 'app-ingressi-stabilimento-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IngressoStabilimentoForm, ToastComponent],
  templateUrl: './ingressi-stabilimento-page.component.html',
  styleUrls: ['./ingressi-stabilimento-page.component.css'],
})
export class IngressiStabilimentoComponent implements OnInit {

  //---------------------------- variabili -----------------

  ingressi: IngressoStabilimento[] = [];
  sedi: Sede[] = [];
  idSede = 1; //default

  badges:  Badge[] = [];

  private ingressiStabilimentoService = inject(IngressiStabilimentoService);
  private sediService = inject(SediService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;

  //filtro
  campoRicerca = 'nome';
  testoRicerca = '';

  //toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  //---------------------------- funzioni --------------------

  ngOnInit(): void {
    this.loadIngressi();
    this.loadSedi();
    this.loadBadges();
  }

  loadIngressi(): void {
    this.ingressiStabilimentoService.getAll(this.idSede).subscribe({
      next: (data) => {
        this.ingressi = data;
        this.cdr.detectChanges(); //applica changes

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadSedi(): void {
    this.sediService.getAll().subscribe({
      next: (data) => {
        this.sedi = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  loadBadges() {
    
  }

  apriForm() {
    //rendi form visibile
    this.showForm = true;
  }

  chiudiForm() {
    //rendi form invisibile
    this.showForm = false;
  }

  salvaIngresso(dati: any) {
    this.ingressiStabilimentoService.create(dati)
    .subscribe({
      next: () => {
        this.loadIngressi();
        this.chiudiForm();

        this.mostraToast('Ingresso allo stabilimento aggiunto correttamente');
      },
        
      error: (error) => {
        const message = error?.error?.error?.message || 'Errore sconosciuto';

        this.mostraToast(message, 'error');
      }
    });
  }

  registraUscita(id: number) {
    this.ingressiStabilimentoService.registerExit(id)
    .subscribe({
      next: () => {
        this.loadIngressi();
        this.mostraToast('Uscita registrata correttamente');
      },
      error: (error) => {
        const message =
          error?.error?.error?.message || 'Errore sconosciuto';

        this.mostraToast(message, 'error');
      }
    });
  }

  cercaIngressi() {
    this.ingressiStabilimentoService.search(
      this.idSede, this.campoRicerca, this.testoRicerca
    ).subscribe({
      next: (data) => {
        this.ingressi = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resettaRicerca() {
    this.testoRicerca = '';
    this.loadIngressi();
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