import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './packages.model';

import { tableData, editableTable } from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackagesService } from './packages.service';
import { PackagesSortableDirective, SortEvent } from './packages-sortable.directive';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [PackagesService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class PackagesComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  editableTable: any;
  selectServices: string[];
  selectStatus: string[];

  @ViewChildren(PackagesSortableDirective) headers: QueryList<PackagesSortableDirective>;
  public isCollapsed = true;

  constructor(public service: PackagesService, private modalService: NgbModal) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Glenna Reichert', title: 'Glenna Reichert' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: editableTable,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
    },
  };

  ngOnInit() {
   this.selectServices = ['Home Laboratory Test', 'Home Physical Theraphy', 'Home Nursing Services', 'Home Visit Doctor', 'COVID-19 Test (PCR) at Home', 'Ambulance Transport'];
   this.selectStatus = ['New', 'In Progress', 'Completed', 'Cancelled'];
    /**
     * fetch data
     */
    this._fetchData();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }


  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = tableData;
    this.editableTable = editableTable;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

   /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
    extraLarge(exlargeModal: any) {
      this.modalService.open(exlargeModal, { size: 'md', centered: true, scrollable: true });
    }

}
