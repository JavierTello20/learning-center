import { Routes } from '@angular/router';

export const monitoringRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./presentation/views/new-energy-report/new-energy-report').then(
        (m) => m.NewEnergyReport,
      ),
  },
];
