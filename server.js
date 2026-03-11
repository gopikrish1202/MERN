const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// endpoint that calls external API
app.get("/pnrStatus/:pnr", async (req, res) => {
    try {

        const pnr = req.params.pnr;

        const response = await axios.get(
            `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`,
            {
                headers: {
                    "X-RapidAPI-Key": process.env.rapid_api_key
                }
            }
        );

     

    } catch (error) {
        res.status(500).json({ error: "API call failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
