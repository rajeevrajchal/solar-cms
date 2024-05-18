import { USER_ROLE } from "@enum/user.role";
import AppRoute from "@routes/route.constant";
import { ReactElement } from "react";
import { AiOutlinePieChart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHandshake, FaUsersCog } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { LuLayoutList } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { TiVendorApple } from "react-icons/ti";

export interface SidebarItem {
  icon: ReactElement;
  label: string;
  key: string;
  href: string;
  allow?: string[] | string;
}

export const sidebarMenu: SidebarItem[] = [
  {
    icon: <AiOutlinePieChart size={22} />,
    label: "Home",
    key: "home",
    href: AppRoute.home,
    allow: "*",
  },
  {
    icon: <BiCategoryAlt size={22} />,
    label: "Projects",
    key: "projects",
    href: AppRoute.projects,
    allow: [USER_ROLE.ENGINEER, USER_ROLE.SALE],
  },
  // {
  //   icon: <MdDesignServices size={22} />,
  //   label: "Service",
  //   key: "service",
  //   href: AppRoute.services,
  //   allow: [USER_ROLE.ENGINEER, USER_ROLE.SALE],
  // },
  {
    icon: <TbFileInvoice size={22} />,
    label: "Quote",
    key: "quote",
    href: AppRoute.quote,
    allow: [USER_ROLE.SALE, USER_ROLE.ENGINEER],
  },
  {
    icon: <FaHandshake size={22} />,
    label: "Order",
    key: "order",
    href: AppRoute.order,
    allow: [USER_ROLE.SALE, USER_ROLE.ENGINEER],
  },
  {
    icon: <LuLayoutList size={18} />,
    label: "Inventory",
    key: "inventory",
    href: AppRoute.inventory,
    allow: "*",
  },
  {
    icon: <TiVendorApple size={18} />,
    label: "Vendors",
    key: "vendor",
    href: AppRoute.vendor,
    allow: [USER_ROLE.ADMIN, USER_ROLE.SALE],
  },
  {
    icon: <AiOutlineUsergroupAdd size={22} />,
    label: "Customer",
    key: "customer",
    href: AppRoute.customers,
    allow: "*",
  },
  {
    icon: <PiUsersThree size={22} />,
    label: "Users",
    key: "users",
    href: AppRoute.users,
    allow: [USER_ROLE.ADMIN],
  },
  {
    icon: <GrConfigure size={20} />,
    label: "App Config",
    key: "config",
    href: AppRoute.app_config,
    allow: [USER_ROLE.ADMIN],
  },

  {
    icon: <FaUsersCog size={22} />,
    label: "Teams",
    key: "teams",
    href: AppRoute.team,
    allow: [USER_ROLE.ADMIN],
  },
];
