

const getTraders=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch("/getTraders").then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();            
        }).then((traders)=>{
            resolve(traders);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}

const Traders =(()=>{

    const [traders,setTraders]=React.useState();


    React.useEffect(()=>{
        getTraders().then((traders)=>{
            setTraders(traders);
        });
    },[]);
});

export default Traders;