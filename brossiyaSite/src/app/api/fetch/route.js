import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

// Define the POST function
export async function POST(req) {
  try {
    // Connection URI for MongoDB Atlas
    const uri =
      "mongodb+srv://mohammed:mohammed@cluster.sevn9bm.mongodb.net/projetislem";
    const client = new MongoClient(uri);

    // Connect to the MongoDB Atlas cluster
    await client.connect();
    console.log("connect to data base ");
    // Access your MongoDB Atlas database and the  collections

    const database = client.db("BrossiyqBeta");
    const peopleCollection = database.collection("people");
    const infractionsCollection = database.collection("infractions");
    // Retrieve the user's first name and last name from the request object
    const { firstName, lastName } = await req.json();

    const filterOfPerson = {
      "person.firstName": firstName,
      "person.lastName": lastName,
    };
    const person = await peopleCollection.findOne(filterOfPerson);
    if (!person) {
      console.log("Person not foundd");
      return NextResponse.json(
        { message: "Person not foundd" },
        { status: 501 }
      );
    } else {
      console.log("Person found");
    }
    const i = person.infractions;

    // Initialize an empty array to store JSON representations of infractions
    const infractionsDataapi = [];

    // Loop through each infraction
    for (const infraction of i) {
      // Retrieve the data for the current infraction
      const infractionData = await infractionsCollection.findOne({
        "infraction.id_of_infraction": infraction.id_of_infraction,
      });

      // Add the infraction data to the array
      infractionsDataapi.push(infractionData);
    }
    const infractionsData = infractionsDataapi.slice().reverse();
    // Close the MongoDB client connection
    await client.close();
    console.log("close the Data Base");
    // Return a JSON response with a success message
    return NextResponse.json(
      { infractionsData, numberOfInfractions: infractionsData.length },
      { status: 200 }
    );
  } catch (error) {
    // Log and return an error response if an error occurs
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error" }, { status: 501 });
  }
}
