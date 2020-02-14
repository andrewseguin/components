import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import {MatTreeModule} from '@angular/material/tree';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {SchematicsDashboardExample} from './schematics-dashboard/schematics-dashboard-example';
import {SchematicsNavigationExample} from './schematics-navigation/schematics-navigation-example';
import {SchematicsTableExample} from './schematics-table/schematics-table-example';
import {SchematicsTreeExample} from './schematics-tree/schematics-tree-example';
import {SchematicsAddressFormExample} from './schematics-address-form/schematics-address-form-example';

export {
  SchematicsAddressFormExample,
  SchematicsDashboardExample,
  SchematicsNavigationExample,
  SchematicsTableExample,
  SchematicsTreeExample,
};

const EXAMPLES = [
  SchematicsAddressFormExample,
  SchematicsDashboardExample,
  SchematicsNavigationExample,
  SchematicsTableExample,
  SchematicsTreeExample,
];

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule
  ],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class MaterialSchematicsExamplesModule {
}
