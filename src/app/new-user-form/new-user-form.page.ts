import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { TermConditionsPage } from "../term-conditions/term-conditions.page";
import { ModalController, NavController, ToastController } from "@ionic/angular";
import { SchoolGradeService } from "../rest_api/service/school-grade.service";
import { CategoryUserService } from "../rest_api/service/category-user.service";
import { UserService } from "../rest_api/service/user.service";
import { Router } from "@angular/router";
import { AuthServiceService } from "../rest_api/service/auth-service.service";


@Component({
  selector: "app-new-user-form",
  templateUrl: "./new-user-form.page.html",
  styleUrls: ["./new-user-form.page.scss"],
})
export class NewUserFormPage implements OnInit {
  schoolGrades: any = [];
  categoryUsers: any = [];
  public registerForm: FormGroup;
  
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private schoolGradeService: SchoolGradeService,
    private categoryUserService: CategoryUserService,
    private userService: UserService,
    public toastController: ToastController,
    private authService: AuthServiceService,
    private navController: NavController
    //private storage: Storage,
  ) {
    this.inicializarFormulario();
  }

  ngOnInit() {
    this.schoolGradeService.getAllSchoolGrade().subscribe(
      (res) => {
        this.schoolGrades = res;
      },
      (err) => console.log(err)
    );
    this.categoryUserService.getAllCategoryUser().subscribe(
      (res) => {
        this.categoryUsers = res;
      },
      (err) => console.log(err)
    );
  }

  acceptTermConditions(event: any) {
    if (event.target.checked) {
      this.presentModalTermConditions(event);
    }
  }

  async presentModalTermConditions(event: any) {
    const modal = await this.modalController.create({
      component: TermConditionsPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    event.target.checked = data["accept"];
  }

  inicializarFormulario() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
    });
  }

  registerUser(
    email,
    first_name,
    last_name,
    school_grade,
    category_user,
    accept_term_conditions
  ) {
    const emailControl = this.registerForm.get('email');
    if (
      !email.value ||
      !first_name.value ||
      !last_name.value ||
      !school_grade.value ||
      !category_user.value
    ) {
      this.generateNotificacionUser(
        "warning",
        " ¡Aún falta información!",
        "warning",
        false
      );
      return;
    }
    if (!emailControl.valid) {
      this.generateNotificacionUser(
        "warning",
        " ¡Ingresa un correo electrónico válido!",
        "warning",
        false
      );
      return;
    }
    if (!accept_term_conditions.checked) {
      this.generateNotificacionUser(
        "warning",
        " ¡Debes aceptar nuestros términos y condiciones!",
        "warning",
        false
      );
      return;
    }
    this.userService
      .registerUser(
        email.value,
        first_name.value,
        last_name.value,
        school_grade.value,
        category_user.value,
        accept_term_conditions.checked
      )
      .subscribe(
        async (res) => {
          if (res.body["code"] in [1, 2]) {
            this.authService.saveEmail(email.value);
            this.generateNotificacionUser(
              "information-circle",
              " Registrado con éxito nuevo usuario!",
              "success",
              true
            );
          } else if (res.body["code"] == 3) {
            this.generateNotificacionUser(
              "warning",
              "¡Este usuario ya se ha registrado!",
              "warning",
              false
            );
          } else {
            this.generateNotificacionUser(
              "close-circle",
              " ¡Por favor, inténtalo de nuevo!",
              "error",
              false
            );
          }
          console.log(res);
        },
        (err) => {
          this.generateNotificacionUser(
            "close-circle",
            " ¡Comprueba tu conexión a Internet!",
            "error",
            false
          );
          console.log(err);
        }
      );
  }

  async generateNotificacionUser(
    icon: string,
    message: string,
    type: string,
    newUser: boolean
  ) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: "top",
      duration: 5000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type,
    });
    toast.present();
    toast.onDidDismiss().then((val) => {
      if (newUser) {
        this.navController.pop();
        this.route.navigate(["/tutorial"]);
      }
    });
  }
}
