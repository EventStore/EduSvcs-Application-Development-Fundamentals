import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const events = client.readStream("order-123",{
  direction: FORWARDS,
  fromRevision: START,
});

for await (const resolveEvent of events){
  console.log(resolveEvent.event?.data);
}

client.dispose();
