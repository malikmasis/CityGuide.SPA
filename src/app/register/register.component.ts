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
  ) {}

  registerForm: FormGroup;
  registerUser: any = {};
  loginUser: any = {};
  
  ngOnInit() {
    this.createRegisterForm();
      this.authService.login(this.loginUser);
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

  register(userId: any) {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);

      if (userId == null || userId == undefined) {
        //this.city.userId = this.authService.getCurrentUserId();
        this.authService.register(this.registerUser);
      } else {
        this.authService.registerUpdate(this.registerUser);
      }
      
    }
  }
}