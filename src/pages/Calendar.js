import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Calendar styling
import "../styles/Calendar.css";
import axios from "axios";
import "../styles/style.css";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [availableTimes, setAvailableTimes] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        carDetails: { make: "", model: "", year: "", licensePlate: "" },
        time: "",
    });

    const [isFormVisible, setIsFormVisible] = useState(false); // To toggle form visibility
    const [isScheduleVisible, setIsScheduleVisible] = useState(false); // To toggle schedule visibility

    // Function to generate time slots between 8 AM and 5 PM
    const generateTimeSlots = (startHour, endHour) => {
        const times = [];
        for (let hour = startHour; hour < endHour; hour++) {
            const time = `${hour.toString().padStart(2, "0")}:00`;
            times.push(time);
        }
        return times;
    };

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            try {
                const date = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                const response = await axios.get(`http://localhost:5001/api/appointments/${date}`);
                const takenTimes = response.data.map((appointment) => appointment.appointment.time);

                // Generate time slots dynamically between 8 AM and 5 PM
                const allTimes = generateTimeSlots(8, 17);

                // Filter out taken times
                const freeTimes = allTimes.filter((time) => !takenTimes.includes(time));

                setAvailableTimes(freeTimes);
                setIsScheduleVisible(true); // Show schedule when date is selected
            } catch (err) {
                console.error("Error fetching available times:", err);
            }
        };

        fetchAvailableTimes();
    }, [selectedDate]);

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

        // Show the form only when a time is selected
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
             // Hide all conditionally rendered elements
        setIsFormVisible(false);
        setIsScheduleVisible(false);
        setAvailableTimes([]); // Reset available times if needed
        } catch (err) {
            console.error("Error saving appointment:", err);
            alert("Failed to save the appointment.");
        }
    };

    return (
        <div className="calendar-page">
            <h1>Schedule Your Car Drop-Off</h1>
            <div className="calendarContainer">
                <h2>Select a Date</h2>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
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
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        className={`time-slot ${formData.time === time ? "selected" : ""}`}
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, time }));
                                            setIsFormVisible(true);
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))
                            ) : (
                                <p>No available times for this date.</p>
                            )}
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
                            <button type="submit">
                                Save Appointment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
