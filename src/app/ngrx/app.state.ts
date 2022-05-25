import {MembersState} from './state/members.state';
import {ActionReducerMap} from '@ngrx/store';
import {MembersReducer} from './reducer/members.reducer';
import {AccountState} from './state/account.state';
import {AccountReducer} from './reducer/account.reducer';


export class AppState {
  members: MembersState;
  account: AccountState;
}

export const appStateReducer: ActionReducerMap<AppState> = {
  members: MembersReducer,
  account: AccountReducer
};
