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
  const [searchText, setSearchText] = useState('');

  const { communities, people, isLoading } = useTracker(() => {
    const handleCommunities = Meteor.subscribe('communities');
    const handlePeople = Meteor.subscribe('people');

    const loading = !handleCommunities.ready() || !handlePeople.ready();

    return {
      communities: Communities.find().fetch(),
      people: People.find().fetch(),
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

  // Processing client-side search filter considering fullName, company and title
  const filteredPeople = eventPeople.filter((person) => {
    const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
    const companyName = person.companyName
      ? person.companyName.toLowerCase()
      : '';
    const title = person.title ? person.title.toLowerCase() : '';
    const search = searchText.toLowerCase();

    return (
      fullName.includes(search) ||
      companyName.includes(search) ||
      title.includes(search)
    );
  });

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
            <div className="mb-4">
              <input
                type="search"
                placeholder="Search by name, company or title."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <PeopleTableList people={filteredPeople} />
          </>
        )}
      </div>
    </div>
  );
};
