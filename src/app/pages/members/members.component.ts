import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { finalize, map, take, takeUntil } from "rxjs/operators";
import { ListItem } from "../../common/models/list-item";
import { Observable, Subscription } from "rxjs";
import { Member } from "../../common/models/member";
import { MembersState } from "../../ngrx/state/members.state";
import { AppState } from "src/app/ngrx/app.state";
import { FetchMembers } from "../../ngrx/action/members.actions";

@Component({
  selector: "zi-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements OnInit, OnDestroy {
  listItems$: Observable<ListItem[]>;
  subscriptions: Subscription = new Subscription();
  selectedMember: ListItem;
  isLoading: boolean;

  constructor(private membersStore: Store<AppState>) {} // also in above we get app state...

  ngOnInit() {
    this.membersStore.dispatch(FetchMembers());

    this.listItems$ = this.membersStore.pipe(
      select((state) => state.members),
      map((membersState): ListItem[] => {
        this.isLoading = membersState.loading;
        return membersState.members.map((member) => {
          return {
            id: member.id,
            label: member.name,
          };
        });
      })
    );
  }

  memberSelected(member) {
    this.selectedMember = member;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
