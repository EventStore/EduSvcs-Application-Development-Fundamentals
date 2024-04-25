import { EventStoreDBClient} from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const subscription1 = client.subscribeToAll({
  	filter: eventTypeFilter({
  		prefixes: ["order"],
}),
});

console.log("filtering by event type prefix");
for await (const resolvedEvent of subscription1) {
  console.log(resolvedEvent.event?.data);
}


const subscription2 = client.subscribeToAll({
  	filter: eventTypeFilter({
  		regex: "^order",
}),
});

console.log("filtering by event type regex");
for await (const resolvedEvent of subscription2) {
  console.log(resolvedEvent.event?.data);
}

const subscription3 = client.subscribeToAll({
  	filter: streamNameFilter({
  		prefixes: ["order"],
}),
});

console.log("filtering by stream name prefix");
for await (const resolvedEvent of subscription3) {
  console.log(resolvedEvent.event?.data);
}

const subscription4 = client.subscribeToAll({
  	filter: streamNameFilter({
  		regex: "^order",
}),
});

console.log("filtering by stream name regex");
for await (const resolvedEvent of filterEvents4) {
  console.log(resolvedEvent.event?.data);
}
