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
/*

Write one event

*/

/*

First Event

*/ 

const event = jsonEvent({
  type: "Same_Client_First_Write",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: ANY"
   }
});

/*

Second Event

*/


const event2 = jsonEvent({
  type: "Same_Client_Second_Write",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: ANY"
   }
});

const interloper_event = jsonEvent({
  type: "interloper_event",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: ANY"
   }
});

// Commit First Write
const appendResult = await client.appendToStream(streamName, event, {expectedRevision: ANY} );
/*
Capture the position of the stream and make sure
no other events were added before you
return with second event
*/

var position = appendResult.nextExpectedRevision;

/*
Uncomment the line below
to simulate another process writing 
to the stream
note the second write will fail due to position check
*/

//const interloper = await client.appendToStream(streamName, interloper_event, {expectedRevision: ANY} );


// Write the second event only if nobody intervened in the stream
try {
const appendResult2 = await client.appendToStream(streamName, event2, {expectedRevision: position} );
} catch (error){
console.log("\n************ SECOND WRITE FAILED **********\n");


}
client.dispose();

//await client.appendToStream("no-stream-stream", eventTwo, {
//  expectedRevision: NO_STREAM,
//})
console.log('Your eventID is', eventID);
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);
console.log(position)
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
