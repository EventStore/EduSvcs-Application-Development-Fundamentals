# Exercise 1: Reading Events from a Stream (with projection)

# Summary

In this exercise, you’ll append an event to the store and then read a query for specific information using a projection.

# Instructions
1. Create an event with the following event data and append it to the Orders stream

```
Id : uuid
Type : orderShipped
Data
orderId : 123
customerId : 1
Price : 10.00
Item : keyboard

```

2.   Create a projection that prints the total sales for keyboards shipped
