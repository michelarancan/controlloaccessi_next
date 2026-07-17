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
  sedi: Sede[] = [];

  private sediService = inject(SediService);
  private cdr = inject(ChangeDetectorRef);

  showForm = false;

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
  }

  aggiungiSede(sede: { sede: string, ufficio: string }) {
    this.sediService.create(sede).subscribe({
      next: () => {
        this.chiudiForm();

        //ricarica sedi
        this.loadSedi();

        //visualizza messaggio di conferma
      },

      error: (error) => {
        console.error(error);
      }
    });
  }
}