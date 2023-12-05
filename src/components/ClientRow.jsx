import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { IoFitnessOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaLocationDot, FaSquarePlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientRow = ({ client, setClients, clients }) => {
  const [editing, setEditing] = useState(false);
  const [addApnt, setAddApnt] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(false);
  const [appointmentId, setAppointmentId] = useState(false);
  const [editedClient, setEditedClient] = useState({ ...client });

  const handleSave = (id) => {
    setClients((prevClients) => {
      return prevClients?.map((cli) => {
        if (cli.id === id) {
          return {
            ...cli,
            id: uuidv4(),
            firstName: editedClient.firstName,
            lastName: editedClient.lastName,
            location: editedClient.location,
          };
        } else {
          return cli;
        }
      });
    });

    setEditing(false);
    (() =>
      toast(
        `Wow, ${editedClient.firstName}'s changes have been saved! 🚀✨`
      ))();
  };

  const handleDelete = (id) => {
    setClients((prevClients) => {
      return prevClients.filter((cli) => cli.id !== id);
    });
    (() =>
      toast(
        `${editedClient.firstName}'s Appointment vanished into the void! 🕳️ Deleted successfully.`
      ))();
  };

  const handleEditAppointment = (appntId) => {
    setAppointmentId(appntId);
    setEditingAppointment(true);
  };

  const saveAppointment = (id) => {
    (() =>
      toast.success(
        `${editedClient.firstName}'s schedule Updated successfully.`
      ))();

    if (!editedClient.date || !editedClient.endDate) {
      const invalidDate = () =>
        toast.error(
          "Oh snap! Looks like you forgot to pick a valid date. 📅 Try again!"
        );
      invalidDate();
      return;
    }
    client?.appointments?.map((apnt) => {
      if (apnt.id === id) {
        apnt.appointmentDate = `${format(
          editedClient.date,
          "MMM dd yyyy h:mm a"
        )}`;
        apnt.appointmentEndDate = `${format(
          editedClient.endDate,
          "MMM dd yyyy h:mm a"
        )}`;
      }
    });
    setEditingAppointment(false);
  };

  const handleDeleteAppointment = (id) => {
    setClients((prevClients) => {
      return prevClients?.map((client) => {
        return {
          ...client,
          appointments: client.appointments.filter(
            (deleteApnt) => deleteApnt.id !== id
          ),
        };
      });
    });
    (() =>
      toast.success(
        `${editedClient.firstName}'s Schedule Deleted successfully.`
      ))();
  };

  const addAppointment = (id) => {
    if (!editedClient.date || !editedClient.endDate) {
      (() =>
        toast.error(
          "Oh snap! Looks like you forgot to pick a valid date. 📅 Try again!"
        ))();
      return;
    }
    setClients((prevClients) => {
      return prevClients?.map((cli) => {
        if (cli.id === id) {
          const isDateChanged = cli.appointments.filter(
            (apnt) => apnt.appointmentDate !== editedClient.date
          );

          return {
            ...cli,
            appointments: isDateChanged
              ? [
                  ...cli.appointments,
                  {
                    id: uuidv4(),
                    appointmentDate: `${format(
                      editedClient.date,
                      "MMM dd yyyy h:mm a"
                    )}`,
                    appointmentEndDate: `${format(
                      editedClient.endDate,
                      "MMM dd yyyy h:mm a"
                    )}`,
                  },
                ]
              : cli.appointments,
          };
        } else {
          return cli;
        }
      });
    });
    setAddApnt(false);
    (() =>
      toast.success(
        `New schedule successfully added for ${editedClient.firstName}`
      ))();
  };

  const handleEndDateChange = (enddate) => {
    if (enddate < editedClient.date) {
      (() => toast.error("End Time cannot be earlier than start time"))();
      return;
    }

    setEditedClient({ ...editedClient, endDate: enddate });
  };

  return (
    <>
      <div
        className="relative bg-red-50 rounded-lg 
      drop-shadow-md p-4 mx-auto sm:h-full w-4/5 sm:w-full 
      h-[560px] flex flex-row"
      >
        <div
          className="flex flex-col sm:flex-row gap-4 
        items-center sm:justify-between  
        sm:w-[75%] w-full h-[75%] sm:h-full
        "
        >
          <div className="sm:w-[15%]  h-full flex justify-center items-center ">
            <div
              className="bg-white sm:text-7xl text-8xl lg:text-9xl
             text-red-500 
             sm:rounded-full rounded-3xl flex justify-center 
             items-center p-2"
            >
              <IoFitnessOutline />
            </div>
          </div>
          <div
            className="sm:w-[40%] mx-auto h-full 
          sm:flex sm:flex-col sm:items-center sm:justify-center "
          >
            <div className="relative flex items-center justify-between mb-2">
              {editing ? (
                <div className="text-lg font-medium flex flex-col z-10  gap-2">
                  <p>First Name :</p>
                  <input
                    type="text"
                    value={editedClient.firstName}
                    onChange={(e) =>
                      setEditedClient({
                        ...editedClient,
                        firstName: e.target.value,
                      })
                    }
                    className="p-1"
                  />
                  <p>Last Name :</p>
                  <input
                    type="text"
                    value={editedClient.lastName}
                    onChange={(e) =>
                      setEditedClient({
                        ...editedClient,
                        lastName: e.target.value,
                      })
                    }
                    className="p-1 "
                  />
                </div>
              ) : (
                <h2 className="sm:text-2xl text-3xl font-bold capitalize">
                  {editedClient.firstName} {editedClient.lastName}
                </h2>
              )}
              {editing ? (
                <div
                  className="fixed sm:top-0 sm:right-0 bottom-0 left-0 flex 
                sm:items-center items-end justify-center w-full
                  h-full sm:justify-end
                gap-4 pb-4 sm:pr-2"
                >
                  <button
                    className=" text-5xl bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center"
                    onClick={() => handleSave(client.id)}
                  >
                    {/*save icon*/}

                    <FaCheck />
                  </button>
                  <button
                    className="bg-red-500 text-5xl text-white rounded-full w-20 h-20 flex items-center justify-center"
                    onClick={() => setEditing(false)}
                  >
                    {/*cancel icon*/}

                    <ImCross />
                  </button>
                </div>
              ) : (
                <div
                  className="fixed sm:top-0 sm:right-0 bottom-0 left-0 flex 
                sm:items-center items-end justify-center w-full
                  h-full sm:justify-end
                gap-4 pb-4 sm:pr-2"
                >
                  <button
                    className=" text-5xl bg-yellow-300 text-white rounded-full w-20 h-20 flex items-center justify-center"
                    onClick={() => setEditing(true)}
                  >
                    {/*Edit icon*/}
                    <MdEdit />
                  </button>
                  <button
                    className="bg-red-500 text-5xl text-white rounded-full w-20 h-20 flex items-center justify-center"
                    onClick={() => handleDelete(client.id)}
                  >
                    {/*delete icon*/}
                    <RiDeleteBin4Fill />
                  </button>
                </div>
              )}
            </div>
            <div className="mb-2 z-10">
              {editing ? (
                <div className="text-lg font-medium flex flex-col gap-2">
                  <span>Location: </span>
                  <input
                    className="p-1"
                    type="text"
                    value={editedClient.location}
                    onChange={(e) =>
                      setEditedClient({
                        ...editedClient,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className="sm:text-lg text-xl text-gray-500 flex gap-2 items-center justify-center sm:justify-start font-medium capitalize">
                  <span className="sm:text-2xl">
                    <FaLocationDot />
                  </span>
                  {editedClient.location}
                </div>
              )}
            </div>
          </div>
          {!editing && (
            <div className="w-full flex flex-col  items-center h-full z-10">
              <h1 className="font-bold text-2xl pb-2">Appointments</h1>
              <ul>
                {client?.appointments?.map((appointment) => (
                  <li key={appointment.id}>
                    {editingAppointment && appointmentId === appointment.id ? (
                      <div className="flex gap-2">
                        <div className="flex flex-col ">
                          <div className="flex gap-2 items-center">
                            <p className="text-lg font-medium w-12 text-end">
                              From
                            </p>
                            <DatePicker
                              selected={editedClient.date}
                              onChange={(date) =>
                                setEditedClient({ ...editedClient, date })
                              }
                              showTimeSelect
                              dateFormat="Pp"
                              className="w-full sm:text-lg mb-2 py-1 px-3 rounded-md"
                              minDate={new Date()}
                              placeholderText="Edit your Schedule"
                              portalId="root-portal"
                              selectsStart
                            />
                          </div>
                          <div className="flex gap-2 items-center">
                            <p className="text-lg font-medium w-12 text-end">
                              To
                            </p>

                            <DatePicker
                              selected={editedClient.endDate}
                              onChange={handleEndDateChange}
                              showTimeSelect
                              dateFormat="Pp"
                              className="w-full sm:text-lg mb-2 py-1 px-3 rounded-md"
                              minDate={editedClient.date}
                              placeholderText="Edit your Schedule"
                              portalId="root-portal"
                              selectsEnd
                            />
                          </div>
                        </div>

                        <button
                          className=" text-2xl text-blue-500 flex items-center justify-center"
                          onClick={() => saveAppointment(appointment.id)}
                        >
                          {/* Save icon*/}
                          <FaCheck />
                        </button>
                        <button
                          className="text-red-500 text-2xl flex items-center justify-center"
                          onClick={() => setEditingAppointment(false)}
                        >
                          {/* Cancel icon*/}

                          <ImCross />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center justify-center">
                        <div className="sm:text-xl font-medium w-full bg-gray-200 rounded-md py-1 px-3 mb-2">
                          {appointment.appointmentDate}
                        </div>
                        {appointment.id && (
                          <>
                            <button
                              className=" text-2xl  text-yellow-400 flex items-center justify-center"
                              onClick={() =>
                                handleEditAppointment(appointment.id)
                              }
                            >
                              {/* edit icon*/}

                              <MdEdit />
                            </button>
                            <button
                              className="text-red-500 text-2xl flex items-center justify-center"
                              onClick={() =>
                                handleDeleteAppointment(appointment.id)
                              }
                            >
                              {/* delete icon*/}

                              <RiDeleteBin4Fill />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {addApnt ? (
                <div className="z-10 flex gap-2">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="text-lg font-medium w-12 text-end">From</p>
                      <DatePicker
                        selected={editedClient.date}
                        onChange={(date) =>
                          setEditedClient({ ...editedClient, date })
                        }
                        showTimeSelect
                        dateFormat="Pp"
                        className="w-full sm:text-lg mb-2 py-1 px-3 rounded-md"
                        minDate={new Date()}
                        placeholderText="Pick New Schedule"
                        portalId="root-portal"
                        selectsStart
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-lg font-medium w-12 text-end">To</p>
                      <DatePicker
                        selected={editedClient.endDate}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="w-full sm:text-lg mb-2 py-1 px-3 rounded-md"
                        minDate={editedClient.date}
                        placeholderText="Pick New Schedule"
                        portalId="root-portal"
                        selectsEnd
                      />
                    </div>
                  </div>
                  <button
                    className=" text-2xl text-blue-500 flex items-center justify-center pr-1"
                    onClick={() => addAppointment(client.id)}
                  >
                    {/*save icon*/}
                    <FaCheck />
                  </button>
                  <button
                    className="text-red-500 text-2xl flex items-center justify-center"
                    onClick={() => setAddApnt(false)}
                  >
                    {/* Cancel icon*/}
                    <ImCross />
                  </button>
                </div>
              ) : (
                <div className="flex  items-center justify-center rounded-full">
                  <button
                    className=" text-4xl text-gray-400"
                    onClick={() => setAddApnt(!addApnt)}
                  >
                    <FaSquarePlus />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
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
      />
    </>
  );
};

export default ClientRow;
