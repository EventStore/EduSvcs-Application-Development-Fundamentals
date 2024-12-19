import { EventStoreDBClient, jsonEvent, START, FORWARDS } from "@eventstore/db-client";

// Initialize EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

async function main() {
    const streamName = "membership-001";

    // Create a new Membership aggregate
    const membership = new Membership();

    // Read existing events from the stream if it exists
    try {
        const events = client.readStream(streamName, { fromRevision: START });
        for await (const { event } of events) {
            if (event) {
                membership.load(event);
            }
        }
    } catch (error) {
        if (error.type !== 'stream-not-found') {
            throw error;
        }
        console.log(`Stream ${streamName} not found. Initializing new stream.`);
    }

    // Execute commands via method calls
    try {
        membership.addSessions(5);
        membership.useSessions(1);
        membership.useSessions(1);
        membership.useSessions(1);
        membership.addSessions(5);
        membership.upgradeMembership(1);  // Let's say 1 represents a tier upgrade

        // Append new events to the stream
        const newEvents = membership.newEvents.map(e => jsonEvent(e));
        await client.appendToStream(streamName, newEvents);

        console.log("Events appended successfully:", newEvents);
    } catch (error) {
        console.error("Failed to process commands:", error);
    }
}

// Membership class using the aggregate pattern
class Membership {
    constructor() {
        this.newEvents = [];
        this.sessionCredits = 10;  // Starting with 10 session credits
    }

    load(event) {
        this.apply(event);
    }

    apply(event) {
        switch (event.type) {
            case "sessionAdded":
                this.sessionCredits += event.data.amount;
                break;
            case "sessionUsed":
                this.sessionCredits -= event.data.amount;
                break;
            case "membershipUpgraded":
                // Here we can handle upgrades like increasing the session capacity or other privileges
                break;
        }
    }

    applyChange(event) {
        this.apply(event);
        this.newEvents.push(event);
    }

    addSessions(amount) {
        const event = { type: "sessionAdded", data: { amount: amount } };
        this.applyChange(event);
    }

    useSessions(amount) {
        if (this.sessionCredits >= amount) {
            const event = { type: "sessionUsed", data: { amount: amount } };
            this.applyChange(event);
        } else {
            throw new Error("Not enough session credits");
        }
    }

    upgradeMembership(level) {
        const event = { type: "membershipUpgraded", data: { level: level } };
        this.applyChange(event);
    }
}

// Run the main function
main().catch(console.error);
