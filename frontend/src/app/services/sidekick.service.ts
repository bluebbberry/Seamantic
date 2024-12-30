import {Injectable} from '@angular/core';
import {Sidekick} from "../model/sidekick";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SidekickService {
  private COOKIE_CHOSE_SIDEKICK: string = "choseSidekick";
  private COOKIE_EXPIRE_DAYS: number = 30;

  private allSidekicks: Sidekick[] = [
    new Sidekick("larry", "Larry", "Larry - Classic Text Posting", "larry.png"),
    new Sidekick("jea", "Jea", "Jea - Schedule posts by starting post with #numberOfMinutes", "jea2.png"),
    new Sidekick("ennui", "Ennui", "Ennui - Laid-back, seemingly low-effort posts guaranteed", "slack.jpg"),
    new Sidekick("spark", "Spark", "Spark - Angry Mode (Turns Every Post Into CAPS!!!)", "spark2.png"),
    new Sidekick("hamlet", "Hamlet", "Hamlet - Ends every post with a Shakespeare quote", "hamlet.jpg"),
    new Sidekick("legion", "Legion", "Legion - Post the same post multiple times with #numberOfTimesPosted", "legion.jpg"),
    new Sidekick("dolphin", "Dolphin", "Dolphin - provides post-suggestions over time by Collecting individual posts send through Dolfin of all users, based on the related hashtags.", "aqua.jpg"),
    new Sidekick("buzz", "Buzz Lightsting", "Buzz Lightsting - collects individual posts send through Buzz of all users and then randomly sends them out on the participating accounts.", "buzz.jpg"),
    // Actual Sanity - trains LLM on data
    //new Sidekick("flash", "Flash", "Flash - Allows to program conditional replies"),
    // new Sidekick("ava", "Ava", "Ava - Text Posting Plus Sparkly Commands"),
  ];
  private selectedSidekick!: Sidekick | null;
  public hasUserChosenSidekick!: boolean;
  public sidekickQuickSelectionSet: any = {};

  constructor(private cookieService: CookieService) {
    this.initQuickSelection();
    this.initSelectedSidekick();
  }

  private initQuickSelection() {
    // init quick selection for all sidekicks
    this.allSidekicks.forEach(sidekick => {this.sidekickQuickSelectionSet[sidekick.name] = false;})
    this.loadSidekickQuickSelectionFromCookie();
  }

  private initSelectedSidekick() {
    const selectedSidekickCookieVal: string = this.cookieService.get(this.COOKIE_CHOSE_SIDEKICK);
    this.hasUserChosenSidekick = selectedSidekickCookieVal !== '';
    console.log("Has selected: " + this.hasUserChosenSidekick);
    if (this.hasUserChosenSidekick) {
      this.selectedSidekick = this.getByName(selectedSidekickCookieVal);
    } else {
      // user has not yet chosen sidekick
      this.selectedSidekick = null;
    }
  }

  public getByName(name: string): Sidekick {
    const result = this.allSidekicks.find(s => s.name === name);
    if (result) return result;
    else {
      throw Error("Unknown sidekick name: " + name);
    }
  }

  public getAllSidekicks() {
    return this.allSidekicks;
  }

  public getAllSidekicksInQuickSelectionSet(): Sidekick[] {
    const result : Sidekick[] = [];
    for (const sidekickName of Object.keys(this.sidekickQuickSelectionSet).filter(name => this.sidekickQuickSelectionSet[name] === true)) {
      const s = this.allSidekicks.find(s => s.name === sidekickName);
      if (s) result.push(s);
    }
    return result;
  }

  public getRandomSidekickFromQuickSelectionSet(): Sidekick | null {
    const namesArray: string[] = Object.keys(this.sidekickQuickSelectionSet).filter(name => this.sidekickQuickSelectionSet[name] === true);
    if (namesArray.length === 0) return null;
    const rndSidekickName = namesArray[Math.floor(Math.random() * namesArray.length)];
    return this.allSidekicks.find(s => s.name === rndSidekickName)!;
  }

  public setSelectedSidekick(sidekick: Sidekick | null) {
    if (sidekick) {
      this.selectedSidekick = sidekick;
      this.hasUserChosenSidekick = true;
      this.cookieService.set(this.COOKIE_CHOSE_SIDEKICK, sidekick.name, this.COOKIE_EXPIRE_DAYS);
    } else {
      this.selectedSidekick = null;
      this.cookieService.delete(this.COOKIE_CHOSE_SIDEKICK);
    }
  }

  public getSelectedSidekick() {
    return this.selectedSidekick;
  }

  public saveSidekickQuickSelectionToCookie() {
    this.cookieService.set("sidekickQuickSelection", JSON.stringify(Object.keys(this.sidekickQuickSelectionSet).filter((name: string) => this.sidekickQuickSelectionSet[name] === true).join(";")), this.COOKIE_EXPIRE_DAYS);
  }

  public loadSidekickQuickSelectionFromCookie() {
    const sidekickQuickSelectionSet = this.cookieService.get("sidekickQuickSelection");
    if (sidekickQuickSelectionSet) {
      const selectedSidekickNames: string[] = JSON.parse(sidekickQuickSelectionSet).split(";");
      for (const name of selectedSidekickNames) {
        this.sidekickQuickSelectionSet[name] = true;
        const sidekick = this.allSidekicks.find((sidekick: Sidekick) => sidekick.name === name);
        if (sidekick) sidekick.selected = true;
      }
    }
  }

  setQuickSelectionVal(sidekick: Sidekick, selected: boolean) {
    this.sidekickQuickSelectionSet[sidekick.name] = selected;
  }

  /**
   * After un-selecting a sidekick, this method chooses a random sidekick from the quick selection or
   * set the value to null.
   */
  choseNewSelectedSidekick() {
    const randomSidekick = this.getRandomSidekickFromQuickSelectionSet();
    if (randomSidekick) {
      this.setSelectedSidekick(randomSidekick);
    } else {
      this.setSelectedSidekick(null);
    }
  }

  isInQuickSelect(sidekickName: string) {
    return this.getAllSidekicksInQuickSelectionSet().findIndex(sidekick => sidekick.name === sidekickName) !== -1;
  }
}
