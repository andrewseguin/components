/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CdkTable, DataRowOutlet, FooterRowOutlet, HeaderRowOutlet} from './table';
import {
  CdkCellOutlet,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  CdkTableBodySection,
  CdkTableFootSection,
  CdkTableHeadSection
} from './row';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef
} from './cell';
import {CdkTextColumn} from './text-column';

const EXPORTED_DECLARATIONS = [
  CdkTable,
  CdkRowDef,
  CdkCellDef,
  CdkCellOutlet,
  CdkHeaderCellDef,
  CdkFooterCellDef,
  CdkColumnDef,
  CdkCell,
  CdkRow,
  CdkHeaderCell,
  CdkFooterCell,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkFooterRow,
  CdkFooterRowDef,
  DataRowOutlet,
  HeaderRowOutlet,
  FooterRowOutlet,
  CdkTextColumn,
  CdkTableBodySection,
  CdkTableHeadSection,
  CdkTableFootSection
];

@NgModule({
  imports: [CommonModule],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS

})
export class CdkTableModule { }
