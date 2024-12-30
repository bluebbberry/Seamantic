import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {StatusComponent} from "../status/status.component";
import {MicroblogService} from "../../services/microblog.service";

@Component({
  selector: 'app-local-feed',
  standalone: true,
    imports: [
        NgForOf,
        StatusComponent
    ],
  templateUrl: './local-feed.component.html',
  styleUrl: './local-feed.component.scss'
})
export class LocalFeedComponent {
  constructor(protected microblogService: MicroblogService) {}

  clickedOnReload() {
    this.microblogService.localStatuses= undefined;
    this.microblogService.fetchLocalStatuses();
  }
}
