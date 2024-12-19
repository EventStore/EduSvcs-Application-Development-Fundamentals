import { EventStoreDBClient, jsonEvent } from "@eventstore/db-client";

// Establish a connection to the EventStoreDB
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Function to create test events
async function createTestEvents() {
  const event1 = jsonEvent({ type: "inventoryAdded", data: { count: 10, cost: 100 } });
  const event2 = jsonEvent({ type: "inventoryRemoved", data: { count: 1 } });
  const event3 = jsonEvent({ type: "orderPlaced", data: {count: 1, price: 150 } });

  await client.appendToStream("inventory", [event1, event2,event3]);
  console.log("Inventory events created");
}

// Run the test function
createTestEvents().catch(console.error).finally(() => client.dispose());