import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "./admin-service/admin.service";

@Component({
  selector: "app-admin-module",
  templateUrl: "./admin-module.page.html",
  styleUrls: ["./admin-module.page.scss"],
})
export class AdminModulePage implements OnInit {
  titulo: string = "Módulo de Administrador";
  href: string = "/menu";
  idadmin: number
  name_admin: string = ''
  public appPages = [
    {
      title: "APIS",
      url: "/admin-module/api-key-screen",
      icon: "cloud",
      description: "Aquí puedes cambiar las credenciales de las APIS de NS.",
    },
    {
      title: "BASES DE DATOS",
      url: "/admin-module/database-view",
      icon: "server",
      description:
        "Cambiar credenciales y/o conexiones con las diferentes bases de datos.",
    },
    {
      title: "CORREO",
      url: "/admin-module/correo",
      icon: "mail",
      description: "Cambia la plantilla de correos electrónicos.",
    },
    {
      title: "IMÁGENES",
      url: "/admin-module/storage",
      icon: "image",
      description: "Cambia las imágenes presentadas en el aplicativo",
    },
    {
      title: "NOTIFICACIONES",
      url: "/admin-module/notification-events",
      icon: "notifications",
      description: "Visualiza los ultimos datos registrados en NS.",
    },
    {
      title: "SENSORES",
      url: "/admin-module/sensor",
      icon: "hardware-chip-sharp",
      description:
        "Poder ver qué sensores están en uso y cuáles presentan error.",
    },
    {
      title: "SERVIDOR SMTP",
      url: "/admin-module/smtp-screen",
      icon: "options",
      description:
        "Configura las credenciales del servidor de correos electrónicos.",
    },
    {
      title: "USUARIOS",
      url: "/admin-module/user",
      icon: "people",
      description: "Gestiona y modifica los permisos de Navega Seguro.",
    },
  ];
  

  constructor(
    private route: Router,
    private service: AdminService
  ) {}

  ngOnInit() {
    if(localStorage.getItem('id_user')){
      this.setNameAdmin()
    }
  }

  setNameAdmin(){
     this.service.getuserAdmin(localStorage.getItem('id_user')).subscribe(res => {
      this.name_admin = res[0].nombre
     })
  }

  exitAdmin(){
    localStorage.removeItem("admin");
    this.route.navigate(['menu']).then(() => {
      window.location.reload();
    });
  }
}
