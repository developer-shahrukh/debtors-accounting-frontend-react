

const getCustomers=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch("/getCustomers").then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((customers)=>{
            resolve(customers);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}

const Customers=(()=>{
    
    const [customers,setCustomers]=React.useState();

    React.useEffect=(()=>{
        getCustomers().then((customers)=>{
            setCustomers(customers);
        });
    },[]);
});
export default Customers;