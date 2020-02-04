/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, Directive, Injectable} from '@angular/core';
import {
  MatSnackBar as BaseMatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {MatSnackBarModule} from './module';
import {MatSimpleSnackBar} from './simple-snack-bar';
import {MatSnackBarContainer} from './snack-bar-container';

@Component({
  selector: `test`,
  template: '<ng-content></ng-content>'
})
export class MdcSnackBarLabel {}

@Directive({
  selector: `[mdcSnackBarActions]`,
  host: {
    'class': 'mdc-snack-bar-actions',
  }
})
export class MdcSnackBarActions {}

@Directive({
  selector: `[mdcSnackBarAction]`,
  host: {
    'class': 'mdc-snack-bar-action',
  }
})
export class MdcSnackBarAction {}

/**
 * Service to dispatch Material Design snack bar messages.
 */
@Injectable({providedIn: MatSnackBarModule})
export class MatSnackBar extends BaseMatSnackBar {
  protected simpleSnackBarComponent = MatSimpleSnackBar;
  protected snackBarContainerComponent = MatSnackBarContainer;
  protected handsetCssClass = 'mat-mdc-snack-bar-handset';

  open(message: string, action: string = '', config: MatSnackBarConfig = {}):
      MatSnackBarRef<MatSimpleSnackBar> {
    config.usesMdcStructure = true;
    return super.open(message, action, config);
  }
}
