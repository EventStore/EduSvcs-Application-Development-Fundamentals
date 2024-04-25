import { EventStoreDBClient,jsonEvent } from "@eventstore/db-client";
import { BACKWARDS, FORWARDS, START , END} from "@eventstore/db-client";
// Test code to see if they have the stream and the event

// create a client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");


// One way to see recent streams is to read the 
// $all stream backwards
// System streams start with $ so they are filtered out

// Read $all stream
    const events = client.readAll({
      direction: BACKWARDS,
      fromPosition: END,
      maxCount: 50,
    });

    // build array of recently created streams
    var streams_list = [];
    for await (const resolvedEvent of events) {
      if (!resolvedEvent.event?.streamId.startsWith("$")) {
        streams_list.push(resolvedEvent.event?.streamId)
      }
      }

      // Check for our stream

//console.log(streams_list[0]);
function check_stream(stream) {
  return stream == "order-123";
}

// found the stream
if(streams_list.find(check_stream)) {
console.log("congratulations you have created the stream")

} else {
  // did not find the stream
console.log("You have failed to create the correct stream");
console.log("Perhaps there was a typo");
console.log("Here are the recently created streams");  
console.log(streams_list)

}



client.dispose();
