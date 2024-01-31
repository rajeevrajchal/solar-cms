import { USER_ROLE } from "@enum/user.role";
import AppRoute from "@routes/route.constant";
import { ReactElement } from "react";
import { AiOutlinePieChart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
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
    allow: "*",
  },
  {
    icon: <TbFileInvoice size={22} />,
    label: "Quote",
    key: "quote",
    href: AppRoute.quote,
    allow: "*",
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
    allow: "*",
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
];
