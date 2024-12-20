import React from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

const mockCreatedEvents: Event[] = [
  { id: 1, title: "Community Picnic", date: "2024-07-15", location: "Central Park" },
  { id: 2, title: "Local Art Exhibition", date: "2024-08-01", location: "City Gallery" },
];

const mockAttendingEvents: Event[] = [
  { id: 3, title: "Charity Run", date: "2024-09-10", location: "Riverside Path" },
];

const UserProfile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hello, Jane Doe</h1>
      <p className="text-gray-600 mb-8">Email: jane.doe@example.com</p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Created Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCreatedEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.date} • {event.location}</p>
                <div className="flex justify-between items-center">
                  <Link to={`/event/${event.id}`} className="text-blue-500 hover:text-blue-600 font-medium">
                    View Details
                  </Link>
                  <Link to={`/edit-event/${event.id}`} className="text-gray-500 hover:text-gray-600">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Events I'm Attending</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {mockAttendingEvents.map(event => (
            <div key={event.id} className="p-6 border-b last:border-b-0">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{event.date} • {event.location}</p>
              <Link to={`/event/${event.id}`} className="text-blue-500 hover:text-blue-600 font-medium">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

