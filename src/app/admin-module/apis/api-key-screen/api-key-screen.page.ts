import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminService } from "../../admin-service/admin.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-api-key-screen",
  templateUrl: "./api-key-screen.page.html",
  styleUrls: ["./api-key-screen.page.scss"],
})
export class ApiKeyScreenPage implements OnInit {
  titulo: string = 'Apis'
  href: string = '/admin-module'
  apiKeys: any = [];
  isLoading: boolean = false

  constructor(private http: HttpClient, private adminService: AdminService, 
    private snack: ToastController
    ) {}

  ngOnInit() {
    this.loadApiKeyList();
  }

  ionViewWillEnter() {
    this.loadApiKeyList();
  }

  loadApiKeyList() {
    this.isLoading = true
    this.adminService.getApisKeys().subscribe(
      (res) => {
        this.apiKeys = res;
        this.isLoading = false
      },
      async err => {
        this.isLoading = false
        const toast = await this.snack.create({
          message: err.message,
          duration: 5000,
          cssClass: 'color-toast-danger'
        });
        toast.present();
      }

    );
  }
}
