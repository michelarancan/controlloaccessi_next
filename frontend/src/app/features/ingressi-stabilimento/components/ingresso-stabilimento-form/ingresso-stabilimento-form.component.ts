import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngressoStabilimento } from '../../models/ingresso-stabilimento.model';
import { Badge } from '../../../badge/models/badge.model';
import { Categoria } from '../../../categorie/models/categoria.model';
import { PersonaInterna } from '../../../persone-interne/models/persona-interna.model';
import { Divisione } from '../../../divisioni/models/divisione.model';
import { Persona } from '../../../persone/models/persona.model';

@Component({
  selector: 'app-ingresso-stabilimento-form',
  imports: [FormsModule],
  templateUrl: './ingresso-stabilimento-form.component.html',
  styleUrl: './ingresso-stabilimento-form.component.css',
})
export class IngressoStabilimentoForm {

  formData = {
    persona: 0,
    badge: 0,
    targa: '',
    categoria: 0,
    personaRiferimento: null as number | null,
    divisione: 0
  };

  @Input()
  persone: Persona[] = [];

  @Input()
  badges: Badge[] = [];

  @Input()
  categorie: Categoria[] = [];

  @Input()
  personeInterne: PersonaInterna[] = [];

  @Input()
  divisioni: Divisione[] = [];

  @Output()
  salva = new EventEmitter<{persona: number, badge: number, targa: string, categoria: number,personaRiferimento: number | null, divisione: number}>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  ingresso: IngressoStabilimento | null = null;
 
  ngOnInit() {

    if (this.ingresso) {

      this.formData = {
        persona: this.ingresso.persona,
        badge: this.ingresso.idBadge,
        targa: this.ingresso.targa ?? '',
        categoria: this.ingresso.idCategoria,
        personaRiferimento: this.ingresso.idPersonaRiferimento ?? null,
        divisione: this.ingresso.idDivisione
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
