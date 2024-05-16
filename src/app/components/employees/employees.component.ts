import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeForm: FormGroup | null = null;

  employees:any;

  employee = new Employee();

  constructor(private dataService:DataService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getEmployeesData();

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }


  getEmployeesData() {
    this.dataService.getData().subscribe(res => {
      this.employees = res;
    });
  }


insertData() {
    this.employee.name = this.employeeForm?.get('name')?.value;
    this.employee.email = this.employeeForm?.get('email')?.value;
    this.employee.salary = this.employeeForm?.get('salary')?.value;

    this.dataService.insertData(this.employee).subscribe(res => {
      this.getEmployeesData();
      console.log(res);
    })

    console.log(this.employee);
  }

  deleteData(id: number){
    this.dataService.deleteData(id).subscribe(res => {
      this.getEmployeesData();
    })
    console.log(id);
  }
}

