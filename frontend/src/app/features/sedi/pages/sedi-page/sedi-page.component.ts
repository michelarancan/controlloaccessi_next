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

  showForm = false;
  sedeInModifica: Sede | null = null;

  campoRicerca = 'sede';
  testoRicerca = '';

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
        }
      });

    } else {

      this.sediService.create(dati)
      .subscribe({
        next: () => {
          this.loadSedi();
          this.chiudiForm();
        }
      });

    }
  }

  eliminaSede(id: number) {

    if(!confirm('Vuoi davvero eliminare questa sede?'))
      return;

    this.sediService.delete(id)
    .subscribe({
      next: () => {
        this.loadSedi();
      },
      error: (error) => {
        console.error(error);
      }
    });
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
}