import { EventStoreDBClient, persistentSubscriptionToStreamSettingsFromDefaults } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

async function createPersistentSubscription() {
  const settings = persistentSubscriptionToStreamSettingsFromDefaults({
    startFrom: 'start',
    resolveLinkTos: true
  });

  await client.createPersistentSubscriptionToStream(
    "order-123",  // The stream name
    "group1",     // The subscription group name
    settings
  );

  console.log("Persistent subscription created");
}

createPersistentSubscription().catch(error => {
  console.error("Error creating persistent subscription:", error);
});
