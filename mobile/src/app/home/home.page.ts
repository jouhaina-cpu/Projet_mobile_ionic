import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  fname: string;
  lname: string;
  login: string;

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Welcome to our application.',
      duration: 2000,
      animated : true,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  constructor(public api: ServiceService, private router: Router,public toastController: ToastController,private menu: MenuController) {
    this.presentToast();
   }

  ngOnInit() {
    this.login = localStorage.getItem('login'); //Recuper les chapms 
    const pwd = localStorage.getItem('password');
    
    this.api.getInformation(this.login, pwd).subscribe(res => { //getprofil pour recuper des informations
      this.fname = res['firstName'];
      this.lname = res['lastName'];
    })
    
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

}
