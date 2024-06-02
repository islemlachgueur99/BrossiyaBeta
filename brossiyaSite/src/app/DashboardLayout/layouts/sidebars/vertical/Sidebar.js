import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";


const navigation = [
  {
    title: "Dashboard",
    href: "/DashboardLayout",
    icon: "bi bi-speedometer2",
  },
  {
    title: "vos violations",
    href: "/DashboardLayout/ui/user/violations",
    icon: "bi bi bi-card-text",
  },
  {
    title: "research violations",
    href: "/DashboardLayout/ui/admin/researchViolations",
    icon: "bi bi bi-card-text",
  },
  {
    title: "Alert",
    href: "/DashboardLayout/ui/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/DashboardLayout/ui/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/DashboardLayout/ui/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/DashboardLayout/ui/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/DashboardLayout/ui/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/DashboardLayout/ui/tables",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/DashboardLayout/ui/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/DashboardLayout/ui/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/DashboardLayout/pages/about",
    icon: "bi bi-people",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  const location = usePathname();
  const currentURL = location.slice(0, location.lastIndexOf("/"));

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button close size="sm" onClick={showMobilemenu}></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                href={navi.href}
                className={
                  location === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="secondary"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/ample-next-js-free-admin-template/"
          >
            Download Free
          </Button>
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/ample-nextjs-admin-dashboard"
          >
            Upgrade To Pro
          </Button>

          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            onClick={() => {
              signOut();
            }}
          >
            logOut
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
