import React from 'react';
import { PeopleTableRow } from './PeopleTableRow';

export function PeopleTableList({ people }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full rounded bg-gray-800 text-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Full Name
            </th>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Company
            </th>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Title
            </th>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Check-in Date
            </th>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Check-out Date
            </th>
            <th className="border-b border-gray-700 px-4 py-3 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PeopleTableRow key={person._id} personId={person._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
