import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FullEvent } from '../types';

interface EventDetails {
    eventDetails: FullEvent | undefined; // null if no data yet
    loading: boolean;
  }

const useEventDetails = ({id}: {id: string}): EventDetails => {
    const[eventDetails, setEventDetails] = useState<FullEvent>();
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getEventDetails(){
            try{
                const token = localStorage.getItem('token');
                if(!token){
                    navigate('/login');
                    return;
                }
                const res = await axios.get(`http://localhost:3000/events/${id}`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(!res){
                    throw new Error("Error");
                }
                console.log(res.data);
                setEventDetails(res.data);
            }
            catch(err){
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        getEventDetails();
    }, [id, navigate])

  return {eventDetails, loading};
}

export default useEventDetails