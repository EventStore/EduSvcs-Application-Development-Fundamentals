import { EventStoreDBClient, jsonEvent, START } from "@eventstore/db-client";
import fs from 'fs';

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const readModelFile = "read_model.json"; // File to save the read model
let readModel = { orders_placed: 0, items_sold: 0, sales_bookings: 0 };

// Create a subscription and handle events, errors, and end of the subscription
const subscription = client.subscribeToStream("inventory", { fromRevision: START })
  .on("data", (resolvedEvent) => {
    handleEvent(resolvedEvent);
  })
  .on("error", (err) => {
    console.error("Subscription error:", err);
  })
  .on("end", () => {
    console.log("Subscription ended");
  });

// Define the event handler function
const handleEvent = async (resolvedEvent) => {
  const eventData = resolvedEvent.event?.data;
  if (eventData && resolvedEvent.event?.type === "orderPlaced") {
    console.log("Received event:", eventData);
    readModel.orders_placed += 1;
    readModel.items_sold += eventData.count;
    readModel.sales_bookings += parseFloat(eventData.price);
    console.log("Read model data:", JSON.stringify(readModel)); // Corrected logging
    saveReadModel(readModel);
  }
};

// Function to save the read model to a file
const saveReadModel = (model) => {
  fs.writeFileSync(readModelFile, JSON.stringify(model), 'utf8');
};
