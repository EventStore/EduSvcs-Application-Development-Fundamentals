---
marp: true

backgroundImage: url('./resources/background.png')




---
<!-- color: white -->
<!-- The color directive will be inherited
Probably need to learn how to set it globally and override it
locally
 -->
# CQRS and Event Sourcing

---
<!-- paginate: true -->
<!-- paginate adds slide numbers, we start on the second -->
# CQRS and Event Sourcing

EventstoreDB was designed to be part of an event sourced architecture. 

This section will briefly describe the deteails of event sourcing and the related topic CQRS(Command Query Resoponsibility Segregation)

---

# What is CQRS

CQRS is a way to separate writes from reads. 


---
# Writes 

In a CQRS pattern writes
go to a datastore such as eventstore optimized for the write workload

---
# Reads 

In a CQRS pattern
Reads are generated as "views" or "projections" and ultimately a "read model" from the writes



---

# Read Model

* Process of generating efficient datastores for read purposes


---

# CQRS reasoning

* One system for both reads and writes is not likely to be optimized well for both processes at the same time. 

For example in a Relational Database, adding indexes may increase read performance, while decreasing write performance. 

NoSQL solutions such as mongodb, elastic search, cassandra, or a data lake make design decisions favoring either writes or reads, or specific access patterns


---

# CQRS reasoning continued..

Even a RDBMS choice may be split across OLTP and analytical (data warehousing workloads)



----

# Event Sourcing

Changes to application state are stored as a series of events that impact the state.

---

# EventStoreDB

A datastore designed with Event Sourcing in mind. 

Changes are stored as a sequence of immutable events appended to a stream.


---

# Domain Driven Design

Some concepts of Domain Driven Design or DDD may be relevant. 


Your instructor may use some of these terms 

---

# Aggregate

A cluster of domain objects treated as one unit with regard to data changes. A transaction within an aggregate must remain atomic.

Although eventstore provides the base requirements for implementation. Responsibility for managing that transaction lies with the application writer. 

---

# Aggregate Root

the object acting as a facade for an aggregate (handling the inputs and delegating the business logic to the sub-objects) (plagiarized)

---

# Entity


---

# Command

Represents an intention. 

Example: CreateEmployee

Tends to be implemented as a synchronous operation
---

# Event

Represents a fact, something that has happened

Example: EmployeeCreated

Tends to be implemented as an asynchronous operation


---

Consistency: 

In a multi user system with multiple readers/writers to an object, in order to guarantee consistency locking and or some sort of version control/ conflict resolution will be required. 

In a distributed multi user system that consistency management will require the additional needs to manage node failures or temporary availability issues. 

Systems that accept a consistency guarantee of eventual consistency will scale well, while systems that require immediate consistency will not scale well. In DDD, CQRS, EventSourcing transactional rules are narrowly focussed on the aggregate.


---

# 

<!-- backgroundImage: url('./resources/Lab_background.png') -->
<!-- color: black -->
# Lab Instructions
1. Open up your Lab environment
2. Run the test notebook to see that your node environment is functioning
3. Start your docker container running eventstore
4. Open up the stub notebook and follow the isntructions
5. Run the validate notebook to verify you have succeeded

---
<!-- backgroundImage: url('./resources/background.png') -->
<!-- color: white -->
# Let's Review

You need to respecify the background if you change it, otherwise it repeats 



---


# Some Benefits of Event Sourcing

* Audit

Event-source stores data as a series of immutable events over time, providing a strong audit capability out-the-box.

* Root Cause Analysis

Business events are tied back to their original chains of causation, allowing visibility into entire workflows.

---

# Benefits of Event Sourcing continued...

* Time Travel

All state changes are kept, so it is possible to move entire system state backwards in time for debugging and “what-if” analysis.

* Projections

Event streams can (re)played through different fold operations to look at existing data in new and interesting ways.

---





# Including Images

Here is an included image

![width:400px](./resources/Use_case.png)



---
<!-- backgroundImage: url('./resources/Lab_background.png') -->
<!-- color: black -->

# Lab Instructions

1. Open up the folder tited your second stream and follow the instructions
2. If you have issues you can run the test_node.js file
3. When you are done you can run the validate lab script to see if you have succeeded



---
<!-- backgroundImage: url('./resources/background.png') -->
<!-- color: white -->


# We are back to old style





---
<!-- _text-align: center 

-->

# I honestly don't know why this doesn't work

Hello world



---

<!-- Scoped style -->
<style scoped>
h1 {
  color: red;
  text-align: center;
}
</style>

# Red text centered (only in the current slide page)

---

# Back to normal

---

<!-- Scoped style -->
<style scoped>
h1 {
  color: red;
  text-align: center;
}
</style>

# Red text centered (only in the current slide page)
---

# Back  to Regular