import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { DealRepository } from '../api/deal/deal-repository.service';
import { Deal } from '../api/deal/deal';
import { UserRepository } from '../api/user/user-repository.service';
import { User, Date } from '../api/user/user';

@Component({
  moduleId: module.id,
  selector: 'vendor',
  templateUrl: 'vendor-interface.component.html',
  styleUrls: [ 'vendor-interface.component.css' ]
})

export class VendorInterfaceComponent { 
    deal = new Deal;
    deals:Deal[];
    mode:string; //month,week,day
    food:boolean;
    drinks:boolean;
    foodAndDrinks:boolean;
    dealMode:string;//food or drink for deals
    days:string[];
    days3:string[];
    times:string[];
    dealTypes:string[];
    typeNotChosen:boolean;
    startDate:string;
    startTime: string;
    endDate:string;
    endTime:string;
    start:string;
    end:string;
    startPrice = new Number;
    endPrice = new Number;
    mon:boolean;
    tue:boolean;
    wed:boolean;
    thur:boolean;
    fri:boolean;
    sat:boolean;
    sun: boolean;
    days2 = new Array<boolean>();
    repeat = new String;
    vendorDeals:Deal[];
    repeating:string;
    createOrEdit:string;
    editId:number;

    constructor(private router: Router, private route:ActivatedRoute, private dealsService:DealRepository,
            private userService:UserRepository){
        this.food = this.drinks = this.foodAndDrinks = false;
        this.repeating = '';
        this.mode = 'month';
        this.days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        this.days3 = ['Sundays', 'Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays'];
        dealsService.listAll()
			.then(x => this.deals = x);
        this.mon = this.tue = this.wed = this.thur = this.fri = this.sat = this.sun = false;
        this.days2.push(this.sun,this.mon,this.tue,this.wed,this.thur,this.fri,this.sat);
        for (let day of this.days2){
            if (day)
                this.repeat = this.repeat.concat("1");
            else this.repeat = this.repeat.concat("0");
        }
        var body = {"isVendor":true};
        dealsService.find(body).then(x => this.vendorDeals = x);
    }

    deleteDeal(id:number){
        this.dealsService.deleteDeal(id)
                .then( () => alert('Deal has been deleted.'));
            
        var body = {"isVendor":true};
        this.dealsService.find(body).then(x => this.vendorDeals = x);
    }

    updateDeal(id:number){ //identify deal for when updating it
        this.dealsService.getDeal(id)
			.then(x => this.deal = x)
			.catch(x => console.log(x.message));
        this.editId = id;
        this.createOrEdit = "edit";
        this.typeNotChosen = null;
        this.food = this.drinks = this.foodAndDrinks = false;
        this.startDate = this.endDate = this.startTime = this.endTime = '';
    }

    identifyDeal(id: number){
		this.dealsService.getDeal(id)
			.then(x => this.deal = x)
			.catch(x => console.log(x.message));
	}

    clickDay(index:number){
        this.days2[index] = !this.days2[index];

        this.repeat = '';
        for (let day of this.days2){
            if (day)
                this.repeat = this.repeat.concat("1");
            else this.repeat = this.repeat.concat("0");
        }

    }

	updateMode(dealType:string){ // this mode refers to food or drink
		this.food = dealType == 'food';
		this.drinks = dealType == 'drinks';
		this.foodAndDrinks = dealType == 'foodAndDrinks';
	}

    resetTypeNotChosen(){
        this.deal = new Deal;
        this.createOrEdit = 'create';
        this.typeNotChosen = null;
        this.food = this.drinks = this.foodAndDrinks = false;
        this.startDate = this.endDate = this.startTime = this.endTime = '';
    }

    addDeal(){
        if (!this.food && !this.drinks && !this.foodAndDrinks){ //when neither 'food' nor 'drink' selected
            this.typeNotChosen = true; 
        } else {
            for (var i = 0; i < this.repeat.length; i++){ //repeating days based on bits of repeat
                if (this.repeat[i] == '1')
                    this.repeating = this.repeating.concat(this.days3[i],'/');
            }
            this.typeNotChosen = false;
            this.start = this.startDate.concat(' ',this.startTime);
            this.end = this.endDate.concat(' ',this.endTime);
            this.deal.repeat = this.repeating;
            this.deal.start = this.start;
            this.deal.end = this.end;

            var active;
            if(this.food)
                active = 'Food';
            else if(this.drinks)
                active = 'Drinks';
            else if(this.foodAndDrinks)
                active = 'Food+Drinks';
            this.deal.dType = active;
            
            if (this.createOrEdit == 'create'){
                this.dealsService.add2(this.deal).then((x) => {
                    //reset modal form values afterwards
                    this.deal = new Deal;
                    this.startPrice = this.endPrice = 0;
                    this.startDate = this.endDate = this.endTime = this.startTime = '';
                    this.food = this.drinks = this.foodAndDrinks = false;
                    this.repeating = '';
                });
            } else {
                this.dealsService.update(this.deal,this.editId).then((x) => {
                    this.repeating = '';
                });
            }

            var body = {"isVendor":true};
            this.dealsService.find(body).then(x => this.vendorDeals = x);

        }
    }

    logout(){
		this.food = this.drinks = this.foodAndDrinks = false;
		this.deals = new Array<Deal>();
        this.vendorDeals = new Array<Deal>();
		this.deal = new Deal;
        this.userService.logout();
	}

    getUserName(){
		return this.userService.getUser().name;
	}

	getUserEmail(){
		return this.userService.getUser().email;
	}
}