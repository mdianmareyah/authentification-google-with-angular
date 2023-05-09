import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testMaiLSendm';

  user!: User;

  constructor(private authService: AuthService) {


  }

  loggin() {
    this.authService.googleSignIn().then(() => {
      this.user = this.authService.getUserAuthentifie();
      alert("connexion reussie");
      console.log(this.user);
    }).catch(
      (error) => {
        alert("verifier votre connexion internet");
      }
    );
  }


}
