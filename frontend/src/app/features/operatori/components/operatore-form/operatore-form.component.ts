import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Operatore } from '../../models/operatore.model';

@Component({
  selector: 'app-operatore-form',
  imports: [FormsModule],
  templateUrl: './operatore-form.component.html',
  styleUrl: './operatore-form.component.css',
})
export class OperatoreForm {

  formData = {
    nome: '',
    cognome: ''
  };

  @Output()
  salva = new EventEmitter<{ nome: string; cognome: string }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  operatore: Operatore | null = null;
 
  ngOnInit() {

    if (this.operatore) {

      this.formData = {
        nome: this.operatore.nome,
        cognome: this.operatore.cognome
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
