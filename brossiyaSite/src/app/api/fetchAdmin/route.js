import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

export async function POST(req) {
  try {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to database");

    const database = client.db("BrossiyqBeta");
    const infractionsCollection = database.collection("infractions");

    const { id_of_infraction } = await req.json();
    const infractionData = await infractionsCollection.findOne({
      "infraction.id_of_infraction": id_of_infraction,
    });

    await client.close();
    console.log("Closed database connection");

    if (!infractionData) {
      console.log("Infraction not found" );
      return NextResponse.json(
        { message: "Infraction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { infractionData },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error" }, { status: 501 });
  }
}
