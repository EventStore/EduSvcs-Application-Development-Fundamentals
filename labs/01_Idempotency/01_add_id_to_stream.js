import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';
/*
This example adds a locally generated event id

If no event id is set when appending an event, 

then EventStoreDB will set one for you

Setting one 

*/


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


const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01",
     "id": eventID
   },
});

//await client.appendToStream(streamName, event);
const appendResult = await client.appendToStream(streamName, event);

client.dispose();
//appendResult.position
//appendResult.
console.log('Your eventID is', eventID);
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);

//I need to ask a node expert if I am abusing the asynchronous call with await her
// honeslty I do not know, I assume dispose closes the client. %
