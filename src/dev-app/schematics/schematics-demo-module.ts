/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MaterialSchematicsExampleModule} from '@angular/components-examples/material/schematics';
import {CdkSchematicsExampleModule} from '@angular/components-examples/cdk/schematics';
import {RouterModule} from '@angular/router';
import {SchematicsDemo} from './schematics-demo';

@NgModule({
  imports: [
    MaterialSchematicsExampleModule,
    CdkSchematicsExampleModule,
    RouterModule.forChild([{path: '', component: SchematicsDemo}]),
  ],
  declarations: [SchematicsDemo],
})
export class SchematicsDemoModule {
}
