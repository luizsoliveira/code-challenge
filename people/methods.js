import { Meteor } from 'meteor/meteor';
import { People } from './people';
import { check } from 'meteor/check';

Meteor.methods({
  'people.checkIn'(personId) {
    check(personId, String);
    People.updateAsync(personId, {
      $set: { checkInDate: new Date(), checkOutDate: null },
    });
  },
  'people.checkOut'(personId) {
    check(personId, String);
    People.updateAsync(personId, {
      $set: { checkOutDate: new Date() },
    });
  },
});
