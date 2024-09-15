import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.page.html',
  styleUrls: ['./database-view.page.scss'],
})
export class DatabaseViewPage implements OnInit {

  dataBases: any
  titulo: string = 'Bases de datos'
  href: string = '/admin-module'
  isLoading: boolean = false

  constructor(
    private adminService: AdminService,
    private snack: ToastController

  ) { }

  ngOnInit() {
    this.loadDataBaseList();
  }

  ionViewWillEnter() {
    this.loadDataBaseList();
  }

  loadDataBaseList() {
    this.isLoading = true
    this.adminService
    .getAllDataBases().subscribe(
      (res) => {
        this.dataBases = res;
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
