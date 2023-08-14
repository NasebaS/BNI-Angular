import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { PackagesComponent } from './packages/packages.component';
import { LabtestComponent } from './labtest/labtest.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddComponent
    },
    {
        path: 'packages',
        component: PackagesComponent
    },
	{
        path: 'labtest',
        component: LabtestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
