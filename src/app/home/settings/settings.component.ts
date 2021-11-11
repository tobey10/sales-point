import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  password!: FormGroup
  changeWeight!: FormGroup
  changeName!: FormGroup
  displayDivNumber: number = 1;
  isPassword: boolean = false
  isWeight: boolean = false;
  isName: boolean = false;
  responseMessage!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.nameForm();
    this.weightForm();
    this.passwordForm();
  }

  passwordForm(){
    this.password = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }

  weightForm(){
    this.changeWeight = this._formBuilder.group({
      currentWeight: ['', Validators.required],
      targetWeight:['', Validators.required],
      targetHeight:['', Validators.required],
      currentHeight:['', Validators.required],
    })
  }

  nameForm(){
    this.changeName = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get f(){
    return this.password.controls;
  }

  onSavePassword(){
    this.isPassword = true;
    if(this.password.invalid){
      return;
    }
    console.log(this.password.value);
    this.authService.changePassword(this.password.value).subscribe((data) => {
      console.log(data);
      this.responseMessage = data.msg
      this.router.navigate(['/login'])
    },error => {
      console.log(error)
    })
  }

  get e(){
    return this.changeWeight.controls
  }

  onSaveEmail(){
    this.isWeight = true;
    if(this.changeWeight.invalid){
      return;
    }
    console.log(this.changeWeight.value)
    this.userService.updateUser(this.changeWeight.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
    },error => {
      console.log(error)
    })
  }

  get d(){
    return this.changeName.controls
  }

  onSaveUsername(){
    this.isName = true;
    if(this.changeName.invalid){
      return;
    }
    console.log(this.changeName.value)
    this.userService.updateUser(this.changeName.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
    },error => {
      console.log(error)
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  toggle(no: number){
    this.displayDivNumber = no
  }
}
