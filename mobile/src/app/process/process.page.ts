import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { FormPage } from '../form/form.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {

  public newsData: any;
  firstName: string;
  lastName: string;
  login: string;

  constructor(public api: ServiceService, private router: Router) { }


  ngOnInit() {
    this.login = localStorage.getItem('login'); //recuper login & password
    const pwd = localStorage.getItem('password');
    
    this.api.getInformation(this.login, pwd).subscribe(res => { //get les informations relatives à login & pwd
      this.firstName = res['firstName'];
      this.lastName = res['lastName'];

    })
    this.api.getListeProcess(this.login, pwd).subscribe(result => { //get la liste des process
      console.log(result);
      this.newsData = result;
    },
      error => {
        this.router.navigate(['/login']);
      });

  }

  find(id) {
    this.router.navigate(['/form', id]); 
  }//pour afficher la formulaire relative à process

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  } // Deconnecter

}
