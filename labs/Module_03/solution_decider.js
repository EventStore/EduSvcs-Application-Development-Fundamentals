function evolve(state, event) {
    switch (event.type) {
      case "inventoryAdded":
        state.inventory += event.data.count;
        break;
      case "inventoryRemoved":
        state.inventory -= event.data.count;
        break;
      case "orderPlaced":
        state.inventory -= event.data.count;
        break;
    }
    return state;
  }
  
  async function decide(command, state) {
    if (command.type === "addInventory") {
      return [{
        type: "inventoryAdded",
        data: { count: command.data.count, cost: command.data.cost }
      }];
    }
    if (command.type === "removeInventory") {
      if (command.data.count <= state.inventory) {
        return [{
          type: "inventoryRemoved",
          data: { count: command.data.count }
        }];
      } else {
        throw new Error('Not enough items in inventory');
      }
    }
    if (command.type === "placeOrder") {
      if (command.data.count <= state.inventory) {
        return [
          {
            type: "orderPlaced",
            data: { count: command.data.count, price: command.data.price }
          }
        ];
      } else {
        throw new Error('Not enough items in inventory to place the order');
      }
    }
    throw new Error(`Unknown command type: ${command.type}`);
  }
  
  export { evolve, decide };
