import { EventStoreDBClient,jsonEvent } from "@eventstore/db-client";
import { v4 as uuid } from 'uuid'
/*
  A note on imports
  These imports depend on them being included in the project
  When using yarn they would have been added with a
  "yarn add" command
  "yarn add" places the dependency information in a "yarn.lock" file
  in order to physically add the dependencies to a local "modules" folder, at some point you will have to run "yarn install"
  Note your IDE may take care of that process on your behalf. 
  
*/  

// The client has been created for you
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

/* The event creation code is only partially complete
Please complete it

*/

const event = jsonEvent({
    // Your Code Here
    // id and Event Type
  data: {
      // Your Code Here
      // CustomerId, Price, and Item
  },
});

// Please modify the name so that it matches the stream name in the instructions
await client.appendToStream("<YOUR-STREAM-NAME-HERE>", event);
client.dispose();
