import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const userId = "ms_smith";
const movieId = "homealone";
const seatId = "seat1";

const reservationId = `res_${movieId}_${seatId}`;

const event = jsonEvent({
  type: "SeatReserved",
  data: {
     reservationId,
     movieId,
     seatId,
     userId
   },
});

await client.appendToStream(reservationId, event);
client.dispose();
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
