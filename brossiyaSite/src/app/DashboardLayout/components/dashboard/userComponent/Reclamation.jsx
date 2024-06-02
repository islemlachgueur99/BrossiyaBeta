"use client";

import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/react";

export default function Reclamation({ dataa }) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    
    id_of_infraction,
    infraction_link_blockchain
  ) => {
    setError("");

    if (!file || !type || !description) {
      alert("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", type);
      data.append("description", description);
      data.append("id_of_infraction", id_of_infraction);
      data.append("infraction_link_blockchain", infraction_link_blockchain);

      const res = await fetch("/api/claim", {
        method: "POST",
        body: data,
      });

      setIsLoading(false);

      if (res.ok) {
        const result = await res.json();
        console.log("Upload success:", result);

        // Reload the page on success
        window.location.reload();
      } else {
        const errorText = await res.text();
        setError("Upload failed: " + errorText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed: " + error.message);
      setIsLoading(false);
    }
  };

  const typeReclamation = [
    {
      label: "Erreur Dans Le Numéro De La Matricule ",
      value: "erreur dans le numéro de la matricule ",
      description: "erreur dans le numéro de la matricule ",
    },
    {
      label: "un autre conducteur a fait la violation",
      value: "un autre conducteur a fait la violation",
      description: "un autre conducteur a fait la violation",
    },
    {
      label: "un cas d'urgence",
      value: "un cas d'urgence",
      description: "un cas d'urgence",
    },
  ];

  return (
    <form>
      <Spacer y={10} />

      <Card className="py-4" radius="lg" shadow="lg">
        <CardBody className="overflow-visible py-2  ">
          <div class="flex flex-col ">
            <div class=" flex justify-center	">
              <Chip color="primary">
                Voulez vous choisir le type de votre réclamation
              </Chip>{" "}
            </div>
            <Spacer y={2} />

            <div class=" flex justify-center	">
              {" "}
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select type</option>
                <option value="Erreur Dans Le Numéro De La Matricule">
                  Erreur Dans Le Numéro De La Matricule
                </option>
                <option value="Un autre conducteur a fait la violation">
                  Un autre conducteur a fait la violation
                </option>
                <option value="Un cas d'urgence">Un cas durgence</option>
              </select>
            </div>
            <Spacer y={8} />

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Textarea
                placeholder="Enter votre description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Spacer y={6} />
            <div>
              <Card>
                <CardBody>
                  <label htmlFor="file" className="sr-only">
                    Choose a file
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />

                  <Spacer y={6} />
                  <Button
                    onClick={() => {
                      handleSubmit(
                        dataa.id_of_infraction,
                        dataa.infraction_link_blockchain
                      );
                    }}
                    disabled={isLoading}
                    color="primary"
                  >
                    {isLoading ? "Sending..." : "Envoyer la réclamation"}
                  </Button>
                </CardBody>
              </Card>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
