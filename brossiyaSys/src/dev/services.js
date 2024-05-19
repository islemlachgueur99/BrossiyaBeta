const puppeteer = require("puppeteer");
const fs = require("fs");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
// Connection URI for MongoDB Atlas
const uri =
  "mongodb+srv://mohammed:mohammed@cluster.sevn9bm.mongodb.net/projetislem";
const client = new MongoClient(uri);
async function prepareInfractionToIPFS(
  infractionData,
  car,
  person,
  id_of_infraction,
  license_plate_number,
  ownerFirstName,
  ownerLastName
) {
  // Verify type_infraction
  if (infractionData.type_infraction !== "Violating a traffic light") {
    throw new Error(
      "Invalid type of infraction. Only 'Violating a traffic light' is supported."
    );
  }
  const amount = "2000";

  // Prepare additional fields
  const Infraction = {
    id_of_infraction: id_of_infraction,
    
   
    Registration_date_system: getCurrentDateTime(),
    last_changes_date_system: "",
    data_of_infraction: {
      license_plate_number: infractionData.license_plate_number,
      time_of_violation: infractionData.time_of_violation,
      coordinatesGPS: infractionData.coordinatesGPS,
      location_address: infractionData.location_address,
      date_of_violation: infractionData.date_of_violation,
      type_infraction: infractionData.type_infraction,
      id_detctor: infractionData.id_detctor,
      status_of_infraction: {
        status: "En attente", // Pending
        info: "L'infraction est enregistrée dans le système et une notification a été envoyée à la personne concernée.", // Additional information about the status
        /*

      status_of_infraction: {
  status: "Réclamation effectuée", // Claim made
  info: "Une réclamation concernant l'infraction a été soumise par la personne concernée. En attente de la réponse des autorités compétentes.", // Additional information about the status
 }

 status_of_infraction: {
  status: "Réponse à la réclamation", // Response to the claim
  info: "Les autorités compétentes ont répondu à la réclamation soumise par la personne concernée.", // Additional information about the status
 }

 status_of_infraction: {
  status: "En attente de paiement", // Waiting for payment
  info: "En attente que la personne concernée effectue le paiement avant la date limite.", // Additional information about the status
 }

 status_of_infraction: {
  status: "Payée", // Paid
  info: "L'amende pour cette infraction a été payée avec succès.", // Additional information about the status
 }

 status_of_infraction: {
  status: "Hors délai", // Out of date
  info: "La date limite pour cette infraction est dépassée. Vous attendez maintenant la réception du document officiel à votre domicile de la part des autorités compétentes.", // Additional information about the status
 }

 status_of_infraction: {
  status: "Rejetée", // Rejected
  info: "Cette infraction a été rejetée en raison d'un problème avec la détection ou pour d'autres raisons.", // Additional information about the status
 }


      
      
      */
      }, //
      viewed: [],
      claim: [],
      response_claim: [],
      payment: {
        amount: "2000",
        status_of_payment: "Non Payée", // payée
        payment_info: [],
      },
    },
    car: car,
    owner: {
      firstName: person.person.firstName,
      lastName: person.person.lastName,
      email: person.person.email,
      phone: person.person.phone,
      address: person.person.address,
    },
  };
  // Connect to the MongoDB Atlas cluster
  await client.connect();

  console.log("connect to data base To verify if the user is exist ");
  // Access your MongoDB Atlas database and the  collections
  const database = client.db("BrossiyqBeta");

  const usersCollection = database.collection("users");


  const useraccount = {
    firstName: ownerFirstName,
    lastName: ownerLastName,
  };
  // Find the person in the people collection based on the owner's name
  const user = await usersCollection.findOne(useraccount);

  if (!user) {
    console.log(
      "**************************************the person  has not an account and we will create one ********************************************"
    );

    const { password, hashedPassword } = await generatePassword(
      license_plate_number,
      ownerFirstName,
      ownerLastName
    );
    const createUser = {
      username: license_plate_number,
      password: hashedPassword,

      role: "USER",
      firstName: ownerFirstName,
      lastName: ownerLastName,
    };
    await usersCollection.insertOne(createUser);
    console.log("create user is done .............");
    console.log(
      "we will create a PDF and send it in EMAIL  ",
      person.person.email
    );

    const pdfBuffer = await generatePDF(
      infractionData,
      id_of_infraction,
      car,
      person,
      amount
    );

    await sendEmail(
      pdfBuffer,
      ownerFirstName,
      ownerLastName,
      password,
      license_plate_number
    );
  } else {
    console.log(
      "**************************************the person ",
      user.firstName,
      " ",
      user.lastName,
      " has an  account ********************************************"
    );
    console.log("we will create a PDF and send it in EMAIL  ");

    const pdfBuffer = await generatePDF(
      infractionData,
      id_of_infraction,
      car,
      person,
      amount
    );
    password = "vous etre deja un mot de pass ";
    await sendEmail(
      pdfBuffer,
      ownerFirstName,
      ownerLastName,
      license_plate_number,
      password
    );

    return { Infraction, amount }; // Return an  the prepared infraction
  }
  return { Infraction }; // Return an  the prepared infraction
}

