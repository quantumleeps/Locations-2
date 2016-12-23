import { Meteor } from 'meteor/meteor';

import { loadParties } from './imports/fixtures/parties';

import './imports/publications/parties';
import './imports/publications/locations';
import './imports/publications/data-groups';
import './imports/publications/data-points';
import './imports/publications/collected-data';
// import './imports/publications/bom-lines';

Meteor.startup(() => {
    loadParties();
});