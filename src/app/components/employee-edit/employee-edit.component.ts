import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup | null = null;

  employee = new Employee();

  // constructor(private dataService:DataService, private fb: FormBuilder) { }

  data: any;
  id:any;

  constructor(private route:ActivatedRoute, private dataService:DataService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.getDataById();

  }

  getDataById() {
    this.dataService.getEmployeeById(this.id).subscribe(res => {
      this.data = res;
      // Initialize form controls with data after fetching from the server
      this.employeeForm = this.fb.group({
        name: [this.data.name, Validators.required],
        email: [this.data.email, Validators.required],
        salary: [this.data.salary, Validators.required]
      });
    });
  }

  updateDataByID(){
    // Update the 'employee' object with the form values
    this.employee.name = this.employeeForm?.get('name')?.value;
    this.employee.email = this.employeeForm?.get('email')?.value;
    this.employee.salary = this.employeeForm?.get('salary')?.value;

    // Now 'employee' object contains the updated form values
    this.dataService.updateDataByID(this.id, this.employee).subscribe(res => {
      console.log('update done');
    });
  }


}


