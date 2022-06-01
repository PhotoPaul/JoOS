import { RouterModule, Routes } from '@angular/router';

import { CPGuard } from './pages/cp/cp.guard';
import { RefreshComponent } from './pages/refresh/refresh.component';

const appRoutes: Routes = [
    // Paths used by guests who will never login
    { path: 'forms', loadChildren: './pages/open-forms/open-forms.module#OpenFormsModule' },
    { path: 'cost-calculator', loadChildren: './pages/cp/items/finances/cost-calculator/cost-calculator.module#CostCalculatorModule' },
    // Paths used by guests who will login
    { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule' },
    // Paths used by users once they login
    { path: 'cp', data: { faIcon: 'fa-home', path_title_gr: 'Πίνακας Ελέγχου', path_title_en: 'Control Panel' }, canActivate: [CPGuard], loadChildren: './pages/cp/cp.module#CPModule' },
    // Helper path for refreshing already loaded Components
    { path: 'refresh/:path', component: RefreshComponent },
    // Catch-all path
    { path: '**', redirectTo: 'cp', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' });
