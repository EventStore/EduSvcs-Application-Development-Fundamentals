import { EventStoreDBClient,START } from "@eventstore/db-client";
import fs from 'fs';

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Define the file path for storing the checkpoint
const checkpointFilePath = "checkpoint.txt";

let totalKeyboardSales = 0

// Load the checkpoint from the file or use a default value
let checkpoint = 0;
try {
 checkpoint = parseInt(fs.readFileSync(checkpointFilePath, "utf-8"));

   // Check if the checkpoint is zero, indicating that it hasn't been set yet
   if (checkpoint === 0) {
       // If the checkpoint is zero, set it to START to subscribe from the beginning
       checkpoint = START;
   }

} catch (error) {
 console.error("Error loading checkpoint:", error);
}


const subscription = client
 .subscribeToStream("orders", {
   fromRevision: checkpoint,
 })
 .on("data", (resolvedEvent) => {
   handleEvent(resolvedEvent);
   checkpoint = resolvedEvent.event?.revision ?? checkpoint;
 });


// Define the event handler function
const handleEvent = async (resolvedEvent) => {
 const eventData = resolvedEvent.event?.data;
 if (eventData && eventData.item === "keyboard") {
   console.log("Received event:", eventData);
   totalKeyboardSales += eventData.price;
   console.log("the total keyboard sales is: " + totalKeyboardSales);

   // Update the checkpoint in the file
   try {
       checkpoint = resolvedEvent.event?.revision.toString() ?? checkpoint;

     fs.writeFileSync(checkpointFilePath, checkpoint);
   } catch (error) {
     console.error("Error updating checkpoint:", error);
   }
 }
};
