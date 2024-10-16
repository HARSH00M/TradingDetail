import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet/>
    </>
  )
};

export default Layout;