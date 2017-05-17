import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { DataGroups } from '../../../../both/collections/data-groups.collection';
import { DataGroup } from '../../../../both/models/data-group.model';
 
import template from './data-groups-list.component.html';
 
@Component({
  selector: 'data-groups-list',
  template
})
export class DataGroupsListComponent implements OnInit, OnDestroy {
  @Input() curLocation: string;
  dataGroups: Observable<DataGroup[]>;
  dataGroupSub: Subscription;


  ngOnInit() {
    this.dataGroups = DataGroups.find({locationId: this.curLocation}).zone();
    this.dataGroupSub = MeteorObservable.subscribe('data-groups').subscribe();
  }

  constructor() {
    this.dataGroups = DataGroups.find({locationId: this.curLocation}).zone();
  }
  
  

  removeDataGroup(dataGroup: DataGroup): void {
    DataGroups.remove(dataGroup._id);
  }

    ngOnDestroy() {
    this.dataGroupSub.unsubscribe();
    console.log(this.dataGroups)
  }

  // search(value: string): void {
  //   this.locations = DataGroups.find(value ? { location: value } : {}).zone();
  // }
}