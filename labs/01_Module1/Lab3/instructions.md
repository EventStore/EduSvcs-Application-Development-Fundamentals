
# Summary

In this exercise, you’ll read events from EventStoreDB using the fromRevision and direction properties to set the direction and position in which events are read.

# Instructions

Create an event with the following event data.

```
Id : uuid
Type : orderShipped
Data :
customerId : 1
Price : 20.00
Item : mouse
```

1. Append the event to the order-123 stream
2. Read the events forward from the start of the orders stream
3. Iterate through the stream and print the event data to the console
