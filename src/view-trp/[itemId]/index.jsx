import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseconfig'; // Import the db instance
import InfoSection from '../components/infoSection';

function ViewTrip() {
  const { itemId } = useParams();
  const [tripData, setTripData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (itemId) {
        try {
          const docRef = doc(db, 'AITrip', itemId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Check if tripData is a string before parsing
            if (typeof data.tripData === 'string') {
              data.tripData = JSON.parse(data.tripData); // Parse if it's a string
            }
            setTripData(data); // Set the trip data
          } else {
            toast.error('No Trip Data Found');
            setTripData(null); // Set tripData to null if no data is found
          }
        } catch (error) {
          console.error('Error fetching trip data:', error);
          setError(error);
          toast.error('Failed to fetch trip data');
        } finally {
          setLoading(false); // Set loading to false
        }
      }
    };

    fetchData();
  }, [itemId]);

  if (loading) {
    return <div style={{ paddingTop: '90px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ paddingTop: '90px' }}>Error: {error.message}</div>;
  }

  if (!tripData) {
    return <div style={{ paddingTop: '90px' }}>No trip data found.</div>;
  }

  return (
    <div style={{ paddingTop: '90px' }}>
      
      <InfoSection trip={tripData} /> {/* Pass tripData to InfoSection */}
    </div>
  );
}

export default ViewTrip;