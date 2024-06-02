import React from "react";
import { Card } from "@nextui-org/react";

export default function ImageViolation({ data }) {
  const ipfsBaseUrl =
    "https://pink-central-dolphin-325.mypinata.cloud/ipfs/${data}?pinataGatewayToken=PbLCEIqNMk8AErJ2wG9ifD8ADPJ-FR0Z5mZcdtYT47rhXiLgMDmgc_vNGBqQMVRJ";
  const src = ipfsBaseUrl.replace("${data}", data);

  return (
    <div className="center-content">
      <Card isFooterBlurred radius="lg" className="border-none custom-card">
        <img src={src} className="image-content" />
      </Card>
      <style jsx>{`
        .center-content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
          padding: 20px; /* Add some padding for better layout on small screens */
        }
        .custom-card {
          padding: 0; /* Remove default padding from the card */
          max-width: 100%; /* Ensure the card doesn't exceed the viewport width */
        }
        .image-content {
          display: block;
          max-width: 100%;
          max-height: 80vh; /* Set maximum height to 80% of the viewport height */
          width: auto;
          height: auto;
        }
      `}</style>
    </div>
  );
}
