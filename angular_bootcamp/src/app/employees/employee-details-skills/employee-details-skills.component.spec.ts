import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsSkillsComponent } from './employee-details-skills.component';

describe('EmployeeDetailsSkillsComponent', () => {
  let component: EmployeeDetailsSkillsComponent;
  let fixture: ComponentFixture<EmployeeDetailsSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsSkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
