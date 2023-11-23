import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  FcHome,
  FcShop,
  FcBarChart,
  FcBusinessman,
  FcLock,
} from "react-icons/fc";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Ecran principal",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={FcHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Carte",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: <Icon as={FcShop} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Journal de bord",
    layout: "/admin",
    path: "/data-tables",
    icon: <Icon as={FcBarChart} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "Profile des utilisateur",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={FcBusinessman} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Login",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={FcLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Vue d'ensemble administrateur",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={FcHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
];

export default routes;
