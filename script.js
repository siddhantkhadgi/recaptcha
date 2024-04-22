const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const RECAPTCHA_SECRET_KEY = "6Ldx4MIpAAAAAKG06TK4sNBjnZgSoegZ02oSPftP"; // Your secret key from Google

app.post("/submit", async (req, res) => {
  const recaptchaResponse = req.body["g-recaptcha-response"];

  // Verify reCAPTCHA with Google
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const response = await axios.post(verificationUrl);
    const data = response.data;

    if (data.success) {
      // reCAPTCHA verified, process the form
      const name = req.body["name"];
      const email = req.body["email"];
      const message = req.body["message"];

      // Handle the form submission
      // ...

      res.send("Form submitted successfully!");
    } else {
      res.status(400).send("reCAPTCHA verification failed.");
    }
  } catch (error) {
    res.status(500).send("An error occurred during reCAPTCHA verification.");
  }
});

app.listen(5500, () => {
  console.log("Server is running on port 3000");
});
