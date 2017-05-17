import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';
import { HomeComponent } from './home/home.component';
import { LocationsListComponent } from './locations/locations-list.component';
import { LocationDetailsComponent } from './locations/location-details.component';
import { DataGroupDetailsComponent } from './data-groups/data-group-details.component';

export const routes: Route[] = [
    { path: '', component: PartiesListComponent },
    { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'home', component: HomeComponent},
    { path: 'configure', component: LocationsListComponent },
    { path: 'configure/:locationId', component: LocationDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'configure/:locationId/data-group/:dataGroupId', component: DataGroupDetailsComponent, canActivate: ['canActivateForLoggedIn'] },

];

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}]