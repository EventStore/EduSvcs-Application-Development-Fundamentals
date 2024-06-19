import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

let orderSales = { pendingSales: 0, actualSales: 0 };

const stream = await client.readStream("order-123", { direction: FORWARDS, fromRevision: START });

for await (const resolvedEvent of stream) {
    const event = resolvedEvent.event;
    const data = event.data;
    const amount = parseFloat(data.amount || 0);

     if (event.type === "itemAdded" && event.data.item === "keyboard") {
        orderSales.pendingSales += amount;
     } else if (event.type === "itemShipped" && event.data.item === "keyboard") {
        orderSales.pendingSales -= amount;
        orderSales.actualSales += amount;
     }
 }

console.log(`Pending sales: $${orderSales.pendingSales}\nActual sales: $${orderSales.actualSales}`);

client.dispose();
