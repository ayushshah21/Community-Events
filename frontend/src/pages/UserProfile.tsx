import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import axios from "axios";
import { Event } from "../types";

const UserProfile: React.FC = () => {
  const { user } = useUserContext();
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserEvents() {
      try {
        const token = localStorage.getItem("token");
        if (!token || !user) return;

        // Fetch events created by the user
        const createdRes = await axios.get(
          `http://localhost:3000/events/created/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCreatedEvents(createdRes.data);

        // Fetch events the user is attending
        const attendingRes = await axios.get(
          `http://localhost:3000/events/attending/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendingEvents(attendingRes.data);
      } catch (err) {
        console.error("Error fetching user events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserEvents();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Hello, {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-600 mb-8">Email: {user.email}</p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Created Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {createdEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {new Date(event.eventDate).toLocaleDateString()} •{" "}
                  {event.location}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/event/${event.id}`}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/edit-event/${event.id}`}
                    className="text-gray-500 hover:text-gray-600"
                  >
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
          {attendingEvents.map((event) => (
            <div key={event.id} className="p-6 border-b last:border-b-0">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(event.eventDate).toLocaleDateString()} •{" "}
                {event.location}
              </p>
              <Link
                to={`/event/${event.id}`}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
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
