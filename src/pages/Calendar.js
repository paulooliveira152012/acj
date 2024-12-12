import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Calendar styling
import "../styles/Calendar.css";
import axios from "axios";
import "../styles/style.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date is selected
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]); // State to store all appointments
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carDetails: { make: "", model: "", year: "", licensePlate: "" },
    time: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle form visibility
  const [isScheduleVisible, setIsScheduleVisible] = useState(false); // To toggle schedule visibility
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); //To toggle appointment edit visibility
  const [dailyAppointments, setDailyAppointments] = useState([]); // Appointments for the selected day
  const [isChangingDateTime, setIsChangingDateTime] = useState(false);
  const [clickedAppointmentId, setClickedAppointmentId] = useState(null);
  const appointmentDetailsRef = useRef(null);

  // Function to generate time slots between 8 AM and 5 PM
  const generateTimeSlots = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      times.push(time);
    }
    return times;
  };

  // Fetch all appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/appointments/all"
        );
        console.log("Fetched appointments from backend:", response.data);
        setAppointments(response.data); // Store all appointments
      } catch (err) {
        console.error("Error fetching all appointments:", err);
      }
    };

    fetchAllAppointments();
  }, []);

  // Fetch available times and appointments for the selected date
  useEffect(() => {
    if (!selectedDate) return; // Avoid fetching until a date is selected

    const fetchDailyAppointments = async () => {
      try {
        const date = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        const response = await axios.get(
          `http://localhost:5001/api/appointments/all`
        );
        console.log("Fetched appointments from backend:", response.data);

        // Filter appointments for the selected date
        const filteredAppointments = response.data.filter(
          (appointment) =>
            new Date(appointment.appointment.date)
              .toISOString()
              .split("T")[0] === date
        );

        console.log(
          "Appointments for the selected date:",
          filteredAppointments
        );

        const takenTimes = filteredAppointments.map(
          (appointment) => appointment.appointment.time
        );
        const allTimes = generateTimeSlots(8, 17);
        const freeTimes = allTimes.filter((time) => !takenTimes.includes(time));

        setDailyAppointments(filteredAppointments); // Store filtered appointments
        setAvailableTimes(freeTimes);
        setIsScheduleVisible(true);
      } catch (err) {
        console.error("Error fetching daily appointments:", err);
      }
    };

    fetchDailyAppointments();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsScheduleVisible(false); // Ensure schedule is hidden until appointments are fetched
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("carDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        carDetails: { ...prev.carDetails, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "time" && value) {
      setIsFormVisible(true);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setFormData((prev) => ({ ...prev, time: "" })); // Reset the selected time
    setIsEditFormVisible(false);
  };

  const handleCloseSchedule = () => {
    setIsScheduleVisible(false);
    setAvailableTimes([]); // Clear the schedule times
  };

  const handleSubmit = async (id) => {
    console.log("Submitting form with ID:", id);

    try {
      const data = {
        ...formData,
        appointment: {
          date: formData.appointment?.date || selectedDate, // Ensure date is set
          time: formData.time,
          service: "Car Drop-Off",
        },
      };

      if (isEditFormVisible) {
        console.log("Editing appointment with ID:", id);
        if (!id) {
          alert("Appointment ID is missing. Cannot update.");
          return;
        }
        console.log("Editing appointment with ID:", id);

        const response = await axios.put(
          `http://localhost:5001/api/appointments/edit/${id}`,
          data
        );
        alert("Appointment updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/appointments/newAppointment",
          data
        );
        alert("Appointment saved successfully!");
      }

      // Reset form and close form
      setFormData({
        name: "",
        phone: "",
        email: "",
        carDetails: { make: "", model: "", year: "", licensePlate: "" },
        time: "",
      });
      setIsFormVisible(false);
      setIsEditFormVisible(false);

      // Refresh appointments
      const refreshedAppointments = await axios.get(
        "http://localhost:5001/api/appointments/all"
      );
      setAppointments(refreshedAppointments.data);
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("Failed to save the appointment.");
    }
  };

  // Highlight dates with existing appointments and add available slots count
  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const appointmentsForDate = appointments.filter(
      (appointment) =>
        new Date(appointment.appointment.date).toISOString().split("T")[0] ===
        dateString
    );
    const takenTimes = appointmentsForDate.map(
      (appointment) => appointment.appointment.time
    );
    const allTimes = generateTimeSlots(8, 17);
    const freeTimesCount = allTimes.length - takenTimes.length;

    if (freeTimesCount === 0) {
      return "fully-booked-date"; // Apply red background for fully booked dates
    }
    return appointmentsForDate.length > 0 ? "highlighted-date" : null; // Highlight if there are appointments
  };

  const tileContent = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const appointmentsForDate = appointments.filter(
      (appointment) =>
        new Date(appointment.appointment.date).toISOString().split("T")[0] ===
        dateString
    );
    const takenTimes = appointmentsForDate.map(
      (appointment) => appointment.appointment.time
    );
    const allTimes = generateTimeSlots(8, 17);
    const freeTimesCount = allTimes.length - takenTimes.length;

    return freeTimesCount > 0 ? (
      <div className="available-slots">
        <span className="availableSlots">{freeTimesCount} slots</span>
      </div>
    ) : null;
  };

  const handleEditAppointment = (id) => {
    console.log("Editing appointment for ID:", id);
    console.log("formData:", formData);

    // Find the appointment by ID
    const appointmentToEdit = appointments.find(
      (appointment) => appointment._id === id
    );

    if (appointmentToEdit) {
      // Set formData with the selected appointment's details
      setFormData({
        _id: appointmentToEdit._id, // Include the _id field
        name: appointmentToEdit.name,
        phone: appointmentToEdit.phone,
        email: appointmentToEdit.email,
        carDetails: {
          make: appointmentToEdit.carDetails.make,
          model: appointmentToEdit.carDetails.model,
          year: appointmentToEdit.carDetails.year,
          licensePlate: appointmentToEdit.carDetails.licensePlate,
        },
        time: appointmentToEdit.appointment.time,
        appointment: {
          date: new Date(appointmentToEdit.appointment.date), // Populate the date
        },
      });

      setIsEditFormVisible(true); // Show the edit form
    } else {
      console.error("Appointment not found");
    }
  };

  const cancelAppointment = async (id) => {
    try {
      // Log the appointment ID for debugging
      console.log("Canceling appointment:", id);

      // Define the API endpoint for canceling the appointment
      const response = await fetch(
        `http://localhost:5001/api/appointments/cancel/${id}`,
        {
          method: "DELETE", // or "PUT" if you want to mark it as canceled instead of deleting
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Log success message
      console.log("Appointment canceled successfully:", data);

      // Optionally update the UI or state
      // For example, remove the appointment from a list
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      // Log error
      console.error("Failed to cancel appointment:", error);
    }
  };

  const displayButtons = () => {
    console.log("displaying button");
  };

  const toggleAppointmentDetails = (id, ref) => {
    setClickedAppointmentId((prevId) => (prevId === id ? null : id));
    appointmentDetailsRef.current = ref;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the selected appointment-details
      if (
        appointmentDetailsRef.current &&
        !appointmentDetailsRef.current.contains(event.target)
      ) {
        setClickedAppointmentId(null); // Hide the buttons
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-page">
      <h1>Schedule Your Car Drop-Off</h1>
      <div className="calendarContainer">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName} // Apply custom styling to tiles
          tileContent={tileContent} // Add available slots
        />
      </div>

      {isScheduleVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer">
            <span className="closeButton" onClick={handleCloseSchedule}>
              X
            </span>
            <h2>Available Times</h2>
            <div className="scheduleContainer">
              {generateTimeSlots(8, 17).map((time) => {
                const appointment = dailyAppointments.find(
                  (appt) => appt.appointment.time === time
                );
                return (
                  <div key={time} className="time-slot-wrapper">
                    <button
                      className={`time-slot ${appointment ? "taken-slot" : ""}`}
                      onClick={() => {
                        if (!appointment) {
                          setFormData((prev) => ({
                            ...prev,
                            time,
                          }));
                          setIsFormVisible(true);
                        }
                      }}
                      disabled={!!appointment} // Disable if slot is taken
                    >
                      {time}
                    </button>
                    {appointment && (
                      <div
                        className="appointment-details"
                        ref={
                          clickedAppointmentId === appointment._id
                            ? appointmentDetailsRef
                            : null
                        }
                        onClick={(e) =>
                          toggleAppointmentDetails(
                            appointment._id,
                            e.currentTarget
                          )
                        }
                      >
                        {/* Client info */}
                        <div>
                          <p>{appointment.name}</p>
                          <p>{appointment.phone}</p>
                          
                        </div>

                        {/* Car details */}
                        <div>
                          <p>
                            {appointment.carDetails.make}{" "}
                            {appointment.carDetails.model}{" "}
                            {appointment.carDetails.year}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div
                          className={`changeButtonContainer ${
                            clickedAppointmentId === appointment._id
                              ? "visible"
                              : ""
                          }`}
                        >
                          <button
                            onClick={() =>
                              handleEditAppointment(appointment._id)
                            }
                            className="editButton"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="cancelButton"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer">
            <span className="closeButton" onClick={handleCloseForm}>
              X
            </span>
            <h2>Enter Your Information</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
              <input
                type="text"
                name="carDetails.make"
                value={formData.carDetails.make}
                onChange={handleChange}
                placeholder="Car Make (e.g., Toyota)"
                required
              />
              <input
                type="text"
                name="carDetails.model"
                value={formData.carDetails.model}
                onChange={handleChange}
                placeholder="Car Model (e.g., Corolla)"
                required
              />
              <input
                type="number"
                name="carDetails.year"
                value={formData.carDetails.year}
                onChange={handleChange}
                placeholder="Car Year (e.g., 2018)"
                required
              />
              <input
                type="text"
                name="carDetails.licensePlate"
                value={formData.carDetails.licensePlate}
                onChange={handleChange}
                placeholder="License Plate"
                required
              />
              <button type="submit">Save Appointment</button>
            </form>
          </div>
        </div>
      )}

      {isEditFormVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer">
            {console.log("formData at render:", formData)}{" "}
            {/* Debug formData */}
            <span className="closeButton" onClick={handleCloseForm}>
              X
            </span>
            <h2>Edit Information</h2>
            {/* <form onSubmit={handleSubmit}> */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!formData._id) {
                  console.error("Error: Missing appointment ID.");
                  alert("Unable to save changes. Missing appointment ID.");
                  return;
                }
                handleSubmit(formData._id);
              }}
            >
              <h3>
                Scheduled Date:{" "}
                {formData.appointment.date?.toLocaleDateString()} at{" "}
                {formData.time || "Not Set"}
              </h3>

              {/* Change Date/Time Button */}
              <button type="button" onClick={() => setIsChangingDateTime(true)}>
                Change Date and Time
              </button>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
              <input
                type="text"
                name="carDetails.make"
                value={formData.carDetails.make}
                onChange={handleChange}
                placeholder="Car Make (e.g., Toyota)"
                required
              />
              <input
                type="text"
                name="carDetails.model"
                value={formData.carDetails.model}
                onChange={handleChange}
                placeholder="Car Model (e.g., Corolla)"
                required
              />
              <input
                type="number"
                name="carDetails.year"
                value={formData.carDetails.year}
                onChange={handleChange}
                placeholder="Car Year (e.g., 2018)"
                required
              />
              <input
                type="text"
                name="carDetails.licensePlate"
                value={formData.carDetails.licensePlate}
                onChange={handleChange}
                placeholder="License Plate"
                required
              />

              <button type="submit">Save Appointment</button>
            </form>
          </div>
        </div>
      )}

      {/* Full-Screen Calendar Overlay */}
      {isChangingDateTime && (
        <div className="fullScreenOverlay">
          <div className="overlayContent">
            <span
              className="closeButton"
              onClick={() => setIsChangingDateTime(false)}
            >
              X
            </span>
            <h3>Select a New Date</h3>
            <Calendar
              onChange={(date) => {
                setFormData((prev) => ({
                  ...prev,
                  appointment: { ...prev.appointment, date },
                }));
              }}
              value={formData.appointment?.date || new Date()}
            />

            <h3>Select a New Time</h3>
            <div className="time-slot-container">
              {generateTimeSlots(8, 17).map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    dailyAppointments.find(
                      (appt) =>
                        appt.appointment.time === time &&
                        new Date(appt.appointment.date).toISOString() ===
                          formData.appointment.date.toISOString()
                    )
                      ? "taken-slot"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({
                      ...prev,
                      time,
                    }));
                    setIsChangingDateTime(false); // Close overlay after selecting time
                  }}
                  disabled={
                    !!dailyAppointments.find(
                      (appt) =>
                        appt.appointment.time === time &&
                        new Date(appt.appointment.date).toISOString() ===
                          formData.appointment.date.toISOString()
                    )
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
