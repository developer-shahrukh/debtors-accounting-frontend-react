import React from 'react';
import {makeStyles} from '@mui/styles';
import { startTransition } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';



const getTraders=()=>{
    var promise=new  Promise((resolve,reject)=>{
        fetch("/getTrader").then((response)=>{
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

const myStyles=makeStyles((theme)=>{
    return({
        mainContainer:{
            border:"1px solid black",
            height: "480px",
            margin:"10px",
            marginTop: "70px",
            overflow:"auto"
        },
        headingsContent:{
            display:"flex",
            justifyContent: "space-between",
        },
        heading:{
            fontSize: "24pt",
            fontWeight: "bold",
            color: "#2222aa",
            margin:"10px",
            textAlign:"center"
        },
        button:{
            float:"right",
            padding:"10px",
            margin:"10px"
        },
        innerContainer:{
            height: "250px",
            margin:"10px",
            border:"1px solid black",
        },
        rightSideContainer:{
            height:"230px",   
            marginLeft:"50%",
            margin:"10px",
            border:"1px solid black"
        },
        leftSideContainer:{
            height:"230px",
            marginRight:"50%",
            margin:"10px",
            border: "1px solid black"
        },
        input:{
            gap: "10px",
            margin:"10px",
        },
    });
})

const Invoices=()=>{

    const [traders,setTraders]=React.useState([]);
    const [states,setStates]=React.useState([]);
    const [isBothStatesSame,setIsBothStatesSame]=React.useState(false);
    const [traderState,setTraderState]=React.useState("");
    const [customerState,setCustomerState]=React.useState("");

    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [stateCode,setStateCode]=React.useState("");
    const [gst,setGst]=React.useState("");
    const [tin,setTin]=React.useState("");
    const [other,setOther]=React.useState("");
    const [personal,setPersonal]=React.useState("");
    const [home,setHome]=React.useState("");
    const [office,setOffice]=React.useState("");
    const [accountHolderName,setAccountHolderName]=React.useState("");
    const [accountNumber,setAccountNumber]=React.useState("");
    const [ifscCode,setIfscCode]=React.useState("");
    const [branchName,setBranchName]=React.useState("");


    React.useEffect(()=>{
        getTraders().then((trader)=>{
            setTraders(trader);
        });
        getStates().then((states)=>{
            setStates(states);           
        });
    });


    const TraderBankDetails=()=>{
        
        return(
            <div>
                <h1>Bank Details</h1>
                {
                    traders.map((trader)=>{return(
                        <div>
                        <span>{trader.accountHolderName}</span><br/>
                        <span>{trader.accountNumber}</span><br/>
                        <span>{trader.ifscCode}</span><br/>
                        <span>{trader.branchName}</span><br/>
                        </div>
                    )
                    })
                }
            </div>
        );
    }

    const TraderPersonalDetails=()=>{
        return(
            <div>
                {
                    traders.map((trader)=>{return(
                        <div>
                            <h3>{trader.name}</h3>
                            <span>{trader.address}</span><br/>
                            <span>{trader.gst}</span><br/>
                            <span>{trader.stateCode}</span><br/>
                            <span>{trader.contact1}</span><br/>
                            <span>{trader.contact2}</span><br/>
                            <span>{trader.contact3}</span><br/>
                        </div>
                    )})
                }
            </div>
        )
    }

    const styleClasses=myStyles();
    return(
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.headingsContent}>
                <h1 className={styleClasses.heading}>Invoices Generate</h1>
                <Button className={styleClasses.button} variant='contained' color='primary'><DeleteIcon/></Button>
            </div>
            
            <div className={styleClasses.innerContainer}>
                <div className={styleClasses.rightSideContainer}>                    
                    <TraderPersonalDetails/>
                </div>
            </div>
            
            <div className={styleClasses.innerContainer}>
                <div className={styleClasses.leftSideContainer}>
                    <h1>List Of Customer</h1>
                </div>
            </div>
            
            <div className={styleClasses.innerContainer}>
                <div className={styleClasses.rightSideContainer}>
                    <h1>Invoice Number</h1>
                    <FormControl className={styleClasses.inputField}>
                        <InputLabel for="invoice-number">Invoice Number</InputLabel>
                        <Input className={styleClasses.input} id="invoice-number" name="invoice-number" type="text" />
                        <FormHelperText id="invoice-number-helper">Enter invoice number</FormHelperText>
                    </FormControl>
                    <FormControl className={styleClasses.inputField}>
                        <InputLabel for="invoice-date">Invoice date</InputLabel>
                        <Input className={styleClasses.input} id="invoice-date" name="invoice-date" type="date" />
                        <FormHelperText id="invoice-date-helper">Enter invoice date</FormHelperText>
                    </FormControl>
                </div>
            </div>

            <div className={styleClasses.innerContainer}>
                <div className={styleClasses.leftSideContainer}>
                    <TraderBankDetails/>
                </div>
            </div>
        </div>
    )
}




export default Invoices;