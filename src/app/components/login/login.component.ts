import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
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
    private toastrService: ToastrService
  ) {}

  login(){
      if(this.loginForm.valid){
          let loginModel = Object.assign({},this.loginForm.value);

          this.authService.login(loginModel).subscribe(response=>{
              this.toastrService.success(response.message);
              localStorage.setItem("token",response.data.token);
              this.goToPanelPage();
          },
          responseError=>{
              this.toastrService.error(responseError.error.message);
          });
      }
  }

  createLoginForm(){
      this.loginForm = this.formBuilder.group({
          email:["",[Validators.required,Validators.email]],
          //TODO password minlength need to be arranged
          password:["",Validators.required]
      });
  }

  goToPanelPage(){
    window.location.href = 'panel';
  }

  goToRegisterPage(){
    window.location.href = 'register';
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

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
