import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidekickService} from "../services/sidekick.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Sidekick} from "../model/sidekick";

@Component({
  selector: 'app-choose-sidekick',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './choose-sidekick.component.html',
  styleUrl: './choose-sidekick.component.scss'
})
export class ChooseSidekickComponent {
  constructor(private router: Router, protected sidekickService: SidekickService) {}

  clickedOnStart() {
    this.sidekickService.saveSidekickQuickSelectionToCookie();
    this.router.navigate(['chat']);
  }

  onSidekickSelect(sidekick: Sidekick) {
    sidekick.selected = !sidekick.selected;
    const selectedCount = this.sidekickService.getAllSidekicks().filter(s => s.selected).length;
    if (selectedCount > 3) {
      sidekick.selected = false; // Deselect if limit exceeded
      alert("Selected more than 3 sidekicks");
    } else {
      this.sidekickService.setQuickSelectionVal(sidekick, !this.sidekickService.sidekickQuickSelectionSet[sidekick.name]);
      if (sidekick.selected) {
        this.sidekickService.setSelectedSidekick(sidekick);
      } else if (this.sidekickService.getSelectedSidekick() == sidekick) {
        // if the selected sidekick is unselected, a new one needs to be chosen
        this.sidekickService.choseNewSelectedSidekick();
      }
    }
  }
}
