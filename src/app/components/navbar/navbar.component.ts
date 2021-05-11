import { Component, OnInit, ElementRef } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  user: User;
  dataLoaded=false;

  constructor(
    public location: Location,
    private userService: UserService,
    private authService: AuthService,
    private router:Router,
    private toastrService:ToastrService
  ) {
    this.sidebarVisible = false;
  }
  getCurrentUser() {
    if (this.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (response) => {
          this.user = response.data;
          this.dataLoaded=true;
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } 
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
    this.toastrService.info("Çıkış yaptınız.");
  }

  ngOnInit() {
    this.getCurrentUser();
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '/documentation') {
      return true;
    } else {
      return false;
    }
  }
}
