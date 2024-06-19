import { EventStoreDBClient, jsonEvent, FORWARDS, START } from "@eventstore/db-client";
import { Inventory } from './aggregate.js';

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
    const events = [];
    try {
        const readStream = client.readStream(streamName, { direction: FORWARDS, fromPosition: START });
        for await (const resolvedEvent of readStream) {
            if (resolvedEvent.event) {
                events.push(resolvedEvent.event);
            }
        }
    } catch (error) {
        console.error(`Error reading events from stream ${streamName}: ${error.message}`);
    }
    return events;
}

// Main function to test the aggregate logic
async function testAggregate() {
    // Load existing events for inventory
    const streamName = 'inventory';
    const events = await readEvents(streamName);

    // Create an Inventory aggregate and load existing events
    const inventory = new Inventory();
    inventory.load(events);

    console.log("Initial State:", inventory);

    inventory.addInventory(5, 50);
    inventory.removeInventory(2);
    inventory.placeOrder(100, 200);

    // Append inventory events to inventory-123
    await appendEvents("inventory", inventory.newEvents);

    console.log("Final State:", inventory);
}

testAggregate().catch(console.error);
