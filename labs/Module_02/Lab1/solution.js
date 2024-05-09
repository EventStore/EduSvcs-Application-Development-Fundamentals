import { EventStoreDBClient,jsonEvent} from "@eventstore/db-client";
import { FORWARDS,START } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'	

const events = client.readStream("order-123");

let totalKeyboardSales = 0
    
for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
  let eventData = resolvedEvent.event?.data
  if (eventData && resolvedEvent.event?.type === "itemShipped" && (eventData.item === "keyboard") {
    totalKeyboardSales += eventData.price;
  }
}
console.log("Total actual keyboard sales: " + totalKeyboardSales);
