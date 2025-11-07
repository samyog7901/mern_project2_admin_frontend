import { ReactNode, useState } from "react";
import Header from "../components/Header/index";
import Sidebar from "../components/Sidebar/index";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {
  children?: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {/* If children are passed, render them; otherwise use Outlet */}
              {children ?? <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
