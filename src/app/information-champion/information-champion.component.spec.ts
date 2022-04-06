import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationChampionComponent } from './information-champion.component';

describe('InformationChampionComponent', () => {
  let component: InformationChampionComponent;
  let fixture: ComponentFixture<InformationChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
