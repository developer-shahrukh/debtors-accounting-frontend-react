
const getStates=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch("/getStates").then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((states)=>{
            resolve(states);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}



const States=(()=>{

    const [states,setStates]=React.useState();

    React.useEffect=(()=>{
        getStates().then((states)=>{
            setStates(states);
        });
    },[]);
});

export default States;