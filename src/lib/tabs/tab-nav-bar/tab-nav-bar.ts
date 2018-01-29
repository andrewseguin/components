/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CanColor,
  CanDisable,
  CanDisableRipple,
  HasTabIndex,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
  mixinTabIndex,
  RippleConfig,
  RippleGlobalOptions,
  RippleRenderer,
  RippleTarget,
  ThemePalette,
} from '@angular/material/core';
import {MatTabHeaderLabel} from '../tab-label-wrapper';
import {MatTabHeader} from '../tab-header';


// Boilerplate for applying mixins to MatTabNav.
/** @docs-private */
export class MatTabNavBase {
  constructor(public _elementRef: ElementRef) {}
}
export const _MatTabNavMixinBase = mixinColor(MatTabNavBase, 'primary');

/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
@Component({
  moduleId: module.id,
  selector: '[mat-tab-nav-bar]',
  exportAs: 'matTabNavBar, matTabNav',
  inputs: ['color'],
  templateUrl: 'tab-nav-bar.html',
  styleUrls: ['tab-nav-bar.css'],
  host: {'class': 'mat-tab-nav-bar'},
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTabNav extends _MatTabNavMixinBase implements AfterContentInit, CanColor {
  /** Index of the active link. */
  _activeIndex: number;

  /** Whether the active link has been changed. Reset to false after content checked. */
  _activeLinkChanged = false;

  /** Query list of all tab links of the tab navigation. */
  @ContentChildren(forwardRef(() => MatTabLink), {descendants: true}) _links: QueryList<MatTabLink>;

  @ViewChild(MatTabHeader) tabHeader: MatTabHeader;

  /** Background color of the tab nav. */
  @Input()
  get backgroundColor(): ThemePalette { return this._backgroundColor; }
  set backgroundColor(value: ThemePalette) {
    const nativeElement: HTMLElement = this._elementRef.nativeElement;

    nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);

    if (value) {
      nativeElement.classList.add(`mat-background-${value}`);
    }

    this._backgroundColor = value;
  }
  private _backgroundColor: ThemePalette;

  /** Whether ripples should be disabled for all links or not. */
  @Input()
  get disableRipple() { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = coerceBooleanProperty(value);
    this._setLinkDisableRipple();
  }
  private _disableRipple: boolean = false;

  constructor(elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
    super(elementRef);
  }

  ngAfterContentInit(): void {
    this._setLinkDisableRipple();

    this._updateActiveIndex();
    this._links.changes.subscribe(() => this._updateActiveIndex());
  }

  ngAfterContentChecked(): void {
    if (this._activeLinkChanged) {
      this._updateActiveIndex();
      this._activeLinkChanged = false;
    }
  }

  setFocus(link: MatTabLink) {
    this.tabHeader.focusIndex = this._links.toArray().indexOf(link);
  }

  /** Sets the `disableRipple` property on each link of the navigation bar. */
  private _setLinkDisableRipple() {
    if (this._links) {
      this._links.forEach(link => link.disableRipple = this.disableRipple);
    }
  }

  /** Updates the active index with the index of the current active link. */
  private _updateActiveIndex() {
    this._activeIndex = -1;
    this._links.forEach((link, i) => {
      if (link.active) {
        this._activeIndex = i;
      }
    });

    this._changeDetectorRef.markForCheck();
  }
}

// Boilerplate for applying mixins to MatTabLink.
export class MatTabLinkBase {}
export const _MatTabLinkMixinBase =
  mixinTabIndex(mixinDisableRipple(mixinDisabled(MatTabLinkBase)));

/**
 * Link inside of a `mat-tab-nav-bar`.
 */
@Directive({
  selector: '[mat-tab-link], [matTabLink]',
  exportAs: 'matTabLink',
  inputs: ['disabled', 'disableRipple', 'tabIndex'],
  host: {
    'class': 'mat-tab-link',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabIndex]': 'tabIndex',
    '[class.mat-tab-disabled]': 'disabled',
    '[class.mat-tab-label-active]': 'active',
    '(click)': '_handleClick($event)',
    '(focus)': '_tabNavBar.setFocus(this)',
  }
})
export class MatTabLink extends _MatTabLinkMixinBase
    implements MatTabHeaderLabel, OnDestroy, CanDisable,
        CanDisableRipple, HasTabIndex, RippleTarget {

  /** Whether the tab link is active or not. */
  private _isActive: boolean = false;

  /** Reference to the RippleRenderer for the tab-link. */
  private _rippleRenderer: RippleRenderer;

  /** Whether the link is active. */
  @Input()
  get active(): boolean { return this._isActive; }
  set active(value: boolean) {
    this._isActive = value;
    this._tabNavBar._activeLinkChanged = true;
  }

  /**
   * Ripple configuration for ripples that are launched on pointer down.
   * @docs-private
   */
  rippleConfig: RippleConfig = {};

  /**
   * Whether ripples are disabled on interaction
   * @docs-private
   */
  get rippleDisabled(): boolean {
    return this.disabled || this.disableRipple;
  }

  constructor(private _tabNavBar: MatTabNav,
              public elementRef: ElementRef,
              ngZone: NgZone,
              platform: Platform,
              @Optional() @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) globalOptions: RippleGlobalOptions,
              @Attribute('tabindex') tabIndex: string) {
    super();

    this._rippleRenderer = new RippleRenderer(this, ngZone, this.elementRef, platform);
    this._rippleRenderer.setupTriggerEvents(this.elementRef.nativeElement);

    this.tabIndex = parseInt(tabIndex) || 0;

    if (globalOptions) {
      this.rippleConfig = {
        speedFactor: globalOptions.baseSpeedFactor,
        animation: globalOptions.animation,
      };
    }
  }

  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  /**
   * Handles the click event, preventing default navigation if the tab link is disabled.
   */
  _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }
}
