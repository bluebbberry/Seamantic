import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {StatusComponent} from "../status/status.component";
import {MicroblogService} from "../../services/microblog.service";

@Component({
  selector: 'app-semantic-feed',
  standalone: true,
    imports: [
        NgForOf,
        StatusComponent
    ],
  templateUrl: './semantic-feed.component.html',
  styleUrl: './semantic-feed.component.scss'
})
export class SemanticFeedComponent {
  constructor(protected microblogService: MicroblogService) {}

  clickedOnReload() {
    this.microblogService.semanticStatuses = undefined;
    this.microblogService.fetchSemanticStatuses();
  }
}
