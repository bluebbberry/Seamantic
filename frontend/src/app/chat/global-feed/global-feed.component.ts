import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {StatusComponent} from "../status/status.component";
import {MicroblogService} from "../../services/microblog.service";

@Component({
  selector: 'app-global-feed',
  standalone: true,
    imports: [
        NgForOf,
        StatusComponent
    ],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss'
})
export class GlobalFeedComponent {
  constructor(protected microblogService: MicroblogService) {}

  clickedOnReload() {
    this.microblogService.globalStatuses = undefined;
    this.microblogService.fetchGlobalStatuses();
  }
}
