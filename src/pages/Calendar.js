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
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle form visibility
  const [isScheduleVisible, setIsScheduleVisible] = useState(false); // To toggle schedule visibility
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); //To toggle appointment edit visibility
  const [dailyAppointments, setDailyAppointments] = useState([]); // Appointments for the selected day
  const [isChangingDateTime, setIsChangingDateTime] = useState(false);
  const [clickedAppointmentId, setClickedAppointmentId] = useState(null);
  const appointmentDetailsRef = useRef(null);
  // displaying passwordModal
  const [enteredPassword, setEnteredPassword] = useState("");
  const [editAppointmentId, setEditAppointmentId] = useState(null);

  const adminPassword = "12345"; // Replace with your actual password logic

  const handleOpenPasswordModal = (id) => {
    setEditAppointmentId(id); // Save the ID of the appointment being edited
    setIsPasswordModalVisible(true); // Show the password modal
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === adminPassword) {
      setIsPasswordModalVisible(false); // Close the modal
      setEnteredPassword(""); // Clear the password field
      proceedToEditAppointment(editAppointmentId); // Proceed with editing
    } else {
      alert("Incorrect password. Access denied.");
      setEnteredPassword(""); // Clear the input
    }
  };

  const proceedToEditAppointment = (id) => {
    const appointmentToEdit = appointments.find(
      (appointment) => appointment._id === id
    );

    if (appointmentToEdit) {
      setFormData({
        _id: appointmentToEdit._id,
        name: appointmentToEdit.name,
        phone: appointmentToEdit.phone,
        email: appointmentToEdit.email,
        carDetails: appointmentToEdit.carDetails,
        time: appointmentToEdit.appointment.time,
        appointment: {
          date: new Date(appointmentToEdit.appointment.date),
        },
      });

      setIsEditFormVisible(true);
    } else {
      console.error("Appointment not found");
    }
  };

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
    console.log("closing form");
    setIsFormVisible(false);
    setFormData((prev) => ({ ...prev, time: "" })); // Reset the selected time
    setIsEditFormVisible(false);
    // clean form
    setFormData({
      name: "",
      phone: "",
      email: "",
      carDetails: { make: "", model: "", year: "", licensePlate: "" },
      time: "",
    });
  };

  const handleCloseSchedule = () => {
    console.log("closing schedule");
    setIsScheduleVisible(false);
    setAvailableTimes([]); // Clear the schedule times
    setIsPasswordModalVisible(false);
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
            <div className="titleSessionCalendar">
              <h2>Schedule Availability</h2>
              {selectedDate && (
                <p className="selected-date">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            <div className="scheduleContainer">
              {generateTimeSlots(8, 17).map((time) => {
                const appointment = dailyAppointments.find(
                  (appt) => appt.appointment.time === time
                );

                // Create a Date object for the current slot
                const now = new Date(); // Current date and time
                const slotDateTime = new Date(selectedDate); // Base the slot date on the selected date
                const [hours, minutes] = time.split(":").map(Number);
                slotDateTime.setHours(hours, minutes, 0, 0); // Set the time of the slot

                // Check if the slot is in the past
                const isPastSlot = slotDateTime < now;

                return (
                  <div
                    key={time}
                    className={`time-slot-wrapper ${
                      appointment
                        ? "taken-slot"
                        : isPastSlot
                        ? "disabled-slot"
                        : ""
                    }`}
                    onClick={() => {
                      if (!appointment && !isPastSlot) {
                        setFormData((prev) => ({
                          ...prev,
                          time,
                        }));
                        setIsFormVisible(true);
                      }
                    }}
                  >
                    <button
                      className={`time-slot ${
                        appointment
                          ? "taken-slot"
                          : isPastSlot
                          ? "disabled-slot"
                          : ""
                      }`}
                      disabled={isPastSlot || !!appointment} // Disable if in the past or already taken
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
                              handleOpenPasswordModal(appointment._id)
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

      {isPasswordModalVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer enterPassword">
            <h2>Enter Admin Password</h2>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="modal-actions">
              <button onClick={handlePasswordSubmit}>Confirm</button>
              <button
                onClick={() => {
                  setIsPasswordModalVisible(false);
                  setEnteredPassword("");
                }}
                className="cancelBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer inputSession">
            <span className="closeButton" onClick={handleCloseForm}>
              X
            </span>
            <h2>Enter Your Information</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Personal info</h3>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <div className="formFlexLine">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className="flex1"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="flex2"
                  />
                </div>
              </div>

              <div>
                <h3>Vehicle info</h3>
              </div>

              <div className="formFlexLine">
                <div>
                  <input
                    type="text"
                    name="carDetails.make"
                    value={formData.carDetails.make}
                    onChange={handleChange}
                    placeholder="Car Make (e.g., Toyota)"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="carDetails.model"
                    value={formData.carDetails.model}
                    onChange={handleChange}
                    placeholder="Car Model (e.g., Corolla)"
                    required
                  />
                </div>
              </div>
              <div className="formFlexLine">
                <div>
                  <input
                    type="number"
                    name="carDetails.year"
                    value={formData.carDetails.year}
                    onChange={handleChange}
                    placeholder="Car Year (e.g., 2018)"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="carDetails.licensePlate"
                    value={formData.carDetails.licensePlate}
                    onChange={handleChange}
                    placeholder="License Plate"
                    required
                  />
                </div>
              </div>
              <button type="submit">save appointment</button>
            </form>
          </div>
        </div>
      )}

      {isEditFormVisible && (
        <div className="infoParentContainer">
          <div className="infoChildContainer inputSession">
            <span className="closeButton" onClick={handleCloseForm}>
              X
            </span>
            <h2>Edit Information</h2>

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
              <div>
                <h3>
                  Scheduled Date:{" "}
                  {formData.appointment.date?.toLocaleDateString()} at{" "}
                  {formData.time || "Not Set"}
                </h3>
              </div>

              {/* Change Date/Time Button */}
              <button
                className="changeDateBtn"
                type="button"
                onClick={() => setIsChangingDateTime(true)}
              >
                Change Date and Time
              </button>

              <div>
                {/* <h3>Personal info</h3> */}
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
                <div className="formFlexLine">
                  <div>
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      required
                      className="flex1"
                    />
                  </div>

                  <div className="flex2">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                    />
                  </div>
                </div>
              </div>

              {/* <div>
                <h3>Vehicle info</h3>
              </div> */}

              <div className="formFlexLine">
                <div>
                  <label>Car Make (e.g., Toyota)</label>
                  <input
                    type="text"
                    name="carDetails.make"
                    value={formData.carDetails.make}
                    onChange={handleChange}
                    placeholder="Car Make (e.g., Toyota)"
                    required
                  />
                </div>
                <div>
                  <label>Car Model (e.g., Corolla)</label>
                  <input
                    type="text"
                    name="carDetails.model"
                    value={formData.carDetails.model}
                    onChange={handleChange}
                    placeholder="Car Model (e.g., Corolla)"
                    required
                  />
                </div>
              </div>

              <div className="formFlexLine">
                <div>
                  <label>Car Year (e.g., 2018)</label>
                  <input
                    type="number"
                    name="carDetails.year"
                    value={formData.carDetails.year}
                    onChange={handleChange}
                    placeholder="Car Year (e.g., 2018)"
                    required
                  />
                </div>
                <div>
                  <label>License Plate</label>
                  <input
                    type="text"
                    name="carDetails.licensePlate"
                    value={formData.carDetails.licensePlate}
                    onChange={handleChange}
                    placeholder="License Plate"
                    required
                  />
                </div>
              </div>

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

                // Update dailyAppointments for the selected date
                const selectedDateAppointments = appointments.filter(
                  (appt) =>
                    new Date(appt.appointment.date)
                      .toISOString()
                      .split("T")[0] === date.toISOString().split("T")[0]
                );
                setDailyAppointments(selectedDateAppointments); // Update state
              }}
              value={formData.appointment?.date || new Date()}
              tileClassName={tileClassName} // Apply custom styling to tiles
              tileContent={tileContent} // Add available slots
            />

            <h3>Select a New Time</h3>
            <div className="time-slot-container">
              {generateTimeSlots(8, 17).map((time) => {
                const isTaken = dailyAppointments.some(
                  (appt) => appt.appointment.time === time
                );

                          // Parse time slot into a full Date object for comparison
          const now = new Date();
          const selectedDate = formData.appointment?.date || new Date();
          const slotDateTime = new Date(selectedDate);
          const [hours, minutes] = time.split(":").map(Number);
          slotDateTime.setHours(hours, minutes, 0, 0);

          // Determine if the slot is in the past
          const isPastSlot = slotDateTime < now;


                return (
                  <button
                    key={time}
                    className={`time-slot ${
                       isTaken ? "taken-slot" : isPastSlot ? "disabled-slot" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isTaken && !isPastSlot) {
                        setFormData((prev) => ({
                          ...prev,
                          time,
                        }));
                        setIsChangingDateTime(false); // Close overlay after selecting time
                      }
                    }}
                    disabled={isTaken || isPastSlot} // Disable past or taken slots
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

/* 
TODO:
  prevent empty time slots from being clicled at past days 

*/
