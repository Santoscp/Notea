import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public userinfo: User;
  public userdata: any;
  public formRegister: FormGroup | any;
  private isAndroid: boolean;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private rooter: Router) {
      this.formRegister=this.fb.group({
        'gmail': ['', [Validators.required, Validators.email] ],
        'password': ['', Validators.required ],

      })
   


  }
 

  ngOnInit() {
  }


  volver(){
    this.rooter.navigate(['']);
  }

 
  onSubmit() {
    this.userdata = this.saveUserdata();
    this.auth.registerUser(this.userdata)
      .then(data => {
        if (data) {
          this.rooter.navigate(['private/tabs/tab1']);
        }
      })
      .catch(error => {
        console.log(error);
      }
      );
  }


  saveUserdata() {
    const saveUserdata = {
      email: this.formRegister.get('email').value,
      password: this.formRegister.get('password').value,
    };
    return saveUserdata;
  }

}
