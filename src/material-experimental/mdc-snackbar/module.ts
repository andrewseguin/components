/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {MatSimpleSnackBar} from './simple-snackbar';
import {MatSnackBarContainer} from './snack-bar-container';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    MatButtonModule,
    MatCommonModule,
  ],
  exports: [MatCommonModule, MatSnackBarContainer],
  declarations: [MatSimpleSnackBar, MatSnackBarContainer],
  entryComponents: [MatSimpleSnackBar, MatSnackBarContainer],
})
export class MatSnackBarModule {}
