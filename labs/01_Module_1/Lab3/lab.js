import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'	

// You will need a client
// See previous examples on how to create a
// client

const client = <Your Code Here>;


// Create an event

const event = jsonEvent({
    <YOUR CODE HERE>
 });

await client.appendToStream("order-123", event);

/////////////////////
// Read the events
// hint use client.readStream
// If you get stuck, read the imports as
// we have imported the tools you need to complete this
///////////////////
const events = client.readStream("order-123", {<YOUR CODE HERE>
});


// Iterate through the result set
// This code has been written for you

for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
}
client.dispose();
