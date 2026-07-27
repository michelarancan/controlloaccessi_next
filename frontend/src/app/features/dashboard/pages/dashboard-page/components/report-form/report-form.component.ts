import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  imports: [FormsModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css',
})
export class ReportForm{

  formData = {
    data: new Date().toLocaleDateString('sv-SE')
  };

  @Output()
  salva = new EventEmitter<{ data: string }>();

  @Output()
  annulla = new EventEmitter<void>();

  onSalva() {
    this.salva.emit(this.formData);
  }

  onAnnulla() {
    this.annulla.emit();
  }
}
