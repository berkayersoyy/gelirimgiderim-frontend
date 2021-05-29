import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  focus1:any;
  focus2:any;
  focus3:any;
  focus4:any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit() :void{
    this.createRegisterForm();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
      //TODO password minlength need to be arranged
      firstName:["",[Validators.required,Validators.minLength(2)]],
      lastName:["",[Validators.required,Validators.minLength(2)]]

    });
  }
  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message);
        localStorage.setItem("token",response.data.token);
        this.router.navigate(['/panel']);
      },responseError=>{
        this.toastrService.error(responseError)
      });
    }
  }

}
