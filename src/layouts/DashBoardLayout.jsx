import React, { use, useEffect } from "react";
import { Link, Outlet, useNavigation } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../context/AuthContext";
import DashboardSideMenu from "../components/navigation/DashboardSideMenu";
import Loader from "../components/common/Loader";

const DashBoardLayout = () => {
  useEffect(() => {
    document.title = "BulkNest | Dashboard";
    window.scrollTo(0, 0);
  }, []);
  const { loading } = use(AuthContext);
  const { state } = useNavigation();
  const handleNavClick = () => {
    const drawer = document.getElementById("my-drawer-2");
    if (drawer) drawer.checked = false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen max-w-screen relative font-outfit">
      {/* Drawer for mobile responsive  */}
      <div className="fixed bg-base-200 top-0 shadow-xl shadow-primary/5 left-0 w-full z-50 my-auto select-none">
        <div className="drawer lg:hidden block px-4 mx-auto h-[50px]">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex items-center mt-2">
            {/* drawer  */}
            <label
              htmlFor="my-drawer-2"
              className="h-full flex items-center hover:scale-102 opacity-80 hover:opacity-100"
            >
              <span className="text-secondary text-3xl cursor-pointer pr-2">
                <GiHamburgerMenu />
              </span>
            </label>
            <button onClick={handleNavClick}>
              <Link
                className="text-4xl text-primary font-outfit font-bold lg:px-0 px-2"
                to="/"
              >
                BulkNEST
              </Link>
            </button>
          </div>
          {/* drawer content  */}
          <div className="drawer-side backdrop-blur-[2px] transition-all ease-linear">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-0.5">
              <div className="flex items-center justify-center flex-col">
                <DashboardSideMenu handleNavClick={handleNavClick} />
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:block hidden">
        <DashboardSideMenu />
      </div>
      <main className="min-h-screen bg-base-100 lg:pl-96 pt-[70px] lg:pt-0">
        <section className="p-6">
          {state === "loading" ? <Loader /> : <Outlet />}
        </section>
      </main>
    </section>
  );
};

export default DashBoardLayout;
