import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsProjectsComponent } from './employee-details-projects.component';

describe('EmployeeDetailsProjectsComponent', () => {
  let component: EmployeeDetailsProjectsComponent;
  let fixture: ComponentFixture<EmployeeDetailsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
