import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-catgory',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  category!: Category;
  constructor( private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.data
      console.log(this.categories)
    },error => {
      console.log(error)
    })
  }

  getCategory(id: any){
    this.categoryService.getCategory(id).subscribe((data) => {
      this.category = data.data
    },error => {
      console.log(error)
    })
  }

  createCategory(category: Category){
    this.categoryService.createCategory(category).subscribe((data) => {
      console.log(data.msg)
    },error => {
      console.log(error)
    })
  }

  updateCategory(categoryId: any, categoryObject: any){
    this.categoryService.updateCategory(categoryId, categoryObject).subscribe((data) => {
      console.log(data)
    })
  }

  deleteCategory(id: any){
    this.categoryService.deleteCategory(id).subscribe((data) => {
      console.log(data.msg)
    })
  }
}
