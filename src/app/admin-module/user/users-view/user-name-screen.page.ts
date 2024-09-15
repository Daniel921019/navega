import { Component, OnInit, ViewChild } from "@angular/core";;
import { AdminService } from "../../admin-service/admin.service";
import { ActionSheetController, IonInfiniteScroll, ToastController } from "@ionic/angular";

@Component({
  selector: "app-user-name-screen",
  templateUrl: "./user-name-screen.page.html",
  styleUrls: ["./user-name-screen.page.scss"],
})
export class UserNameScreen implements OnInit {
  titulo: string = "Usuarios";
  href: string = "/admin-module";
  apiKeys: any = [];
  cantUsers: number = 10;
  offset: number = 0;
  inputsearch: string = "";
  disabledButton = false;
  letter: any = "";

  showFilter = false;
  filterToggleIcon = "filter-circle-outline";

  users: any;
  constructor(
    private actionSeet: ActionSheetController,
    private adminService: AdminService, 
    private snack: ToastController
  ) {}
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
    if (this.filterToggleIcon == "filter-circle-outline") {
      this.filterToggleIcon = "filter-circle";
      this.getAllFilterUsers();
      this.search();
      
    } else {
      this.search();
      this.filterToggleIcon = "filter-circle-outline";
    }
  }

  ngOnInit() {
    this.cantUsers = 10;
    this.offset = 0;
    this.unitial();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  unitial(data?: any) {   
      this.adminService
        .getAllUser(this.cantUsers, this.offset)
        .subscribe((res) => {
          if (this.showFilter) {
            this.users = res.filter((user) => user.id_tipo_usuario === 1);
          } else {
            this.users = res;
          }
        });
    
  }

  loadData(event?: any) {
    setTimeout(() => {
      this.offset = this.offset + 10;
      this.adminService
        .getUsersByletter(this.letter, this.offset, this.cantUsers)
        .subscribe((res) => {
          if (this.showFilter) {
            if (this.offset === 10) {
              this.users.push(
                ...res.filter((user) => user.id_tipo_usuario === 1)
              );
            } else {
              this.users.push(
                ...res.filter((user) => user.id_tipo_usuario === 1)
              );
            }
          } else {
            this.users.push(...res);
          }
          if (res.length < this.cantUsers) {
            this.infiniteScroll.disabled = true;
          }
          if (event) {
            event.target.complete();
          }
        });
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  search(event?: any) {
    if(event){
      this.letter = event.value;
      console.log(this.letter)
    }else{
      console.log(this.letter)
    }
  this.adminService
  .getUsersByletter(this.letter, 0, this.cantUsers)
  .subscribe((res) => {
    if (this.showFilter) {
      this.users = this.users.filter((user) => user.nombre.startsWith(this.letter) || user.correo_electronico.startsWith(this.letter) && user.id_tipo_usuario === 1);
      
    } else {
      this.users = res;
    }
  });
    this.offset = 0;
    this.infiniteScroll.disabled = false;
  }

  public async deleteUserOptions(idUser) {
    const actionSheet = await this.actionSeet.create({
      header: "¿Eliminar este Usuario?",
      buttons: [
        {
          text: "Eliminar",
          icon: "trash-outline",
          handler: () => {
            this.DeleteUser(idUser);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  DeleteUser(idUser) {
    const userIndex = this.users.findIndex(
      (user) => user.id_usuario === idUser
    );
    if (userIndex !== -1) {
      const user = this.users.splice(userIndex, 1)[0];
      this.users.push(user);
    }
    const deletedUser = this.users.pop();
    this.adminService.DeleteUserById(idUser).subscribe(
      (res) => {
        this.generateNotificacionUser(
          "people-circle-outline",
          `Usuario ${deletedUser.nombre + ' ' +deletedUser.apellido} eliminado`,
          "warning"
        );
        console.log(res)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  getAllFilterUsers(){
    this.adminService.getFilterUser('','').subscribe(
      (res) => {
        this.users = res.filter((user) => user.id_tipo_usuario === 1);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async generateNotificacionUser(
    icon: string,
    message: string,
    type: string
  ) {
    const toast = await this.snack.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "bottom",
      duration: 3000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
  }
}
