import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PatientsRoutingModule } from './patients-routing.module';
import { ListSortableDirective } from './list/list-sortable.directive';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [AddComponent, ListComponent, DocumentsComponent, ListSortableDirective],
  imports: [
    CommonModule,
    PatientsRoutingModule,
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
export class PatientsModule { }
