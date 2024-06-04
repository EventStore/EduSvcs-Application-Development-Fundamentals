//import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { PARK } from '@eventstore/db-client';
//import writeFileSync from FileSystem;
import * as fs from 'fs';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const subscription = client.subscribeToPersistentSubscriptionToStream(
    "test_stream",
    "mygroup"
);

try {
  for await (const event of subscription) {
    try {
      console.log(
        `handling event ${event.event?.type} with retryCount ${event.retryCount}`
      );
      //console.log(event.event?.data)
      const data_to_log = {stream_name: event.event?.streamId, create_time: event.event?.created, event_type: event.event?.type, data_payload: event.event.data};
      console.log(JSON.stringify(data_to_log));
      fs.appendFileSync('data.txt', JSON.stringify(data_to_log).concat("\n"));




      await handleEvent(event);
      await subscription.ack(event);
      
      //console.log(resolvedEvent.event.data);
    } catch (error) {
      await subscription.nack(PARK, error.toString(), event);
    }
  }
} catch (error) {
  console.log(`Subscription was dropped. ${error}`);
}

client.dispose();
