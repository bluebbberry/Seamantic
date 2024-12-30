import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {StatusesService} from "../services/statuses.service";
import {NgForOf, NgIf} from "@angular/common";
import {SeLevelService} from "../services/se-level.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lower-se-level',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './lower-se-level.component.html',
  styleUrl: './lower-se-level.component.scss'
})
export class LowerSeLevelComponent {
  wikidataForm: FormGroup;
  message: string | null = null;
  private wikiDataBaseUrl: string = "https://www.wikidata.org/w/rest.php/wikibase/v1";

  constructor(private http: HttpClient, private fb: FormBuilder, protected statusesService: StatusesService, protected seLevelService: SeLevelService, private router: Router) {
    this.wikidataForm = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      language: ['en', Validators.required]
    });
  }

  addItemToWikidata() {
    if (this.wikidataForm.valid) {
      this.seLevelService.seLevel--;
      const formData = this.wikidataForm.value;
      const payload = {
        labels: {
          [formData.language]: {
            language: formData.language,
            value: formData.label
          }
        },
        descriptions: {
          [formData.language]: {
            language: formData.language,
            value: formData.description
          }
        }
      };

      this.http.post(this.wikiDataBaseUrl, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          origin: '*'
        }
      }).subscribe(
        () => {
          this.message = 'Item successfully added to Wikidata!';
          this.wikidataForm.reset();
        },
        (error) => {
          console.error(error);
          this.message = 'Failed to add item to Wikidata.';
        }
      );
    }
  }

  clickedOnGoBack() {
    this.router.navigate(['/']);
  }
}
