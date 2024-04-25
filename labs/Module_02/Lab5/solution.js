import { EventStoreDBClient,START } from "@eventstore/db-client";
import fs from 'fs'

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

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
  if (eventData && eventData.type === "invoicePaid" && eventData.data.accountId==="123" || eventData.data.accountId==="345") {

   console.log("Received event:", eventData);

   // Update the checkpoint in the file
   try {
     fs.appendFileSync("report.txt", "Invoice paid for " + eventData.data.accountId + " with amount of " + eventData.data.amount);
   } catch (error) {
     console.error("Error logging the report:", error);
   }

 }
};
