import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        const username = res.user.split('\\')[1];
        sessionStorage.setItem('username', username);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
