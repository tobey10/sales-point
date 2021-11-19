import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = [];
  shop!: Shop;
  shopForm!: FormGroup;
  submit: Boolean = false;
  isCreate: boolean = true;
  logo!: File;
  document!: File
  image!: File

  constructor(private shopService: ShopService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getShopsByUser();
    this.createShopForm();
  }

  createShopForm(){
    this.shopForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      postCode: ['', Validators.required]
    })
  }

  selectLogo(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.logo = file
    }
  }

  selectImage(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.image = file
    }
  }

  selectDocument(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.document = file
    }
  }

  get f(){
    return this.shopForm.controls
  }

  getShopsByUser(){
    this.shopService.getShopsByUser().subscribe((data) => {
      this.shops = data.data;
      console.log(this.shops);
    }, error => {
      console.log(error);
    })
  }

  deleteShop(id: any){
    this.shopService.deleteShop(id).subscribe((data) => {
      console.log(data.msg)
      this.getShopsByUser()
    }, error => {
      console.log(error);
    })
  }

  getShop(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.shopService.getShopById(id).subscribe((data) => {
      this.shop = data.data
      this.shopForm.patchValue(this.shop)
      console.log(this.shop)
    },error => {
      console.log(error)
    })
  }

  addShop(){
    this.isCreate = true;
    this.shopForm.reset();
    Object.keys(this.shopForm.controls).forEach(key => {
      this.shopForm.get(key)?.setErrors(null) ;
    });
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
  }

  onSubmit(){
    this.submit = true;
    if(this.shopForm.invalid){
      return;
    }
    const formData = new FormData();
    formData.append('document', this.document)
    formData.append('logo', this.logo)
    formData.append('image', this.image)

    this.shopService.createShop(this.shopForm.value).subscribe((data) => {
      console.log(data.data._id);
      this.shopForm.reset();
      Object.keys(this.shopForm.controls).forEach(key => {
        this.shopForm.get(key)?.setErrors(null) ;
      });
      this.uploadFile(data.data._id, formData)
      this.getShopsByUser()
    },error => {
      console.log(error)
    })
  }

  uploadFile(id: any, shopObject: any){
    this.shopService.uploadFiles(id, shopObject).subscribe((data) => {
      console.log(data)
    },error => {
      console.log(error)
    })
  }

  onEdit(){
    this.submit = true;
    if(this.shopForm.invalid){
      return;
    }
    this.shopService.updateShop(this.shop._id, this.shopForm.value).subscribe((data) => {
      console.log(data.msg)
      this.shopForm.reset();
      Object.keys(this.shopForm.controls).forEach(key => {
        this.shopForm.get(key)?.setErrors(null) ;
      });
      this.getShopsByUser();
    },error => {
      console.log(error)
    })
  }
}
