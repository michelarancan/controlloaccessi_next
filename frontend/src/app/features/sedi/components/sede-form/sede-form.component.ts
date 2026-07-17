import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sede-form',
  imports: [FormsModule],
  templateUrl: './sede-form.component.html',
  styleUrl: './sede-form.component.css',
})
export class SedeForm {
  sede = {
    sede: '',
    ufficio: ''
  };

  @Output()
  salva = new EventEmitter<{ sede: string; ufficio: string }>();

  @Output()
  annulla = new EventEmitter<void>();


  onSalva() {
    this.salva.emit(this.sede);
  }

  onAnnulla() {
    this.annulla.emit();
  }
}
