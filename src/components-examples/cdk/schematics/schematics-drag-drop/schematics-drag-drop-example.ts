import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

/**
 * @title Generated output of `drag-drop` schematic.
 *
 * `ng generate @angular/cdk:drag-drop`
 */
@Component({
  selector: 'schematics-drag-drop-example',
  styleUrls: ['schematics-drag-drop-example.css'],
  templateUrl: 'schematics-drag-drop-example.html',
})
export class SchematicsDragDropExample {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
