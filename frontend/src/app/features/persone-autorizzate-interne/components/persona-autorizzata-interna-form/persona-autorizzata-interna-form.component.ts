import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaAutorizzataInterna } from '../../models/persona-autorizzata-interna.model';
import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';

@Component({
  selector: 'app-persona-autorizzata-interna-form',
  imports: [FormsModule],
  templateUrl: './persona-autorizzata-interna-form.component.html',
  styleUrl: './persona-autorizzata-interna-form.component.css',
})
export class PersonaAutorizzataInternaForm {

  formData = {
    persona: 0,
    dataScadenza: ''
  };

  @Output()
  salva = new EventEmitter<{ persona: number; dataScadenza: string }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  personeInterne: PersonaInterna[] = [];

  @Input()
  personaAutorizzataInterna: PersonaAutorizzataInterna | null = null;
 
  ngOnInit() {

    if (this.personaAutorizzataInterna?.dataScadenza) {

      this.formData = {
        persona: this.personaAutorizzataInterna.idPersona,
        dataScadenza: this.personaAutorizzataInterna.dataScadenza
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
