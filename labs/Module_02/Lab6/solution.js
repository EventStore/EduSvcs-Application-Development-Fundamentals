import { EventStoreDBClient,eventTypeFilter,streamNameFilter} from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const subscription1 = client.subscribeToAll({
  	filter: eventTypeFilter({
  		prefixes: ["Invoice"],
}),
});

console.log("filtering by event type prefix");
for await (const resolvedEvent of subscription1) {
  console.log(resolvedEvent.event?.streamId);
  console.log(resolvedEvent.event?.data);
  console.log(resolvedEvent.event?.type);
}

const subscription2 = client.subscribeToAll({
  	filter: eventTypeFilter({
  		regex: "^Payment",
}),
});

console.log("filtering by event type regex");
for await (const resolvedEvent of subscription2) {
  console.log(resolvedEvent.event?.streamId);
  console.log(resolvedEvent.event?.data);
  console.log(resolvedEvent.event?.type);
}

const subscription3 = client.subscribeToAll({
  	filter: streamNameFilter({
  		prefixes: ["invoice"],
}),
});

console.log("filtering by stream name prefix");
for await (const resolvedEvent of subscription3) {
  console.log(resolvedEvent.event?.streamId);
  console.log(resolvedEvent.event?.data);
  console.log(resolvedEvent.event?.type);

}

const subscription4 = client.subscribeToAll({
  	filter: streamNameFilter({
  		regex: "^order",
}),
});

console.log("filtering by stream name regex");
for await (const resolvedEvent of subscription4) {
  console.log(resolvedEvent.event?.streamId);
  console.log(resolvedEvent.event?.data);
  console.log(resolvedEvent.event?.type);

}
