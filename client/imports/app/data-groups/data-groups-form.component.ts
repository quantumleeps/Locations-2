import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
 
import { DataGroups } from '../../../../both/collections/data-groups.collection';

import template from './data-groups-form.component.html';
 
@Component({
  selector: 'data-groups-form',
  template
})

@InjectUser('user')

export class DataGroupsFormComponent implements OnInit {
    @Input() curLocation: string;

    addForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    checkUserId(): void {
        console.log(Meteor.userId())
    }

    addDataGroup(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a data group');
            return;
        }


        if (this.addForm.valid) {
            var tempVal = this.addForm.value;
            tempVal['locationId'] = this.curLocation;
            DataGroups.insert(Object.assign({}, tempVal, { owner: Meteor.userId() }));

            this.addForm.reset();
        }
    }
}