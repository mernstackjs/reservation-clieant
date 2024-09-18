import { useState } from "react";
import { useParams } from "react-router-dom";

const MyReservation = () => {
  const { id, email } = useParams(); // Extract id and email from the URL parameters
  const [pin, setPin] = useState(""); // Initialize pin state
  const [error, setError] = useState(null); // State to capture any error
  const [reservation, setReservation] = useState(null); // State to hold reservation details
  console.log(id, email);
  // Function to handle tracking the reservation
  const handleTrack = async () => {
    setError(null); // Clear previous errors
    console.log("Tracking reservation with ID:", id, "and email:", email); // Debugging log
    console.log("Sending PIN:", pin); // Debugging log

    try {
      // Make a POST request to the backend
      const response = await fetch(
        `https://reservation-api-3ccd.onrender.com/api/reservation/track/${id}/${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pin }), // Send the pin as part of the body
        }
      );

      console.log("Response status:", response.status); // Debugging log
      console.log("Response headers:", response.headers); // Debugging log

      if (!response.ok) {
        // If response is not OK, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "Error tracking reservation");
      }

      const data = await response.json(); // Parse the response JSON
      setReservation(data.reservation); // Set the reservation data
      console.log("Reservation data:", data); // Debugging log
    } catch (err) {
      console.error("Error:", err); // Debugging log
      setError(err.message); // Set error message if any
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">My Reservation</h1>
      <p>
        <strong>Reservation ID:</strong> {id}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <p className="mt-4">Enter Your PIN to track:</p>
      <input
        type="text"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="border px-4 py-2 rounded w-full mt-2"
        placeholder="Enter PIN"
      />
      <button
        onClick={handleTrack}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Track
      </button>

      {/* Show reservation details if available */}
      {reservation && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-bold">Reservation Details:</h3>
          <p>
            <strong>Name:</strong> {reservation.name}
          </p>
          <p>
            <strong>Email:</strong> {reservation.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {reservation.phoneNumber}
          </p>
          <p>
            <strong>Number of People:</strong> {reservation.numberOfPeople}
          </p>
          <p>
            <strong>Status:</strong> {reservation.status}
          </p>
          <p>
            <strong>Special Requests:</strong> {reservation.specialRequests}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(reservation.reservationDate.start).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(reservation.reservationDate.end).toLocaleString()}
          </p>
        </div>
      )}

      {/* Show error message if any */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MyReservation;
