import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {

  public topic: any;
  public info: any;
  firstName: string;
  lastName: string;

  constructor(public api: ServiceService, private router: Router) { }


  ngOnInit() {

    const login = localStorage.getItem('login');
    const pwd = localStorage.getItem('password'); //recuper login & pwd

    this.api.getInformation(login, pwd).subscribe(res => {
      this.firstName = res['firstName'];
      this.lastName = res['lastName']; //recuperer fname & lname
    })

 
    this.api.getTask(login, pwd).subscribe(result => { //afficher la liste des task
      console.log(result);
      this.info = result;
    },
      error => {
        this.router.navigate(['/login']);
      });

  }

  Chercher(id) {
    this.router.navigate(['/taskform', id]);
  } //pour acceder à chaque form

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

}
