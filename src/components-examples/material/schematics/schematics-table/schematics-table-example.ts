import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {ExampleTableDataSource, ExampleTableItem} from './schematics-table-datasource';

/**
 * @title Generated output of `table` schematic.
 *
 * `ng generate @angular/material:table`
 */
@Component({
  selector: 'schematics-table-example',
  styleUrls: ['schematics-table-example.css'],
  templateUrl: 'schematics-table-example.html',
})
export class SchematicsTableExample implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ExampleTableItem>;
  dataSource: ExampleTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ExampleTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
