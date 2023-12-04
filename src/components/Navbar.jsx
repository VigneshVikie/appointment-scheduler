import { NavLink } from "react-router-dom";
import { IoFitness } from "react-icons/io5";
import { useState } from "react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-red-500 font-pop text-white flex items-center justify-between px-8 py-3">
      <div className="flex">
        <NavLink
          to="/"
          className="flex gap-2 items-center justify-center text-7xl cursor-pointer"
        >
          <IoFitness />
          <h1 className="text-4xl font-bold">FitPoint</h1>
        </NavLink>
      </div>
      <div className="lg:flex gap-8 font-semibold text-3xl items-center hidden">
        <NavLink to="/">Appointments</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
      </div>
      <div className="lg:hidden">
        <input
          id="checkbox"
          type="checkbox"
          onClick={() => setIsModalOpen(!isModalOpen)}
          checked={isModalOpen}
        />
        <label class="toggle" for="checkbox">
          <div id="bar1" class="bars"></div>
          <div id="bar2" class="bars"></div>
          <div id="bar3" class="bars"></div>
        </label>
      </div>
      {isModalOpen && (
        <div
          className="absolute top-[72px] right-8 rounded-md
       text-red-500 bg-white shadow-md h-52 w-72 z-10 flex 
       items-center justify-center transition-all duration-500 ease-in"
        >
          <div className="flex flex-col gap-8 text-3xl font-bold items-center">
            <NavLink to="/" onClick={() => setIsModalOpen(false)}>
              Appointments
            </NavLink>
            <NavLink to="/calendar" onClick={() => setIsModalOpen(false)}>
              Calendar
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
