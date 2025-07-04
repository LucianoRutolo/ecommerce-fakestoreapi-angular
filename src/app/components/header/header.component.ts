import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected _loginService = inject(LoginService);
  protected $user = this._loginService.user;


  logout() {
    this._loginService.logout();
  }
}
