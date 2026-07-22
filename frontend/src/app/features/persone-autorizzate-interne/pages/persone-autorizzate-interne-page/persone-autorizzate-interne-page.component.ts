import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PersoneAutorizzateInterneService } from '../../services/persone-autorizzate-interne.service';
import { SediService } from '../../../sedi/services/sedi.service';
import { PersonaAutorizzataInternaForm } from '../../components/persona-autorizzata-interna-form/persona-autorizzata-interna-form.component';
import { PersonaAutorizzataInterna } from '../../models/persona-autorizzata-interna.model';
import { Sede } from '../../../sedi/models/sede.model';
import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';
import { PersoneInterneService } from '../../../persone-interne/services/persone-interne.service';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-persone-autorizzate-interne-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonaAutorizzataInternaForm, ToastComponent],
  templateUrl: './persone-autorizzate-interne-page.component.html',
  styleUrls: ['./persone-autorizzate-interne-page.component.css'],
})
export class PersoneAutorizzateInterneComponent implements OnInit {

  //---------------------------- variabili -----------------

  personeAutorizzateInterne: PersonaAutorizzataInterna[] = [];
  personeInterne: PersonaInterna[] = [];
  sedi: Sede[] = [];
  idSede = 1; //default

  private personeAutorizzateInterneService = inject(PersoneAutorizzateInterneService);
  private personeInterneService = inject(PersoneInterneService);
  private sediService = inject(SediService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;
  personaAutorizzataInternaInModifica: PersonaAutorizzataInterna | null = null;

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
    this.loadPersoneAutorizzateInterne();
    this.loadSedi();
    this.loadPersoneInterne();
  }

  loadPersoneAutorizzateInterne(): void {
    this.personeAutorizzateInterneService.getAll(this.idSede).subscribe({
      next: (data) => {
        console.log(data);
        this.personeAutorizzateInterne = data;
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

  
  loadPersoneInterne(): void {
    this.personeInterneService.getAll(this.idSede).subscribe({
      next: (data) => {
        this.personeInterne = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSedeChanged(): void {
    this.loadPersoneAutorizzateInterne();
    this.loadPersoneInterne();
  }

  apriForm() {
    //rendi form visibile
    this.showForm = true;
  }

  chiudiForm() {
    //rendi form invisibile
    this.showForm = false;
    this.personaAutorizzataInternaInModifica = null;
  }

  modificaPersonaAutorizzataInterna(personaAutorizzataInterna: PersonaAutorizzataInterna) {
    this.personaAutorizzataInternaInModifica = personaAutorizzataInterna;
    this.showForm = true;
  }

  salvaPersonaAutorizzataInterna(dati: any) {

    if (this.personaAutorizzataInternaInModifica) {
      this.personeAutorizzateInterneService.update(
        this.personaAutorizzataInternaInModifica.id,
        dati
      )
      .subscribe({
        next: () => {
          this.loadPersoneAutorizzateInterne();
          this.chiudiForm();

          this.mostraToast('Persona autorizzata interna modificata correttamente');
        },   
        error: (error) => {
          const message = error?.error?.error?.message || 'Errore sconosciuto';

          this.toastType = 'error';
          this.mostraToast(message, 'error');
        }
      });

    } else {

      this.personeAutorizzateInterneService.create(dati.persona, dati)
      .subscribe({
        next: () => {
          this.loadPersoneAutorizzateInterne();
          this.chiudiForm();

          this.mostraToast('Persona autorizzata interna aggiunta correttamente');
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

    this.personeAutorizzateInterneService.delete(this.idDaEliminare).subscribe({
      next: () => {

        this.loadPersoneAutorizzateInterne();

        this.showDeletePopup = false;
        this.idDaEliminare = null;

        this.mostraToast('Persona autorizzata interna eliminata correttamente');
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

  cercaPersoneAutorizzateInterne() {
    this.personeAutorizzateInterneService.search(
      this.idSede, this.campoRicerca, this.testoRicerca
    ).subscribe({
      next: (data) => {
        this.personeAutorizzateInterne = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resettaRicerca() {
    this.testoRicerca = '';
    this.loadPersoneAutorizzateInterne();
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