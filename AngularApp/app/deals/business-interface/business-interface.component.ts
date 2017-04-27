import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { DealRepository } from '../api/deal-repository.service';

@Component({
  moduleId: module.id,
  selector: 'business',
  templateUrl: 'business-interface.component.html',
  styleUrls: [ 'business-interface.component.css' ]
})

export class BusinessInterfaceComponent { 
    mode:string;
    days:string[];
    times:string[];

    constructor(private router: Router, private route:ActivatedRoute){
        this.mode = 'month';
        this.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        this.times = ['7:00','8:00','9:00','10:00','11:00','Noon'];
    }

    updateMode(newMode:string){
        this.mode = newMode;
    }


}