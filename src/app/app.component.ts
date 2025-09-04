import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
   showSplash = true;

  constructor() {
    setTimeout(() => {
      this.showSplash = false;
    }, 3000); // 3s de splash
  }
}
