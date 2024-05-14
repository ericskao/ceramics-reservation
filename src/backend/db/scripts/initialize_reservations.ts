const { addDays, startOfWeek, addWeeks, format } = require("date-fns");

// Import the pg library
const pool = require("../db");

interface ReservationInterface {
  user_id?: null;
  date: Date;
  starting_time: number;
  wheel_number: number;
}

// Define the reservation data for the first weekend

// Get today's date
const currentDate = new Date();
// Determine if today is Sunday
const isSunday = currentDate.getDay() === 0;
// Get the start of this week (Sunday) and add 5 days to get Friday's date
let fridayDate;
if (isSunday) {
  // If today is Sunday, add 5 days to get next Friday's date
  fridayDate = addDays(startOfWeek(currentDate), 5);
} else {
  // If today is not Sunday, simply add days to get this Friday's date
  fridayDate = addDays(currentDate, (5 - currentDate.getDay() + 7) % 7);
}

const saturdayDate = addDays(fridayDate, 1);
const reservations: ReservationInterface[] = [];
const timeSlots = [4, 6, 8];

const createReservationsFn = (
  date: Date,
  reservations: ReservationInterface[],
) => {
  for (let i = 0; i < timeSlots.length; i++) {
    for (let j = 0; j < 9; j++) {
      reservations.push({
        user_id: null,
        date,
        starting_time: timeSlots[i],
        wheel_number: j + 1,
      });
    }
  }
};

createReservationsFn(fridayDate, reservations);
createReservationsFn(saturdayDate, reservations);

// Function to insert reservations into the database
async function createInitialReservations() {
  const client = await pool.connect();
  try {
    // Loop through the reservations and insert them into the database
    for (const reservation of reservations) {
      await client.query(
        `
                INSERT INTO reservations (user_id, date, starting_time, wheel_number)
                VALUES ($1, $2, $3, $4)
            `,
        [
          reservation.user_id,
          reservation.date,
          reservation.starting_time,
          reservation.wheel_number,
        ],
      );
    }

    console.log("Initial reservations created successfully.", reservations);
  } catch (error) {
    console.error("Error creating initial reservations:", error);
  } finally {
    client.release();
  }
}

// Call the function to create initial reservations
createInitialReservations();
