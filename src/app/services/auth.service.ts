import { Injectable } from "@angular/core";
import { LoginUser } from "../models/loginUser";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { RegisterUser } from "../models/registerUser";
import { UpdateUser } from "../models/updateUser";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }

  path = "http://localhost:61061/api/auth/";
  pathUser = "http://localhost:61061/api/users/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.success("Sisteme Giriş Yapıldı.");
        this.router.navigateByUrl("/city");
      });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "register", registerUser, {
        headers: headers
      })
      .subscribe(data => { });
    this.alertifyService.success("Başarılı bir şekilde kayıt gerçekleştirildi.");
    this.router.navigateByUrl("/city");
  }

  registerUpdate(updateUser: UpdateUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.pathUser + "update", updateUser, {
        headers: headers
      })
      .subscribe(data => {
        if (data == true) {
          this.alertifyService.success("Başarılı bir şekilde güncelleme gerçekleştirildi.");
          this.router.navigateByUrl("/city");
        }
      });
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Sistemden çıkış yapıldı");
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }

  getUserById(userId): Observable<RegisterUser> {
    return this.httpClient.get<RegisterUser>(this.pathUser + "detail/?id=" + userId);
  }
}
