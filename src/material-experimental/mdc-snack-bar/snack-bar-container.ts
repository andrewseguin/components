/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatSnackBarConfig, MatSnackBarContainerInterface} from '@angular/material/snack-bar';
import {MDCSnackbarAdapter, MDCSnackbarFoundation} from '@material/snackbar';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal
} from '@angular/cdk/portal';
import {Subject} from 'rxjs';

const MDC_LABEL_CSS_CLASS = 'mdc-snackbar__label';

/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
@Component({
  selector: 'mat-mdc-snack-bar-container',
  templateUrl: 'snack-bar-container.html',
  styleUrls: ['snack-bar-container.css'],
  // In Ivy embedded views will be change detected from their declaration place, rather than
  // where they were stamped out. This means that we can't have the snack bar container be OnPush,
  // because it might cause snack bars that were opened from a template not to be out of date.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  animations: [],
  host: {
    '[class.mat-mdc-snack-bar-container]': 'true',
    '[class.mdc-snackbar]': 'true',
    '[class.mat-snack-bar-container]': 'false',
  }
})
export class MatSnackBarContainer extends BasePortalOutlet
    implements MatSnackBarContainerInterface {
  /** Subject for notifying that the snack bar has exited from view. */
  readonly _onExit: Subject<any> = new Subject();

  /** Subject for notifying that the snack bar has finished entering the view. */
  readonly _onEnter: Subject<any> = new Subject();

  private _mdcAdapater: MDCSnackbarAdapter = {
    addClass: (className: string) => this._setClass(className, true),
    removeClass: (className: string) => this._setClass(className, false),
    announce: () => {},
    notifyClosed: (reason: string) => this._onExit.next(),
    notifyClosing: (reason: string) => {},
    notifyOpened: () => this._onEnter.next(),
    notifyOpening: () => {},
  };

  private _mdcFoundation = new MDCSnackbarFoundation(this._mdcAdapater);

  /** The portal outlet inside of this container into which the snack bar content will be loaded. */
  @ViewChild(CdkPortalOutlet, {static: true}) _portalOutlet: CdkPortalOutlet;

  /** Element that acts as the MDC surface container which should contain the label and actions. */
  @ViewChild('surface', {static: true}) _surface: ElementRef;

  constructor(
      private _elementRef: ElementRef<HTMLElement>,
      public snackBarConfig: MatSnackBarConfig) {
    super();
  }

  enter() {
    this._mdcFoundation.open();
    if (!this._surface.nativeElement.querySelector(`.${MDC_LABEL_CSS_CLASS}`)) {
      this._appendLabelWrapper();
    }
  }

  exit() {
    this._mdcFoundation.close();
    return this._onExit;
  }

  /** Attach a component portal as content to this snack bar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._assertNotAttached();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this snack bar container. */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._assertNotAttached();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  private _setClass(cssClass: string, active: boolean) {
    const classList = this._elementRef.nativeElement.classList;
    active ? classList.add(cssClass) : classList.remove(cssClass);
  }

  /** Asserts that no content is already attached to the container. */
  private _assertNotAttached() {
    if (this._portalOutlet.hasAttached()) {
      throw Error('Attempting to attach snack bar content after content is already attached');
    }
  }

  /** Wraps the surface container content in an additional label container. */
  private _appendLabelWrapper() {

    // Create the label wrapper container and add its CSS class.
    const labelWrapper = document.createElement('div');
    labelWrapper.classList.add(MDC_LABEL_CSS_CLASS);

    // Move the user's content in the surface container to the new label container.
    const surfaceEl = this._surface.nativeElement;
    while (surfaceEl.firstChild) {
      labelWrapper.appendChild(surfaceEl.firstChild);
    }

    // Insert the label wrapper under the surface container.
    surfaceEl.appendChild(labelWrapper);
  }
}
