import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-smart-analysis',
  templateUrl: './smart-analysis.page.html',
  styleUrls: ['./smart-analysis.page.scss'],
})
export class SmartAnalysisPage implements OnInit {
  locationCustomNameStation: String;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.locationCustomNameStation = this.activatedRoute.snapshot.paramMap.get('locationCustomNameStation');
  }

}
