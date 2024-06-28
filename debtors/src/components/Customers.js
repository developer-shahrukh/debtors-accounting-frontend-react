import React from 'react';
import {makeStyles} from '@mui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomerAddForm from './CustomerAddForm';


import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

const myStyles=makeStyles((theme)=>{
    return ({
        mainContainer:{
            marginTop:"90px",
            height: "430px",
            margin:"10px;",
            display: "flex",
            border:"1px solid black",
            borderRadius: "5px"
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
            gap:"10px"
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
        fetch(`/getCustomerByCode?code=${code}`).then((response)=>{
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



const customerSelected=(ev)=>{
   // alert('customer id '+ev.currentTarget.id);
    var code=ev.currentTarget.id;
    getCustomerByCode(code).then((customer)=>{
       //console.log(customer);
       fillTheCustomerForm(customer);
    });
}

const openCustomerDialog=()=>{}

const Customers=(()=>{
    
    const [customers,setCustomers]=React.useState([]);
    const [title]=React.useState("");
    const [isEditable,setIsEditable]=React.useState("false");
    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [stateCode,setStateCode]=React.useState("");
    const [gst,setGst]=React.useState("");
    const [contact,setContact]=React.useState("");
    const [home,setHome]=React.useState("");
    const [office,setOffice]=React.useState("");


    React.useEffect(()=>{
        getCustomers().then((customers)=>{
            setCustomers(customers);
        });
    },[]);

    const styleClasses=myStyles();

    
   
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
                <Button className={styleClasses.button} variant='contained' color='primary' disabled><EditIcon/></Button>
                <Button className={styleClasses.button} variant='contained' color='primary' disabled><DeleteIcon/></Button>
            </div>
        <DialogTitle >Personal Information</DialogTitle>
        
            <DialogContent className={styleClasses.input}>
                <InputForm title="name" required onChange={setName}/>
                <InputForm title="address" required onChange={setAddress}/>
                <InputForm title="stateCode" required onChange={setStateCode}/>
            </DialogContent>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogContent className={styleClasses.input}>
                <InputForm title="gst" onChange={setGst}/>
                <InputForm title="tin" />
                <InputForm title="other" />
            </DialogContent>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogContent className={styleClasses.input}>
            <InputForm title="personal" />
                <InputForm title="home"/>
                <InputForm title="office" />
            </DialogContent>
        
    </div>
           
        </div>
    )
});


const InputForm=({title,required,onChange})=>{
    return (
        <div>
    <TextField
        label={title}
        required={required}
        variant="outlined"
        onChange={onChange}
        id={title}  />
        </div>
    )
}

const fillTheCustomerForm=(customers)=>{
    customers.map((customer)=>{
        //console.log(customer);
       // setName(customer.name);
       // setAddress(customer.address);
    })
}

export default Customers;
