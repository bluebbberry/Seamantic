import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerSeLevelComponent } from './lower-se-level.component';

describe('LowerSeLevelComponent', () => {
  let component: LowerSeLevelComponent;
  let fixture: ComponentFixture<LowerSeLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowerSeLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowerSeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
