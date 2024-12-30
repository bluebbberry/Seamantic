export class Sidekick {
  public name: string;
  public displayText: string;
  public description: string;
  public imagePath: string;
  public selected: boolean = false;

  constructor(name: string, displayText: string, description: string, imagePath: string) {
    this.name = name;
    this.displayText = displayText;
    this.description = description;
    this.imagePath = imagePath;
  }
}
