import { Component, EventEmitter, Output, Input, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaInterna } from '../../models/persona-interna.model';
import { Divisione } from '../../../divisioni/models/divisione.model';
import { DivisioniService } from '../../../divisioni/services/divisioni.service';

@Component({
  selector: 'app-persona-interna-form',
  imports: [FormsModule],
  templateUrl: './persona-interna-form.component.html',
  styleUrl: './persona-interna-form.component.css',
})
export class PersonaInternaForm {

  private divisioniService = inject(DivisioniService);

  private cdr = inject(ChangeDetectorRef);

  formData = {
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    divisione: 0
  };

  divisioni: Divisione[] = [];

  @Output()
  salva = new EventEmitter<{ nome: string; cognome: string; telefono: string; email: string; divisione: number }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  personaInterna: PersonaInterna | null = null;

  @Input()
  idSede!: number;
 
  ngOnInit() {
    this.loadDivisioni();

    if (this.personaInterna) {

      this.formData = {
        nome: this.personaInterna.nome,
        cognome: this.personaInterna.cognome,
        telefono: this.personaInterna.telefono,
        email: this.personaInterna.email,
        divisione: this.personaInterna.divisione
      };
    }

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

  onSalva() {
    this.salva.emit(this.formData);
  }

  onAnnulla() {
    this.annulla.emit();
  }
}
