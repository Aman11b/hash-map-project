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

    const visualizeBuckets=()=>{
        const container=document.getElementById('Visualization');
        container.innerHTML='';

        buckets.forEach((bucket,index)=>{
            if(bucket.length>0){
                const bucketEl=document.createElement('div');
                bucketEl.classList='bucket';
                bucketEl.innerHTML=`
                    <strong>Bucket ${index}:</strong>
                    ${bucket.map(([k,v])=>`${k}:${v}`).join('<br>')}
                `;
                container.appendChild(bucketEl);
            }
        });

        const sizeEl=document.createElement('div');
        sizeEl.textContent=`Total Entries: ${size} | Buckets: ${buckets.length}`;
        container.prepend(sizeEl);
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

    return{
        set,
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
});