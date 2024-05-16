import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/confirmed.validator';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data:any;

  registerForm: FormGroup = new FormGroup({}); // registerForm: FormGroup | null = null; // registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.dataService.registerUser(this.registerForm.value).subscribe(res => {
      this.data = res;
      // console.log(res);
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
      else {
        this.toastr.error(JSON.stringify(this.data.status),JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        })
      }
    });
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required], // null or '' both same and can use whatever u like
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f(){
    return this.registerForm.controls;
  }


}
