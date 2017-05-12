import { Meteor } from 'meteor/meteor';
import { Locations } from '../../../both/collections/locations.collection';

Meteor.publish('locations', function() {
  return Locations.find(buildQuery.call(this));
});

Meteor.publish('locations', function(locationId: string) {
  return Locations.find(buildQuery.call(this, locationId));
});


function buildQuery(locationId?: string): Object {
  const isAvailable = {
    
  };

  if (locationId) {
    return {
      // only single party
      $and: [{
          _id: locationId
        },
        isAvailable
      ]
    };
  }

  return isAvailable;
}