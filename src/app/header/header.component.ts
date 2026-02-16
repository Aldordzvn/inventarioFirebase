import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuIcon = faBars;
  darkIcon = faMoon;
  lightIcon = faSun;
  backIcon = faArrowLeft;
  openMenuModalBoolean : boolean = false;
  hasInteracted : boolean = false;

  openModal(){
    this.openMenuModalBoolean = !this.openMenuModalBoolean;
    this.hasInteracted = true;
    
    if(this.openMenuModalBoolean){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
  }
}
