import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaAutorizzataInterna } from '../../models/persona-autorizzata-interna.model';
import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';
import { Divisione } from '../../../divisioni/models/divisione.model';

@Component({
  selector: 'app-persona-autorizzata-interna-form',
  imports: [FormsModule],
  templateUrl: './persona-autorizzata-interna-form.component.html',
  styleUrl: './persona-autorizzata-interna-form.component.css',
})
export class PersonaAutorizzataInternaForm{

  formData = {
    persona: 0,
    dataInizio: '',
    dataScadenza: '',
    divisione: 0
  };

  @Output()
  salva = new EventEmitter<{ persona: number; dataInizio: string; dataScadenza: string, divisione: number }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  personeInterne: PersonaInterna[] = [];

  @Input()
  divisioni: Divisione[] = [];

  @Input()
  personaAutorizzataInterna: PersonaAutorizzataInterna | null = null;
 
  ngOnInit() {

    if (this.personaAutorizzataInterna?.dataScadenza) {

      this.formData = {
        persona: this.personaAutorizzataInterna.idPersona,
        dataInizio: this.personaAutorizzataInterna.dataInizio,
        dataScadenza: this.personaAutorizzataInterna.dataScadenza,
        divisione: this.personaAutorizzataInterna.idDivisione
      };

    }

  }

  onSalva() {
    this.salva.emit(this.formData);
  }

  onAnnulla() {
    this.annulla.emit();
  }
}
