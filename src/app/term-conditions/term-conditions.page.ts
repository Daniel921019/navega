import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.page.html',
  styleUrls: ['./term-conditions.page.scss'],
})
export class TermConditionsPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  acceptTermConditions(decisionValue){
    this.modalController.dismiss({
      accept: decisionValue
    });
  }
}
