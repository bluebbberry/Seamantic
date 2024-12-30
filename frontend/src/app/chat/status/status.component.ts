import {Component, Input} from '@angular/core';
import {MicroblogService} from "../../services/microblog.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  @Input("status")
  status: any;
  descendants$ = new BehaviorSubject<any[]>([]);
  repliesExpanded: boolean = false;
  expandButtonText: string = "+";

  constructor(public microBlogService: MicroblogService, private sanitizer: DomSanitizer) {}

  clickedOnExpandPost(status: any) {
    if (this.repliesExpanded) {
      // from expanded to not expanded
      this.repliesExpanded = false;
      this.expandButtonText = "+";
    } else {
      // from not expanded to expanded
      this.microBlogService.getDescendantsOfPost(status, (response: any) => this.updateDescendants(response["requestBody"]));
      this.expandButtonText = "-";
      this.repliesExpanded = true;
    }
  }

  safelyRenderHTML(htmlString: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  updateDescendants(newDescendants: any[]) {
    this.descendants$.next(newDescendants);
  }

  renderHTML(descendant: any) {
    return this.safelyRenderHTML(descendant.createdAt + " : " + descendant.content);
  }
}
