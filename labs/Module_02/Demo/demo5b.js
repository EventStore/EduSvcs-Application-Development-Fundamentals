import { EventStoreDBClient, PARK } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

async function subscribeToPersistentSubscription() {
  const subscription = client.subscribeToPersistentSubscriptionToStream(
    "order-123",
    "group1"
  );

  try {
    for await (const event of subscription) {
      try {
        if (event.event?.type === "itemShipped") {
          console.log(
            `handling event ${event.event?.type} with retryCount ${event.retryCount}`
          );

          await handleEvent(event);
        } else {
          console.log(`Ignoring event ${event.event?.type}`);
        }
        
        await subscription.ack(event);
      } catch (error) {
        await subscription.nack(PARK, error.toString(), event);
      }
    }
  } catch (error) {
    console.log(`Subscription was dropped. ${error}`);
  }
}

async function handleEvent(event) {
  // Your event handling logic here
  console.log("sending email to the customer:", event.event?.data);
}

subscribeToPersistentSubscription().catch(error => {
  console.error("Error subscribing to persistent subscription:", error);
});

