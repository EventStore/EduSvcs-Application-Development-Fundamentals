import { EventStoreDBClient, jsonEvent, START, FORWARDS } from "@eventstore/db-client";
import { evolve, decide } from './decider.js';

// Establish a connection to the EventStoreDB
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Function to append events to the EventStoreDB
async function appendEvents(streamName, events) {
  try {
    await client.appendToStream(streamName, events.map(event => jsonEvent(event)));
    console.log(`Events appended to ${streamName}`);
  } catch (error) {
    console.error(`Error appending events to ${streamName}: ${error.message}`);
  }
}

// Function to read events from the EventStoreDB using a filter
async function readEvents(streamName) {
  const initialState = { inventory: 0 };
  let state = initialState;

  try {
    const events = client.readStream(streamName, {
      direction: FORWARDS,
      fromRevision: START
    });

    for await (const event of events) {
      if (event.event) {
        state = evolve(state, event.event);
      }
    }
  } catch (error) {
    console.error(`Error reading events from stream ${streamName}: ${error.message}`);
  }

  return state;
}

// Main function to test the decider logic
async function testDecider() {
  const streamName = "inventory";

  // Read events from the "inventory" stream
  let state = await readEvents(streamName);

  console.log("Initial State:", state);

  const commands = [
    { type: "addInventory", data: { count: 5, cost: 50 } },
    { type: "removeInventory", data: { count: 2 } },
    { type: "placeOrder", data: { count: 2, price: 200 } }
  ];

  for (const command of commands) {
    try {
      const newEvents = await decide(command, state);
      newEvents.forEach(event => {
        state = evolve(state, event);
        appendEvents(streamName, [event]);
      });
      console.log(`After command ${command.type}:`, state);
    } catch (error) {
      console.error(`Error processing command ${command.type}: ${error.message}`);
    }
  }
}

testDecider().catch(console.error);
