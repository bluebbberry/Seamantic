import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticFeedComponent } from './semantic-feed.component';

describe('SemanticFeedComponent', () => {
  let component: SemanticFeedComponent;
  let fixture: ComponentFixture<SemanticFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanticFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanticFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
