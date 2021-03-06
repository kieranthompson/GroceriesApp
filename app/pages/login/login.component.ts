import { Component } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {
  user: User;
  isLoggedIn = true;

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
    this.user.email = "kieranjsthompson@gmail.com";
    this.user.password = "imawesome123";
  }

  submit() {
    if(this.isLoggedIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
    .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
    );
  }

  signUp() {
    this.userService.register(this.user)
    .subscribe(
      () => {
        alert("your account has been successfully created.");
        this.toggleDisplay();
      },
      () => alert("unfortunately,, we were unable to create your account.")
    );
  }

  toggleDisplay() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}