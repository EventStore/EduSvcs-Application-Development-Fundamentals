import { ANY, EventStoreDBClient, NO_STREAM } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

/*
ExpectedVersion NO_STREAM, 
at most this will succeed in an append one time.
NOTE the stream name is different than in example 01, and 02

Best way to demo is change stream to a non existant stream and run twice

*/

const streamName = "test_Stream11";


const eventID = uuidv4();


const event = jsonEvent({
  type: "Test_Event",
  data: {
     "test_value": "01",
     "id": eventID
   },
   metadata: {
    "concurrency_setting": "expectedRevision: NO_STREAM"
   }
});

try {
var appendResult = await client.appendToStream(streamName, event, {expectedRevision: NO_STREAM} );


}catch (error) {
  console.log("*********ERROR********");
  console.log("##### YOUR EVENT WAS NOT WRITTEN#####")
  console.error(error);
  
}
client.dispose();

// appendResult will be undefined in case of failed write
// code block below only executed on succesful write
if (appendResult) {
console.log("##YOUR EVENT WAS WRITTEN");
console.log(appendResult.position);
console.log(appendResult.success);
console.log(appendResult.nextExpectedRevision);
}


