import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { City } from "../models/city";
import { Observable } from "rxjs";
import { Photo } from "../models/Photo";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}
  path = "http://localhost:61061/api/";

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "cities");
  }

  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(this.path + "cities/detail/?id=" + cityId);
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      this.path + "cities/photos/?cityId=" + cityId
    );
  }

  add(city) {
    this.httpClient.post(this.path + "cities/add", city).subscribe(data => {
      this.alertifyService.success("Şehir Başarıyla Eklendi");
      this.router.navigateByUrl("/cityDetail/" + data["id"]);
    });
  }

  deleteCityById(cityId) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    return new Promise(resolve => {
      this.httpClient
        .post(this.path + "cities/delete/?id=" + cityId, { headers: headers })
        .subscribe(
          res => {
            resolve(res);
            this.alertifyService.success("Şehir Başarıyla Silindi");
          },
          err => {
            resolve(err);
          }
        );
    });
  }
}
