/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCommonModule} from '@angular/material/core';

import {MatSimpleSnackBar} from './simple-snack-bar';
import {MdcSnackBarAction, MdcSnackBarActions, MdcSnackBarLabel} from './snack-bar';
import {MatSnackBarContainer} from './snack-bar-container';

@NgModule({
  declarations: [MdcSnackBarLabel],
  exports: [MdcSnackBarLabel],
})
export class ModuleWithLabelDirective {}

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    MatButtonModule,
    MatCommonModule,
    ModuleWithLabelDirective
  ],
  exports: [
    MatCommonModule,
    MatSnackBarContainer,
    // MdcSnackBarLabel,
    MdcSnackBarActions,
    MdcSnackBarAction,
  ],
  declarations: [
    MatSimpleSnackBar,
    MatSnackBarContainer,
    // MdcSnackBarLabel,
    MdcSnackBarActions,
    MdcSnackBarAction,
  ],
  entryComponents: [
    MatSimpleSnackBar,
    MatSnackBarContainer,
  ],
})
export class MatSnackBarModule {
}
