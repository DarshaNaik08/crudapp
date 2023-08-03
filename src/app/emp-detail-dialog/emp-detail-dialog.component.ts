import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})
export class EmpDetailDialogComponent implements OnInit {
  empForm!: FormGroup;
  constructor(private fb:FormBuilder, private employeeservice:EmployeeService, private dialogRef: MatDialogRef<EmpDetailDialogComponent>) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({

      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get Name() {
    return this.empForm.get('Name') as FormControl;
  }

  get email() {
    return this.empForm.get('email') as FormControl;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.empForm.controls[controlName].hasError(errorName);
  }

  addEmployee() {
   
      this.employeeservice.addEmployee(this.empForm.value);
   
      this.empForm.reset()

      this.dialogRef.close();
    
  }
  cancel(){
    
    this.dialogRef.close();
  }
}
