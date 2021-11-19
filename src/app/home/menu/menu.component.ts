import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Ingredient } from 'src/app/model/ingredient';
import { Menu } from 'src/app/model/menu';
import { Shop } from 'src/app/model/shop';
import { CategoryService } from 'src/app/services/category/category.service';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  shops: Shop[] = []
  menuForm!: FormGroup;
  menu!: Menu
  submit: Boolean = false;
  isCreate: boolean = true;
  constructor(
    private menuService: MenuService,
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private ingredientService: IngredientService, private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getMenusByUser();
    this.getCategories();
    this.getIngredients();
    this.getShopsByUser();
    this.createForm();
  }

  get f(){
    return this.menuForm.controls
  }


  createForm(){
    this.menuForm = this._formBuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
      ingredient:['', Validators.required],
      category:['', Validators.required],
      shop:['', Validators.required]
    });
  }

  getMenusByUser(){
    this.menuService.getMenusByUser().subscribe((data) => {
      console.log(data.data);
      this.menus = data.data
    }, error => {
      console.log(error);
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data.data);
      this.categories = data.data
    }, error => {
      console.log(error);
    })
  }

  getIngredients(){
    this.ingredientService.getIngredients().subscribe((data) => {
      console.log(data.data);
      this.ingredients = data.data
    }, error => {
      console.log(error);
    })
  }

  getShopsByUser(){
    this.shopService.getShopsByUser().subscribe((data) => {
      this.shops = data.data;
      console.log(this.shops);
    }, error => {
      console.log(error);
    })
  }

  deleteMenu(id: any){
    this.menuService.deleteMenu(id).subscribe((data) => {
      console.log(data.msg)
      this.getMenusByUser()
    }, error => {
      console.log(error);
    })
  }

  getMenu(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.menuService.getMenuById(id).subscribe((data) => {
      this.menu = data.data
      this.menuForm.patchValue(this.menu)
      console.log(this.menu)
    },error => {
      console.log(error)
    })
  }

  onSubmit(){
    this.submit = true;
    if(this.menuForm.invalid){
      return;
    }

    this.menuService.createMenu(this.menuForm.value).subscribe((data) => {
      console.log(data.data);
      this.menuForm.reset();
      Object.keys(this.menuForm.controls).forEach(key => {
        this.menuForm.get(key)?.setErrors(null) ;
      });
      this.getMenusByUser()
    }, error => {
      console.log(error);
    });
  }

  onEdit(){this.submit = true;
    if(this.menuForm.invalid){
      return;
    }
    this.menuService.updateMenu(this.menu._id, this.menuForm.value).subscribe((data) => {
      console.log(data.msg)
      this.menuForm.reset();
      Object.keys(this.menuForm.controls).forEach(key => {
        this.menuForm.get(key)?.setErrors(null) ;
      });
      this.getMenusByUser()
    },error => {
      console.log(error)
    })}
}
