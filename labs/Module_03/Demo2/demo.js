const events = client.readStream("membership-001");

const membership = new Membership(); 
membership.load(events);

membership.addSessions(5);
membership.useSessions(1);
membership.useSessions(1);
membership.useSessions(1);
membership.addSessions(5);
membership.upgradeMembership(1);  // Let's say 1 represents a tier upgrade

await client.appendToStream("membership-001", membership.newEvents);

class Membership {
    constructor() {
        this.newEvents = [];
        this.sessionCredits = 10;  // Starting with 10 session credits
    }
  
    load(events) {
        events.forEach(event => this.apply(event));
    }   

    apply(event) {
        if (event.type === "sessionAdded") {
            this.sessionCredits += event.data.amount;
        } else if (event.type === "sessionUsed") {
            this.sessionCredits -= event.data.amount;
        } else if (event.type === "membershipUpgraded") {
            // Here we can handle upgrades like increasing the session capacity or other privileges
        }
    }

    applyChange(event) {
        this.apply(event);
        this.newEvents.push(event);
    }
  
    addSessions(amount) {
        const event = {type: "sessionAdded", data: { amount: amount }};
        this.applyChange(event);
    }
  
    useSessions(amount) {
        if (this.sessionCredits >= amount) {
            const event = {type: "sessionUsed", data: { amount: amount }};
            this.applyChange(event);
        } else {
            throw new Error("Not enough session credits");
        }
    }
  
    upgradeMembership(level) {
	    const event = {type: "membershipUpgraded", data: { level: level }};
	    this.applyChange(event);
    }
}
