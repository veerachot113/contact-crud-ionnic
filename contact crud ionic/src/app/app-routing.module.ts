import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'add-contact', loadChildren: () => import('./add-contact/add-contact.module').then(m => m.AddContactPageModule) },
  { path: 'edit-contact/:id', loadChildren: () => import('./edit-contact/edit-contact.module').then(m => m.EditContactPageModule) },
  { path: 'detail-contact/:id', loadChildren: () => import('./detail-contact/detail-contact.module').then(m => m.DetailContactPageModule) },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
