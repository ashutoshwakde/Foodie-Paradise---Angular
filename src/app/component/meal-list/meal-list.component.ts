import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {

  meals: any[] = [];             
  originalMeals: any[] = [];    
  searchQuery: string = '';   

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.loadDefaultMeals();
  }

  loadDefaultMeals(): void {
    this.mealService.searchMeals('').subscribe((response) => {
      this.originalMeals = response.meals || [];
      this.meals = [...this.originalMeals];  
    });
  }

  searchMeals(): void {
    console.log('Searching for:', this.searchQuery);
    if (this.searchQuery.trim() === '') {
      this.meals = [...this.originalMeals];
    } else {
      this.meals = this.originalMeals.filter(meal =>
        meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    console.log('Filtered meals:', this.meals);
  }

  addToCart(meal: any): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (!meal.price) {
      meal.price = 10; 
    }
  
    const existingMeal = cart.find((item: any) => item.idMeal === meal.idMeal);
    
    if (existingMeal) {
      existingMeal.quantity += 1;  
    } else {
      meal.quantity = 1; 
      cart.push(meal);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${meal.strMeal} added to cart!`);
  }
}
