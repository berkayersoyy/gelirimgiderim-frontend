import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data: Date = new Date();
  focus: any;
  focus1: any;
  loginForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  login(){
      if(this.loginForm.valid){
          let loginModel = Object.assign({},this.loginForm.value);

          this.authService.login(loginModel).subscribe(response=>{
              this.toastrService.success(response.message);
              localStorage.setItem("token",response.data.token);
              this.router.navigate(['/panel']);
          },
          responseError=>{
            this.toastrService.error(responseError)
          });
      }
  }
  //TODO check login page logos

  createLoginForm(){
      this.loginForm = this.formBuilder.group({
          email:["",[Validators.required,Validators.email]],
          //TODO password minlength need to be arranged
          password:["",Validators.required]
      });
  }

  ngOnInit() :void{
    this.createLoginForm();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

 
  }

}
