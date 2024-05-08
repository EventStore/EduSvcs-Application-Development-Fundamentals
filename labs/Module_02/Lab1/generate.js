import { EventStoreDBClient,jsonEvent } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// from module 1 demo
const event1 = jsonEvent({
 id: uuid(),
 type: "itemAdded",
 data: {
   customerId: "1",
   amount: "10.00",
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

const event3 = jsonEvent({
 id: uuid(),
 type: "orderRequested",
 data: {
   customerId: "1",
   requestor: "John Smith",
   email:"john@eventstore.com",
 },
});

const event4 = jsonEvent({
 id: uuid(),
 type: "orderApproved",
 data: {
   customerId: "1",
   requestor: "John Smith",
   email:"john@eventstore.com",
   approver:"Jane Smith"
 },
});

// from module 1 exercise
const event5 = jsonEvent({
  id: uuid(),
  type: "itemShipped",
  data: {
    customerId: "1",
    price: "10.00",
    item:"keyboard"
  },
});

const event6 = jsonEvent({
  id: uuid(),
  type: "itemShipped",
  data: {
    customerId: "1",
    price: 20.00,
    item:"mouse"
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
