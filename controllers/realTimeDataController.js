const cron = require("node-cron");
const db = require('../db'); // Import the database connection

let timer = 60;

const realTimeDataController = (io) => {
  // Define your task to run every second
  cron.schedule("* * * * * *", () => {
    timer -= 1;
    // Generate or fetch your real-time data here
    const realTimeData = {
      timer: timer, // Example data
    };
    if (timer === 0) {
      timer = 60;

      // Insert data into the MySQL database
      const query = "INSERT INTO trx (time_type, num_result, block_result, color_result, period_id ) VALUES (?, ?, ?, ?, ?)";
      const values = ['1min','9', '87326', 'red', Math.random() * 100]; 

      db.query(query, values, (err, results) => {
        if (err) {
          console.error("Error inserting data into the database:", err);
          return;
        }
        console.log("Data inserted into the database:", results);
      });
    }

    // Emit the real-time data to all connected clients
    io.emit("real-time-data", realTimeData);
  });

  // Optionally, you can also define additional endpoints or functionality here
};

module.exports = realTimeDataController;
