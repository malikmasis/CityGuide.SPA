import { Component, OnInit } from "@angular/core";
import { CityService } from "src/app/services/city.service";
import { ActivatedRoute } from "@angular/router";

import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { City } from "src/app/models/city";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-city-add",
  templateUrl: "./city-add.component.html",
  styleUrls: ["./city-add.component.css"]
})
export class CityAddComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  city: City;
  cityAddForm: FormGroup;

  createCityForm() {
    this.cityAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.createCityForm();
    this.activatedRoute.params.subscribe(params => {
      this.cityService.getCityById(params["cityId"]).subscribe(data => {
        this.city = data;
      });
    });
  }

  add(cityId: any) {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value);
      if (cityId == null || cityId == undefined) {
        this.city.userId = this.authService.getCurrentUserId();
        this.cityService.add(this.city);
      } else {
        this.city.id = cityId;
        this.cityService.update(this.city);
      }
    }
  }

  update(cityId: any) {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value);
      this.cityService.update(this.city);
    }
  }
}
