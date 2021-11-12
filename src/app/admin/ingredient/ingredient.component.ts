import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[] = [];
  ingredient!: Ingredient;
  constructor( private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.ingredientService.getIngredients().subscribe((data) => {
      this.ingredients = data.data
      console.log(this.ingredients)
    },error => {
      console.log(error)
    })
  }

  getCategory(id: any){
    this.ingredientService.getIngredient(id).subscribe((data) => {
      this.ingredient = data.data
    },error => {
      console.log(error)
    })
  }

  createCategory(ingredient: Ingredient){
    this.ingredientService.createCategory(ingredient).subscribe((data) => {
      console.log(data.msg)
    },error => {
      console.log(error)
    })
  }

  updateCategory(categoryId: any, categoryObject: any){
    this.ingredientService.updateIngredient(categoryId, categoryObject).subscribe((data) => {
      console.log(data)
    })
  }

  deleteCategory(id: any){
    this.ingredientService.deleteIngredient(id).subscribe((data) => {
      console.log(data.msg)
    })
  }
}
