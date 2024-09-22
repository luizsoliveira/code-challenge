import React from 'react';

export function Summary({ people }) {
  const peopleInEvent = people.filter((p) => p.checkInDate && !p.checkOutDate);

  const peopleByCompany = peopleInEvent.reduce((acc, person) => {
    const company = person.companyName || 'Unknown';
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  const notCheckedIn = people.filter((p) => !p.checkInDate).length;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded bg-gray-800 p-4">
          <p className="text-xl font-semibold">
            People in the event right now:
          </p>
          <p className="text-3xl font-bold">{peopleInEvent.length}</p>
        </div>
        <div className="rounded bg-gray-800 p-4">
          <p className="text-xl font-semibold">
            People by company in the event right now:
          </p>
          <p>
            {Object.entries(peopleByCompany)
              .map(([company, count]) => `${company} (${count})`)
              .join(', ')}
          </p>
        </div>
        <div className="rounded bg-gray-800 p-4">
          <p className="text-xl font-semibold">People not checked in:</p>
          <p className="text-3xl font-bold">{notCheckedIn}</p>
        </div>
      </div>
    </div>
  );
}
