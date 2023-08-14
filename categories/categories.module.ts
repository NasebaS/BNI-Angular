import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AddComponent } from './add/add.component';
import { PackagesComponent } from './packages/packages.component';
import { LabtestComponent } from './labtest/labtest.component';


@NgModule({
  declarations: [AddComponent, PackagesComponent, LabtestComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule,
	NgSelectModule
  ]
})
export class CategoriesModule { }
