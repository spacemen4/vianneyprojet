import React, { useContext } from "react";
import { FcPlus } from "react-icons/fc";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <FcPlus className="w-7 h-7" />
      <span className="pl-3 pr-7">Créer</span>
    </button>
  );
}
