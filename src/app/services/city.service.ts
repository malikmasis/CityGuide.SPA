import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { City } from "../models/city";
import { Observable } from "rxjs";
import { Photo } from "../models/Photo";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(environment.apiUrl + "cities");
  }

  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(environment.apiUrl + "cities/detail/?id=" + cityId);
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      environment.apiUrl + "cities/photos/?cityId=" + cityId
    );
  }

  add(city: City) {
    this.httpClient.post(environment.apiUrl + "cities/add", city).subscribe(data => {
      this.alertifyService.success("Şehir Başarıyla Eklendi");
      this.router.navigateByUrl("/cityDetail/" + data["id"]);
    });
  }

  update(city: City) {
    this.httpClient.post(environment.apiUrl + "cities/update", city).subscribe(data => {
      this.alertifyService.success("Şehir Başarıyla Güncellendi");
      this.router.navigateByUrl("/cityDetail/" + data["id"]);
    });
  }

  deleteCityById(cityId) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    return new Promise(resolve => {
      this.httpClient
        .post(environment.apiUrl + "cities/delete/?id=" + cityId, { headers: headers })
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
