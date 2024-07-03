import React from 'react';
import {makeStyles} from '@mui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomerAddForm from './CustomerAddForm';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import { Select, MenuItem, FormControl, InputLabel, Snackbar, } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


const myStyles=makeStyles((theme)=>{
    return ({
        mainContainer:{
            marginTop:"90px",
            height: "430px",
            margin:"10px;",
            display: "flex",
            border:"1px solid black",
            borderRadius: "5px",
            background: "#e1eaf5"
        },
        leftContainer:{
            width: "30%",
            height: "415px",
            margin:"10px",
            border: "1px solid black",
            overflow: "auto",
            borderRadius: "5px"
        },
        rightContainer:{
            width: "70%",
            height: "415px",
            margin:"10px",
            border: "1px solid black",
            overflow:"auto",
            borderRadius: "5px"
        },
        li:{
            '&:hover':{
                color:"white",
                background:"orange"
            },
            '&:active':{
                color:"white",
                background:"green"
            },
            listStyle: "none",
            textAlign:"center",
            fontWeight:"bold",
            border: "1px solid gray",
            padding:"5px",
            cursor: "pointer",
            margin:"2px",
            borderRadius: "5px"
        },
        input:{
            display:"flex",
            gap:"10px",
        },
        divButton:{
            display:"flex", 
            float:"right",
            margin:"10px",
            gap: "5px"
        },
        button:{
            padding:"10px",
        }
        
    })
});

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
} // getCustomers Function ends here

