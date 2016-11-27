import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Company } from './models/company';
import { Owner } from './models/owner';
import { CompanyResume } from './models/companyresume';

@Injectable()
export class CompanyService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private companyUrl = 'http://localhost:8080/api/v1/';  // URL to web api

  constructor(private http: Http) { }

  getCompanies(): Promise<Company[]> {
    return this.http.get(this.companyUrl + 'resume')
               .toPromise()
               .then(response => response.json() as CompanyResume[])
               .catch(this.handleError);
  }

  getCompany(id: number): Promise<Company> {
    return this.http.get(this.companyUrl + 'company/' + id)
               .toPromise()
               .then(response => response.json() as Company[])
               .catch(this.handleError);
  }

  create(company: Company): Promise<Company> {
    return this.http
      .post(this.companyUrl + 'company', JSON.stringify(company), {headers: this.headers})
      .toPromise()
      .then(res => company)
      .catch(this.handleError);
  }

  update(company: Company): Promise<Company> {
    return this.http
      .put(this.companyUrl + 'company', JSON.stringify(company), {headers: this.headers})
      .toPromise()
      .then(() => company)
      .catch(this.handleError);
  }

  getAvailableOwners(id: number): Promise<Owner[]> {
    return this.http.get(this.companyUrl + 'available/' + id)
               .toPromise()
               .then(response => response.json() as Owner[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}