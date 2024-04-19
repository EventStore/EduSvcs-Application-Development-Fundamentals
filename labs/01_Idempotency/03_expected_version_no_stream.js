import { ANY, EventStoreDBClient, NO_STREAM } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

/*
ExpectedVersion NO_STREAM, 
at most this will succeed in an append one time.
If you have ran any of the other code in this folder 
it will not succeed in any appends



*/

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

try {
var appendResult = await client.appendToStream(streamName, event, {expectedRevision: NO_STREAM} );


}catch (error) {
  console.log("*********ERROR********");
  console.error(error);
  
}
client.dispose();
//await client.appendToStream("no-stream-stream", eventTwo, {
//  expectedRevision: NO_STREAM,
//})
console.log('Your eventID is', eventID);
console.log('Your eventID is', eventID);

// If the append failed appendResult will not be defined
//
//console.log(appendResult.position);
//console.log(appendResult.success);
//console.log(appendResult.nextExpectedRevision);
//
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
