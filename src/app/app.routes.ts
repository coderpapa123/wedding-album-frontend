import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlbumViewerComponent } from './components/album-viewer/album-viewer.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageAlbumsComponent } from './components/admin/manage-albums/manage-albums.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'album', component: AlbumViewerComponent, canActivate: [AuthGuard]},
  { path: 'manage-albums', component: ManageAlbumsComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
];
