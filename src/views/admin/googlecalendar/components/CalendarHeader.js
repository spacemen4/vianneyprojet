import React, { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import dayjs from "dayjs";
import 'dayjs/locale/fr'; // Import the French locale
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  // Set the locale for dayjs to French
  dayjs.locale('fr');

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendrier</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Aujourd'hui
      </button>
      <button onClick={handlePrevMonth}>
        <MdChevronLeft className="cursor-pointer text-gray-600 mx-2" />
      </button>
      <button onClick={handleNextMonth}>
        <MdChevronRight className="cursor-pointer text-gray-600 mx-2" />
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
