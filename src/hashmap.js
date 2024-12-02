const HashMap=()=>{
    const DEFAULT_LOAD_FACTOR=0.75;
    const DEFAULT_CAPACITY=16;

    let buckets = new Array(DEFAULT_CAPACITY).fill(null).map(() => []);
    let loadFactor=DEFAULT_LOAD_FACTOR;
    let size=0;

    const hash=(key)=>{
        let hashCode=0;
        const primeNumber=31;

        for(let i=0;i<key.length;i++){
            hashCode=(primeNumber*hashCode+key.charCodeAt(i))%buckets.length;
        }

        return hashCode;
    };

    const visualizeBuckets = () => {
        const container = document.getElementById('visualization');
        container.innerHTML = ''; // Clear previous visualization

        // Overall stats
        const statsEl = document.createElement('div');
        statsEl.textContent = `Total Entries: ${size} | Buckets: ${buckets.length}`;
        container.appendChild(statsEl);

        // Visualize each bucket
        buckets.forEach((bucket, index) => {
            if (bucket.length > 0) {
                const bucketContainer = document.createElement('div');
                bucketContainer.className = 'bucket-container';

                // Bucket index
                const indexEl = document.createElement('div');
                indexEl.className = 'bucket-index';
                indexEl.textContent = `Bucket ${index}`;
                bucketContainer.appendChild(indexEl);

                // Linked list representation
                const linkedList = document.createElement('div');
                linkedList.className = 'linked-list';

                bucket.forEach(([key, value], nodeIndex) => {
                    // Create node
                    const nodeEl = document.createElement('div');
                    nodeEl.className = 'node';
                    nodeEl.innerHTML = `
                        <strong>Key:</strong> ${key}<br>
                        <strong>Value:</strong> ${value}
                    `;
                    linkedList.appendChild(nodeEl);

                    // Add arrow between nodes (except for last node)
                    if (nodeIndex < bucket.length - 1) {
                        const arrowEl = document.createElement('div');
                        arrowEl.className = 'arrow';
                        arrowEl.textContent = '→';
                        linkedList.appendChild(arrowEl);
                    }
                });

                bucketContainer.appendChild(linkedList);
                container.appendChild(bucketContainer);
            }
        });
    };


    const set=(key,value)=>{
        if(typeof key !=='string'){
            throw new Error ('Key must be a String');
        }

        const index=hash(key);

        // Initialize bucket if it doesn't exist
        if (!buckets[index]) {
            buckets[index] = [];
        }

        // Check if key already exists in the bucket
        const bucket=buckets[index];
        for(let i=0;i<bucket.length;i++){
            if(bucket[i][0]===key){
                bucket[i][1]=value;
                return;
            }
        }

        // Add new key-value pair
        bucket.push([key,value]);
        size++;

        // Check if resizing is needed
        if(size/buckets.length>=loadFactor){
            resize();
        }

        visualizeBuckets();
    };

    const get=(key)=>{
        if(typeof key!=='string'){
            throw new Error("Key must be a string");
        }

        const index=hash(key);
        const bucket=buckets[index];

        for(let i=0;i<bucket.length;i++){
            if(bucket[i][0]===key){
                return bucket[i][1];
            }
        }

        return null;
    };

    const resize=()=>{
        const oldBuckets=buckets;
        buckets=new Array(buckets.length*2).fill(null).map(()=>[]);
        size=0;

        oldBuckets.forEach((bucket=>{
            bucket.forEach(([key,value])=>{
                set(key,value);
            });
        }));
    };

    const has=(key)=>{
        if(typeof key!=='string'){
            throw new Error("Key must be a string");
        }

        const index=hash(key);
        const bucket=buckets[index];

        for(let i=0;i<bucket.length;i++){
            if(bucket[i][0]===key){
                return true;
            }
        }

        return false;

    };

    const remove=(key)=>{
        if(typeof key!=='string'){
            throw new Error("Key must be a string");
        }

        const index=hash(key);
        const bucket=buckets[index];

        for(let i=0;i<bucket.length;i++){
            if(bucket[i][0]===key){
                bucket.splice(i,1);
                size--;

                visualizeBuckets();
            }
        }
        return false;
    };

    const length=()=>{
        return size;
    };

    const keys=()=>{
        const allKeys=[];

        buckets.forEach(bucket=>{
            bucket.forEach(([key])=>{
                allKeys.push(key);
            });
        });
        return allKeys;
    };

    const values=()=>{
        const allValues=[];

        buckets.forEach(bucket=>{
            bucket.forEach(([,value])=>{
                allValues.push(value);
            });
        });

        return allValues;
    };

    // New entries() method
    const entries = () => {
        const allEntries = [];
        
        // Iterate through all buckets
        buckets.forEach(bucket => {
            bucket.forEach(entry => {
                allEntries.push(entry);
            });
        });

        return allEntries;
    };



    return{
        set,
        get,
        has,
        remove,
        length,
        keys,
        values,
        entries,
        hash,
        visualizeBuckets
    };
};
const hashMap=HashMap();
// Test functionality
document.addEventListener('DOMContentLoaded', () => {
    // Demonstrate set and collision handling
    const testData = [
        ['apple', 'red'],
        ['banana', 'yellow'],
        ['cat', 'white'],
        ['dog', 'brown'],
        // Intentional collision candidates
        ['act', 'green'],  // might hash to same bucket as 'cat'
        ['tac', 'blue']    // another potential collision
    ];

    testData.forEach(([key, value]) => {
        console.log(`Setting ${key}: ${value}`);
        hashMap.set(key, value);
    });

    // Demonstrate get method
    console.log('Get Tests:');
    const testKeys = ['apple', 'cat', 'nonexistent'];
    testKeys.forEach(key => {
        const value = hashMap.get(key);
        console.log(`Getting ${key}: ${value !== null ? value : 'Not Found'}`);
    });

    // Demonstrate has method
    console.log('Has Tests:');
    const hasTestKeys = ['apple', 'cat', 'nonexistent', 'banana'];
    hasTestKeys.forEach(key => {
        const exists = hashMap.has(key);
        console.log(`Has ${key}?: ${exists}`);
    });

    // Demonstrate remove method
    console.log('Remove Tests:');
    const removeTestKeys = ['apple', 'cat', 'nonexistent'];
    removeTestKeys.forEach(key => {
        const removed = hashMap.remove(key);
        console.log(`Removing ${key}: ${removed ? 'Successful' : 'Not Found'}`);
        
        // Check existence after removal
        console.log(`Has ${key} after removal?: ${hashMap.has(key)}`);
    });

    // Demonstrate new methods
    console.log('Length Test:');
    console.log(`Total entries: ${hashMap.length()}`);

    console.log('\nKeys Test:');
    console.log('All Keys:', hashMap.keys());

    console.log('\nValues Test:');
    console.log('All Values:', hashMap.values());

    console.log('\nEntries Test:');
    console.log('All Entries:', hashMap.entries());

    // Demonstrate method behavior after removal
    console.log('\nAfter Removing "apple"');
    hashMap.remove('apple');

    console.log('Updated Length:', hashMap.length());
    console.log('Updated Keys:', hashMap.keys());
    console.log('Updated Values:', hashMap.values());
    console.log('Updated Entries:', hashMap.entries());
});