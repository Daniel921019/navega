import { Component,  OnInit } from '@angular/core';
import {  ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/admin-module/admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-correo-form',
  templateUrl: './correo-form.html',
  styleUrls: ['./correo-form.scss']
})
export class CorreoForm implements OnInit {
  isLoading: boolean = false
  titulo: string = 'Formulario de correo'
  href: string = '/admin-module/correo'
  dataCorreo: Email ={
    id_correo: 0,
    asunto: "",
    contenido_html: ""
  }
  idCorreo = 0



  constructor(
    private adminService: AdminService,
    private router: ActivatedRoute,
    private snack: ToastController

  ) {

  }

  ngOnInit() {
    this.loadData()
    console.log('Prueba siglo de vida en formulario...')
  }

  loadData() {
    this.router.paramMap.subscribe((paramMap) => {
      if (paramMap.get("id_correo")) {
        this.adminService
          .getCorreoId(paramMap.get("id_correo"))
          .subscribe((res) => {
            this.dataCorreo = res;
            this.idCorreo = Number(res.id_correo)
          });
      }
    });
  }

  async updateEmail() {
    try {
      this.isLoading = true;
      console.log('Data enviada -->', this.dataCorreo);
      const res = await this.adminService.updateCorreo(this.idCorreo, this.dataCorreo).toPromise();
      console.log(res);
      this.isLoading = false;
      const toast = await this.snack.create({
        message: 'Se ha realizado la actualización exitosamente',
        duration: 5000,
        color: 'primary'
      });
      toast.present();
      this.loadData();
    } catch (err) {
      console.log(err);
      this.isLoading = false;
      const toast = await this.snack.create({
        message: err.message,
        duration: 5000,
        color: 'primary'
      });
      toast.present();
    }
  }

}
