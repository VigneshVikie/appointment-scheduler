import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState } from "react";
import { IoFitnessOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const storedClients = JSON.parse(localStorage.getItem("clients"));
  const [captureEvent, setCaptureEvent] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const events = storedClients.flatMap((client) =>
    client.appointments?.map((apnt) => ({
      title: client.firstName,
      start: new Date(apnt.appointmentDate),
      end: new Date(apnt.appointmentEndDate),
      id: client.id,
    }))
  );

  const handleEventClick = (event) => {
    setCaptureEvent(event);
    setIsOpen(true);
  };

  return (
    <div className="font-pop h-screen flex flex-col lg:flex-row items-center justify-evenly gap-3 p-4 bg-red-50">
      <div className="h-[65%] lg:h-[90%] sm:h-[70%] w-4/5 bg-white p-4 rounded-lg shadow-md">
        <BigCalendar
          localizer={localizer}
          events={events}
          views={["month", "week", "day"]}
          onSelectEvent={handleEventClick}
        />
      </div>
      <div className="bg-white w-4/5 lg:w-[30%] lg:h-[90%] h-[25%] p-4 rounded-lg shadow-md ">
        {captureEvent && isOpen ? (
          <>
            <h1 className="text-center text-3xl xl:text-4xl font-bold pb-4 text-red-500">
              Appointment Details
            </h1>
            {storedClients?.map((client) => {
              return (
                client.id === captureEvent?.id && (
                  <div
                    className="relative flex justify-between items-center 
                  bg-slate-200 rounded-md p-2 w-full"
                  >
                    <div className="text-5xl lg:text-7xl text-red-500 bg-white h-full rounded-full p-2">
                      <IoFitnessOutline />
                    </div>
                    <div
                      className="w-4/5 flex flex-col items-center 
                    justify-center text-xl capitalize"
                    >
                      <div className="flex gap-2 font-bold">
                        <h1>{client.firstName}</h1>
                        {client.lastName && <h1>{client.lastName}</h1>}
                      </div>
                      <div className="text-center">
                        <h1 className="text-lg font-medium underline">
                          Appointments
                        </h1>
                        {client?.appointments?.map((apntDate) => {
                          return (
                            <h1
                              key={apntDate.id}
                              className="text-base font-medium"
                            >
                              {apntDate.appointmentDate}
                            </h1>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="absolute top-0 left-0 
                     flex justify-end w-full text-4xl text-red-500 
                      p-1"
                    >
                      <IoIosCloseCircleOutline
                        className="cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </>
        ) : (
          <div
            className="text-2xl lg:text-3xl font-medium flex items-center
           justify-center w-full h-full text-center"
          >
            <h1>Click on an appointment to view more details 😉</h1>
          </div>
        )}
      </div>
    </div>
  );
}
