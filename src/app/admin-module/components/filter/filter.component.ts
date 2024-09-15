import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.scss']
})
export class FilterComponent implements OnInit {
  dataModal: any
  href: string = "/admin-module/user"
  myForm: FormGroup; 
  filterData: any = {
    nombre_user: "",
    mail_user: ""
  };
  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private fb: FormBuilder,

  ) {
    this.createForm()
  }

  ngOnInit(){

    this.dataModal = this.navParams.data
  }

  createForm(){
    this.myForm = this.fb.group({
      nombre_user: ['',],
      mail_user: ['',],
    });
  }

  filter(form: any){
    this.modal.dismiss(form.form.value)
  }

  cerrarModal() {
    this.modal.dismiss();
  }


}