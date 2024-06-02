"use client";
import React from "react";
import { Container } from "reactstrap";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import { Provider } from "../../../context/Provider";
import { Providers } from "../providers";
import "./styles/style.css";


const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <main>
      <Provider>
       
          <div className="pageWrapper d-md-block d-lg-flex">
            {/******** Sidebar **********/}
            <aside
              className={`sidebarArea shadow bg-white ${
                !open ? "" : "showSidebar"
              }`}
            >
              <Sidebar showMobilemenu={() => showMobilemenu()} />
            </aside>
            {/********Content Area**********/}

            <div className="contentArea">
              {/********header**********/}
              <Header showMobmenu={() => showMobilemenu()} />

              {/********Middle Content**********/}
              <Providers>   <Container className="p-4 wrapper" fluid>
                {children}
              </Container></Providers>
            </div>
          </div>
        
      </Provider>
    </main>
  );
};

export default FullLayout;
