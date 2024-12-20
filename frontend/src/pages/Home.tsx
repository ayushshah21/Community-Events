import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAllEvents from '../hooks/useAllEvents';

export interface Event {
    id: string,
    creatorId: string,
    name: string
    title: string,
    description: string
    location: string
    eventDate: Date
}



const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const {events, loading} = useAllEvents();

if(loading){
    return <div>Loading...</div>
}
if (!events || events.length === 0) return <div>No events found</div>;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-64 px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <input
            type="date"
            className="w-full md:w-auto px-4 py-2 border rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <Link to="/create-event" className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 text-center">
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{new Date(event.eventDate).toLocaleDateString()} • {event.location}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <Link to={`/event/${event.id}`} className="text-blue-500 hover:text-blue-600 font-medium">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

