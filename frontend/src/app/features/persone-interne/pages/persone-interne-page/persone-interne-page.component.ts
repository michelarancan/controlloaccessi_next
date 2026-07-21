import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PersoneInterneService } from '../../services/persone-interne.service';
import { SediService } from '../../../sedi/services/sedi.service';
import { PersonaInternaForm } from '../../components/persona-interna-form/persona-interna-form.component';
import { PersonaInterna } from '../../models/persona-interna.model';
import { Sede } from '../../../sedi/models/sede.model';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { Divisione } from '../../../divisioni/models/divisione.model';
import { DivisioniService } from '../../../divisioni/services/divisioni.service';

@Component({
  selector: 'app-persone-interne-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonaInternaForm, ToastComponent],
  templateUrl: './persone-interne-page.component.html',
  styleUrls: ['./persone-interne-page.component.css'],
})
export class PersoneInterneComponent implements OnInit {

  //---------------------------- variabili -----------------

  personeInterne: PersonaInterna[] = [];
  sedi: Sede[] = [];
  divisioni: Divisione[] = [];

  idSede = 1; //default
  idDivisione = 0; //default

  private personeInterneService = inject(PersoneInterneService);
  private sediService = inject(SediService);
  private divisioniService = inject(DivisioniService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;
  personaInternaInModifica: PersonaInterna | null = null;

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
    this.loadPersoneInterne();
    this.loadSedi();
    this.loadDivisioni();
  }

  loadPersoneInterne(): void {

    if(this.idDivisione === 0) {

      this.personeInterneService.getAll(this.idSede).subscribe({
        next: (data) => {
          this.personeInterne = data;
          this.cdr.detectChanges(); //applica changes

        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else {
      this.personeInterneService.getAllByDivisione(this.idDivisione).subscribe({
        next: (data) => {
          this.personeInterne = data;
          this.cdr.detectChanges(); //applica changes

        },
        error: (error) => {
          console.error(error);
        }
      });
    }
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

  loadDivisioni(): void {
    this.divisioniService.getAll(this.idSede).subscribe({
      next: (data) => {
        this.divisioni = data;
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
    this.personaInternaInModifica = null;
  }

  modificaPersonaInterna(personaInterna: PersonaInterna) {
    this.personaInternaInModifica = personaInterna;
    this.showForm = true;
  }

  salvaPersonaInterna(dati: any) {

    if (this.personaInternaInModifica) {
      this.personeInterneService.update(
        this.idSede,
        this.personaInternaInModifica.id,
        dati
      )
      .subscribe({
        next: () => {
          this.loadPersoneInterne();
          this.chiudiForm();

          this.mostraToast('Persona interna modificata correttamente');
        },   
        error: (error) => {
          const message = error?.error?.error?.message || 'Errore sconosciuto';

          this.toastType = 'error';
          this.mostraToast(message, 'error');
        }
      });

    } else {

      this.personeInterneService.create(this.idSede, dati)
      .subscribe({
        next: () => {
          this.loadPersoneInterne();
          this.chiudiForm();

          this.mostraToast('Persona interna aggiunta correttamente');
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

    this.personeInterneService.delete(this.idDaEliminare).subscribe({
      next: () => {

        this.loadPersoneInterne();

        this.showDeletePopup = false;
        this.idDaEliminare = null;

        this.mostraToast('Persona interna eliminata correttamente');
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

  cercaPersoneInterne() {
    if(this.idDivisione === 0) {
      this.personeInterneService.search(
        this.idSede, this.campoRicerca, this.testoRicerca
      ).subscribe({
        next: (data) => {
          this.personeInterne = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else {
      this.personeInterneService.searchByDivisione(
        this.idDivisione, this.campoRicerca, this.testoRicerca
      ).subscribe({
        next: (data) => {
          this.personeInterne = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  resettaRicerca() {
    this.testoRicerca = '';
    this.loadPersoneInterne();
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