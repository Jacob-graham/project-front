import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ListItem } from "../../../common/models/list-item";
import { Subscription } from "rxjs";
import { Member } from "src/app/common/models/member";

@Component({
  selector: "zi-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: Array<ListItem> = [];
  @Input() selectedItem: ListItem;
  @Input() showLoader: boolean;
  @Input() headerText: string;
  @Output() itemSelected = new EventEmitter<ListItem>();
  subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    console.log("list items = ", this.items);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes = ", changes);
    console.log("list items = ", this.items);
  }

  selectItem(item: ListItem) {
    this.itemSelected.emit(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
