import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  fname: string;
  lname: string;
  email   :string;
  login: string;

  constructor(public api: ServiceService, private router: Router) { }

  ngOnInit() {
    this.login = localStorage.getItem('login'); //Recuper les champs login & password
    const pwd = localStorage.getItem('password');
    
    this.api.getInformation(this.login, pwd).subscribe(res => { //get les informations lié à login et pwd
      this.fname = res['firstName'];
      this.lname = res['lastName'];
      this.email = res['email']; 
    })
  
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

}
