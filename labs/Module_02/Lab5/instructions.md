# Exercise 5 - Reaction

In this exercise, you’ll use a reaction to react to an event in the system

1. Create code that logs the invoice number and amount to a file for any event where the account id is 345 or 123 for an invoice paid on orders in an orders stream

2. Run the listener code

3. Create events using the web interface that look like this
```
const event1 = jsonEvent({
 id: uuid(),
 type: "invoicePaid",
 data: {
   accountId: "123", // Added orderId to uniquely identify the order
   amount: "500.00",
 },
});
```

```
const event2 = jsonEvent({
 id: uuid(),
 type: "invoicePaid",
 data: {
   accountId: "234", // Added orderId to uniquely identify the order
   amount: "1000.00",
 },
});
```

```
const event3 = jsonEvent({
 id: uuid(),
 type: "InvoicePaid",
 data: {
   accountId: "345", // Added orderId to uniquely identify the order
   amount: "5000.00",
 },
});
```

4. After adding each check the reaction listener and fraud.txt log to see if reactions logged the fraud alerts correctly
