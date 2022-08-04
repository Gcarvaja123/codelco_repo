
/*var credentials = require("./credentials.json");
var { google } = require("googleapis");
var service = google.sheets("v4");
var fs = require("fs");
var authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);


const { GoogleSpreadsheet } = require('google-spreadsheet');


async function AccederSpreadsheet() {
    try {

        //const documento = new GoogleSpreadsheet("1CT1UKS1g8YUzviyxpwRn-gIErevAHQWPN0meQ6mIBF8");
        //await documento.useServiceAccountAuth(credentials);
        //await documento.loadInfo();

        //const sheet = documento.sheetsByIndex[0];
        

        //console.log("hola que tal");
        //return(sheet);
        console.log("hpla");

        // Authorize the client
        var token = await authClient.authorize();

        // Set the client credentials
        authClient.setCredentials(token);

        // Get the rows
        var res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: "1o7cLZmvntWJYZh1QkTZADMetbOCVzyulTV9LqQYtsgk",
            range: "A:H",
        });

        // All of the answers
        var answers = [];

        // Set rows to equal the rows
        var rows = res.data.values;

        // Check if we have any data and if we do add it to our answers array
        if (rows.length) {

            // Remove the headers
            rows.shift()

            // For each row
            for (const row of rows) {
                answers.push({ timeStamp: row[0], answer: row[1,4] });
            }

        } else {
            console.log("No data found.");  
        }
        
        // Saved the answers
        fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });
        return rows;

    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

    }

}


module.exports = {
    AccederSpreadsheet: AccederSpreadsheet
}
*/