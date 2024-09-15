import { Component, ViewChild, OnInit, Inject} from '@angular/core';
import { AdminService } from 'src/app/admin-module/admin-service/admin.service';
import { Email } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-correo',
  templateUrl: 'correo.page.html',
  styleUrls: ['correo.page.scss']
})
export class CorreoPage implements OnInit {
  emailList: Email[] = [];
  titulo: string = 'Configuración de correo'
  href: string = '/admin-module'

  constructor(
    private adminService: AdminService
  ) { 
  }

  ngOnInit(){
    this.loadEmailList();
  }

  ionViewWillEnter() {
    this.loadEmailList();
  }


  loadEmailList(){
    this.adminService.getAllEmails().subscribe(
      (res) => {
         this.emailList = res;
      }
    )
  }

}
