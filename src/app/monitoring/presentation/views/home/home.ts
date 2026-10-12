import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MonitoringStore } from '../../../application/monitoring.store';

import { EnergyReportSummary } from '../../components/energy-report-summary/energy-report-summary';


import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [EnergyReportSummary, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly store = inject(MonitoringStore);

  protected readonly reports = this.store.energyReportItems;
}
