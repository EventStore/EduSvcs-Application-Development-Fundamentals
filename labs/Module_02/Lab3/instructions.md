# Exercise 3 - Catch up Subscription with Checkpoint

#Summary

In this exercise, you’ll create a catch-up subscription that uses a checkpoint to determine which record to process.

#Instructions

Create a catch-up subscription that listens to the orders stream and continues to print out the total sales for keyboards as new orders are added

1. Create a file named checkpoint.txt to track the position number
2. Read the checkpoint file for the position number
3. Print the total keyboard sales as you process any order shipped with a keyboard
