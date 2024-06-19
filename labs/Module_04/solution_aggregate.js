class Inventory {
    constructor() {
        this.newEvents = [];
        this.inventoryCount = 0;
    }
  
    load(events) {
        events.forEach(event => this.apply(event));
    }   

    apply(event) {
        if (event.type === "inventoryAdded") {
            this.inventoryCount += event.data.count;
        } else if (event.type === "inventoryRemoved") {
            this.inventoryCount -= event.data.count;
        } else if (event.type === "orderPlaced") {
            this.inventoryCount -= event.data.count;
        }
    }

    applyChange(event) {
        this.apply(event);
        this.newEvents.push(event);
    }
  
    addInventory(count, cost) {
        const event = { type: "inventoryAdded", data: { count, cost } };
        this.applyChange(event);
    }
  
    removeInventory(count) {
        if (this.inventoryCount >= count) {
            const event = { type: "inventoryRemoved", data: { count } };
            this.applyChange(event);
        } else {
            throw new Error("Not enough items in inventory");
        }
    }
  
    placeOrder(count, price) {
        if (this.inventoryCount >= count) {
            const event = { type: "orderPlaced", data: { count, price } };
            this.applyChange(event);
        } else {
            throw new Error("Not enough items in inventory to place the order");
        }
    }
}

export { Inventory };