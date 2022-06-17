import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  forms: FormGroup;
  error = false ;
  username: string;
  password: string;
  constructor(private formBuilder: FormBuilder, private route: Router, public api: ServiceService) { }

  ngOnInit() {

    this.forms = this.formBuilder.group({ 
      login:new FormControl(null),
      password: new FormControl(null),

    });
  }

  Login() {
    console.log(this.forms.value); //Afficher sur le console les variables du formulaire

    const username = this.forms.get('login').value ;  //recuperer les champs
    const pwd = this.forms.get('password').value ;

    localStorage.setItem("login" , username); //Mettre les champs dans localStorage pour recuperer anytime
    localStorage.setItem("password" , pwd);

    this.api.getListeProcess(username , pwd).subscribe(data => { //Sert à afficher la liste des process 

      this.route.navigate(['/home']); //Go to home (sucess)
  },
   error => {
      this.error = true ; //Disable error
      this.route.navigate(['/login']); 
      
  }
  );
  
  }

}
