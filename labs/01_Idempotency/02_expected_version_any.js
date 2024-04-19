import { ANY, EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");



const streamName = "test_Stream";

// use uuid to set id for the event
// This takes the format of a Uuid 
// and is used to uniquely identify 
// the event you are trying to append. 
// If two events with the same Uuid are 
// appended to the same stream in quick 
// succession EventStoreDB will only append one copy of the event to the stream.
//
const eventID = uuidv4();
// Note the addition of metadata to this event
// In can be used to include metadata
// in this case the concurrency control setting is included

const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: ANY"
   }
});

//const appendResult = await client.appendToStream(streamName, event);
const appendResult = await client.appendToStream(streamName, event, {expectedRevision: ANY} );
client.dispose();

//await client.appendToStream("no-stream-stream", eventTwo, {
//  expectedRevision: NO_STREAM,
//})
console.log('Your eventID is', eventID);
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
