Riba can observe different object models through adapters. In practice, most
projects use the built-in `.` adapter for plain JavaScript objects.

Custom adapters are an advanced extension point. Use them when you need to bind
to external model APIs (for example event-driven stores) that do not expose
plain object properties directly.

Each adapter is registered under a unique interface (a single character). The
interfaces used in a keypath determine which adapter is used for each
intermediate key.

```
user.address:city
```

The above keypath uses the `.` adapter to access `address` on `user`, and the
`:` adapter to access `city` on `address`. This is useful when traversing mixed
model types in one keypath.

Riba ships with a default `.` adapter based on custom property getters and
setters.
