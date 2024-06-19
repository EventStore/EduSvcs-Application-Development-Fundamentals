import { EventStoreDBClient, START } from "@eventstore/db-client";
import fs from 'fs';

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const readModelFile = "read_model.txt"; // File to save the read model

// Function to load the read model from the file
const loadReadModel = () => {
    if (fs.existsSync(readModelFile)) {
      const data = JSON.parse(fs.readFileSync(readModelFile, 'utf8'));
      // Convert the checkpoint back to a BigInt after deserialization
      return {
        actualSales: data.actualSales || { total: 0 },
        checkpoint: BigInt(data.checkpoint || START)
      };
    } else {
      return { actualSales: { total: 0 }, checkpoint: START };
    }
  };

  
// Function to save the read model to a file
const saveReadModel = (model, checkpoint) => {
  // Convert the checkpoint (BigInt) to a string for serialization
  const serializedData = {
    actualSales: model,
    checkpoint: checkpoint.toString()
  };
  fs.writeFileSync(readModelFile, JSON.stringify(serializedData), 'utf8');
};

const { actualSales, checkpoint } = loadReadModel();

// Create a subscription and handle events, errors, and end of the subscription
const subscription = client.subscribeToStream("order-123", { fromRevision: checkpoint })
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
  if (eventData && resolvedEvent.event?.type === "itemShipped" && eventData.item ==="keyboard") {
    console.log("Received event:", eventData);
    actualSales.total += parseFloat(eventData.amount);
    console.log("The actual sales amount is: " + actualSales.total);
    saveReadModel(actualSales, resolvedEvent.event?.revision);
  }
};
