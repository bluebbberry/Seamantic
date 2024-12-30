import {ChangeDetectorRef, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import { MicroblogService } from "../services/microblog.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {HomeFeedComponent} from "./home-feed/home-feed.component";
import {LocalFeedComponent} from "./local-feed/local-feed.component";
import {GlobalFeedComponent} from "./global-feed/global-feed.component";
import {DolphinService} from "../services/dolphin.service";

enum Feed {
  HOME, LOCAL, GLOBAL
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, HomeFeedComponent, LocalFeedComponent, GlobalFeedComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';
  protected changed: boolean = false;
  public selectedFeed: Feed = Feed.HOME;
  protected seLevel: number = 0;
  protected MAXIMUM_SE_LEVEL = 10;

  constructor(private http: HttpClient,
              protected microblogService: MicroblogService,
              private router: Router,
              private changeDetectionRef: ChangeDetectorRef,
              protected userService: UserService,
              protected dolphinService: DolphinService) {

    // user has already chosen sidekick, the value cannot be null
    this.microblogService.fetchHomeStatuses();
    this.microblogService.fetchLocalStatuses();
    this.microblogService.fetchGlobalStatuses();
    this.userService.fetchUserInfo();
  }

  clickedOnSendToMyAccount() {
    this.seLevel++;
    console.log("Clicked on send");
    if (this.newMessage) {
      this.microblogService.sendMessage(this.newMessage, () => {
        this.microblogService.fetchHomeStatuses();
      });
      this.newMessage = '';
    } else {
      alert("Failed to send a message");
    }
  }

  navigateTo(feed: Feed) {
    switch (feed) {
      case Feed.HOME:
        this.selectedFeed = Feed.HOME;
        break;
      case Feed.LOCAL:
        this.selectedFeed = Feed.LOCAL;
        break;
      case Feed.GLOBAL:
        this.selectedFeed = Feed.GLOBAL;
        break;
    }
  }

  clickedOnIcon() {
    this.router.navigate(['/']);
  }

  protected readonly Feed = Feed;

  clickedOnEditSidekickSelection() {
    this.router.navigate(['/choose-sidekick']);
  }

  onSelectKnowledgeBit(target: any) {
    this.newMessage += target.value;
  }
}
