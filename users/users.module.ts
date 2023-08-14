import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersRoutingModule } from './users-routing.module';
import { ListSortableDirective } from './list/list-sortable.directive';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AddComponent, ListComponent, DocumentsComponent,ProfileComponent, ListSortableDirective],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    Ng2SmartTableModule,
	NgSelectModule
  ]
})
export class UsersModule { }
