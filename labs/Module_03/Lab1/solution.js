const events = client.readStream("inventory-001");

var initialState = { stockLevel: 0, maxCapacity: 1000 }
var state = initialState;

for await (const event of events) {
    state = updateInventory(state, event?.event);
}

const command = { type: "sellProduct", data: { amount: 50 } };  // Example command
const event = determineAction(command, state);

await client.appendToStream("inventory-001", event);

function updateInventory(state, event) {
    if (event.type == "stockAdded") {
        state.stockLevel += event.data.amount;
    } else if (event.type == "stockSold") {
        state.stockLevel -= event.data.amount;
    } else if (event.type == "stockAdjusted") {
        state.stockLevel += event.data.amount;  // Positive or negative adjustment
    }
    return state;
}

function determineAction(command, state) {
    
    if (command.type == "sellProduct") {
        if (command.data.amount <= state.stockLevel) {
            const event = {
                type: "stockSold",
                data: { amount: command.data.amount }
            };
            return event;
        } else {
            throw new Error("Insufficient stock to sell the requested amount");
        }
    }
    
    if (command.type == "addStock") {
        const event = {
            type: "stockAdded",
            data: { amount: command.data.amount }
        };
        return event;
    }
    
    if (command.type == "adjustStock") {
        const event = {
            type: "stockAdjusted",
            data: { amount: command.data.amount }  // Can be positive or negative
        };
        return event;
    }
}
