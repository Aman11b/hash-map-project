const HashMap=()=>{
    const DEFAULT_LOAD_FACTOR=0.75;
    const DEFAULT_CAPACITY=16;

    let buckets=new Array(DEFAULT_CAPACITY);
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
            const bucketEl=document.createElement('div');
            bucketEl.classList='bucket';
            bucketEl.textContent=`Bucket ${index}:${bucket?JSON.stringify(bucket):'Empty'}`;
            container.appendChild(bucketEl);
        });
    };
    return{
        hash,
        visualizeBuckets
    };
};
const hashMap=HashMap();