import React from 'react';

export function EventSelector({
  communities,
  selectedEventId,
  setSelectedEventId,
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor="event-selector"
        className="mb-2 block text-lg font-medium"
      >
        Select an Event
      </label>
      <select
        id="event-selector"
        value={selectedEventId || ''}
        onChange={(e) => setSelectedEventId(e.target.value || null)}
        className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Please choose an event --</option>
        {communities.map((community) => (
          <option key={community._id} value={community._id}>
            {community.name}
          </option>
        ))}
      </select>
    </div>
  );
}
