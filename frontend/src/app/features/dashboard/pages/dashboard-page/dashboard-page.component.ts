import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SediService } from '../../../sedi/services/sedi.service';
import { SedeForm } from '../../../sedi/components/sede-form/sede-form.component';
import { Sede } from '../../../sedi/models/sede.model';

import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SedeForm, ToastComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardComponent implements OnInit {

  //---------------------------- variabili -----------------

  sedi: Sede[] = [];
  idSede = 1; //default

  private sediService = inject(SediService);
  private cdr = inject(ChangeDetectorRef);

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

  onSedeChange() {
    
  }
}