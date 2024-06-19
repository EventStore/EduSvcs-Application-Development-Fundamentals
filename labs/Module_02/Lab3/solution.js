import { EventStoreDBClient,START } from "@eventstore/db-client";
import fs from 'fs';

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const readModelFile = "read_model.txt"; // <=== "read_model.txt"
let totalKeyboardSales = { total: 0 }

const subscription = client
 .subscribeToStream("order-123", {
   fromRevision: START})
 .on("data", (resolvedEvent) => {
   handleEvent(resolvedEvent);
})
.on("error", (err) => {
  console.error("Subscription error:", err);
})
.on("end", () => {
  console.log("Subscription ended");
});


const handleEvent = async (resolvedEvent) => {
 const eventData = resolvedEvent.event?.data;
 if (eventData && resolvedEvent.event?.type === "itemShipped" && eventData.item === "keyboard") {
    console.log("Received event:", eventData);
    totalKeyboardSales.total += parseFloat(eventData.amount);
    console.log("The total keyboard sales: " + totalKeyboardSales.total);
    saveReadModel(totalKeyboardSales);
   }
};

// Function to save the read model to a file
const saveReadModel = (model) => {
  fs.writeFileSync(readModelFile, JSON.stringify(model), 'utf8');
};
