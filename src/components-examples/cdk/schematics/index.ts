import {NgModule} from '@angular/core';
import {SchematicsDragDropExample} from './schematics-drag-drop/schematics-drag-drop-example';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';

export {
  SchematicsDragDropExample,
};

const EXAMPLES = [
  SchematicsDragDropExample,
];

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class CdkSchematicsExamplesModule {
}
