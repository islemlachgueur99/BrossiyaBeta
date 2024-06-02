import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";

export default function Decision({ status }) {
  const renderContent = () => {
    switch (status) {
      case "paye":
        return (
          <Card className="custom-card">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                <b>
                  {" "}
                  <Chip color="success" variant="shadow">
                    payé
                  </Chip>
                </b>
              </p>
              <h4 className="font-bold text-large">
                {" "}
                <Chip color="success" variant="dot">
                  cette contravention est déja payé{" "}
                </Chip>
              </h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <img
                src="/images/paye.png"
                alt="waitPolice Cover"
                className="image-content"
              />
            </CardBody>
          </Card>
        );

      case "Rejetée":
        return (
          <Card className="custom-card">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                <b> la Reponse de la reclamtion</b>
              </p>
              <h4 className="font-bold text-large">
                {" "}
                <Chip color="danger" variant="shadow">
                  Réclamation Refusé{" "}
                </Chip>
              </h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <img
                alt="Card background"
                src="/images/cancelled.png"
                className="image-contentt"
              />
              <Card className="custom-card">
                {" "}
                <CardBody className="overflow-visible py-2">
                  <p>
                    Réponse à la réclamationRéponse à la réclamationRéponse à la
                    réclamationRéponse à la réclamationRéponse à la
                    réclamationRéponse à la réclamationRéponse à la
                    réclamationRéponse à la réclamationRéponse à la
                    réclamationRéponse à la réclamationRéponse à la
                    réclamationRéponse à la réclamation
                  </p>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        );

      // Add more cases as needed
      default:
        return (
          <div>
            <h3>Status is not paye</h3>
            <p>Other card content here...</p>
          </div>
        );
    }
  };

  return (
    <div className="full-page">
      {renderContent()}
      <style jsx>{`
        .full-page {
          width: 100%;
          height: 120vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 50px; /* Adjust the value to create space from the top */
          box-sizing: border-box;
        }
        .custom-card {
          width: 90%;
          max-width: 1200px;
          padding: 0; /* Remove default padding from the card */
        }
        .custom-card-body {
          padding: 0; /* Remove default padding from the card body */
        }
        .image-content {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .image-contentt {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
