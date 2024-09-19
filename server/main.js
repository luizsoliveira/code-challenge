import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';
import '../people/methods';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});

// Publishing collections
Meteor.publish('communities', () => Communities.find());

Meteor.publish('people', () => People.find());
