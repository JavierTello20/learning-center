import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  MatFormField,
  MatLabel,
  MatError
} from '@angular/material/form-field';

import {
  MatSelect,
  MatOption
} from '@angular/material/select';

import { MatButton } from '@angular/material/button';

import {
  MonitoringStore
} from '../../../application/monitoring.store';

import {
  EnergyStore
} from '../../../../energy/application/energy.store';

import {
  EnergyReportItem
} from '../../../domain/model/energy-report-item.entity';

import {
  EnergyType
} from '../../../domain/model/energy-type.type';


import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-new-energy-report',

  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
    MatButton,
    TranslatePipe
  ],

  templateUrl: './new-energy-report.html',
  styleUrl: './new-energy-report.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEnergyReport {
  private readonly formBuilder = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly monitoringStore = inject(MonitoringStore);

  private readonly energyStore = inject(EnergyStore);

  protected readonly operators = this.energyStore.regionalOperators;

  protected readonly energyTypes: EnergyType[] = [
    'solar',
    'wind',
    'hydro',
    'nuclear',
    'gas',
    'oil',
  ];

  protected readonly regions: Record<EnergyType, string> = {
    solar: 'Africa',
    wind: 'Europe',
    hydro: 'South America',
    nuclear: 'North America',
    gas: 'Middle East',
    oil: 'Asia',
  };

  protected readonly message = signal<string>('');

  protected readonly form = this.formBuilder.group({
    energyType: [null as EnergyType | null, Validators.required],

    regionalOperatorId: [null as number | null, Validators.required],
  });

  protected getRegion(energyType: EnergyType | null): string {
    if (!energyType) {
      return '';
    }

    return this.regions[energyType];
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const energyType = this.form.controls.energyType.value;

    const operatorId = this.form.controls.regionalOperatorId.value;

    if (!energyType || operatorId === null) {
      return;
    }
    const center = this.monitoringStore
      .monitoringCenters()
      .find((item) => item.energyType === energyType);

    if (!center) {
      this.message.set('Monitoring center not found.');

      return;
    }
    const operator = this.energyStore.regionalOperators().find((item) => item.id === operatorId);

    if (!operator) {
      this.message.set('Regional operator not found.');

      return;
    }
    const sourceReport = this.monitoringStore
      .energyReportItems()
      .find((item) => item.energyType === energyType);

    if (!sourceReport) {
      this.message.set('Energy information not found.');

      return;
    }
    if (sourceReport.production <= 0) {
      this.message.set('Production must be greater than zero.');

      return;
    }
    const report = new EnergyReportItem({
      id: 0,

      centerId: center.id,

      energyType: energyType,

      countryCode: operator.countryCode,

      countryName: operator.countryName,

      consumption: sourceReport.consumption,

      production: sourceReport.production,

      year: sourceReport.year,

      registeredAt: new Date().toISOString(),
    });
    this.monitoringStore.addEnergyReportItem(report).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },

      error: () => {
        this.message.set('Could not create energy report.');
      },
    });
  }

  protected cancel(): void {
    this.router.navigate(['/home']);
  }
}
