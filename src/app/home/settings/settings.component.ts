import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { height, weight} from 'src/app/auth/data/data';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  password!: FormGroup
  changeWeight!: FormGroup
  changeHeight!: FormGroup
  changeName!: FormGroup
  displayDivNumber: number = 1;
  isPassword: boolean = false
  isWeight: boolean = false;
  isHeight: boolean = false;
  isName: boolean = false;
  height = height
  weight = weight
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
    this.heightForm();
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
      weightUnit: ['', Validators.required]
    })
  }
  nameForm(){
    this.changeName = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }
  heightForm(){
    this.changeHeight = this._formBuilder.group({
      targetHeight:['', Validators.required],
      currentHeight:['', Validators.required],
      heightUnit: ['', Validators.required]
    })
  }

  get g(){
    return this.changeHeight.controls
  }
  get f(){
    return this.password.controls;
  }
  get e(){
    return this.changeWeight.controls
  }
  get d(){
    return this.changeName.controls
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

  onSaveWeight(){
    this.isWeight = true;
    if(this.changeWeight.invalid){
      return;
    }
    console.log(this.changeWeight.value)
    this.userService.updateUser(this.changeWeight.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
      this.changeWeight.reset()
      Object.keys(this.changeWeight.controls).forEach(key => {
        this.changeWeight.get(key)?.setErrors(null) ;
      });
    },error => {
      console.log(error)
    })
  }

  onSaveHeight(){
    this.isHeight = true;
    if(this.changeHeight.invalid){
      return;
    }
    console.log(this.changeHeight.value)
    this.userService.updateUser(this.changeHeight.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
      this.changeHeight.reset()
      Object.keys(this.changeHeight.controls).forEach(key => {
        this.changeHeight.get(key)?.setErrors(null) ;
      });
    },error => {
      console.log(error)
    })
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
      this.changeName.reset()
    },error => {
      console.log(error)
    })
  }


  toggle(no: number){
    this.displayDivNumber = no
  }
}
