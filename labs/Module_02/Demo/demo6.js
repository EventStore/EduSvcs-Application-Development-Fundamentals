import { EventStoreDBClient,jsonEvent,eventTypeFilter,streamNameFilter} from "@eventstore/db-client";
import { v4 as uuid} from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const event1 = jsonEvent({
  id: uuid(),
  type: "ItemAdded",
  data: {
    ItemId: "ITEM001",
    Quantity: 2,
    PricePerUnit: 20.00,
    AddedBy: "User001",
    Timestamp: "2024-11-26T10:05:00Z"
  },
});

await client.appendToStream("order-123", event1);

const event2 = jsonEvent({
  id: uuid(),
  type: "ItemAdded",
  data: {
    ItemId: "ITEM001",
    Quantity: 2,
    PricePerUnit: 20.00,
    AddedBy: "User001",
    Timestamp: "2024-11-26T10:05:00Z"
  },
});

await client.appendToStream("order-456", event2);

const event3 = jsonEvent({
  id: uuid(),
  type: "OrderShipped",
  data: {
    ShippedBy: "Warehouse001",
    TrackingNumber: "TRACK123",
    ShippingDate: "2024-11-27T12:00:00Z"
  },
});

await client.appendToStream("order-123", event3);

const event4 = jsonEvent({
  id: uuid(),
  type: "OrderShipped",
  data: {
    ShippedBy: "Warehouse001",
    TrackingNumber: "TRACK456",
    ShippingDate: "2024-11-27T12:00:00Z"
  },
});

await client.appendToStream("order-456", event4);

const event5 = jsonEvent({
  id: uuid(),
  type: "InvoiceSent",
  data: {
    OrderId: "order-123",
    SentTo: "customer@example.com",
    Timestamp: "2024-11-26T11:30:00Z"
  },
});

await client.appendToStream("invoice-123", event5);

const event6 = jsonEvent({
  id: uuid(),
  type: "PaymentReceived",
  data: {
    PaymentId: "PAY001",
    OrderId: "order-123",
    AmountPaid: 120.50,
    PaymentMethod: "Credit Card",
    Timestamp: "2024-11-28T14:00:00Z"
  },
});

await client.appendToStream("invoice-123", event6);

client.dispose();
console.log("Events were added");
    
const subscription1 = client.subscribeToAll({
  filter: eventTypeFilter({
  	prefixes: ["Item"],
  }),
});

console.log("filtering by event type prefix");
for await (const resolvedEvent of subscription1) {
  console.log(resolvedEvent.event?.streamId)
  console.log(resolvedEvent.event?.type);
  console.log(resolvedEvent.event?.data);
}

const subscription2 = client.subscribeToAll({
  filter: eventTypeFilter({
  	regex: "^Order",
  }),
});

console.log("filtering by event type regex");
for await (const resolvedEvent of subscription2) {
  console.log(resolvedEvent.event?.streamId)
  console.log(resolvedEvent.event?.type);
  console.log(resolvedEvent.event?.data);
}

const subscription3 = client.subscribeToAll({
  filter: streamNameFilter({
  	prefixes: ["order"],
  }),
});

console.log("filtering by stream name prefix");
for await (const resolvedEvent of subscription3) {
  console.log(resolvedEvent.event?.streamId)
  console.log(resolvedEvent.event?.type);
  console.log(resolvedEvent.event?.data);
}

const subscription4 = client.subscribeToAll({
  filter: streamNameFilter({
  	regex: "^invoice",
  }),
});

console.log("filtering by stream name regex");
for await (const resolvedEvent of subscription4) {
  console.log(resolvedEvent.event?.streamId)
  console.log(resolvedEvent.event?.type);
  console.log(resolvedEvent.event?.data);
}
