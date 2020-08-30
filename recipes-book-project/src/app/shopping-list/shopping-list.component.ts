import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';


@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    ingredientListChangedSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.ingredients = this.shoppingListService.getIngredients();

        this.ingredientListChangedSubscription = this.shoppingListService.ingredientListChanged.subscribe(
            (ingredientList: Ingredient[]) => { this.ingredients = ingredientList; }
        );
    }

    ngOnDestroy() {
        this.ingredientListChangedSubscription.unsubscribe();
    }

    onEditIngredient(index) {
        this.shoppingListService.editingIngredient.next(index);
    }
}
