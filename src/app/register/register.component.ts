import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  registerForm: FormGroup;
  registerUser: any = {};
  loginUser: any = {};

  ngOnInit() {
    this.createRegisterForm();
    this.authService.login(this.loginUser);
    let userId = this.authService.getCurrentUserId();
    if (userId != null && userId != undefined) {
      this.authService.getUserById(userId).subscribe(data => {
        this.loginUser = data;
        this.registerForm.get('userName').setValue(data.userName);
        console.log(data.userName + "--")
        //this.registerForm.get('userName').setValue(data.name);
      });
    }
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  register() {
    let userId = this.authService.getCurrentUserId();
    console.log(userId + "--");

    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);

      if (userId == null || userId == undefined) {
        this.authService.register(this.registerUser);
      } else {
        this.authService.registerUpdate(this.registerUser);
      }

    }
  }
}