import { useState, useEffect } from "react";
import ClientRow from "./ClientRow";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const sampleClients = [
//   {
//     id: "",
//     firstName: "",
//     lastName: "",
//     location: "",
//     appointments: [{ id: "", appointmentDate: "" }],
//   },
// ];

const ClientList = () => {
  const storedClients = JSON.parse(localStorage.getItem("clients"));
  const [clients, setClients] = useState(storedClients);
  const [newAppointment, setNewAppointment] = useState(false);
  const [newSchedule, setNewSchedule] = useState([]);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const createAppointment = () => {
    const appointmentCreated = () =>
      toast("❤ Guess what? You just unleashed a new appointment! Hurray!🎉");

    if (!newSchedule.date) {
      const invalidDate = () =>
        toast.error(
          "Oh snap! Looks like you forgot to pick a valid date. 📅 Try again!"
        );
      invalidDate();
      return;
    }

    if (!newSchedule.firstName || !newSchedule.location) {
      const invalidNameLocation = () =>
        toast.error(
          "Oopsie! Can't forget the essentials. Please enter both First Name and Location. 🧐"
        );
      invalidNameLocation();
      return;
    }

    const newClient = {
      id: uuidv4(),
      firstName: newSchedule.firstName,
      lastName: newSchedule.lastName,
      location: newSchedule.location,
      appointments: [
        {
          id: uuidv4(),
          appointmentDate: `${format(newSchedule.date, "MMM dd yyyy h:mm a")}`,
        },
      ],
    };

    setClients((prevClients) => [...prevClients, newClient]);
    setNewSchedule({});
    localStorage.setItem("clients", JSON.stringify(clients));
    setNewAppointment(false);
    appointmentCreated();
    randomIconClick();
  };

  return (
    <>
      <div className="w-full h-full p-6 grid grid-cols-1 gap-4">
        <div className="w-full text-right">
          <button
            className="bg-red-500 text-white p-3 rounded-md text-lg"
            onClick={() => {
              setNewAppointment(!newAppointment);
            }}
          >
            Add Appointments
          </button>
        </div>
        {clients.map((client) => (
          <ClientRow
            key={client.id}
            client={client}
            clients={clients}
            setClients={setClients}
            newAppointment={newAppointment}
          />
        ))}
        {newAppointment && (
          <div className="absolute flex flex-col justify-center items-center  bg-red-100 w-full h-full -ml-6 -mt-6 z-30">
            <div className="bg-white w-[80%] sm:w-[400px] text-2xl font-medium  rounded-lg flex items-start p-4 justify-between flex-col gap-2 ">
              <p className="text-sm text-center w-full">
                The fields marked with '*' are mandatory
              </p>
              <h1>First Name *</h1>
              <input
                type="text"
                value={newSchedule.firstName}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    id: uuidv4(),
                    firstName: e.target.value,
                  })
                }
                className="bg-red-100 w-full p-2 rounded-md"
              />
              <h1>Last Name</h1>

              <input
                type="text"
                value={newSchedule.lastName}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, lastName: e.target.value })
                }
                className="bg-red-100 w-full p-2 rounded-md"
              />
              <h1>Appointment Location *</h1>

              <input
                type="text"
                value={newSchedule.location}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, location: e.target.value })
                }
                className="bg-red-100 w-full p-2 rounded-md"
              />
              <h1>Appointment Schedule *</h1>

              <DatePicker
                selected={newSchedule.date}
                onChange={(date) => setNewSchedule({ ...newSchedule, date })}
                showTimeSelect
                dateFormat="Pp"
                className="bg-red-100 p-2 rounded-md w-full"
                minDate={new Date()}
                placeholderText="Pick your Schedule"
              />
              <div className="flex flex-col w-full gap-6 mt-4">
                <button
                  className="bg-green-500 font-bold w-full p-3 rounded-md"
                  onClick={createAppointment}
                >
                  Add Appointment
                </button>
                <button
                  className="bg-red-500 font-bold w-full p-3 rounded-md"
                  onClick={() => setNewAppointment(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {clients.length === 0 && (
        <div className="z-20 mx-auto leading-snug bg-red-50 rounded-lg  w-[95%] h-96 flex items-center justify-center text-3xl text-center">
          No appointments today? 🤔
          <br />
          Time to spice up your schedule! <br />
          Click "Add Appointments" and let's get started.
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="text-xl"
      />
    </>
  );
};

export default ClientList;
