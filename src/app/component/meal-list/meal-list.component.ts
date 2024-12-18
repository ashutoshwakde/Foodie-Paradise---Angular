import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {

  // meals: any[] = [];
  // searchKeyword: string = '';
  // searchQuery: string = '';

  // constructor(private mealService: MealService) {}

  // ngOnInit(): void {
  //   this.loadDefaultMeals();
  // }

  // loadDefaultMeals(): void {
  //   this.mealService.searchMeals('').subscribe((response) => {
  //     this.meals = response.meals || [];
  //   });
  // }

  // searchMeals() {
  //   console.log('Searching for:', this.searchQuery);
  //   this.meals = this.meals.filter(meal =>
  //     meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  //   console.log('Filtered meals:', this.meals);
  // }


  // addToCart(meal: any): void {
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  //   if (!meal.price) {
  //     meal.price = 10; 
  //   }
  //     const existingMeal = cart.find((item: any) => item.idMeal === meal.idMeal);
    
  //   if (existingMeal) {
  //     existingMeal.quantity += 1;
  //   } else {
  //     meal.quantity = 1;  
  //     cart.push(meal);
  //   }
    
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   alert(`${meal.strMeal} added to cart!`);
  // }

  meals: any[] = [];              // Array to hold meal data
  originalMeals: any[] = [];      // To store the original unfiltered list of meals
  searchQuery: string = '';       // Bind the input search query

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.loadDefaultMeals();
  }

  // Load meals when the component initializes
  loadDefaultMeals(): void {
    this.mealService.searchMeals('').subscribe((response) => {
      this.originalMeals = response.meals || [];
      this.meals = [...this.originalMeals];  // Initially set the meals to the original list
    });
  }

  // Search meals based on the search query
  searchMeals(): void {
    console.log('Searching for:', this.searchQuery);
    if (this.searchQuery.trim() === '') {
      // If search query is empty, reset the meals to the original list
      this.meals = [...this.originalMeals];
    } else {
      // Filter meals based on the query
      this.meals = this.originalMeals.filter(meal =>
        meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    console.log('Filtered meals:', this.meals);
  }

  // Add meal to cart
  addToCart(meal: any): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add price if not already added
    if (!meal.price) {
      meal.price = 10;  // Default price if none is specified
    }
  
    // Check if the meal already exists in the cart
    const existingMeal = cart.find((item: any) => item.idMeal === meal.idMeal);
    
    if (existingMeal) {
      existingMeal.quantity += 1;  // Increase quantity if it exists
    } else {
      meal.quantity = 1;  // Set quantity to 1 for new item
      cart.push(meal);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${meal.strMeal} added to cart!`);
  }
}
