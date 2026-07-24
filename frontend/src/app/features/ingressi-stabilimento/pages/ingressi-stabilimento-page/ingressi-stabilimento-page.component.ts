import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IngressiStabilimentoService } from '../../services/ingressi-stabilimento.service';
import { IngressoStabilimentoForm } from '../../components/ingresso-stabilimento-form/ingresso-stabilimento-form.component';
import { IngressoStabilimento } from '../../models/ingresso-stabilimento.model';

import { Sede } from '../../../sedi/models/sede.model';
import { SediService } from '../../../sedi/services/sedi.service';

import { Badge } from '../../../badge/models/badge.model';
import { BadgeService } from '../../../badge/services/badge.service';

import { Categoria } from '../../../categorie/models/categoria.model';
import { CategorieService } from '../../../categorie/services/categorie.service';

import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';
import { PersoneInterneService } from '../../../persone-interne/services/persone-interne.service';

import { Persona } from '../../../persone/models/persona.model';

import { Divisione } from '../../../divisioni/models/divisione.model';
import { DivisioniService } from '../../../divisioni/services/divisioni.service';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';

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

  persone: Persona[] = [];
  badges:  Badge[] = [];
  categorie: Categoria[] = [];
  personeInterne: PersonaInterna[] = [];
  divisioni: Divisione[] = [];

  private ingressiStabilimentoService = inject(IngressiStabilimentoService);
  private sediService = inject(SediService);
  private badgeService = inject(BadgeService);
  private categorieService = inject(CategorieService);
  private personeInterneService = inject(PersoneInterneService);
  private divisioniService = inject(DivisioniService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;

  //periodo
  mostraFiltroPeriodo = false;
  inizioPeriodo = '';
  finePeriodo = '';

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
    this.loadPersone();
    this.loadBadges();
    this.loadCategorie();
    this.loadPersoneInterne();
    this.loadDivisioni();
  }

  onSedeChange(): void {
    this.loadIngressi();
    this.loadBadges();
    this.loadCategorie();
    this.loadPersoneInterne();
    this.loadDivisioni();

    this.testoRicerca = '';

    this.mostraFiltroPeriodo = false;

    this.inizioPeriodo = '';
    this.finePeriodo = '';
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

  loadPersone(): void {
    
  }

  loadBadges(): void {
    this.badgeService.getAll(this.idSede).subscribe({
      next: (data) => {
        this.badges = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  loadCategorie(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categorie = data;
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
  }

  applicaFiltroPeriodo() {
    if (this.testoRicerca.trim()) {
      //se sto cercando qualcosa
      this.ingressiStabilimentoService.searchByData(
        this.idSede,
        this.campoRicerca,
        this.testoRicerca,
        this.inizioPeriodo,
        this.finePeriodo
      ).subscribe({
        next: (data) => {
          this.ingressi = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {

      this.ingressiStabilimentoService.getAllByData(
        this.idSede,
        this.inizioPeriodo,
        this.finePeriodo
      ).subscribe({
        next: (data) => {
          this.ingressi = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onCambioFiltroPeriodo() {
    if (!this.mostraFiltroPeriodo) {

      this.inizioPeriodo = '';
      this.finePeriodo = '';

      this.loadIngressi();
    }

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
    if (this.mostraFiltroPeriodo) {
      this.ingressiStabilimentoService.searchByData(
        this.idSede,
        this.campoRicerca,
        this.testoRicerca,
        this.inizioPeriodo,
        this.finePeriodo
      ).subscribe({
        next: (data) => this.ingressi = data,
        error: (error) => console.error(error)
      });

    } else {
      this.ingressiStabilimentoService.search(
        this.idSede,
        this.campoRicerca,
        this.testoRicerca
      ).subscribe({
        next: (data) => this.ingressi = data,
        error: (error) => console.error(error)
      });
    }
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