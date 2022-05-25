import {createReducer, on} from '@ngrx/store';
import {initialMembersState} from '../state/members.state';
import {
  FetchMembers,
  FetchMembersFailure,
  FetchMembersSuccess,
} from '../action/members.actions';

export const MembersReducer = createReducer(
  initialMembersState,

  on(FetchMembers, state => ({...state, loading: true, loaded: false})),

  on(FetchMembersSuccess, (state, {total, members}) => ({...state, total, members, loaded: true, loading: false})),

  on(FetchMembersFailure, state => ({...state, loading: false, loaded: true}))
);
