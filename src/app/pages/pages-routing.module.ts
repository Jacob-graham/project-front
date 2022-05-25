import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MembersComponent} from './members/members.component';
import {HierarchyComponent} from './hierarchy/hierarchy.component';
import {PagesComponent} from './pages.component';


const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'hierarchy/:id',
        component: HierarchyComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'members'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
