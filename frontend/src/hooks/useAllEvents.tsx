import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Event } from "../types";

interface UseAllEventsReturn {
  events: Event[] | undefined; // null if no data yet
  loading: boolean;
}

const useAllEvents = (): UseAllEventsReturn => {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllEvents() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:3000/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res) {
          throw new Error("Error");
        }
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getAllEvents();
  }, [navigate]);

  return { events, loading };
};

export default useAllEvents;
