import { EventStoreDBClient, PARK } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const subscription = client.subscribeToPersistentSubscriptionToStream(
  "order-123",
  "group1"
);

for await (const event of subscription) {
  try {
    if (event.event?.type === "itemShipped") {
      await handleEvent(event);
    } else {
      console.log(`Ignoring event ${event.event?.type}`);
    }
    await subscription.ack(event);
  } catch (error) {
    await subscription.nack(PARK, error.toString(), event);
  }
}

async function handleEvent(event) {
  console.log(`handling event ${event.event?.type} with retryCount ${event.retryCount}`);
  console.log("sending email to the customer:", event.event?.data);
}
