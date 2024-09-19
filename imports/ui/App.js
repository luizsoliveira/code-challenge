import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { People } from '../../people/people';
import { Communities } from '../../communities/communities';

import { EventSelector } from './EventSelector';
import { PeopleTableList } from './PeopleTableList';
import { Summary } from './Summary';

export const App = () => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const { communities, people, isLoading } = useTracker(() => {
    const handleCommunities = Meteor.subscribe('communities');
    const handlePeople = Meteor.subscribe('people');

    const loading = !handleCommunities.ready() || !handlePeople.ready();

    const communitiesCollection = Communities.find().fetch();
    const peopleCollection = People.find().fetch();

    return {
      communities: communitiesCollection,
      people: peopleCollection,
      isLoading: loading,
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const selectedEvent = communities.find((c) => c._id === selectedEventId);
  const eventPeople = people.filter((p) => p.communityId === selectedEventId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto p-4">
        <EventSelector
          communities={communities}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
        />
        {selectedEvent && (
          <>
            <Summary people={eventPeople} />
            <PeopleTableList people={eventPeople} />
          </>
        )}
      </div>
    </div>
  );
};
