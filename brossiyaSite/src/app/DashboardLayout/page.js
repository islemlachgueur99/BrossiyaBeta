"use client";

import DashboardUser from "./ui/user/dashboard/DashboardUser";

import DashboardAdmin from "./ui/admin/dashboard/DashboardAdmin";

import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return <>
  {session?.user.role == "USER" && <DashboardUser />}
  {session?.user.role == "ADMIN" && <DashboardAdmin />}
  
  
  </>;
};
export default Home;
