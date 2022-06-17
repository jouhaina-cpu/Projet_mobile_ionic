import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ROOT_URL = 'http://digitalisi.tn:8080/engine-rest';

  constructor(public http: HttpClient) { }
  
  getListeProcess(username, password) { //pour routourner la liste des process.
    const Headers = {
      headers: new HttpHeaders( 
        {
          'Content-Type': 'application/json', 
          'Authorization': `Basic ` + btoa(username+':'+password),  
        }
      )
    };
    return this.http.get(`${this.ROOT_URL}/`+'process-definition?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15', Headers);
  }


  getAttributs(id, username, password) { 
    const Headers = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(username+':'+password),
        }
      )
    };
    return this.http.get(`${this.ROOT_URL}/`+'process-definition/' + id + '/form-variables', Headers);
  }
  
  getTaskAtt(id, username, password) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(username+':'+password),
        }
      )
    };
    return this.http.get(`${this.ROOT_URL}/`+'task/' + id + '/form-variables', httpOptions);
  }

  getInformation(id, password) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(id+':'+password),
        }
      )
    };
    return this.http.get(`${this.ROOT_URL}/`+'user/' + id + '/profile', httpOptions);
  }
  SendForm(id, username, password, body) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(username+':'+password),
        }
      )
    };
    return this.http.post(`${this.ROOT_URL}/`+'process-definition/' + id + '/submit-form', body, httpOptions);
  }
  getTask(username, password) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(username+':'+password),
        }
      )
    }; 
    return this.http.get(`${this.ROOT_URL}/`+'task/', httpOptions);
  }

  Complete(id, username, password, body) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Basic ` + btoa(username+':'+password),
        }
      )
    };
    return this.http.post(`${this.ROOT_URL}/`+'task/' + id + '/complete', body, httpOptions);
  }
  
}

