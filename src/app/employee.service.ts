import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Employee } from '../app/model/employee';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private afs: AngularFirestore) {
  }
addEmployee(employee:Employee){
return this.afs.collection('/Employees').add(employee)
}

getAllEmployees(){
return this.afs.collection('/Employees').snapshotChanges();
}

deleteEmployee(employee:Employee){
return this.afs.doc('/Employees/'+employee).delete()
}

updateEmployee(employee:Employee){
this.deleteEmployee(employee)
this.addEmployee(employee)
}


getEmployeeById(employeeId: string): Observable<any> {
return this.afs.doc(employeeId).valueChanges();
}
}
