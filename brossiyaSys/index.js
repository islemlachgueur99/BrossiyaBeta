const express = require("express");
const { MongoClient } = require("mongodb");
const multer = require("multer");

const info_date = require("../brossiyaSys/src/dev/info_date.js");
const services = require("../brossiyaSys/src/dev/services.js");

const app = express();

app.use(express.json());

// Connection URI for MongoDB Atlas
const uri =
  "mongodb+srv://mohammed:mohammed@cluster.sevn9bm.mongodb.net/projetislem";
const client = new MongoClient(uri);



const upload = multer();

app.post(
  "/brossiyaSys",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "jsonFile", maxCount: 1 },
  ]),
  async function (req, res) {
     // Check if files were uploaded
     if (!req.files || !req.files["image"] || !req.files["jsonFile"]) {
      console.log("Both image and JSON file are required");
      return res
        .status(400)
        .json({ error: "Both image and JSON file are required" });
    }

    try {
      // Access uploaded files directly from memory
      const imageFile = req.files["image"][0];
      const jsonFile = req.files["jsonFile"][0];

      console.log("the data has been successfully retrieved from the Post API");

      // Validate file formats
      if (!imageFile.mimetype.startsWith("image/")) {
        console.log("Invalid image format");
        return res.status(400).json({ error: "Invalid image format" });
      }
      if (jsonFile.mimetype !== "application/json") {
        console.log("Invalid JSON file format");
        return res.status(400).json({ error: "Invalid JSON file format" });
      }

      console.log("The Format of the files is valid ");

      // Convert JSON data to JavaScript object
      const infractionData = JSON.parse(jsonFile.buffer.toString());

      console.log("convert JsonFile To JsonObject");

      /*

           
      la partie pour traité l'image .....
      const imageFile = req.files["image"][0];


*/

      // Data received json object
      const license_plate_number = infractionData.license_plate_number;

      // Generate a unique ID for the post data
      const id_of_infraction = info_date.generateUniqueId();

      

      // Connect to the MongoDB Atlas cluster
      await client.connect();

      console.log("connect to data base ");

      // Access your MongoDB Atlas database and the  collections

      const database = client.db("BrossiyqBeta");
      const carsCollection = database.collection("cars");
      const peopleCollection = database.collection("people");
      const infractionsCollection = database.collection("infractions");

      // Find the car with the provided plate number
      const filterOfCar = {
        "car.license_plate_number": license_plate_number,
      };

      const car = await carsCollection.findOne(filterOfCar);

      if (!car) {
        console.log(
          "**************************************Car not found********************************************"
        );

        return res.status(404).send("Car not found");
      }

      console.log("The car has been found", car.car.Brand);

      // Get owner information for the found car

      const ownerFirstName = car.car.owner.firstName;
      const ownerLastName = car.car.owner.lastName;

      // Find the person with the provided owner name

      const filterOfPerson = {
        "person.firstName": ownerFirstName,
        "person.lastName": ownerLastName,
      };

      // Find the person in the people collection based on the owner's name
      const person = await peopleCollection.findOne(filterOfPerson);

      if (!person) {
        console.log(
          "**************************************Owner not found********************************************"
        );

        return res.status(404).send("Owner not found");
      }
      console.log("owner it's found");
      

      


      // Add the infraction to the person's infraction array

      const infractionToPerson = {
        id_of_infraction: id_of_infraction,
      };

      // Add the infraction to the person's infraction array
      await peopleCollection.updateOne(
        { _id: person._id },
        { $push: { infractions: infractionToPerson } }
      );

      //call prepareInfractionToIPFS() function

      const  Infraction  =
        await services.prepareInfractionToIPFS(
          infractionData,
          car,
          person,
          id_of_infraction,
         
          
          license_plate_number,
          ownerFirstName,
          ownerLastName
        );
        await infractionsCollection.insertOne(Infraction);

      

        return res
        .status(201)
        .json({ message: "Violation process created successfully" });
   


    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing data");
    }
  }
);

app.listen(8001, () => {
  console.log(" brossiyaSys is Listening to port 8001");
});

//npm run start
// sudo lsof -i :8002 or port //////////     sudo kill 308206 or PID ///////////    netstat -tuln | grep 8002 or port to verify
