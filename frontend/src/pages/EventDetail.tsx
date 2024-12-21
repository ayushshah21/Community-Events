import React from "react";
import { useParams, Link } from "react-router-dom";
import useEventDetails from "../hooks/useEventDetails";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { eventDetails, loading } = useEventDetails({ id: id || "" });
  const isAttending = false;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!eventDetails)
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 mb-4 inline-block text-2xl"
        >
          &larr; Back to Events
        </Link>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="flex justify-center items-center text-3xl font-bold text-slate-900">
            This event does not exist
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
      >
        &larr; Back to Events
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{eventDetails.name}</h1>
          <p className="text-gray-600 mb-4">
            <span className="mr-4">
              {new Date(eventDetails.eventDate).toLocaleDateString()}
            </span>
            <span>{eventDetails.location}</span>
          </p>
          <p className="text-gray-700 mb-6">{eventDetails.description}</p>
          <p className="text-gray-600 mb-4">
            Hosted by:{" "}
            {eventDetails.creator.firstName +
              " " +
              eventDetails.creator.lastName}
          </p>
          <button
            // onClick={handleAttendance}
            className={`${
              isAttending
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {eventDetails.attendees.find(
              (user) => user.email === eventDetails.creator.email
            )
              ? "Cancel Attendance"
              : "Attend Event"}
          </button>
          <p className="mt-4 text-gray-600">
            {eventDetails.attendees.length} people attending
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
