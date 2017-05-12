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
    $or: [{
      // location is public
      public: true
    },
    // or
    { 
      // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  };

  if (locationId) {
    return {
      // only single location
      $and: [{
          _id: locationId
        },
        isAvailable
      ]
    };
  }

  return isAvailable;
}