import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

// Define the POST function
export async function GET(req, res) {
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
    const usersCollection = database.collection("users");
    const carsCollection = database.collection("cars");

    // Retrieve the total number of infractions
    const totalInfractions = await infractionsCollection.countDocuments({});

    // Retrieve the total number of users
    const totalUsers = await usersCollection.countDocuments({});

    // Retrieve the total number of cars
    const totalCars = await carsCollection.countDocuments({});

    // Retrieve the total number of cars
    const totalPeople = await peopleCollection.countDocuments({});

    // Close the MongoDB client connection
    await client.close();
    console.log("close the Data Base");

    // Send the response with the total counts
    return NextResponse.json({
      totalInfractions,
      totalUsers,
      totalCars,
      totalPeople,
    });
  } catch (error) {
    // Send an error response if an error occurs
    console.error("An error occurred:", error);
    return NextResponse.error(new Error("Database Connection Error"));
  }
}
