import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngressoStabilimento } from '../../models/ingresso-stabilimento.model';

@Component({
  selector: 'app-ingresso-stabilimento-form',
  imports: [FormsModule],
  templateUrl: './ingresso-stabilimento-form.component.html',
  styleUrl: './ingresso-stabilimento-form.component.css',
})
export class IngressoStabilimentoForm {

  formData = {
    nome: '',
    cognome: '',
    badge: 0,
    targa: '',
    categoria: 0,
    personaRiferimento: 0,
    azienda: 0,
    divisione: 0
  };

  @Output()
  salva = new EventEmitter<{ nome: string; cognome: string, badge: number, targa: string, categoria: number, personaRiferimento: number, azienda: number, divisione: number }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  ingresso: IngressoStabilimento | null = null;
 
  ngOnInit() {

    if (this.ingresso) {

      this.formData = {
        nome: this.ingresso.nome,
        cognome: this.ingresso.cognome,
        badge: this.ingresso.idBadge,
        targa: this.ingresso.targa ?? '',
        categoria: this.ingresso.idCategoria,
        personaRiferimento: this.ingresso.idPersonaRiferimento,
        azienda: this.ingresso.idAzienda,
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
