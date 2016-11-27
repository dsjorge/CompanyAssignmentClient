import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Company }             from './models/company';
import { CompanyService }      from './company.service';

@Component({
  moduleId: module.id,
  selector: 'my-companies',
  templateUrl: 'companies.component.html',
  styleUrls: [ 'companies.component.css' ]
})
export class CompaniesComponent implements OnInit {
  companies: Company[];

  constructor(
    private companyService: CompanyService,
    private router: Router) { }

  getCompanies(): void {
    this.companyService
        .getCompanies()
        .then(companies => this.companies = companies);
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  gotoNew(): void{
    this.router.navigate(['/new']); 
  }

  gotoDetail(company: Company): void {
    this.router.navigate(['/detail', company.id]);
  }
}
