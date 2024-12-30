import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFeedComponent } from './local-feed.component';

describe('LocalFeedComponent', () => {
  let component: LocalFeedComponent;
  let fixture: ComponentFixture<LocalFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
