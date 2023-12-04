import { Link } from "react-router-dom";
import { IoFitness } from "react-icons/io5";
import { useState } from "react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-red-500 font-pop text-white flex items-center justify-between px-8 py-3">
      <div className="flex">
        <Link
          to="/"
          className="flex gap-2 items-center justify-center text-7xl cursor-pointer"
        >
          <IoFitness />
          <h1 className="text-4xl font-bold">FitPoint</h1>
        </Link>
      </div>
      <div className="lg:flex gap-8 font-semibold text-3xl items-center hidden">
        <Link to="/">Appointments</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
      <div className="lg:hidden">
        <input
          id="checkbox"
          type="checkbox"
          onClick={() => setIsModalOpen(!isModalOpen)}
          checked={isModalOpen}
        />
        <label className="toggle" htmlFor="checkbox">
          <div id="bar1" className="bars"></div>
          <div id="bar2" className="bars"></div>
          <div id="bar3" className="bars"></div>
        </label>
      </div>
      {isModalOpen && (
        <div
          className="absolute top-[72px] right-8 rounded-md
       text-red-500 bg-white shadow-md h-52 w-72 z-10 flex 
       items-center justify-center transition-all duration-500 ease-in"
        >
          <div className="flex flex-col gap-8 text-3xl font-bold items-center">
            <Link to="/" onClick={() => setIsModalOpen(false)}>
              Appointments
            </Link>
            <Link to="/calendar" onClick={() => setIsModalOpen(false)}>
              Calendar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
