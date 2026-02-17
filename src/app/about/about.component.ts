import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  gitHubIcon = faGithub;
  linkedInIcon = faLinkedin;
}
