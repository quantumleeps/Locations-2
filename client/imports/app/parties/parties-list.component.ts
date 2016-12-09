import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
 
import template from './parties-list.component.html';
 
@Component({
  selector: 'parties-list',
  template
})
export class PartiesListComponent implements OnInit, OnDestroy {
  parties: Observable<Party[]>;
  partiesSub: Subscription;

  ngOnInit() {
    this.parties = Parties.find({}).zone();
    this.partiesSub = MeteorObservable.subscribe('parties').subscribe();
  }
 
  constructor() {
    this.parties = Parties.find({}).zone();
  }
 
  removeParty(party: Party): void {
    Parties.remove(party._id);
  }

    ngOnDestroy() {
    this.partiesSub.unsubscribe();
  }

  search(value: string): void {
    this.parties = Parties.find(value ? { location: value } : {}).zone();
  }
}