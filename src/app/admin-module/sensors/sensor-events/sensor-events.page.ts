import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin-service/admin.service";

@Component({
  selector: "app-sensores",
  templateUrl: "./sensor-events.page.html",
  styleUrls: ["./sensor-events.page.scss"],
})
export class SensorEvents implements OnInit {
  titulo: string = 'Evento de Sensores'
  href: string = '/admin-module'
  dataSensor: any = [];
  isLoading: boolean = false



  endpointsData: any = []
  constructor(
    private adminService: AdminService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getSensorEvent().subscribe(
      (res)  => {
        this.dataSensor = res
        console.log(res)
      }
    );
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
