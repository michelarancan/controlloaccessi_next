import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SediService } from '../../services/sedi.service';
import { SedeForm } from '../../components/sede-form/sede-form.component';
import { Sede } from '../../models/sede.model';

@Component({
  selector: 'app-sedi-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SedeForm],
  templateUrl: './sedi-page.component.html',
  styleUrls: ['./sedi-page.component.css'],
})
export class SediComponent implements OnInit {

  //---------------------------- variabili -----------------

  sedi: Sede[] = [];

  private sediService = inject(SediService);
  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;
  sedeInModifica: Sede | null = null;

  //filtro
  campoRicerca = 'sede';
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
    this.loadSedi();
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

  apriForm() {
    //rendi form visibile
    this.showForm = true;
  }

  chiudiForm() {
    //rendi form invisibile
    this.showForm = false;
    this.sedeInModifica = null;
  }

  modificaSede(sede: Sede) {
    this.sedeInModifica = sede;
    this.showForm = true;
  }

  salvaSede(dati: any) {

    if (this.sedeInModifica) {
      this.sediService.update(
        this.sedeInModifica.id,
        dati
      )
      .subscribe({
        next: () => {
          this.loadSedi();
          this.chiudiForm();

          this.mostraToast('Sede modificata correttamente');
        },   
        error: (error) => {
            this.toastType = 'error';
            this.mostraToast('Errore durante l\'inserimento', 'error');
          }
      });

    } else {

      this.sediService.create(dati)
      .subscribe({
        next: () => {
          this.loadSedi();
          this.chiudiForm();

          this.mostraToast('Sede aggiunta correttamente');
        },
        
        error: (error) => {
          this.toastType = 'error';
          this.mostraToast('Errore durante l\'inserimento', 'error');
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

    this.sediService.delete(this.idDaEliminare).subscribe({
      next: () => {

        this.loadSedi();

        this.showDeletePopup = false;
        this.idDaEliminare = null;

        this.mostraToast('Sede eliminata correttamente');
      },

      error: (error) => {
        this.mostraToast('Errore durante l\'eliminazione','error');
        console.error(error);
      }
    });
  }

  chiudiPopupElimina() {
    this.showDeletePopup = false;
    this.idDaEliminare = null;
  }

  cercaSedi() {
    console.log('RICERCA: ', this.testoRicerca);

    this.sediService.search(
      this.campoRicerca, this.testoRicerca
    ).subscribe({
      next: (data) => {
        this.sedi = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resettaRicerca() {
    this.testoRicerca = '';
    this.loadSedi();
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