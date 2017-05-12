import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Locations } from '../../../../both/collections/locations.collection';
import { Location } from '../../../../both/models/location.model';
 
import template from './locations-list.component.html';
 
@Component({
  selector: 'locations-list',
  template
})
export class LocationsListComponent implements OnInit, OnDestroy {
  locations: Observable<Location[]>;
  locationsSub: Subscription;


  ngOnInit() {
    this.locations = Locations.find({}).zone();
    this.locationsSub = MeteorObservable.subscribe('locations').subscribe();
  }

  constructor() {
    this.locations = Locations.find({}).zone();
  }
 
  removeLocation(location: Location): void {
    Locations.remove(location._id);
  }

    ngOnDestroy() {
    this.locationsSub.unsubscribe();
  }

  // search(value: string): void {
  //   this.locations = Locations.find(value ? { location: value } : {}).zone();
  // }
}