import { EventStoreDBClient, jsonEvent} from "@eventstore/db-client";
import { v4 as uuid} from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const event1 = jsonEvent({
  id: uuid(),
  type: "itemAdded",
  data: {
    customerId: "1",
    amount: "50.00",
    item: "keyboard"
  },
});

await client.appendToStream("order-123", event1);

const event2 = jsonEvent({
  id: uuid(),
  type: "itemAdded",
  data: {
    customerId: "1",
    amount: "20.00",
    item: "mouse"
  },
});

await client.appendToStream("order-123", event2);

client.dispose();
console.log("Events were added");
