"use client ";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "public/images/logos/amplelogo.svg";
import Logoicon from "public/images/logos/amplelogowhite.svg";
import user1 from "public/images/users/user1.jpg";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Chip } from "@nextui-org/react";

const Header = ({ showMobmenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const Dashboard = async () => {
      try {
        if (session && session.user) {
          // Extract firstName and lastName from session
          const { firstName, lastName } = session.user;

          setCredentials({ firstName, lastName });
        }
      } catch (error) {
        // Handle any unexpected errors
        setError("An error occurred while fetching data");
      }
    };

    // Call the Dashboard function
    Dashboard();
  }, [credentials.firstName, credentials.lastName, session]); // Execute useEffect whenever the session changes

  // Your JSX code here...

  return (
    <Navbar color="secondary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={Logoicon} alt="logo" />
        </NavbarBrand>
        <Button color="secondary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="secondary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse
        navbar
        isOpen={isOpen}
        className="flex justify-center items-center"
      >
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/" className="nav-link">
              <Chip color="warning" variant="solid">
                Home Page
              </Chip>
            </Link>
          </NavItem>
        </Nav>
        <div className="flex justify-center ">
          <div>
            {" "}
            <h1>
              <Chip color="warning" variant="shadow">
                welcome {credentials.firstName}
                {" "}
                {credentials.lastName}
              </Chip>{" "}
            </h1>
          </div>
        </div>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="secondary">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <button
              className="bg-zinc-800 px-4 py-2 block mb-2"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              Signout
            </button>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
