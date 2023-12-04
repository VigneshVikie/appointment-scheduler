import { NavLink } from "react-router-dom";
import { IoFitness } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="bg-red-500 font-pop text-white flex justify-between px-8 py-3">
      <div className="flex">
        <div className="flex gap-2 items-center justify-center text-7xl">
          <IoFitness />
          <h1 className="text-4xl font-bold">FitPoint</h1>
        </div>
      </div>
      <div className="sm:flex gap-8 text-2xl items-center hidden">
        <NavLink to="/">Appointments</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
      </div>
    </nav>
  );
}
