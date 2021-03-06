import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean;

    private userSubscription: Subscription;

    constructor(
        private dataStorage: DataStorageService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveData(): void {
        this.dataStorage.saveRecipes();
    }

    onFetchData(): void {
        this.dataStorage.fetchRecipes().subscribe();
        this.router.navigate(['/']);
    }

    onLogout(): void {
        this.authService.logout();
    }

}
