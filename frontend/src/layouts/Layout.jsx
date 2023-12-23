import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import { isAdmin } from "../config/isAdmin";

export const Layout = isAdmin ? AdminLayout : MainLayout;
