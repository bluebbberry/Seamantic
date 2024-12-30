import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSidekickComponent } from './choose-sidekick.component';

describe('ChooseSidekickComponent', () => {
  let component: ChooseSidekickComponent;
  let fixture: ComponentFixture<ChooseSidekickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseSidekickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSidekickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