async function generatePDF(
  infractionData,
  id_of_infraction,
  car,
  person,
  amount
) {
  // Données pour remplacer les balises spéciales dans le HTML
  const jsonData = {
    nom: person.person.lastName,
    prenom: person.person.firstName,
    date: getCurrentDateTime(),
    idContravention: id_of_infraction,
    immatriculation: infractionData.license_plate_number,
    marque: car.car.Brand,
    model: car.car.model,
    id_detctor: infractionData.id_detctor,
    amount: amount,
    address_neighborhood: person.person.address.neighborhood,
    address_City: person.person.address.City,
    address_State_Region: person.person.address.State_Region,
    date_infraction: infractionData.date_of_violation,
    time_infraction: infractionData.time_of_violation,
    adsress_infraction_gps: infractionData.coordinatesGPS,
    adsress_infraction_location: infractionData.location_address,
    // Ajoutez d'autres variables ici
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Remplacez les balises spéciales dans le HTML par les valeurs correspondantes du JSON
  Object.keys(jsonData).forEach((key) => {
    htmlContent = htmlContent.replace(
      new RegExp("{{" + key + "}}", "g"),
      jsonData[key]
    );
  });

  // Set content to the page
  await page.setContent(htmlContent);

  // Generate PDF
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  //fs.writeFileSync("avis_de_contravention.pdf", pdfBuffer);

  return pdfBuffer;
}
// Example HTML content for Avis de Contravention
let htmlContent = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ma Page avec En-tête</title>
    <style>
      /* Styles CSS pour l'en-tête */
      header {
        background-color: #336699; /* Couleur de l'en-tête */
        padding: 20px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Courier New', Courier, monospace;
        
      }

      .left,
      .right {
        flex: 1;
        color: #030303;
      }

      img {
        max-width: 100px; /* Taille réduite de l'image */
        height: auto;
        margin-bottom: 10px;
      }

      .center {
        flex: 1;
        text-align: center;
        font-family: 'Courier New', Courier, monospace;

      }

      .center h1 {
        font-size: 24px; /* Taille du titre de l'avis de contravention */
        margin: 0;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;

      }

      .date {
        font-style: italic;
        margin-top: 10px;
        font-family: 'Courier New', Courier, monospace;

      }

      /* Style pour la ligne de séparation */
      hr {
        border: 10px;
        border-top: 5px solid; /* Couleur de la ligne */
        margin: 20px 0; /* Marge autour de la ligne */
        color: #11c79f;
      }

      /* Style pour les paragraphes à gauche et à droite */
      .left-paragraph {
        width: 50%;
        float: left;
        margin-bottom: 10px;
        font-family: 'Courier New', Courier, monospace;

      }
      .left-paragraph p{
        padding: 3px;
        padding-left: 10px;
        font-family: 'Courier New', Courier, monospace;

        
      }

      .right-paragraph {
        width: 50%;
        float: right;
        margin-right: -150px;
        font-family: 'Courier New', Courier, monospace;


      }

      /* Style pour les boîtes */
      .box {
        width: 45%;
        float: left;
        margin-right: 9px;
        background-color: #eff3f3; /* Couleur de fond de la boîte */
        border: 3px solid #11c79f;
        box-sizing: content-box;
        padding: 3px;
        margin-bottom: 10px;
        margin-left: 3pt;
        font-family: 'Courier New', Courier, monospace;

      }
      .box h4 {
        margin-top: 0;
        margin-bottom: 1px;
        font-family: 'Courier New', Courier, monospace;
        color: #c71111;

      }

      .inner-box {
        background-color: #e0e0e0; /* Couleur de fond de la boîte intérieure */
        padding: 3px;
        border: 1px solid #9badeb;
        margin-top: 5px;
      }

      .inner-box h4 {
        margin-top: 0;
        margin-bottom: 100px;
        font-family: 'Courier New', Courier, monospace;
        

      }

      .inner-box p {
        margin-bottom: 2px;
        font-family: 'Courier New', Courier, monospace;
        

      }

      /* Style pour la boîte pour l'amende et le paiement */
.amende-box {
    clear: both; /* Assure que la boîte est placée sous les autres boîtes */
    width: 93%; /* Prend toute la largeur de la page */
    background-color: #eff3f3; /* Couleur de fond de la boîte */
        border: 3px solid #11c79f;
        box-sizing: content-box;
        padding: 3px;
        margin-bottom: 10px;
        margin-left: 3pt;
        font-family: 'Courier New', Courier, monospace;
}
.amende-box-inner-box {

   background-color: #e0e0e0; /* Couleur de fond de la boîte intérieure */
        padding: 3px;
        border: 1px solid #9badeb;
        margin-top: 5px;
        font-family: 'Courier New', Courier, monospace;

}
    </style>
  </head>
  <body>
    <header>
      <div class="left">
        <div>ID  contravention</div>
        <div>{{idContravention}}</div>  
      </div>
      <div class="center">
        <img src="https://i.pinimg.com/736x/10/db/13/10db13baa06de0e3fab740d68b6bb091.jpg" alt="Avis de contravention" />
        <h3 style="font-family: Georgia, 'Times New Roman', Times, serif; font-style: oblique; font-size: larger;">Avis de contravention</h3>
        <!-- Texte de l'avis de contravention comme un grand titre -->
      </div>
      <div class="right">
        <div>Date de la contravention</div>
        <div>{{date}}</div>
      </div>
    </header>

    <!-- Ligne de séparation -->
    <hr />

    <!-- Paragraphes -->
    <div class="left-paragraph">
      <p style="font-size: 16pt;">
        <b>Madame Monsieur,  </b></p>
       <p> Le véhicule dont le certificat d'immatriculation est établi à votre nom
        a fait l'objet d'un contrôle en mouvement ayant permis de constater
        l'infraction figurant ci-dessous.</p>
    
    </div>
    <div class="right-paragraph">
      <p>
        Nom :{{nom}}<br />
        Prénom : {{prenom}}<br />
        Adresse : {{address_neighborhood}} / <br> {{address_City}} / <br>  {{address_State_Region}} 
      </p>
    </div>
    <div style="clear: both"></div>
    <!-- Clear floats -->

    <!-- Boîte extérieure -->
    <div class="box">
      <h4>Description de l'infraction</h4>
      <!-- Titre de la boîte intérieure -->

      <div class="inner-box">
        <p>
          <b style="font-size: large">Type :</b>
          <u
            ><b style="font-size: medium"> Violer un feu de circulation .</b></u
          >
        </p>
        <!-- Contenu de la boîte intérieure -->
        <p>
          Le véhicule immatriculé {{immatriculation}} a été flashé par un détecteur
          automatique de feu rouge .
          <br />
          Le feu était rouge depuis plusieurs secondes lorsque le véhicule a
          franchi la ligne d'arrêt.
        </p>
      </div>
      <div class="inner-box">
        <p>
          <u><b style="font-size: large">Date/heure :</b></u>
        </p>
        <p>date : {{date_infraction}}</p>
        <p>time : {{time_infraction}}</p>

      </div>
      <div class="inner-box">
        <p>
          <u><b style="font-size: large">Cordonnées géographique :</b></u>
        </p>
        <p>CordonnéesGPS: {{adsress_infraction_gps}}</p>
        <p>Location :{{adsress_infraction_location}}</p>

      </div>
    </div>

    <!-- Boîte intérieure -->
    <div class="box">
      <h4>Identification du véhicule : </h4>
      <!-- Titre de la boîte intérieure -->

      <div class="inner-box">
        <p>immatriculation : {{immatriculation}}</p>
       
        <p>Pays: Algerie</p>
        <p>Marque : {{marque}}/{{model}}</p>
        
    </p>
      </div>

      </div>
      <div class="box">
        <p>Détecteur:</p> 
      <div class="inner-box">
        
        <p>un détecteur automatique de feu rouge<br> 
            <p>id: {{id_detctor}}</p>
            <p>Date de derniere vérification :26/03/2024 . 
            </p>
    </p>
      </div>
    </div>
<br>
<br>


<!-- Boîte pour l'amende et le paiement -->
<div class="amende-box">
    <h2>Amende et Paiement :</h2>
    <div class="amende-box-inner-box">
       
       
        <p style="font-family: 'Courier New', Courier, monospace; font-size: large;">Vous devez payez l'amende en utilisant l'un des modes de paiment soit en ligne a travers notre platform <br>
            Ou vous pouvez vous adresser aux services de police 
        </p>
    </div>
    <div class="amende-box-inner-box">
       
        <p>Montant de l'amende  :  <b style="font-size: large; color: #c71111;">{{amount}}</b>  DA .</p>
    </div>
</div>
<br>
<p style="font-size: large; "><u><b>NOTE : il ya un délai de 20 jour pour payé cette amende .....  </p>


   
  </body>
</html>

`;

// Function to send email with PDF attachment
function sendEmail(
  pdfBuffer,
  ownerFirstName,
  ownerLastName,

  license_plate_number,
  password
) {
  // Create a Nodemailer transporter

  // Convert variables to strings if they're not already
  const firstNameString = String(ownerFirstName);
  const lastNameString = String(ownerLastName);
  const plateNumberString = String(license_plate_number);
  const passwordString = String(password);
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail', 'hotmail', etc.
    auth: {
      user: "islem.lachgueur99@gmail.com",
      pass: "paxj nspw jlfv pfrq",
    },
  });

  // Define email content
  const mailOptions = {
    from: "islem.lachgueur99@gmail.com",
    to: "islem.lachgueur99@gmail.com",
    subject: "Email with PDF Attachment",
    text: `Bonjour ${ownerFirstName} ${ownerLastName}\n\nVeuillez accéder à notre plateforme pour plus d'informations via les informations d'identification suivantes :\n\n userName : ${license_plate_number}\n\n password : ${password}`,
    attachments: [
      {
        filename: "Contravention.pdf",
        content: pdfBuffer, // Pass the pdfBuffer directly
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Helper function to get current date and time
function getCurrentDateTime() {
  return new Date().toISOString();
}

async function generatePassword(
  license_plate_number,
  ownerFirstName,
  ownerLastName
) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  try {
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return { password, hashedPassword };
  } catch (error) {
    // Handle error
    console.error("Error hashing password:", error);
    throw error;
  }
}
// Helper function to get current date and time
function getCurrentDateTime() {
  return new Date().toISOString();
}
module.exports = {
  prepareInfractionToIPFS,
  generatePDF,
  sendEmail,
};
