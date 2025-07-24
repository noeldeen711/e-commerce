import { Component, inject, OnInit , OnDestroy } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit , OnDestroy{

  private getAllCategoriesSubscribtion? : Subscription

  categoryService = inject(CategoryService);
  categoryList: any[] = []

  ngOnInit(): void {
    this.getAllCategoriesSubscribtion =
    this.categoryService.getAllCategories().subscribe({
      next: (Response) => {
        console.log(Response)
        this.categoryList = Response.data
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscribtion?.unsubscribe();
  }
}
