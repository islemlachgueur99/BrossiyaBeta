import { Card } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

function Map() {
  return (
    <>
      <Spacer y={10} />
      <Card isFooterBlurred radius="lg" className="border-none" style={{ height: '600px', width: '100%' }}>
        <main className="d w-[100%] h-[100%] z-1">
          {typeof window !== "undefined" && <MapComponent />}
        </main>
      </Card>
    </>
  );
}

export default Map;
