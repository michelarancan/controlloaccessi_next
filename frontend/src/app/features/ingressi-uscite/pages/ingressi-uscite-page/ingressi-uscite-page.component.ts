import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IngressiStabilimentoService } from '../../../ingressi-stabilimento/services/ingressi-stabilimento.service';
import { IngressoStabilimentoForm } from '../../components/ingresso-uscite-form/ingresso-uscite-form.component';
import { IngressoStabilimento } from '../../../ingressi-stabilimento/models/ingresso-stabilimento.model';

import { Sede } from '../../../sedi/models/sede.model';
import { SediService } from '../../../sedi/services/sedi.service';

import { Badge } from '../../../badge/models/badge.model';
import { BadgeService } from '../../../badge/services/badge.service';

import { Categoria } from '../../../categorie/models/categoria.model';
import { CategorieService } from '../../../categorie/services/categorie.service';

import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';
import { PersoneInterneService } from '../../../persone-interne/services/persone-interne.service';

import { Persona } from '../../../persone/models/persona.model';
import { PersoneService } from '../../../persone/services/persone.service';

import { Divisione } from '../../../divisioni/models/divisione.model';
import { DivisioniService } from '../../../divisioni/services/divisioni.service';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-ingressi-uscite-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IngressoStabilimentoForm, ToastComponent],
  templateUrl: './ingressi-uscite-page.component.html',
  styleUrls: ['./ingressi-uscite-page.component.css'],
})
export class IngressiUsciteComponent implements OnInit {

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
  private personeService = inject(PersoneService);

  private cdr = inject(ChangeDetectorRef);

  //form
  showForm = false;

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
    this.personeService.getAll().subscribe({
      next: (data) => {
        this.persone = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    })
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

  salvaIngresso(dati: any) {
    this.ingressiStabilimentoService.create(this.idSede, dati)
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