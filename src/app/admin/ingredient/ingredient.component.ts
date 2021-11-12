import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Ingredient } from 'src/app/model/ingredient';
import { CategoryService } from 'src/app/services/category/category.service';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[] = [];
  categories: Category[] = [];
  ingredientForm!: FormGroup;
  submit = false;
  ingredient!: Ingredient;
  isCreate: Boolean = true;
  constructor( private ingredientService: IngredientService,
    private _formBuilder:FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getCategories()
    this.createForm();
  }

  createForm(){
    this.ingredientForm = this._formBuilder.group({
      category: ['', Validators.required],
      ingredient: ['', Validators.required],
      calorie: ['', Validators.required]
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.data
      console.log(this.categories)
    },error => {
      console.log(error)
    })
  }

  get f(){
    return this.ingredientForm.controls;
  }

  getIngredients(){
    this.ingredientService.getIngredients().subscribe((data) => {
      this.ingredients = data.data
      console.log(this.ingredients)
    },error => {
      console.log(error)
    })
  }

  getIngredient(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.ingredientService.getIngredient(id).subscribe((data) => {
      this.ingredient = data.data
      this.ingredientForm.patchValue(this.ingredient);
      this.ingredientForm.patchValue({
        category: this.ingredient.category.category
      })
      console.log(this.ingredient)
    },error => {
      console.log(error)
    })
  }

  addIngredient(){
    this.isCreate = true;
    this.ingredientForm.reset();
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
  }

  onSubmit(){
    this.submit = true;
    if(this.ingredientForm.invalid){
      return;
    }
    this.ingredientService.createIngredient(this.ingredientForm.value).subscribe((data) => {
      console.log(data.msg)
      this.getIngredients();
      this.ingredientForm.reset();
      Object.keys(this.ingredientForm.controls).forEach(key => {
        this.ingredientForm.get(key)?.setErrors(null) ;
      });
    },error => {
      console.log(error)
    })
  }

  onEdit(){
    this.submit = true;
    if(this.ingredientForm.invalid){
      return;
    }
    this.ingredientService.updateIngredient(this.ingredient._id, this.ingredientForm.value).subscribe((data) => {
      console.log(data.msg)
      this.getIngredients();
      this.ingredientForm.reset();
      Object.keys(this.ingredientForm.controls).forEach(key => {
        this.ingredientForm.get(key)?.setErrors(null) ;
      });
    })
  }


  deleteIngredient(id: any){
    this.ingredientService.deleteIngredient(id).subscribe((data) => {
      console.log(data.msg)
      this.getIngredients()
    })
  }
}
