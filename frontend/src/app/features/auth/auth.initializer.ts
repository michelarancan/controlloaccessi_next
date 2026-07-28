import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';

export function authInitializer(
  authService: AuthService
) {
  return async () => {
    const response =
      await firstValueFrom(
        authService.getCurrentUser()
      );

    const username =
      response.user.split('\\')[1];

    sessionStorage.setItem(
      'username',
      username
    );
  };
}