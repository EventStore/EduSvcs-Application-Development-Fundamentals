import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

//const userId = "ms_smith";
//const movieId = "homealone";
//const seatId = "seat1";

//const reservationId = `res_${movieId}_${seatId}`;
const streamName = "test_Stream";


const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01"
   },
});

await client.appendToStream(streamName, event);
client.dispose();
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
