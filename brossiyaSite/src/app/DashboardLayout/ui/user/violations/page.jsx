"use client";

import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import CompInfraction from "../../../components/dashboard/userComponent/CompInfraction";

export default function Violations() {
  const { data: session } = useSession();

  const [data, setData] = useState(null);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
  });
  const [countInfraction, setCount] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const infractionsData = localStorage.getItem("infractionsData");
      // Parse the string back into its original data type
      const data = JSON.parse(infractionsData);
      setData(data);
      if (!data) {
        try {
          // Check if session exists and contains user data
          if (credentials.firstName && credentials.lastName) {
            // Extract firstName and lastName from session
            const { firstName, lastName } = session.user;

            setCredentials({ firstName, lastName });

            // Make a POST request to your API endpoint with the user data
            const response = await fetch("/api/fetch", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                // You can add additional data to the request body if needed
              }),
            });

            // Check if the request was successful
            if (response.ok) {
              // Parse the response data
              const responseData = await response.json();
              // Set the fetched data to the state
              setCount(responseData.numberOfInfractions);
              setData(responseData.infractionsData);
            } else {
              // Handle errors
              setError("Failed to fetch data");
            }
          }
        } catch (error) {
          // Handle any unexpected errors
          setError("An error occurred while fetching data");
        } finally {
          // Set loading to false when the fetch operation is complete
          setLoading(false);
        }
      }
    };
    // Call the fetchData function
    fetchData();
  }, [credentials.firstName, credentials.lastName, session]); // Execute useEffect whenever the session changes
  useEffect(() => {
    if (session && session.user) {
      // Extract firstName and lastName from session
      const { firstName, lastName } = session.user;
      setCredentials({ firstName, lastName });
    }
  }, [session]); // Execute useEffect whenever the session changes
  return (
    <>
      <CompInfraction data={data} />
    </>
  );
}
