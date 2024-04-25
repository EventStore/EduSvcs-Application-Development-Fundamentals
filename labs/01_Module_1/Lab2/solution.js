import { EventStoreDBClient,jsonEvent } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const event = jsonEvent({
  id: uuid(),
  type: "orderShipped",
  data: {
    customerId: "1",
    price: "10.00",
    item:"keyboard"
  },
});

await client.appendToStream("order-123", event);
client.dispose();
