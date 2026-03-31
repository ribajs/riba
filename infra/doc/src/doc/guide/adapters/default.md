Riba ships with a `.` adapter for subscribing to properties on plain JavaScript objects. The adapter is implemented with `Object.defineProperty`-based observation in the core runtime.

`Object.observe` is obsolete and not used by Riba.

Riba targets modern evergreen browsers. If you have additional compatibility requirements, provide app-level polyfills or a custom adapter strategy in your project.
