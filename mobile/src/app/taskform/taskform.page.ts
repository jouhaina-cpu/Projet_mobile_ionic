import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceService } from '../Service/service.service';
@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.page.html',
  styleUrls: ['./taskform.page.scss'],
})
export class TaskformPage implements OnInit {

  Control: FormControl;
  var: string = '';
  form: any;
  di: { key: string; };
  form2: any;
  list2: string[] = []; login: string;
  pwd: string;
  valid: boolean = false;
  justificatif: any;
  show1: boolean=false;
  show2: boolean=false;
  ;
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

    this.api.getInformation(this.login, this.pwd).subscribe(res => {
      this.fname = res['firstName'];
      this.lname = res['lastName']; 
    }) // recuper le nom et le prenom

    const ll = { value: "val" }
    const hh = { 'keyname': ll }
    const jj = { variables: hh }
    console.log(jj);
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.test2();
      this.login = localStorage.getItem('login');
      this.pwd = localStorage.getItem('password');
      this.api.getTaskAtt(this.id, this.login, this.pwd).subscribe(result => {
        this.form2 = result;
        if(this.form2['valid'].value == null){
          this.show2 = true ;
        }
        if(this.form2['justificatif'].value == null){
          this.show1 = true ;
        }
        console.log(this.form2)
      },
        error => {
          this.router.navigate(['/login']);
        });


    });
    console.log(this.forms.value);

  }


  test2() {
    this.forms = this.formBuilder.group({
    });
    const login = localStorage.getItem('login');
    const pwd = localStorage.getItem('password');
    console.log(this.id);
    this.api.getTaskAtt(this.id, login, pwd).subscribe(result => {
      this.form2 = result;

      for (let key in result) {
        this.list.push(key);
      }
      for (let i = 0; i < this.list.length; i++) {
        console.log(this.list[i])
        this.di = { key: this.list[i] }
        this.array.push(this.di);
      }
      let form2 = {}
      for (let i = 0; i < this.array.length; i++) {
        form2[this.array[i].key] = new FormControl('')
      }
      this.forms = new FormGroup(form2);
      console.log(this.forms);
    })
  }


    OnCreate() {
    this.api.getTaskAtt(this.id, this.login, this.pwd).subscribe(result => {
      this.form2 = result;
      console.log(this.form2)
    })
    if(this.show2 == true){
    this.form2['valid'].value = this.valid;}
    if(this.show1 == true){    
    this.form2['justificatif'].value = this.justificatif;}
    console.log(this.forms.value);

    for (const field in this.form2) {
      this.dict[field] = { value: this.form2[field].value }

    }

    const bodyReq = { variables: this.dict }
    console.log(bodyReq);
    const login = localStorage.getItem('login');
    const pwd = localStorage.getItem('password');
    this.api.Complete(this.id, login, pwd, bodyReq).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'the task has been completed.',
        animated : true,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
      console.log(res);
      await this.sleep(1000);
      window.location.href = '/tasklist'

    },
      error => {
        console.log(error);
        this.router.navigate(['/taskform']);
      }) 
  }

  
  checkboxClick(e) {
    var statement = true;
    if (statement) {
      e.checked = true;
    }
    if (e.checked == true) {
      this.valid = true;
    }
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
  } //deconnecter
}
