import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  creator: string;
  attendees: number;
}

const mockEvent: Event = {
  id: 1,
  title: "Community Picnic",
  date: "2024-07-15",
  time: "12:00 PM",
  location: "Central Park",
  description: "Join us for a fun day out with food, games, and great company! Bring your favorite dish to share and enjoy the summer weather with your neighbors.",
  creator: "Jane Doe",
  attendees: 30
};

const EventDetail: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams<{ id: string }>();
  const [isAttending, setIsAttending] = useState(false);

  // In a real app, you'd fetch the event details based on the id
  const event = mockEvent;

  const handleAttendance = () => {
    setIsAttending(!isAttending);
    // In a real app, you'd update the attendance status on the server
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:text-blue-600 mb-4 inline-block">
        &larr; Back to Events
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">
            <span className="mr-4">{event.date} at {event.time}</span>
            <span>{event.location}</span>
          </p>
          <p className="text-gray-700 mb-6">{event.description}</p>
          <p className="text-gray-600 mb-4">Hosted by: {event.creator}</p>
          <button
            onClick={handleAttendance}
            className={`${
              isAttending
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isAttending ? 'Cancel Attendance' : 'Attend Event'}
          </button>
          <p className="mt-4 text-gray-600">{event.attendees} people attending</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

