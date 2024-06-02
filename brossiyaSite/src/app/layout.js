import Head from "next/head";
import "../styles/style.scss";
import { Providers } from "./providers";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Ample Admin Next Js Free Admin Dashboard</title>
        <meta
          name="description"
          content="Ample Admin Next Js Free Admin Dashboard"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
