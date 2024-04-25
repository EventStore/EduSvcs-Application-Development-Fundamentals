import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'	

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");



const event = jsonEvent({
  id: uuid(),
  type: "orderShipped",
  data: {
    customerId: "1",
    price: 20.00,
    item:"mouse"
  },
});

await client.appendToStream("order-123", event);

const events = client.readStream("order-123", {
  direction: FORWARDS,
  fromRevision: START,
});

for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
}
client.dispose();
