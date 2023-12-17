import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  FcPieChart, // Suggested replacement for FcSurvey
  FcLink,     // Suggested replacement for FcMindMap
  FcBusinessman,
  FcCalendar,
  FcSettings,
} from "react-icons/fc";
import VideoChatRoom from "views/admin/videoChatRoom";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/dataTables";
import Parameters from "views/admin/Parameters";

const routes = [
  {
    name: "Présentation de la société",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={FcPieChart} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Partner",
    layout: "/admin",
    path: "/map",
    icon: <Icon as={FcLink} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Calendrier",
    layout: "/admin",
    path: "/data-tables",
    icon: <Icon as={FcCalendar} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "Paramètres administrateur",
    layout: "/admin",
    path: "/parameters",
    icon: <Icon as={FcSettings} width='20px' height='20px' color='inherit' />,
    component: Parameters,
  },
  {
    name: "Salle de chat vidéo",
    layout: "/admin",
    path: "/video-chat",
    icon: <Icon as={FcBusinessman} width='20px' height='20px' color='inherit' />,
    component: VideoChatRoom,
  },
];

export default routes;
