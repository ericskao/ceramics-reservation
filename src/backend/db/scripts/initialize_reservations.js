// Import the pg library
const pool = require("../db");

// Define the reservation data for the first weekend
const reservations = [];
const startDate = new Date("2024-05-10"); // Assuming this is the first Friday of the month
for (let i = 0; i < 54; i++) {
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + Math.floor(i / 9)); // Increment date by 0, 1, or 2 days
  const timeSlot =
    i % 9 === 0
      ? "4pm-6pm"
      : i % 9 === 1 || i % 9 === 5
        ? "6pm-8pm"
        : "8pm-10pm";
  reservations.push({
    user_id: null, // You can assign user IDs if needed
    date: currentDate.toISOString().split("T")[0], // Format date as 'YYYY-MM-DD'
    time_slot: timeSlot,
  });
}

// Function to insert reservations into the database
async function createInitialReservations() {
  const client = await pool.connect();
  try {
    // Loop through the reservations and insert them into the database
    for (const reservation of reservations) {
      await client.query(
        `
                INSERT INTO reservations (user_id, date, time_slot)
                VALUES ($1, $2, $3)
            `,
        [reservation.user_id, reservation.date, reservation.time_slot],
      );
    }

    console.log("Initial reservations created successfully.");
  } catch (error) {
    console.error("Error creating initial reservations:", error);
  } finally {
    client.release();
  }
}

// Call the function to create initial reservations
createInitialReservations();
