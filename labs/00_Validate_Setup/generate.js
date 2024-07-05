import { EventStoreDBClient,jsonEvent } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

//Add events

//from module 1 demo 1
const event1 = jsonEvent({
    id: uuid(),
    type: "itemAdded",
    data: {
      customerId: "1",
      amount: "50.00",
      item:"keyboard"
    },
});
      
const event2 = jsonEvent({
    id: uuid(),
    type: "itemAdded",
    data: {
      customerId: "1",
      amount: "20.00",
      item:"mouse"
    },
});

//from module 1 lab 1
const event3 = jsonEvent({
    id: uuid(),
    type: "itemShipped",
    data: {
      customerId: "1",
      amount: "50.00",
      item:"keyboard"
    },
});

//from module 2 demo 2
const event4 = jsonEvent({
    id: uuid(),
    type: "itemShipped",
    data: {
      customerId: "1",
      amount: "20.00",
      item:"mouse"
    },
});

//from module 2 lab 2
const event5 = jsonEvent({
    id: uuid(),
    type: "itemAdded",
    data: {
      customerId: "1",
      amount: "50.00",
      item:"keyboard"
    },
});

const event6 = jsonEvent({
    id: uuid(),
    type: "itemShipped",
    data: {
      customerId: "1",
      amount: "50.00",
      item:"keyboard"
    },
});  

await client.appendToStream("order-123", event1);
await client.appendToStream("order-123", event2);
await client.appendToStream("order-123", event3);
await client.appendToStream("order-123", event4);
await client.appendToStream("order-123", event5);
await client.appendToStream("order-123", event6);

client.dispose();
console.log("The events were added to the stream.")
