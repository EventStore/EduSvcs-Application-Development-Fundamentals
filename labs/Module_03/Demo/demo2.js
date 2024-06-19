import { EventStoreDBClient, jsonEvent, START } from "@eventstore/db-client";

// Initialize EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

async function main() {
    const streamName = "creditCard-123";

    // Create a new CreditCard aggregate
    const creditCard = new CreditCard();

    // Read existing events from the stream and load into the aggregate
    const events = client.readStream(streamName, { fromRevision: START });
    for await (const { event } of events) {
        if (event) {
            creditCard.load(event);
        }
    }

    // Execute a command via method calls
    try {
        creditCard.makePurchase(100);

        // Append new events to the stream
        const newEvents = creditCard.newEvents.map(e => jsonEvent(e));
        await client.appendToStream(streamName, newEvents);

        console.log("Events appended successfully:", newEvents);
    } catch (error) {
        console.error("Failed to process commands:", error);
    }
}

// CreditCard class using the aggregate pattern
class CreditCard {
    constructor() {
        this.newEvents = [];
        this.currentAvailableCredit = 1000;
        this.creditLimit = 1000;
    }

    load(event) {
        this.apply(event);
    }

    apply(event) {
        switch (event.type) {
            case "purchaseMade":
                this.currentAvailableCredit -= event.data.amount;
                break;
            case "balancePaid":
                this.currentAvailableCredit += event.data.amount;
                break;
            case "creditLimitUpgrade":
                this.creditLimit += event.data.amount;
                this.currentAvailableCredit += event.data.amount;
                break;
        }
    }

    applyChange(event) {
        this.apply(event);
        this.newEvents.push(event);
    }

    makePurchase(amount) {
        if (this.currentAvailableCredit >= amount) {
            const event = { type: "purchaseMade", data: { amount: amount } };
            this.applyChange(event);
        } else {
            throw new Error("Insufficient credit to make this purchase");
        }
    }

    payBalance(amount) {
        const event = { type: "balancePaid", data: { amount: amount } };
        this.applyChange(event);
    }

    upgradeCreditLimit(amount) {
        const event = { type: "creditLimitUpgrade", data: { amount: amount } };
        this.applyChange(event);
    }
}

// Run the main function
main().catch(console.error);
