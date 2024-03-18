import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const userId = "ms_smith";
const movieId = "homealone";
const seatId = "seat1";

const reservationId = `res_${movieId}_${seatId}`;

let events = client.readStream(
  "res_homealone_seat1",
  {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 20
  }
);

// const events = client.readStream("$all", {
//   direction: FORWARDS,
//   fromRevision: START,
//   maxCount: 10,
// });

for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
}
client.dispose();
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client.
