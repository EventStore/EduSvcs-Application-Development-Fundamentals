import { EventStoreDBClient, jsonEvent } from "@eventstore/db-client";

// Establish a connection to the EventStoreDB
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Function to create test events
async function createTestEvents() {
  const event1 = jsonEvent({ type: "itemShipped", data: { count: 1, cost: 150 } });
  await client.appendToStream("inventory", [event1]);
  console.log("Inventory events created");
}

// Run the test function
createTestEvents().catch(console.error).finally(() => client.dispose());