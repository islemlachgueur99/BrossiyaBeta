const { MongoClient } = require("mongodb");

async function main() {
  let client; // Define the client variable outside the try block

  try {
    // Connection URI for MongoDB Atlas
    const uri =
      "mongodb+srv://islemlachgueur99:Amalatlas23201410@cluster.sevn9bm.mongodb.net/projetislem";

    // Connect to the MongoDB Atlas cluster
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");

    // Access your MongoDB Atlas database and the collections
    const database = client.db("projetislem");
    const peopleCollection = database.collection("people");
    const infractionsCollection = database.collection("infractions");

    // Query MongoDB to find the person by first and last name
    const firstName = "islem";
    const lastName = "lachgueur";
    const filterOfPerson = {
      "person.firstName": firstName,
      "person.lastName": lastName,
    };
    const person = await peopleCollection.findOne(filterOfPerson);
    if (!person) {
      console.log("Person not found");
      return;
    }
    const i = person.infractions;

    // Initialize an empty array to store JSON representations of infractions
    const infractionsData = [];

    // Loop through each infraction
    for (const infraction of i) {
      // Retrieve the data for the current infraction
      const infractionData = await infractionsCollection.findOne({
        "infraction.id_of_infraction": infraction.id_of_infraction,
      });

      // Add the infraction data to the array
      infractionsData.push(infractionData);
    }
    console.log("Number of infractions:", infractionsData.length);

    // Log the JSON representation of infractions
    console.log("Infractions Data:", infractionsData);
  } catch (error) {
    // Log and return an error response if an error occurs
    console.error("An error occurred:", error);
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}

// Call the main function to execute the queries
main();
