import { Component } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { GetPreferencesService } from "../rest_api/service/get-preferences.service";

@Component({
  selector: "app-menu",
  templateUrl: "menu.page.html",
  styleUrls: ["menu.page.scss"],
})
export class MenuPage {
  adminValidator = false;

  constructor(private storage: Storage, private PreferenceService: GetPreferencesService, ) {}

  async ngOnInit() {
  }

  ionViewDidEnter() {
    const admin = localStorage.getItem("admin");
    if (admin == "A") {
      this.adminValidator = true;
    } else {
      this.adminValidator = false;
    }
  }

}
