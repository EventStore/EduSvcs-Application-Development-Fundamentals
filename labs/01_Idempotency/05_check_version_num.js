import { ANY, EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
const streamName = "test_Stream";

/*
HOW TO DEMO
1. Run this code as is
First event is expected version ANY, it will always succeed
Second event is a specific version number, it will only succeed
if it is the next event, if another client writes to the stream 
between the first write and the second it will fail

2. Uncomment the interloper event, and cause the second write to fail

NOTE we are not using uuid here, the server will assign an id
*/


const event1 = jsonEvent({
  type: "Same_Client_First_Write_EXPECTED_VERSION_ANY",
  data: {
     "test_value": "01",
   //  "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: Integer Value"
   }
});


// second event
const event2 = jsonEvent({
  type: "Same_Client_Second_Write_EXPECTED_Version_Integer_Value",
  data: {
     "test_value": "01",
     //"id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: Integer Value"
   }
});

// Interloper event
const interloper_event = jsonEvent({
  type: "interloper_event",
  data: {
     "test_value": "01",
     //"id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: ANY"
   }
});

// Commit First Write
const appendResult = await client.appendToStream(streamName, event1, {expectedRevision: ANY} );
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

const interloper = await client.appendToStream(streamName, interloper_event, {expectedRevision: ANY} );


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
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);
console.log(position)
//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
