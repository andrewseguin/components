import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

/**
 * @title Generated output of `navigation` schematic.
 *
 * `ng generate @angular/material:navigation`
 */
@Component({
  selector: 'schematics-navigation-example',
  styleUrls: ['schematics-navigation-example.css'],
  templateUrl: 'schematics-navigation-example.html',
})
export class SchematicsNavigationExample {
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

  constructor(private _breakpointObserver: BreakpointObserver) {}

  // The following is not part of the schematic, but added so that our example does not render
  // on material.angular.io. This example uses a fixed position sidenav that would interfere
  // with the site's layout and should only be viewed on StackBlitz
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
