import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../common/models/member';

@Component({
  selector: 'zi-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() identity: Member;

  constructor() { }

  ngOnInit() {
  }

}
