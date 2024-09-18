import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateReservation() {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    reservationDateStart: "",
    reservationDateEnd: "",
    numberOfPeople: 1,
    specialRequests: "",
  });

  // State to track the loading state
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    try {
      const res = await fetch(
        "https://reservation-api-3ccd.onrender.com/api/reservation/make-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            reservationDate: {
              start: formData.reservationDateStart,
              end: formData.reservationDateEnd,
            },
            numberOfPeople: formData.numberOfPeople,
            specialRequests: formData.specialRequests,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Reservation created successfully!");
        navigate("/order");
      } else {
        alert("Error creating reservation: " + data.message);
      }
    } catch (error) {
      alert("Error creating reservation: " + error.message);
    } finally {
      setLoading(false); // End loading when request is complete
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Reservation Start Date Field */}
        <div>
          <label
            htmlFor="reservationDateStart"
            className="block text-sm font-medium text-gray-700"
          >
            Reservation Start Date
          </label>
          <input
            type="date"
            id="reservationDateStart"
            name="reservationDateStart"
            value={formData.reservationDateStart}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Reservation End Date Field */}
        <div>
          <label
            htmlFor="reservationDateEnd"
            className="block text-sm font-medium text-gray-700"
          >
            Reservation End Date
          </label>
          <input
            type="date"
            id="reservationDateEnd"
            name="reservationDateEnd"
            value={formData.reservationDateEnd}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Number of People Field */}
        <div>
          <label
            htmlFor="numberOfPeople"
            className="block text-sm font-medium text-gray-700"
          >
            Number of People
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Special Requests Field */}
        <div>
          <label
            htmlFor="specialRequests"
            className="block text-sm font-medium text-gray-700"
          >
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Reservation"}
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-indigo-500">Loading, please wait...</p>
        </div>
      )}
    </div>
  );
}
