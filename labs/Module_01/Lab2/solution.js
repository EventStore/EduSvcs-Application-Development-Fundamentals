import { EventStoreDBClient} from "@eventstore/db-client";
import { BACKWARDS,END } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const events = client.readStream("order-123", {
  direction: BACKWARDS,
  fromRevision: END,
});

for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data.amount);
}
client.dispose();
