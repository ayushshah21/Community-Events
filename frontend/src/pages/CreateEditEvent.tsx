import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { NewEvent } from "../types";
import axios from "axios";
import { useUserContext } from "../context/useUserContext";

const CreateEditEvent: React.FC = () => {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("HI");
    if (!name || !description || !location || !eventDate) {
      alert("Please fill out all fields");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const creatorId = user?.id;
    const parsedDate = new Date(eventDate);
    try{
        const res = await axios.post(
            "http://localhost:3000/events/create",
            {
              name,
              location,
              description,
              eventDate: parsedDate,
              creatorId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }
          );
          if(!res){
            throw new Error("Error");
        }
          navigate('/')
    }
    catch(err){
        console.log(err);
    }

  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Event Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Event Location"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Event Description"
            rows={4}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditEvent;
