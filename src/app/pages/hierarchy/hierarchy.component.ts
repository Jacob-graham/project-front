import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../services/members.service';
import {catchError, finalize, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'zi-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {

  hierarchy = [];
  showLoader: boolean;
  emptyState = {
    show: false,
    text: 'No Data'
  };
  memberId: number;

  constructor(private router: Router,
              private membersService: MembersService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.memberId = this.activatedRoute.snapshot.params.id;
    this.showLoader = true;
    this.membersService.getHierarchyForMember(this.memberId)
      .pipe(
        finalize(() => this.showLoader = false),
        tap((hierarchy: any[]) => {
          this.hierarchy = hierarchy;
          if (!_.get(this.hierarchy, 'length')) {
            this.emptyState = {show: true, text: `No hierarchy found for member ID: ${this.memberId}`};
          }
        }),
        catchError((err) => {
          const errMessage = _.get(err, 'error', '');
          let emptyStateText = `Failed to bring hierarchy for member ID: ${this.memberId}, Error: ${errMessage}`;
          if (err.status === 401) {
            emptyStateText = `You are not authorized to view the hierarchy for member ID: ${this.memberId}`;
          }
          this.emptyState = {
            text: emptyStateText,
            show: true
          };
          return of();
        })
      )
      .subscribe();
  }

  goBackButtonClick() {
    this.router.navigate(['./app/pages/members']);
  }

}
