import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OperatoriService } from '../../services/operatori.service';
import { SediService } from '../../../sedi/services/sedi.service';
import { OperatoreForm } from '../../components/operatore-form/operatore-form.component';
import { Operatore } from '../../models/operatore.model';
import { Sede } from '../../../sedi/models/sede.model';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-operatori-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OperatoreForm, ToastComponent],
  templateUrl: './operatori-page.component.html',
  styleUrls: ['./operatori-page.component.css'],
})
export class OperatoriComponent implements OnInit {

  //---------------------------- variabili -----------------

  operatori: Operatore[] = [];
  sedi: Sede[] = [];
  idSede = 1; //default

  private operatoriService = inject(OperatoriService);
  private sediService = inject(SediService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;
  operatoreInModifica: Operatore | null = null;

  //filtro
  campoRicerca = 'nome';
  testoRicerca = '';

  //toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  //conferma delete
  showDeletePopup = false;
  idDaEliminare: number | null = null;

  //---------------------------- funzioni --------------------

  ngOnInit(): void {
    this.loadOperatori();
    this.loadSedi();
  }

  loadOperatori(): void {
    this.operatoriService.getAll(this.idSede).subscribe({
      next: (data) => {
        this.operatori = data;
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

  apriForm() {
    //rendi form visibile
    this.showForm = true;
  }

  chiudiForm() {
    //rendi form invisibile
    this.showForm = false;
    this.operatoreInModifica = null;
  }

  modificaOperatore(operatore: Operatore) {
    this.operatoreInModifica = operatore;
    this.showForm = true;
  }

  salvaOperatore(dati: any) {

    if (this.operatoreInModifica) {
      this.operatoriService.update(
        this.operatoreInModifica.id,
        dati
      )
      .subscribe({
        next: () => {
          this.loadOperatori();
          this.chiudiForm();

          this.mostraToast('Operatore modificato correttamente');
        },   
        error: (error) => {
          const message = error?.error?.error?.message || 'Errore sconosciuto';

          this.toastType = 'error';
          this.mostraToast(message, 'error');
        }
      });

    } else {

      this.operatoriService.create(this.idSede, dati)
      .subscribe({
        next: () => {
          this.loadOperatori();
          this.chiudiForm();

          this.mostraToast('Operatore aggiunto correttamente');
        },
        
        error: (error) => {
          const message = error?.error?.error?.message || 'Errore sconosciuto';

          this.toastType = 'error';
          this.mostraToast(message, 'error');
        }
      });
      
    }
  }

  apriPopupElimina(id: number) {
    this.idDaEliminare = id;
    this.showDeletePopup = true;
  }

  confermaEliminazione() {
    if (this.idDaEliminare === null)
      return;

    this.operatoriService.delete(this.idDaEliminare).subscribe({
      next: () => {

        this.loadOperatori();

        this.showDeletePopup = false;
        this.idDaEliminare = null;

        this.mostraToast('Operatore eliminato correttamente');
      },

      error: (error) => {
        const message = error?.error?.error?.message || 'Errore sconosciuto';

        this.toastType = 'error';
        this.mostraToast(message, 'error');
      }
    });
  }

  chiudiPopupElimina() {
    this.showDeletePopup = false;
    this.idDaEliminare = null;
  }

  cercaOperatori() {
    this.operatoriService.search(
      this.idSede, this.campoRicerca, this.testoRicerca
    ).subscribe({
      next: (data) => {
        this.operatori = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resettaRicerca() {
    this.testoRicerca = '';
    this.loadOperatori();
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