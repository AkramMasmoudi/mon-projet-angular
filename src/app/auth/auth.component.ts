import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { User } from './../user';
import { StorageService } from './../services/storage.service';
declare var swal: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus : boolean;
user : User;
  constructor(private authService : AuthService,
              private router: Router,
              private storageService : StorageService) { 
              // this.authStatus = this.storageServicel=='true' ? true : false
              this.authStatus = this.storageService.isExist('user') 
                         }

  ngOnInit() {
    this.user = new User();
  }
onSignIn(){
  let baseContext = this;
  this.authService.signIn(this.user)
  .subscribe(
    (data)=>{
      console.log(data)
      swal({
        type : 'success',
        title: 'Success', 
        text :'user login avec succées',
      }
        ).then(
          ()=>{ 
            this.authService.isAuth = true ;
            this.authStatus = this.authService.isAuth ;
            // localStorage.setItem('auth','true')
            this.storageService.write('user',this.user)
            //alert(this.authStatus);
            baseContext.router.navigate(['/appareils']);
          }
        );
           },
    (error)=>{
      console.log(error)
      swal({
        type : 'error',
        title: 'error', 
        text :'try again !!'
      })
    } 
  );
}
onSignOut(){
  this.authService.signOut();
  this.authStatus = this.authService.isAuth;
}

onSignUp(){
  let baseContext = this;
  console.log(this.user)
  this.authService.addUser(this.user).subscribe(
    (data)=>{
      console.log(data)
      swal({
        type : 'success',
        title: 'Success', 
        text :'user ajout avec succées',
      }
        ).then(
          ()=>{ 
            this.authService.isAuth = true ;
            this.authStatus = this.authService.isAuth ;
            //localStorage.setItem('auth','true')
            this.storageService.write('user',this.user)
            //alert(this.authStatus);
            baseContext.router.navigate(['/appareils']);
          }
        );
           },
    (error)=>{
      console.log(error)
      swal({
        type : 'error',
        title: 'error', 
        text :'try again !!'
      })
    } 
  );
}
}
