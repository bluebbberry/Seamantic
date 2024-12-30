// start-page.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  standalone: true,
  imports: []
})
export class StartPageComponent {
  constructor(private router: Router, private sidekickService: SidekickService) {}

  clickedOnStart() {
    if (this.sidekickService.hasUserChosenSidekick) {
      this.router.navigate(['chat']);
    } else {
      this.router.navigate(['choose-sidekick']);
    }
  }

  welcomeText() {
    if (this.sidekickService.hasUserChosenSidekick) {
      return "Welcome back, says " + this.sidekickService.getSelectedSidekick()!.displayText;
    } else {
      // first time
      return "Welcome, Trainer!";
    }
  }

  confirmBtnText() {
    if (this.sidekickService.hasUserChosenSidekick) {
      return "Start";
    } else {
      // first time
      return "Choose my first Sidekick";
    }
  }
}
