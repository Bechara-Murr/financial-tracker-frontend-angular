import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navigation',
  imports: [MatSlideToggleModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isSubscribedToEmailsMessage = 'Theme';

  toggle() {
    document.body.classList.toggle('darkMode');
  }
}
