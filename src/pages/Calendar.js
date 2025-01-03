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
    carDetails: {
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      details: "",
    },
    time: "",
  });
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle form visibility
  const [isScheduleVisible, setIsScheduleVisible] = useState(false); // To toggle schedule visibility
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); //To toggle appointment edit visibility

  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false); //to display info modal for car appointment detail
  const [dailyAppointments, setDailyAppointments] = useState([]); // Appointments for the selected day
  const [isChangingDateTime, setIsChangingDateTime] = useState(false);
  const [clickedAppointmentId, setClickedAppointmentId] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);
  const [hoveredAppointmentId, setHoveredAppointmentId] = useState(null); //track whcih appointment is being hovered

  const appointmentDetailsRef = useRef(null);
  const detailModalRef = useRef(null);
  // displaying passwordModal
  const [enteredPassword, setEnteredPassword] = useState("");
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [isAppointmentSet, setIsAppointmentSet] = useState(false); //to know when to display ? icon with info

  const adminPassword = "12345"; // Replace with your actual password logic


  // utility to determine whether or not to use production
  const getApiUrl = (endpoint) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : "http://localhost:5001";
    return `${baseUrl}${endpoint}`;
  };
  

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);

      // Ensure buttons are always displayed on larger screens
      if (window.innerWidth >= 650) {
        const allButtons = document.getElementsByClassName(
          "changeButtonContainer"
        );
        Array.from(allButtons).forEach((button) => {
          button.style.display = "block";
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect if the device supports touch (for ipad/touch devices)
  // Utility function to detect touch devices
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

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
        details: appointmentToEdit.appointment.deetails,
        appointment: {
          date: new Date(appointmentToEdit.appointment.date),
        },
      });

      setIsEditFormVisible(true);
    } else {
      console.error("Appointment not found");
    }
  };

  const generateTimeSlots = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
      const baseTime = `${formattedHour}:00 ${period}`;

      // Push aligned times (pad to a consistent length, e.g., 8 characters)
      times.push(baseTime.padStart(8, " "));
    }
    return times;
  };

  // Example Usage
  const timeSlots = generateTimeSlots(8, 17); // From 8:00 AM to 5:00 PM
  // console.log(timeSlots.join("\n")); // Print them aligned

  // Fetch all appointments when the component mounts
  useEffect(() => {
    const fetchAllAppointments = async () => {
      const api = getApiUrl("/api/appointments/all");

      try {
        const response = await axios.get(api);
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
      const api = getApiUrl("/api/appointments/all");

      try {
        const date = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        const response = await axios.get(api);
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
      carDetails: {
        make: "",
        model: "",
        year: "",
        licensePlate: "",
        details: "",
      },
      time: "",
    });
  };

  const handleCloseSchedule = () => {
    console.log("closing schedule");
    setIsScheduleVisible(false);
    setAvailableTimes([]); // Clear the schedule times
    setIsPasswordModalVisible(false);
  };

  const handleSubmit = async (id, e) => {
    // Prevent the form from reloading the page temporarely for debugging
    // if (e) {
    //   e.preventDefault();
    // }

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

      console.log("data:", data);

      if (isEditFormVisible) {
        console.log("Editing appointment with ID:", id);
        if (!id) {
          alert("Appointment ID is missing. Cannot update.");
          return;
        }
        console.log("Editing appointment with ID:", id);

        const api = getApiUrl(`/api/appointments/edit/${id}`);
        const response = await axios.put(api, data);
        alert("Appointment updated successfully!");
      } else {
        const api = getApiUrl("/api/appointments/newAppointment");
        const response = await axios.post(api, data);
        alert("Appointment saved successfully!");
      }

      // Reset form and close form
      setFormData({
        name: "",
        phone: "",
        email: "",
        carDetails: {
          make: "",
          model: "",
          year: "",
          licensePlate: "",
          details: "",
        },
        time: "",
      });
      setIsFormVisible(false);
      setIsEditFormVisible(false);

      // Refresh appointments
      const refreshedAppointments = await axios.get(
        getApiUrl("/api/appointments/all")
      );
      setAppointments(refreshedAppointments.data);
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("Failed to save the appointment.");
    }
  };

  // Highlight dates with existing appointments and add available slots count
  const tileClassName = ({ date }) => {
    const now = new Date();
    const dateString = date.toISOString().split("T")[0];

    // Check if the date is in the past
    const isPastDate = date < now.setHours(0, 0, 0, 0); // Compare with today's date at midnight

    if (isPastDate) {
      return "past-date"; // Add a CSS class for past dates
    }

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

    if (appointmentsForDate.length > 0) {
      return "highlighted-date"; // Highlight if there are appointments
    }
  
    // Check if the date is a Saturday or Sunday
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return "weekend-date"; // Add a CSS class for weekends
  }

  return null; // Default return

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
          details: appointmentToEdit.carDetails.details,
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

      const api = getApiUrl(`/api/appointments/cancel/${id}`);
      const response = await axios.delete(api);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Log success message
      console.log("Appointment canceled successfully:", data);

      const data = await response.json();
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

  const toggleAppointmentDetails = (id, ref) => {
    // Check if screen size is less than 650px
    if (window.innerWidth < 650) {
      setClickedAppointmentId((prevId) => (prevId === id ? null : id));

      console.log("Displaying buttons on smaller screens");

      // Find the `.changeButtonContainer` inside the clicked `.appointment-details`
      const buttons = ref.querySelector(".changeButtonContainer");

      if (buttons) {
        // Toggle the display property of the buttons using setProperty for !important
        const currentDisplay = window.getComputedStyle(buttons).display;

        if (currentDisplay === "block") {
          buttons.style.setProperty("display", "none", "important"); // Hide buttons
        } else {
          buttons.style.setProperty("display", "block", "important"); // Show buttons
        }
      }
    } else {
      console.log("Screen size is larger than 650px; no toggling applied.");
    }
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

  //  ? info icon
  // Toggle modal visibility
  const showModal = () => {
    console.log("Show modal");
    setIsInfoModalVisible(true); // Show the modal
  };

  const hideModal = () => {
    console.log("Hide modal");
    setIsInfoModalVisible(false); // Hide the modal
  };

  // Handle click outside the modal to close it (on touch devices)
  const handleOutsideClick = (e) => {
    if (detailModalRef.current && !detailModalRef.current.contains(e.target)) {
      hideModal();
    }
  };

  useEffect(() => {
    if (isTouchDevice() && isInfoModalVisible) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isInfoModalVisible]);

  // hover handlers based on id
  const handleMouseEnter = (id) => {
    setHoveredAppointmentId(id); // Set the hovered appointment's ID
  };

  const handleMouseLeave = () => {
    setHoveredAppointmentId(null); // Clear the hovered appointment's ID
  };

  const handleDisplayDetails = () => {
    console.log("before toggling:", isInfoModalVisible);
    setIsInfoModalVisible((prev) => !prev);
    console.log("After togling:", !isInfoModalVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("admToken"); // Clear token on logout
    window.location.href = "/"; // Redirect to the homepage
  };


  

  return (
    <div
    className={`calendar-page ${
      isFormVisible || isScheduleVisible || isEditFormVisible
        ? "modal-open"
        : ""
    }`}
  >
      <button className="logoutBtn" onClick={handleLogout}>
        Log Out
      </button>
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
                now.setSeconds(0, 0); // Reset seconds and milliseconds for precision

                const slotDateTime = new Date(selectedDate); // Base the slot date on the selected date
                const [hours, minutes, period] = time
                  .match(/(\d+):(\d+)\s(AM|PM)/)
                  .slice(1);
                let parsedHours = parseInt(hours, 10);
                if (period === "PM" && parsedHours !== 12) parsedHours += 12; // Convert PM to 24-hour format
                if (period === "AM" && parsedHours === 12) parsedHours = 0; // Handle midnight edge case

                slotDateTime.setHours(parsedHours, parseInt(minutes, 10), 0, 0); // Set time accurately
                console.log("now:", now);
                console.log("slotDateTime:", slotDateTime);

                const isPastSlot = slotDateTime < now; // Compare the two dates
                console.log("isPastSlot:", isPastSlot);

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
                        <div className="changeButtonContainer">
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

                          <button
                            onMouseEnter={() =>
                              handleMouseEnter(appointment._id)
                            } // Show details for the hovered appointment
                            onMouseLeave={handleMouseLeave} // Hide details when leaving the hover
                          >
                            ?
                          </button>
                        </div>
                          {/* Only show the modal for the hovered appointment */}
                          {hoveredAppointmentId === appointment._id && (
                            <div className="detailInfoModal2">
                              <div>
                                <p>{appointment.carDetails.description}</p>
                              </div>
                            </div>
                          )}
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
            <form onSubmit={(e) => handleSubmit(formData.id, e)}>
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
              <div>
                <input
                  type="text"
                  name="carDetails.description"
                  value={formData.descrition}
                  onChange={handleChange}
                  placeholder="Enter a brief description"
                  required
                ></input>
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
                const now = new Date();
                now.setHours(0, 0, 0, 0); // Reset time to the start of the day for comparison

                if (date < now) {
                  alert("Cannot select a past date!");
                  return; // Prevent setting a past date
                }

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
              tileDisabled={({ date }) => {
                const now = new Date();
                now.setHours(0, 0, 0, 0); // Reset to start of the day
                return date < now; // Disable past dates
              }}
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
