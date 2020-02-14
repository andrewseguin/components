import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

/**
 * @title Generated output of `dashboard` schematic.
 *
 * `ng generate @angular/material:dashboard`
 */
@Component({
  selector: 'schematics-dashboard-example',
  styleUrls: ['schematics-dashboard-example.css'],
  templateUrl: 'schematics-dashboard-example.html',
})
export class SchematicsDashboardExample {
  /** Based on the screen size, switch from standard to one column per row */
  cards: Observable<any> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 }
          ];
        }

        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 2 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      })
  );

  constructor(private _breakpointObserver: BreakpointObserver) {}
}
