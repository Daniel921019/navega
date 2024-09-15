import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ToastController } from "@ionic/angular";
import { AdminService } from "../../admin-service/admin.service";

@Component({
  selector: "app-storage",
  templateUrl: "./storage.page.html",
  styleUrls: ["./storage.page.scss"],
})
export class StoragePage implements OnInit {
  titulo: string = "Imágenes";
  href: string = "/admin-module";
  profile: any;
  selectedFile: File = null;
  images: any
  newImagenList: any[] = [];
  isLoading: boolean = false
  selectedImage: any;

  constructor(
    private actionSeet: ActionSheetController,
    private adminService: AdminService,
    private snack: ToastController

  ) {}

  ngOnInit() {
    this.loadImagesList();
  }

  loadImagesList() {
    this.isLoading = true
    this.adminService
    .getAllImages().subscribe(
      async res => {
        this.images = res;
        this.isLoading = false
      },
      async err => {
        this.isLoading = false
        const toast = await this.snack.create({
          message: err.message,
          duration: 5000,
          color: 'primary'
        });
        toast.present();
      }
    );
  }

  onFileSelected(id: number, nombre_imagen: string, event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const selectedImage = e.target.result;
      const index = this.newImagenList.findIndex(item => item.id === id);
      if (index >= 0) {
        this.newImagenList[index].selectedFile = file;
        this.newImagenList[index].selectedImage = selectedImage;
      } else {
        this.newImagenList.push({
          id,
          selectedFile: file,
          selectedImage,
          nombre_imagen
        });
      }
    };
    reader.readAsDataURL(file);
  }

  isImageSelected(id: number): boolean {
    return this.newImagenList.some(item => item.id === id && item.selectedImage);
  }
  
  getImagePreview(id: number): string {
    const image = this.newImagenList.find(item => item.id === id && item.selectedImage);
    return image ? image.selectedImage : '';
  }
  
  onUpdateImage(id: number) {
    const newImagen = this.newImagenList.find(item => item.id === id);
    if (!newImagen) {
      console.log('No se ha seleccionado una nueva imagen para este item');
      this.generateNotificacionUser(
        "close-circle",
        'No se ha seleccionado una nueva imagen para este item',
        "error"
      );
      return;
    }
    this.selectImageOptions(newImagen, id)
  }
  
  public async selectImageOptions(newImagen, id: Number) {
    this.isLoading = true
    const actionSheet = await this.actionSeet.create({
      header: 'Cargar Nueva Imagen',
      buttons: [{
        text: 'Guardar',
        icon: 'images-outline',
        handler: () => {
          this.updateImage(newImagen, id);
          this.loadImagesList();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
         }
      }]
    });
    await actionSheet.present();
  }


  updateImage(newImagen, id) {
    this.adminService.updateImage(newImagen).subscribe(
      async res => {
        if(res){
          this.isLoading = false
          this.loadImagesList()
          this.generateNotificacionUser(
            "close-circle",
            'Se ha realizado la actualización exitosamente',
            "success"
          );
        }
        this.newImagenList = this.newImagenList.filter(objeto => objeto.id !== id);
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


  async generateNotificacionUser(
    icon: string,
    message: string,
    type: string
  ) {
    const toast = await this.snack.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "bottom",
      duration: 5000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
  }


}
