import {createAction, props} from '@ngrx/store';
import {Member} from '../../common/models/member';


// Fetch Members
export const FetchMembers = createAction(
  '[Members] FETCH_MEMBERS'
);
export const FetchMembersSuccess = createAction(
  '[Members] FETCH_MEMBERS_SUCCESS',
  props<{ total: number, members: Array<Member> }>()
);
export const FetchMembersFailure = createAction('[Family] FETCH_MEMBERS_FAILURE');
