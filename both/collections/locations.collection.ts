import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Location } from '../models/location.model';
 
export const Locations = new MongoObservable.Collection<Location>('locations');

function loggedIn() {
    return !!Meteor.user();
}

Locations.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
})