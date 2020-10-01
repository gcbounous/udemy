import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from 'src/app/services/data-storage.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean;

    private userSubscription: Subscription;

    constructor(private dataStorage: DataStorageService,
                private router: Router,
                private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.userSubscription = this.store.select('auth').subscribe(authState => this.isAuthenticated = !!authState.user);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    
    onSaveData() {
        this.dataStorage.saveRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
        this.router.navigate(['/']);
    }

    onLogout() {
        this.store.dispatch(new authActions.Logout());
    }

}
