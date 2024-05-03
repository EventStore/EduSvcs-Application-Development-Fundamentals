import { ANY, EventStoreDBClient, NO_STREAM, STREAM_EXISTS } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

/*
ExpectedVersion STREAM_EXISTS
Forces failure to write when stream does not exist
*/

/*
HOW TO DEMO
Best way to demo is to run once and succeed
Change stream name and fail
*/

const streamName = "test_Stream";


const eventID = uuidv4();


const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: STREAM_EXISTS"
   }
});

try {
var appendResult = await client.appendToStream(streamName, event, {expectedRevision: STREAM_EXISTS} );


}catch (error) {
  console.log("######## YOUR EVENT WAS NOT WRITTEN ###")
  console.log("*********ERROR********");
  console.error(error);
  
}
client.dispose();


// If the append failed appendResult will not be defined
//
if(appendResult){
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);
}
//
