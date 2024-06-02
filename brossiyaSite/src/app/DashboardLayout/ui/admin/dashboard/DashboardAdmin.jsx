"use client";
import Head from "next/head";
import { Col, Row } from "reactstrap";

import SalesChart from "../../../components/dashboard/SalesChart";
import TopCards from "../../../components/dashboard/TopCards";
import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

export default function  DashboardAdmin () {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCounts, setTotalCounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        localStorage.clear();

        const response = await fetch("/api/statDashboardAdmin");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTotalCounts(data);
      } catch (error) {
        setError("Connection Error: Please verify your internet connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Errorr: {error}
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Ample Admin Next Js Free Aadmin Dashboard</title>
        <meta
          name="description"
          content="Ample Admin Next Js Free Aadmin Dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
      <div>
        {/***Top Cards***/}
        <Row>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-success text-success"
              title="Profit"
              subtitle="Totale Violations"
              earning={totalCounts.totalInfractions}
              icon="bi bi-wallet"
            />
          </Col>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Totale Users"
              earning={totalCounts.totalUsers}
              icon="bi bi-coin"
            />
          </Col>

        
            <Col sm="6" lg="3" className="scroll-pt-3.5">
              <TopCards
                bg="bg-light-warning text-warning"
                title="New Project"
                subtitle="Totale Voitures"
                earning={totalCounts.totalCars}
                icon="bi bi-basket3"
              />
            </Col>
          
       
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-info text-into"
                title="Sales"
                subtitle="Totale Persone"
                earning={totalCounts.totalPeople}
                icon="bi bi-bag"
              />
            </Col>
          
        </Row>
        {/***Sales & Feed***/}
     
          <Row>
            <Col sm="12" lg="12">
              <SalesChart />
            </Col>
          </Row>
       
      </div>
      
    </div>
  );
};
