import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Skill } from '../../models/skill.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProficiencyLevelsEnums } from '../../enums/proficiency-levels.enums';

@Component({
  selector: 'app-employee-details-skills',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-details-skills.component.html',
  styleUrl: './employee-details-skills.component.scss',
})
export class EmployeeDetailsSkillsComponent {
  @Input() skillsList!: Skill[];
}
