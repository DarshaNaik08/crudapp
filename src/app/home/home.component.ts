import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/employee';
import { MatDialog } from '@angular/material/dialog';
import { EmpEditComponent } from '../emp-edit/emp-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private employeeservice: EmployeeService, private dialog: MatDialog) { }
  employeeList: Employee[] = [];
  employeeColumns: string[] = ['empId', 'Name', 'email', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {

    this.getAllEmployees();

  }

  getAllEmployees() {
    this.employeeservice.getAllEmployees().subscribe(
      (response: any) => {

        const employeeDataArray = response.map((e: any) => {

          const data = e.payload.doc.data();

          data.id = e.payload.doc.id;

          return data;
        });

        this.dataSource = new MatTableDataSource(employeeDataArray);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.error('error while fetching records');
      }
    );
  }



  updateEmployee(employee: Employee): void {
    // this.employeeservice.deleteEmployee(employee);
    this.employeeservice.addEmployee(employee);
  }

  deleteEmployee(employee: any) {
    this.employeeservice.deleteEmployee(employee).then(() => {
      alert('Employee deleted successfully!');
    })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });

  }


  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmpEditComponent, {
      width: "50%",

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }

  public openDialog() {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: "50%",

    });
  }

}
