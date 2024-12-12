import React, { useState, useEffect } from "react";
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
    const [dailyAppointments, setDailyAppointments] = useState([]); // Appointments for the selected day

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
                const response = await axios.get("http://localhost:5001/api/appointments/all");
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
                const response = await axios.get(`http://localhost:5001/api/appointments/all`);
                console.log("Fetched appointments from backend:", response.data);

                // Filter appointments for the selected date
                const filteredAppointments = response.data.filter(
                    (appointment) =>
                        new Date(appointment.appointment.date).toISOString().split("T")[0] === date
                );

                console.log("Appointments for the selected date:", filteredAppointments);

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
    };

    const handleCloseSchedule = () => {
        setIsScheduleVisible(false);
        setAvailableTimes([]); // Clear the schedule times
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                appointment: {
                    date: selectedDate,
                    time: formData.time,
                    service: "Car Drop-Off",
                },
            };
            await axios.post("http://localhost:5001/api/appointments/newAppointment", data);
            alert("Appointment saved successfully!");
            setFormData({
                name: "",
                phone: "",
                email: "",
                carDetails: { make: "", model: "", year: "", licensePlate: "" },
                time: "",
            });
            setIsFormVisible(false); // Hide the form after successful submission
            setIsScheduleVisible(false); // Reset schedule view
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
            new Date(appointment.appointment.date).toISOString().split("T")[0] === dateString
    );
    const takenTimes = appointmentsForDate.map((appointment) => appointment.appointment.time);
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
                new Date(appointment.appointment.date).toISOString().split("T")[0] === dateString
        );
        const takenTimes = appointmentsForDate.map((appointment) => appointment.appointment.time);
        const allTimes = generateTimeSlots(8, 17);
        const freeTimesCount = allTimes.length - takenTimes.length;

        return freeTimesCount > 0 ? (
            <div className="available-slots">
                <span className="availableSlots">{freeTimesCount} slots</span> 
            </div>
        ) : null;
    };

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
                                            className={`time-slot ${
                                                appointment ? "taken-slot" : ""
                                            }`}
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
                                            <div className="appointment-details">
                                                <p>
                                                    <strong>Name:</strong> {appointment.name}
                                                </p>
                                                <p>
                                                    <strong>Car:</strong>{" "}
                                                    {appointment.carDetails.make}{" "}
                                                    {appointment.carDetails.model}
                                                </p>
                                                <p>
                                                    <strong>Phone:</strong> {appointment.phone}
                                                </p>
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
        </div>
    );
};

export default CalendarPage;
