import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  @Input() message = '';

  @Input() type: 'success' | 'error' = 'success';

}
