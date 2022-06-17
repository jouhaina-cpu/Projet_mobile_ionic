import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceService } from '../Service/service.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})

export class FormPage implements OnInit {
  Control: FormControl;
  var: string = '';
  form: any;
  di: { key: string; };
  form2: any;
  list2: string[] = []; login: string;
  pwd: string;

  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }
  id: any;
  public list: string[] = [];
  forms: FormGroup;
  array: any[] = []
  dict = {};
  fname:string;
  lname:string;

  constructor(private route: ActivatedRoute, private router: Router, public api: ServiceService, private formBuilder: FormBuilder, public toastController: ToastController) {

  }
  ngOnInit() {
    this.login = localStorage.getItem('login'); //Recuper les champs login & password
    const pwd = localStorage.getItem('password');
    
    this.api.getInformation(this.login, pwd).subscribe(res => { //get les informations lié à login et pwd
      this.fname = res['firstName'];
      this.lname = res['lastName'];
    })

    
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.login = localStorage.getItem('login');
    this.pwd = localStorage.getItem('password');
    this.test();
    this.api.getAttributs(this.id, this.login, this.pwd).subscribe(result => {
      this.form = result;
      console.log(this.form)
      for (let key in result) {
        this.list.push(key);

        for (let i = 0; i < this.list.length; i++) {
          this.var = this.var + this.list[i] + ' ' + ':' + "' '" + ',';
        }

        if (result[key].type == "String") {
          result[key].type = "text";
        }
        else if (result[key].type == "int") {
          result[key].type = "number";
        }
        else if (result[key].type == "Boolean") {
          result[key].type = "checkbox";
        }
      }
    },
      error => {
        this.router.navigate(['/login']);
      });
  }



  test() {
    this.forms = this.formBuilder.group({

    });
    const login = localStorage.getItem('login');
    const pwd = localStorage.getItem('password');
    this.api.getAttributs(this.id, login, pwd).subscribe(result => {
      this.form = result;
      for (let key in result) {
        this.list.push(key);
      }
      for (let i = 0; i < this.list.length; i++) {
        console.log(this.list[i])
        this.di = { key: this.list[i] }
        this.array.push(this.di);
      }
      let form = {}
      for (let i = 0; i < this.array.length; i++) {
        form[this.array[i].key] = new FormControl('')
      }
      console.log(form);

      this.forms = new FormGroup(form);

      console.log(this.forms);
    })
  }



  OnCreate() {
    console.log(this.forms.value);

    for (let i = 0; i < this.list.length; i++) {
      this.dict[this.list[i]] = { value: "" }
    }

    for (const field in this.forms.controls) {
      this.dict[field] = { value: this.forms.controls[field].value }

    }


    const bodyReq = { variables: this.dict }
    console.log(bodyReq);
    const login = localStorage.getItem('login');
    const pwd = localStorage.getItem('password');
    this.api.SendForm(this.id, login, pwd, bodyReq).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'your application is submitted',
        position: 'bottom',
        color: 'success',
      });
      toast.present();
      await this.sleep(1000);

      console.log(res);
      window.location.href='/process'

    },
      error => {
        console.log(error);
        this.router.navigate(['/form']);
      })
  }
  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

}



