# Implementation Details

## Exercise Analysis

General info: nested array, each element is list of note information, sorted by start time (i.e filled in by start time)

```javascript
info = [note, velocity, start time, finish time]
```

Specific graphs:

Velocity

```javascript
x = [notes]
y = [velocities]
```

Duration

```javascript
x = [notes]
y = info[3,:] - info[2:0]
```

Intervals

```javascript
x = notes.pop() // Last note has no interval
y = info[3,:].pop() - info[2:].pop(0) // Shifted finish time - start time
```



​	