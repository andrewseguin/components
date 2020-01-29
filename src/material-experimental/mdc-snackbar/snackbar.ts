import {Injectable} from '@angular/core';
import {MatSnackBar as BaseMatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule} from './module';
import {MatSimpleSnackBar} from './simple-snackbar';
import {MatSnackBarContainer} from './snack-bar-container';

/**
 * Service to dispatch Material Design snack bar messages.
 */
@Injectable({providedIn: MatSnackBarModule})
export class MatSnackBar extends BaseMatSnackBar {
  protected simpleSnackBarComponent = MatSimpleSnackBar;
  protected snackBarContainerComponent = MatSnackBarContainer;
  protected handsetCssClass = 'mat-mdc-snack-bar-handset';
}
