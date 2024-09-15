import { Component } from "@angular/core";
import { ImagesService } from "../rest_api/service/images.service";
import { AuthServiceService } from "../rest_api/service/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tutorial",
  templateUrl: "tutorial.page.html",
  styleUrls: ["tutorial.page.scss"],
})
export class TutorialPage {
  imagenUrlUno = "../../assets/img/convenio.png";
  imagenUrlDos = "../../assets/img/estacion.png";
  imagenUrlTres = "../../assets/img/notificacion.png";
  imagenUrlCuatro = "../../assets/img/boletin.png";
  imagenUrlCinco = "../../assets/img/estadisticas.png";
  email: string;

  slides = [
    {
      imgId: 2,
      imgUrl: " " ,
      imagenUrlDefault: this.imagenUrlUno,
      title: "Main Info",
      text: `La aplicación móvil ‘Navega seguro’ fue desarrollada en el marco del convenio entre el Ministerio
      de Defensa Nacional – Dirección General Marítima y la Universidad Católica de Colombia en conjunto con la 
      Universidad de Texas en Arlington; con el fin de brindar información oportuna sobre el tiempo atmosférico y marítimo presente en diferentes
      puntos del Pacífico, Caribe y áreas insulares de Colombia, y de esta manera proporcionar apoyar la
      toma de decisiones en actividades náuticas y costeras.`,
      style: "visibility:hidden",
    },
    {
      imgId: 3,
      imgUrl: " " ,
      imagenUrlDefault: this.imagenUrlDos,
      text: `En la sección de estaciones automáticas, el usuario tendrá la posibilidad de seleccionar la posición
      geográfica más cercana al lugar en el cual tiene planeado desarrollar la actividad náutica o costera,
      para observar en tiempo cercano al real los últimos registros capturados por la Red de Medición
      de Parámetros Oceanográficos y de Meteorología Marina (RedMpomm) de la Dimar, y acceder a
      avisos del tiempo presente y recomendaciones.`,
      style: "visibility:hidden",
    },
    {
      imgId: 4,
      imgUrl: " " ,
      imagenUrlDefault: this.imagenUrlTres,
      title: "Notification Info",
      text: `Además de mostrar el tiempo atmosférico y marítimo actual para una posición geográfica
      determinada, la aplicación móvil ‘Navega seguro’ le permitirá calificar la información
      proporcionada y de esta manera, retroalimentar a los administradores de los datos para la mejora
      continua del servicio.`,
      style: "visibility:hidden",
    },
    {
      imgId: 5,
      imgUrl: " " ,
      imagenUrlDefault: this.imagenUrlCuatro,
      title: "Newsletter Info",
      text: `En la sección de boletín informativo, el usuario podrá descargar gratuitamente el ‘Boletín
      Meteomarino Mensual´ emitido por los Centros de Investigaciones Oceanográficas e Hidrográficas
      del Pacífico (Cccp) y del Caribe (Cioh), el cual muestra con una periodicidad mensual, los
      resultados de la Operación Estadística (OE) de oceanografía y meteorología marina de la Dimar,
      acreditada en el 2021 por Departamento Administrativo Nacional de Estadística (DANE).`,
      style: "visibility:hidden",
    },
    {
      imgId: 6,
      imgUrl: "" ,
      imagenUrlDefault: this.imagenUrlCinco,
      title: "Newsletter Info",
      text: `Por último, en la sección ‘histórico condiciones meteomarinas’, podrá seleccionar la estación
      automática, la variable de interés y un periodo de fecha de las mediciones, para obtener
      información sobre las condiciones mensuales de vientos, temperatura del aire, humedad relativa,
      presión atmosférica, precipitación y nivel del mar observadas en el último año.`,
      style: "visibility:visible",
    },
  ];

  async ngOnInit() {
    for (const slide of this.slides) {
      const url = await this.getImage(slide.imgId, slide.imagenUrlDefault);
      slide.imgUrl = url;
    }
  }
  
  async getImage(imageId: number, imagenUrlDefault) {
    try {
      const result: any = await this.imageService.getImage(imageId).toPromise();
      return result.url_imagen;
    } catch (error) {
      return imagenUrlDefault;
    }
  }

  continuarMenu() {
    this.router.navigate(['/menu'], { replaceUrl: true });
  }


  constructor(
    private imageService: ImagesService,
    private router: Router
  ) {}
}
