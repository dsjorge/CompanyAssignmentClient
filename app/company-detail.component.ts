import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Company }        from './models/company';
import { Owner }        from './models/owner';
import { CompanyService } from './company.service';

@Component({
  moduleId: module.id,
  selector: 'my-company-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: [ 'company-detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit, DoCheck {
  //@Input() 
  company: Company;
  owner: Owner;
  availableOwners: Owner[];
  olderId: number = 0 

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngDoCheck() {
    if(this.company !== undefined && this.olderId !== undefined && this.company.id !== this.olderId){
      this.olderId = this.company.id;
      this.companyService.getAvailableOwners(this.company.id)
      .then(owners => this.availableOwners = owners);
    }
  }

  ngOnInit(): void {
      this.route.params
      .switchMap((params: Params) => { 
        if(params['id']){
          return this.companyService.getCompany(+params['id'])
        }
        return Promise.resolve(new Company())
      })
      .subscribe(company => this.company = company);
  }

  save(): void {
    if(this.company.id === undefined){
      this.companyService.create(this.company)
      .then(() => this.goBack());
    }
    else{
      this.companyService.update(this.company)
      .then(() => this.goBack());
    }
  }

  removeOwner(id: number): void{
    var available = this.availableOwners;
    this.company.owners = this.company.owners.filter(function(item){
      if(item['id'] === id) {
        available.push(item);
        return false;
      }
      return true;
    });
  }

  changeAvailableOwners(e: Owner): void{
    var index = this.availableOwners.indexOf(e, 0);
    if (index > -1) {
      this.company.owners = this.company.owners.concat(this.availableOwners.splice(index, 1));
    }
  }

  goBack(): void {
    this.location.back();
  }
}