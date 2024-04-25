import { EventStoreDBClient,START } from "@eventstore/db-client";

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

let totalKeyboardSales = 0

const subscription = client
 .subscribeToStream("orders", {
   fromRevision: START,
 })
 .on("data", (resolvedEvent) => {
   handleEvent(resolvedEvent);
 });

// Define the event handler function
const handleEvent = async (resolvedEvent) => {
 const eventData = resolvedEvent.event?.data;
 if (eventData && eventData.item === "keyboard") {
   console.log("Received event:", eventData);
   totalKeyboardSales += eventData.price;
   console.log("the total keyboard sales is: " + totalKeyboardSales);
 }
};
