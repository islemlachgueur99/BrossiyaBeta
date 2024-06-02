"use client";
import Head from "next/head";
import { Col, Row } from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Spacer,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";

import TopCards from "../../../components/dashboard/TopCards";
import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

export default function DashboardUser() {
  const [countInfraction, setCount] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchInfractionCount = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching
        setError(null); // Reset error state before fetching

        localStorage.clear();

        // Check if both firstName and lastName are present
        if (credentials.firstName && credentials.lastName) {
          // Fetch data from the statDashboardUser endpoint
          const response = await fetch("/api/statDashboardUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: credentials.firstName,
              lastName: credentials.lastName,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch infraction count");
          }

          // Parse the JSON response
          const data = await response.json();

          // Extract the numberOfInfractions from the response
          const { infractionsData, numberOfInfractions } = data;

          // Update the count state with the fetched value
          setCount(numberOfInfractions);
          setData(infractionsData);
          localStorage.setItem(
            "infractionsData",
            JSON.stringify(infractionsData)
          );
        }
      } catch (error) {
        // Set error state if an error occurs
        setError("An error occurred while fetching data");
      } finally {
        // Set loading to false when the fetch operation is complete
        setLoading(false);
      }
    };

    // Call the fetchInfractionCount function
    fetchInfractionCount();
  }, [credentials.firstName, credentials.lastName]); // Execute useEffect whenever the firstName or lastName changes

  useEffect(() => {
    if (session && session.user) {
      // Extract firstName and lastName from session
      const { firstName, lastName } = session.user;
      setCredentials({ firstName, lastName });
    }
  }, [session]); // Execute useEffect whenever the session changes

  // Render loading state if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the component with countInfraction

  return (
    <div>
      <Head>
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
              subtitle={countInfraction}
              earning="Totale Infractions"
              icon="bi bi-wallet"
            />
          </Col>
        </Row>
      </div>

      <Card className="max-w-[600px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="Platform logo"
            height={40}
            radius="sm"
            src="/images/vilation.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">
              <b>
                {" "}
                Bienvenue sur votre plateforme de gestion des infractions !
              </b>
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            Notre système utilise l&apos;intelligence artificielle pour détecter
            automatiquement les infractions routières, notamment aux feux de
            circulation, et reconnaît les plaques d&apos;immatriculation. Chaque
            infraction est enregistrée de manière sécurisée sur une blockchain,
            garantissant ainsi l&apos;intégrité et la confidentialité des
            données.
          </p>
          <p>En tant qu&apos;utilisateur de notre plateforme, vous pouvez :</p>
          <Spacer y={4} />
          <ul>
            <li>
              <b> Consulter vos infractions :</b> Accédez à l&apos;historique
              complet de vos infractions, y compris les images, les coordonnées
              GPS et tous les détails pertinents.
            </li>
            <Spacer y={4} />

            <li>
              <b> Contester une infraction : </b> Si vous pensez qu&apos;une
              infraction a été enregistrée par erreur (problème de plaque
              d&apos;immatriculation, urgence, autre conducteur), vous pouvez
              déposer une réclamation. Cette réclamation sera examinée par un
              administrateur.
            </li>
            <Spacer y={4} />

            <li>
              <b> Payer vos amendes : </b> Réglez vos pénalités directement
              depuis la plateforme de manière rapide et sécurisée.
            </li>
            <Spacer y={4} />

            <li>
              <b> Suivre vos réclamations : </b> Vérifiez le statut de vos
              réclamations en cours et recevez des mises à jour sur leur
              traitement.
            </li>
            <Spacer y={4} />
          </ul>
          <p>
            Veuillez noter que vous disposez d&apos;un délai de 20 jours pour
            payer vos infractions. Passé ce délai, votre dossier sera transmis
            aux autorités policières compétentes.
          </p>
          <p>
            Nous vous remercions de votre confiance et nous nous engageons à
            améliorer continuellement la sécurité routière grâce à notre
            technologie avancée.
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            href="/DashboardLayout/ui/user/violations"
            showAnchorIcon
            passHref
          >
            <a>
              <Chip color="danger" variant="light">
                <b> Consulter vos infractions</b>
              </Chip>
            </a>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
