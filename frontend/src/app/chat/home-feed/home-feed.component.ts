import { Component } from '@angular/core';
import {MicroblogService} from "../../services/microblog.service";
import {StatusComponent} from "../status/status.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home-feed',
  standalone: true,
  imports: [
    StatusComponent,
    NgForOf
  ],
  templateUrl: './home-feed.component.html',
  styleUrl: './home-feed.component.scss'
})
export class HomeFeedComponent {
  constructor(protected microblogService: MicroblogService) {}

  clickedOnReload() {
    this.microblogService.homeStatuses= undefined;
    this.microblogService.fetchHomeStatuses();
  }
}
