# JavaScript HashMap Implementation

## Project Overview
A custom HashMap implementation from scratch, demonstrating core data structure mechanics, collision handling, and advanced JavaScript techniques.

## Features

### Core HashMap Methods
- `set(key, value)`: Add or update key-value pairs
- `get(key)`: Retrieve value by key
- `has(key)`: Check key existence
- `remove(key)`: Remove a key-value pair
- `length()`: Get total number of entries
- `keys()`: Get all keys
- `values()`: Get all values
- `entries()`: Get all key-value pairs

### Advanced Methods
- `clear()`: Remove all entries
- `reset(capacity, loadFactor)`: Reinitialize HashMap
- `resize(newCapacity)`: Dynamically change capacity
- `getDebugInfo()`: Retrieve internal state

## Technical Highlights

### Hash Function
- Prime number-based algorithm
- Modulo to prevent integer overflow
- Consistent hash code generation

### Collision Resolution
- Chaining (linked list in each bucket)
- Dynamic bucket growth
- Load factor management

## Implementation Details

### Collision Handling
- Uses an array of buckets
- Each bucket can contain multiple entries
- Handles hash collisions efficiently

### Dynamic Resizing
- Automatic capacity expansion
- Maintains performance through load factor
- Rehashes entries during resize

## Performance Characteristics
- Average time complexity:
  - `set()`: O(1)
  - `get()`: O(1)
  - `remove()`: O(1)
  - `keys()/values()/entries()`: O(n)

## Usage Example

```javascript
// Create HashMap
const hashMap = HashMap();

// Add entries
hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');

// Retrieve values
console.log(hashMap.get('apple')); // 'red'
console.log(hashMap.has('banana')); // true

// Get all keys and values
console.log(hashMap.keys()); 
console.log(hashMap.values());

// Remove an entry
hashMap.remove('apple');

// Clear all entries
hashMap.clear();
