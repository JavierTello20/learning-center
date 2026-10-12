import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DatePipe } from '@angular/common';

import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

import { EnergyReportItem } from '../../../domain/model/energy-report-item.entity';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-energy-report-summary',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    DatePipe,
    TranslatePipe,
  ],
  templateUrl: './energy-report-summary.html',
  styleUrl: './energy-report-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnergyReportSummary {
  report = input.required<EnergyReportItem>();
}
