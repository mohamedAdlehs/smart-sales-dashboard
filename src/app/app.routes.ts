import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // توجيه الصفحة الرئيسية للـ Dashboard
  { path: 'dashboard', component: Dashboard}
  // هنا سنضيف لاحقاً مسارات المنتجات والمبيعات
];