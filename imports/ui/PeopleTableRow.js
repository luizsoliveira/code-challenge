import { CheckIcon, LogoutIcon } from '@heroicons/react/solid';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { People } from '../../people/people';

export function PeopleTableRow({ personId }) {
  const person = useTracker(() => People.findOne(personId), [personId]);

  const [timeSinceCheckIn, setTimeSinceCheckIn] = useState(0);

  useEffect(() => {
    let interval = null;
    if (person?.checkInDate && !person.checkOutDate) {
      interval = setInterval(() => {
        const diff = (new Date() - new Date(person.checkInDate)) / 1000;
        setTimeSinceCheckIn(diff);
      }, 1000);
    } else {
      setTimeSinceCheckIn(0);
    }
    return () => clearInterval(interval);
  }, [person]);

  const handleCheckIn = () => {
    Meteor.call('people.checkIn', person._id);
  };

  const handleCheckOut = () => {
    Meteor.call('people.checkOut', person._id);
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="px-4 py-3">
        {person.firstName} {person.lastName}
      </td>
      <td className="px-4 py-3">{person.companyName || 'N/A'}</td>
      <td className="px-4 py-3">{person.title || 'N/A'}</td>
      <td className="px-4 py-3">
        {person.checkInDate
          ? moment(person.checkInDate).format('MM/DD/YYYY, HH:mm')
          : 'N/A'}
      </td>
      <td className="px-4 py-3">
        {person.checkOutDate
          ? moment(person.checkOutDate).format('MM/DD/YYYY, HH:mm')
          : 'N/A'}
      </td>
      <td className="px-4 py-3">
        {!person.checkInDate && (
          <button
            className="flex items-center rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleCheckIn}
          >
            <CheckIcon className="mr-1 h-5 w-5" />
            Check-in {person.firstName} {person.lastName}
          </button>
        )}
        {person.checkInDate && !person.checkOutDate && timeSinceCheckIn > 5 && (
          <button
            className="flex items-center rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleCheckOut}
          >
            <LogoutIcon className="mr-1 h-5 w-5" />
            Check-out {person.firstName} {person.lastName}
          </button>
        )}
      </td>
    </tr>
  );
}
