import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sede } from '../../models/sede.model';

@Component({
  selector: 'app-sede-form',
  imports: [FormsModule],
  templateUrl: './sede-form.component.html',
  styleUrl: './sede-form.component.css',
})
export class SedeForm {

  formData = {
    sede: '',
    ufficio: ''
  };

  @Output()
  salva = new EventEmitter<{ sede: string; ufficio: string }>();

  @Output()
  annulla = new EventEmitter<void>();

  @Input()
  sede: Sede | null = null;
 
  ngOnInit() {

    if (this.sede) {

      this.formData = {
        sede: this.sede.sede,
        ufficio: this.sede.ufficio
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
