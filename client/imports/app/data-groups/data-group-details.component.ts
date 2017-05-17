import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { DataGroups } from '../../../../both/collections/data-groups.collection';
import { DataGroup } from '../../../../both/models/data-groups.model';

import template from './data-group-details.component.html';

@Component({
  selector: 'data-group-details',
  template
})
export class DataGroupDetailsComponent implements OnInit, OnDestroy {
  dataGroupId: string;
  paramsSub: Subscription;
  dataGroup: DataGroup;
  dataGroupSub: Subscription;
  invisible: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['dataGroupId'])
      .subscribe(dataGroupId => {
        this.dataGroupId = dataGroupId;
        
        if (this.dataGroupSub) {
          this.dataGroupSub.unsubscribe();
        }

        this.dataGroupSub = MeteorObservable.subscribe('data-group', this.dataGroupId).subscribe(() => {
          this.dataGroup = DataGroups.findOne(this.dataGroupId);
        });
      });
      
  }


  saveDataGroup() {
    if (!Meteor.userId()) {
      alert('Please log in to change this data group');
      return;
    }
    
    DataGroups.update(this.dataGroup._id, {
      $set: {
        name: this.dataGroup.name,
      }
    });
    this.router.navigate(['/configure'])

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.dataGroupSub.unsubscribe();
  }
}