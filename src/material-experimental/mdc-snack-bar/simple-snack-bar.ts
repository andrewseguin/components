/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mat-simple-snack-bar',
  templateUrl: 'simple-snack-bar.html',
  styleUrls: ['simple-snack-bar.css'],
  exportAs: 'matSnackBar',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.mat-mdc-simple-snack-bar]': 'true',
  }
})
export class MatSimpleSnackBar {
  /** Data that was injected into the snack bar. */
  data: {message: string, action: string};

  constructor(
      public snackBarRef: MatSnackBarRef<SimpleSnackBar>,
      @Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.data = data;
  }

  /** Performs the action on the snack bar. */
  action(): void {
    this.snackBarRef.dismissWithAction();
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.action;
  }
}

