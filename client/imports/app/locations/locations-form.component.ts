import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
 
import { Locations } from '../../../../both/collections/locations.collection';

import template from './locations-form.component.html';
 
@Component({
  selector: 'locations-form',
  template
})

@InjectUser('user')

export class LocationsFormComponent implements OnInit {
    addForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            country: ['', Validators.required],
            shortName: ['', Validators.required],
            public: [false]
        });
    }

    checkUserId(): void {
        console.log(Meteor.userId())
    }

    addLocation(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a Location');
            return;
        }


        if (this.addForm.valid) {
            Locations.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

            this.addForm.reset();
        }
    }
}