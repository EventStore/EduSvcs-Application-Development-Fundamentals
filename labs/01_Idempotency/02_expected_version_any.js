import { ANY, EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
/*
// Expected Version Any 
// No checking is done 
// Stream may exist, or it may not
// Event may be the first of the 101'st
// It makes no differenc
//
*/


const streamName = "test_Stream";

const eventID = uuidv4();
// Note the addition of metadata to this event
// In can be used to include metadata
// in this case the concurrency control setting is included
// In this example the metadata is used to record the 
// value of expected_revision
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

