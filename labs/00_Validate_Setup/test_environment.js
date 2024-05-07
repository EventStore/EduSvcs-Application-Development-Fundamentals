//import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";


// # This tests you environment
// # In particular
// # 1. is node.js working?
// # 2. Is an eventstore db instance available at localhost?
// # 3. Is the eventstore db instance unsecured?
// # 4. Can our application append and events to/from a stream?

// Define a test_node function
function test_node () {
    console.log("\n#### TESTING NODE ######\n");
    console.log(`Hello node.js!\n Using ${process.version} node version. \n\n`);
    console.log("You seem to have a working version of node.js\n");
}

// Set a stream name and construct a JsonEvent
const streamName = "test_stream";

const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01"
   },
});

// Create a client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");


//Create a Function to test append
async function append_test(){
try {
const response = await client.appendToStream(streamName, event);
return true;
} catch (error){
    return false;

}

} 






// Run the Three Tests
// Test Node
try {
test_node();
}
catch(error) {
    console.log("NODE APPEARS TO BE BROKEN");
    // Fun fact, if node is broken, how would this catch block ever be executed ;-)
}



//Test Append
console.log("\n########## TESTING EventStoreDB Write #######\n");
const append_works = await append_test();
if (append_works) {
console.log("Write to EventStoreDB was a Success");

} else {
console.log("Write to EventStoreDB was a Failure");

}


// Test Read
console.log("\n########## Testing EventStoreDB Read #######")
if (append_works) {
    let events = client.readStream(
        streamName,
        {
          fromRevision: START,
          direction: FORWARDS,
          maxCount: 5
        }
      
      );
      console.log("\nReading is a succcess\n");
      console.log("Here are the last 5 events\n");
      for await (const resolvedEvent of events) {
        console.log(resolvedEvent.event?.data);
      }
    
    } else {
    console.log("\nReading Events was a failure");
    
    }

// console.log(await read_test());
client.dispose();
