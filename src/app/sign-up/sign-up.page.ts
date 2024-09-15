import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { SchoolGradeService } from '../rest_api/service/school-grade.service';
import { CategoryUserService } from '../rest_api/service/category-user.service';
import { UserService } from '../rest_api/service/user.service';
import { ModalController } from '@ionic/angular';
import { TermConditionsPage } from '../term-conditions/term-conditions.page';
import { Storage } from '@ionic/storage-angular';
//Control de Formularios Jose Pinto - 29 de marzo 2022
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  schoolGrades: any = []
  categoryUsers: any = []
  public registerForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = "eye";

  showPasswordTwo = false;
  passwordToggleIconTwo = "eye";

  constructor(
    private route: Router,
    private schoolGradeService: SchoolGradeService,
    private categoryUserService: CategoryUserService,
    private userService: UserService,
    public toastController: ToastController,
    public modalController: ModalController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private navController: NavController
    
  ) {
    this.inicializarFormulario();
   }

   togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  } 

  togglePasswordTwo(): void {
    this.showPasswordTwo = !this.showPasswordTwo;
    if (this.passwordToggleIconTwo == "eye") {
      this.passwordToggleIconTwo = "eye-off";
    } else {
      this.passwordToggleIconTwo = "eye";
    }
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

  acceptTermConditions(event : any) {
    if (event.target.checked) {
      this.presentModalTermConditions(event);
    }
  }

  async presentModalTermConditions(event : any) {
    const modal = await this.modalController.create({
      component: TermConditionsPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    event.target.checked = data["accept"];
  }


  inicializarFormulario() {
    this.registerForm = this.formBuilder.group({
      'email':[null, Validators.compose([Validators.required, Validators.email])],
      'first_name':[null, Validators.compose([Validators.required])],
      'last_name':[null, Validators.compose([Validators.required])],
      'password':[null, Validators.compose([Validators.required])]
    });
  }


  registerUser(email, first_name, last_name, school_grade, category_user, password, confirm_password, accept_term_conditions) {
    //let er = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let er = /([a-z])/;

    if (accept_term_conditions.checked != false) {
      if (password.value.match(er)) {
        if (password.value == confirm_password.value) {
          if (email.value != "" && first_name.value != "" && last_name.value != "" && school_grade.value != "" && category_user.value != "" && password.value != "" && confirm_password.value != "") {
            this.userService.registerNewUser(email.value, first_name.value, last_name.value, school_grade.value, category_user.value, password.value, confirm_password.value, accept_term_conditions.checked).subscribe(
              async (res) => {
                console.log('respuesta ->', res);
                if (res.body['code'] in  [1, 2]) {
                  this.generateNotificacionUser("information-circle", " Registrado con exito nuevo usuario!", "success", true);
                  this.navController.pop();
                  //this.userService.updateUserType(email.value, "a").subscribe();
                } else if (res.body['code'] == 3) {
                  this.generateNotificacionUser("warning", "¡Este usuario ya se ha registrado!", "warning", false);
                } else {
                  this.generateNotificacionUser("close-circle", " ¡Por favor, inténtalo de nuevo!", "error", false);
                }
                
              },
              (err) => {
                this.generateNotificacionUser("close-circle", " ¡Comprueba tu conexión a Internet!", "error", false);
              }
            );
          } else {
            this.generateNotificacionUser("warning", " ¡Aún falta información!", "warning", false);
          }
        } else {
          this.generateNotificacionUser("warning", "¡Las contraseñas no coinciden!", "warning", false);
        }
      }
      else{
        this.generateNotificacionUser("warning", "la contraseña debe contener solo minusculas", "warning", false);
        //this.generateNotificacionUser("warning", "la contraseña debe contener  8 o más caracteres con una combinación de letras, números y símbolos", "warning", false);
      }
    } else {
      this.generateNotificacionUser("warning", " ¡Debes aceptar nuestros términos y condiciones!", "warning", false);
    }    
  }


  async generateNotificacionUser(icon: string, message: string, type: string, newUser: boolean) {
    const toast = await this.toastController.create({
      message: '<ion-icon name="' + icon + '"></ion-icon>' + message,
      position: 'top',
      duration: 1000,
      mode: "ios",
      cssClass: "toast-custom-class-" + type
    });
    toast.present();
    toast.onDidDismiss().then(
      (val) => {
        if (newUser) {
          this.route.navigate(['/admin-module/user']);
        }
      }
    )
  }
}
