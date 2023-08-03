import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../model/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {
  empForm!:FormGroup
  selectedEmployee: any;
  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<EmpEditComponent>, private employeeService: EmployeeService) { }

  ngOnInit(): void { this.empForm = this.fb.group({

    Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    email: ['', [Validators.required, Validators.email]],
  });

}

public myError = (controlName: string, errorName: string) => {
  return this.empForm.controls[controlName].hasError(errorName);
}

updateEmployee(employee: Employee): void {
  this.employeeService.deleteEmployee(employee);
  this.employeeService.addEmployee(employee);
}

cancel(){
  this.dialogRef.close();
}
editEmployee(): void {
 this.employeeService.addEmployee(this.empForm.value);
}

}
