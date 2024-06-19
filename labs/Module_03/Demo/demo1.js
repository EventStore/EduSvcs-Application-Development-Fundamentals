import { EventStoreDBClient, jsonEvent, START } from "@eventstore/db-client";

// Initialize EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

async function initializeStream(streamName) {
    // Check if the stream exists by reading from the beginning
    const events = client.readStream(streamName, { fromRevision: START });

    // If the stream is empty, append an initial event
    try {
        for await (const event of events) {
            return; // Stream exists, no need to initialize
        }
    } catch (error) {
        // Stream does not exist, create it with an initial event
        const initialEvent = jsonEvent({
            type: "streamInitialized",
            data: { message: "Initial event to create stream" },
        });
        await client.appendToStream(streamName, initialEvent);
    }
}

async function main() {
    const streamName = "creditCard-123";

    // Initialize the stream if it does not exist
    await initializeStream(streamName);

    // Initial state
    var initialState = { balance: 0, creditLimit: 1000 };
    var state = initialState;

    // Read existing events from the stream
    const events = client.readStream(streamName);

    // Evolve state based on past events
    for await (const event of events) {
        state = evolve(state, event?.event);
    }

    // Command example
    const command = { type: "makePurchase", data: { amount: 100 } };

    // Decide on the new event based on the command and current state
    const event = decide(command, state);

    // Create a JSON event to append to the stream
    const jsonEventData = jsonEvent(event);

    // Append the new event to the stream
    await client.appendToStream(streamName, jsonEventData);

    console.log("Event appended successfully:", jsonEventData);
}

// Evolve function to update state based on events
function evolve(state, event) {
    if (event.type === "purchaseMade") {
        state.balance += event.data.amount;
    } else if (event.type === "balancePaid") {
        state.balance -= event.data.amount;
    } else if (event.type === "creditLimitUpgrade") {
        state.creditLimit += event.data.amount;
    }
    return state;
}

// Decide function to determine the event from a command and current state
function decide(command, state) {
    if (command.type === "makePurchase") {
        if (command.data.amount < (state.creditLimit - state.balance)) {
            const event = {
                type: "purchaseMade",
                data: { amount: command.data.amount },
            };
            return event;
        } else {
            throw new Error("Credit limit exceeded");
        }
    }

    if (command.type === "payBalance") {
        const event = {
            type: "balancePaid",
            data: { amount: command.data.amount },
        };
        return event;
    }

    if (command.type === "upgradeCreditLimit") {
        const event = {
            type: "creditLimitUpgrade",
            data: { amount: command.data.amount },
        };
        return event;
    }

    throw new Error("Invalid command type");
}

// Run the main function
main().catch(console.error);
