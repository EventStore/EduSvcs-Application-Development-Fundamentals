import { EventStoreDBClient, START } from "@eventstore/db-client";
import fs from 'fs';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const readModelFile = "read_model.txt";

//loads the read model
const loadReadModel = () => {
    if (fs.existsSync(readModelFile)) {
      const data = JSON.parse(fs.readFileSync(readModelFile, 'utf8'));
      return {
        actualSales: data.actualSales || { total: 0 },
        checkpoint: data.checkpoint || START
      };
    } else {
      return { actualSales: { total: 0 }, checkpoint: START };
    }
  };

//saves the read model
const saveReadModel = (model, checkpoint) => {
  const serializedData = {
    actualSales: model,
    checkpoint: checkpoint.toString()
  };
  fs.writeFileSync(readModelFile, JSON.stringify(serializedData), 'utf8');
};

const { actualSales, checkpoint } = loadReadModel(); // read model adds a checkpoint

//subscription is loading the checkpoint
const subscription = client.subscribeToStream("order-123", { fromRevision: checkpoint })
  .on("data", (resolvedEvent) => {
    handleEvent(resolvedEvent);
  })

const handleEvent = async (resolvedEvent) => {
  const eventData = resolvedEvent.event?.data;
  if (eventData && resolvedEvent.event?.type === "itemShipped") {
    console.log("Received event:", eventData);
    actualSales.total += parseFloat(eventData.amount);
    console.log("The actual sales amount is: " + actualSales.total);
    saveReadModel(actualSales, resolvedEvent.event?.revision);//subscription is saving the checkpoint
  }
};

console.log("Subscription started. Listening for events...");
