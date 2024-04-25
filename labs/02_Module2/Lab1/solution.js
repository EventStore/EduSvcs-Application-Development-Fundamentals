import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'	

const event = jsonEvent({
  id: uuid(),
  type: "orderShipped",
  data: {
    orderId: "123", // Added orderId to uniquely identify the order
    customerId: "1",
    price: 10.00,
    item:”keyboard”
  },
});

await client.appendToStream("orders", event);

const events = client.readStream("orders");

let totalKeyboardSales = 0
    
for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
  let eventData = resolvedEvent.event?.data
  if (eventData && eventData.item === "keyboard") {
    totalKeyboardSales += eventData.price;
  }
}
console.log("Total keyboard sales: " + totalKeyboardSales);
