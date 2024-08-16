import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit 
{
  title = 'MarketPlaceApuntes-app';
  isAuthenticated: boolean = false;
  authChecked: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void
  {
    this.checkAuthentication();
    this.router.events.subscribe(() => {
      this.updateAuthStatus();
    });
  }

  checkAuthentication(): void 
  {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated = !!token;
    this.authChecked = true;

    if (!this.isAuthenticated) 
      {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']).then(() => {
        of(null).pipe(delay(0)).subscribe(() => {
          this.updateAuthStatus();
        });
      });
    }
  }

  updateAuthStatus(): void 
  {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated = !!token;
    this.authChecked = true;
  }

  logout(): void 
  {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
