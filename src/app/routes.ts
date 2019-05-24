import { CityComponent } from "./city/city.component";
import { Routes } from "@angular/router";
import { CityDetailComponent } from "./city/city-detail/city-detail.component";
import { CityAddComponent } from "./city/city-add/city-add.component";
import { RegisterComponent } from "./register/register.component";

export const appRoutes: Routes = [
  { path: "city", component: CityComponent },
  { path: "cityAdd", component: CityAddComponent },
  { path: "cityAdd/:cityId", component: CityAddComponent },
  { path: "cityDetail/:cityId", component: CityDetailComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "city", pathMatch: "full" }
];
