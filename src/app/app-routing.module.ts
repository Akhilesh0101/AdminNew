import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminRemediesComponent } from './admin-remedies/admin-remedies.component';
import { AdminHealthTipsComponent } from './admin-health-tips/admin-health-tips.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-panel', pathMatch: 'full' },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'admin-product', component: AdminProductComponent },
  { path: 'admin-remedies', component: AdminRemediesComponent },
  { path: 'admin-health-tips', component: AdminHealthTipsComponent },
  { path: 'admin-user-details', component: AdminUserDetailsComponent },
  { path: 'admin-management', component: AdminManagementComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
