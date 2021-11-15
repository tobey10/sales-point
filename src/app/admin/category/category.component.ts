import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categoryForm!: FormGroup;
  submit = false;
  isCreate: Boolean = true;

  constructor( private categoryService: CategoryService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategoriesByAdmin();
    this.createForm();
  }

  createForm(){
    this.categoryForm = this._formBuilder.group({
      category: ['', Validators.required],
    })
  }

  get f(){
    return this.categoryForm.controls;
  }

  getCategoriesByAdmin(){
    this.categoryService.getCategoriesByAdmin().subscribe((data) => {
      this.categories = data.data
      console.log(this.categories)
    },error => {
      console.log(error)
    })
  }

  addCategory(){
    this.isCreate = true;
    this.categoryForm.reset();
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
  }

  getCategory(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.categoryService.getCategory(id).subscribe((data) => {
      this.category = data.data
      this.categoryForm.patchValue(this.category)
    },error => {
      console.log(error)
    })
  }

  onSubmit(){
    this.submit = true;
    if(this.categoryForm.invalid){
      return;
    }
    this.categoryService.createCategory(this.categoryForm.value).subscribe((data) => {
      console.log(data.msg)
      this.getCategoriesByAdmin();
      this.categoryForm.reset();
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.setErrors(null) ;
      });
    },error => {
      console.log(error)
    })
  }

  onEdit(){
    this.submit = true;
    if(this.categoryForm.invalid){
      return;
    }
    this.categoryService.updateCategory(this.category._id, this.categoryForm.value).subscribe((data) => {
      console.log(data.msg)
      this.getCategoriesByAdmin();
      this.categoryForm.reset();
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.setErrors(null) ;
      });
    })
  }

  deleteCategory(id: any){
    this.categoryService.deleteCategory(id).subscribe((data) => {
      console.log(data.msg);
      this.getCategoriesByAdmin();
    })
  }
}
