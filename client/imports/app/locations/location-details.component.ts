import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Locations } from '../../../../both/collections/locations.collection';
import { Location } from '../../../../both/models/location.model';
import { DataGroupsListComponent } from '../data-groups/data-groups-list.component';

import template from './location-details.component.html';

@Component({
  selector: 'location-details',
  template
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  locationId: string;
  paramsSub: Subscription;
  location: Location;
  locationSub: Subscription;
  invisible: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['locationId'])
      .subscribe(locationId => {
        this.locationId = locationId;
        
        if (this.locationSub) {
          this.locationSub.unsubscribe();
        }

        this.locationSub = MeteorObservable.subscribe('location', this.locationId).subscribe(() => {
          this.location = Locations.findOne(this.locationId);
        });
      });
      
  }


  saveLocation() {
    if (!Meteor.userId()) {
      alert('Please log in to change this location');
      return;
    }
    
    Locations.update(this.location._id, {
      $set: {
        name: this.location.name,
        country: this.location.country,
        shortName: this.location.shortName
      }
    });
    this.router.navigate(['/configure'])

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.locationSub.unsubscribe();
  }
}