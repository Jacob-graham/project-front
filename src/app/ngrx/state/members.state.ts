import {Member} from '../../common/models/member';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Filters} from '../../common/models/filters';
import {AppConfig} from '../../app.config';


export interface MembersState {
  loading: boolean;
  loaded: boolean;
  total: number;
  members: Member[];
}

export const initialMembersState: MembersState = {
  loading: false,
  loaded: false,
  total: 0,
  members: []
};

export const membersFeatureSelector = createFeatureSelector<MembersState>('members');

export const getMembersSelector = createSelector(membersFeatureSelector, state => state.members);