const getCustomerByCode=(code)=>{
    var promise=new Promise((resolve,reject)=>{
        fetch(`/getCustomer/${code}`).then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((customers)=>{
            resolve(customers);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise; 
} // getCustomerByCode ends here

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
} // getStates ends here



const openCustomerDialog=()=>{}

const Customers=(()=>{
    
    const [customers,setCustomers]=React.useState([]);
    const [states,setStates]=React.useState([]);
    const [selectedState,setSelectedState]=React.useState(0);

    const [selectedCustomer,setSelectedCustomer]=React.useState();
    const [activeButton,setActiveButton]=React.useState(true);
    const [inputDisabled,setInputDisabled]=React.useState(true);
    
    const [isEditing,setIsEditing]=React.useState(true);
    const [message,setMessage]=React.useState("");
    const [openSnackBar,setOpenSnackBar]=React.useState(false);

    const [code,setCode]=React.useState("");
    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [stateCode,setStateCode]=React.useState("");
    const [gst,setGst]=React.useState("");
    const [tin,setTin]=React.useState("");
    const [other,setOther]=React.useState("");
    const [personal,setPersonal]=React.useState("");
    const [home,setHome]=React.useState("");
    const [office,setOffice]=React.useState("");


    React.useEffect(()=>{
        getCustomers().then((customers)=>{
            setCustomers(customers);
            console.log(customers);
        });
        getStates().then((states)=>{
             setStates(states);
         });
    },[]);
    
    const stateChange=(ev)=>{
        setSelectedState(ev.target.value);
    }
    
    const snackBarClose=()=>{
        setOpenSnackBar(true);
    }
    const snackBarOpen=()=>{
        setOpenSnackBar(false);
    }

    const editCustomer=(ev)=>{
        setInputDisabled(false);
        setIsEditing(false);
    }// editCustomer ends here
    const updateCustomer=()=>{
        //alert(name+","+address+","+gst+","+tin+","+other);
        //alert(personal+","+home+","+office);
        //alert(selectedState);
        const customerData={
            "code": code,
            "name": name,
            "address": address,
            "stateCode": selectedState,
            "regTitlte1": "GST",
            "regTitlte2": "TIN",
            "regTitlte3": "LIC",
            "regValue1": gst,
            "regValue2": tin,
            "regValue3": other,
            "contact1": personal,
            "contact2": home,
            "contact3": office
        };
        console.log(customerData);
        
        fetch("/updateCustomer",
            {
                method: "Put",
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(customerData)
            }).then((response)=>{
            if(response.ok){
                console.log(response);
                setInputDisabled(true);
                setActiveButton(true);
                setIsEditing(true);
                const index=customers.findIndex(customer=>customer.code==code);
                const updatedCustomers=[...customers];
                if(index!==-1) updatedCustomers.splice(index,1);
                updatedCustomers.push(customerData);
                setCustomers(updatedCustomers);
                setSelectedState(0);
                clearFormData();     
            }
        }).catch((error)=>{
            console.log(error);
        });
    }
    const deleteCustomer=(ev)=>{
        fetch(`/deleteCustomer/${code}`,
            {
                method: "DELETE",
            }).then((response)=>{
            if(response.ok){
                console.log(response);
                setInputDisabled(true);
                setIsEditing(true);
                setActiveButton(true);
                const index=customers.findIndex(customer=>customer.code==code);
                //const updatedCustomers=[...customers];
                if(index!==-1) customers.splice(index,1);
                setCustomers(customers);
                setSelectedState(0);
                clearFormData();     
            }
        }).catch((error)=>{
            console.log(error);
        });
    } // deleteCustomer ends here
    const styleClasses=myStyles();

    const customerSelected=(ev)=>{
        // alert('customer id '+ev.currentTarget.id);
        setIsEditing(true);
        setInputDisabled(true);
        setActiveButton(false);
         var code=ev.currentTarget.id;
         setSelectedCustomer(code);
         setCode(code);
         /*getCustomerByCode(code).then((customer)=>{
            console.log(customer);
         });*/
         fillCustomerForm(customers.find(customer=>customer.code==code));
     }

     const fillCustomerForm=(customer)=>{
        clearFormData();
        //console.log(customer);
        const stateCode=customer.stateCode;
        setSelectedState(stateCode);
        const state=states.find(s=>s.code==stateCode);
        setName(customer.name.trim().length==0 ? "" : customer.name.trim());
        setAddress(customer.address.trim().length==0 ? "" : customer.address.trim());
        setStateCode(state.name.trim().length==0 ? "" : state.name.trim());
        setGst(customer.regValue1 == null ? "" : customer.regValue1.trim());
        setTin(customer.regValue2 == null ? "" : customer.regValue2.trim());
        setOther(customer.regValue3 == null ? "" : customer.regValue3.trim());
        setPersonal(customer.contact1 == null ? "" : customer.contact1);
        setHome(customer.contact2 == null ? "" : customer.contact2);
        setOffice(customer.contact3 == null ? "" : customer.contact3);
     }
     const clearFormData=()=>{
        setName("");
        setAddress("");
        setStateCode(selectedState);
        setGst("");
        setTin("");
        setOther("");
        setPersonal("");
        setHome("");
        setOffice("");
     }
     
   
    return (
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.leftContainer}>
                {
                    customers.map((customer)=>{
                        return(
                            <li className={styleClasses.li} id={customer.code} onClick={customerSelected} hover>{customer.name}
                            <br/>
                            <span>{customer.address}</span>
                            </li>
                        )
                    })
                }
            </div>
            <div className={styleClasses.rightContainer}>
                <div className={styleClasses.divButton}>
                    <CustomerAddForm/>
                   {isEditing && <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={editCustomer}><EditIcon/></Button>}
                    {!isEditing && <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={updateCustomer}><UpdateIcon/>Update</Button>}
                    <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={deleteCustomer}><DeleteIcon/></Button>
                </div>
                <DialogTitle >Personal Information</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="name" value={name} onChange={(ev)=>setName(ev.target.value)} required disabled={inputDisabled}/>
                    <InputForm title="address" value={address} onChange={(ev)=>setAddress(ev.target.value)} required disabled={inputDisabled}/>
                    <FormControl>
                        <InputLabel id="state-select-label">States</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                value={selectedState}
                                disabled={inputDisabled}
                                onChange={stateChange}
                            >
                                {
                                    states.map((state)=>{
                                        return(
                                            <MenuItem id={state.code} value={state.code} selected>{state.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                </DialogContent>
                <DialogTitle>Registration Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="gst" value={gst} onChange={(ev)=>setGst(ev.target.value)} disabled={inputDisabled}/>
                    <InputForm title="tin" value={tin} onChange={(ev)=>setTin(ev.target.value)} disabled={inputDisabled}/>
                    <InputForm title="other" value={other} onChange={(ev)=>setOther(ev.target.value)} disabled={inputDisabled}/>
                </DialogContent>
                <DialogTitle>Contact Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                <InputForm title="personal" value={personal} onChange={(ev)=>setPersonal(ev.target.value)} disabled={inputDisabled}/>
                    <InputForm title="home" value={home} onChange={(ev)=>setHome(ev.target.value)} disabled={inputDisabled}/>
                    <InputForm title="office" value={office} onChange={(ev)=>setOffice(ev.target.value)} disabled={inputDisabled}/>
                </DialogContent>
        
            </div>
            <Snackbar
                open={snackBarOpen}
                onClose={snackBarClose}
                message={message}
                anchorOrigin={{vertical:'bottom',horizontal:"center"}}
                autoHideDuration={4000}>
                <Alert
                    elevation={4}
                    variant='filled'
                    severity='success'
                    onClose={false}
                    >
                    {message}
                </Alert>
            </Snackbar>

        </div>
    )
});


const InputForm=({title,required,onChange,value,disabled})=>{
    return (
        <div>
    <TextField
        label={title}
        required={required}
        variant="outlined"
        onChange={onChange}
        id={title}  
        value={value}
        disabled={disabled}
        />
        </div>
    )
}


export default Customers;
