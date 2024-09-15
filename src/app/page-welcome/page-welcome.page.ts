import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ImagesService } from "../rest_api/service/images.service";
import { AuthServiceService } from "../rest_api/service/auth-service.service";
import { NavController } from "@ionic/angular";


@Component({
  selector: "app-page-welcome",
  templateUrl: "./page-welcome.page.html",
  styleUrls: ["./page-welcome.page.scss"],
})

export class PageWelcomePage implements OnInit {
  imagenUrl = "";

  constructor(
    private router: Router,
    private imageService: ImagesService,
    private authService: AuthServiceService,
    private navController: NavController
  ) {
  }

  async ngOnInit() {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['menu'], { replaceUrl: true });
    }  
    const imageId = 1;
    this.imageService.getImage(imageId).subscribe(
      (result: any) => {
        this.imagenUrl = result.url_imagen;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
