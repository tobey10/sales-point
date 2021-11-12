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
    this.ingredientService.getIngredient(id).subscribe((data) => {
      this.ingredient = data.data
      console.log(this.ingredient)
    },error => {
      console.log(error)
    })
  }

  createIngredients(ingredient: Ingredient){
    this.ingredientService.createIngredient(ingredient).subscribe((data) => {
      console.log(data.msg)
    },error => {
      console.log(error)
    })
  }

  updateIngredient(ingredientId: any, ingredientObject: any){
    this.ingredientService.updateIngredient(ingredientId, ingredientObject).subscribe((data) => {
      console.log(data)
    })
  }

  deleteIngredient(id: any){
    this.ingredientService.deleteIngredient(id).subscribe((data) => {
      console.log(data.msg)
    })
  }
}
