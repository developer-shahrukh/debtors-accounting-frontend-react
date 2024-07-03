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
import { Select, MenuItem, FormControl, InputLabel, Snackbar, } from '@material-ui/core';

const myStyles=makeStyles((them)=>{
    return({
        mainContainer:{
            marginTop:"90px",
            height: "430px",
            margin:"10px;",
            borderRadius: "5px",
            border:"1px solid black",
           background: "#e1eaf5"
        },
        header:{
            display:"flex",
            justifyContent: "space-between",
            alignItems:"center"
        },
        title:{
            fontSize: "24pt",
            fontWeight: "bold",
            color: "#2222aa",
            margin:"10px",
            float:"left"
        },
        content:{
            height:"350px",
            border:"1px solid black",
            borderRadius: "5px",
            margin:"10px",
            overflow: "auto"
        },
        input:{
            display:"flex",
            gap: "10px"
        },
        textField:{
            width:"300px",         
        },
        divButton:{
            display:"flex",
            justifyContent: "space-between",
            alignItems:"center",
            padding: "10px",
            gap: "5px"
        },
    })
});




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

const openTraderDialog=()=>{

}

const Traders =(()=>{

    const [traders,setTraders]=React.useState([]);
    const [states,setStates]=React.useState([]);
    const [selectedState,setSelectedState]=React.useState(0);


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

    
    const [isDisabledButton,setIsDisabledButton]=React.useState(false);
    const [inputDisabled,setInputDisabled]=React.useState(false);

    const styleClasses=myStyles();

    React.useEffect(()=>{
        getTraders().then((traders)=>{
            //setTraders(traders);
            //console.log(traders);
            setTraders(traders);
            setInputDisabled(true);
            
            //traders.forEach(trader=>setTraders(trader));
        });
        getStates().then((states)=>{
            //console.log(states);
             setStates(states);
             fillForm();
         });
        
    },[]);

    

    const stateChange=(ev)=>{
        //alert(ev.target.value);
        setSelectedState(ev.target.value);
    }
    

    const fillForm=()=>{
        traders.forEach((trader)=>{
           // console.log('Traders : '+trader);
            setName(trader.name);
            setAddress(trader.address);
            setSelectedState(trader.stateCode);
            const state=states.find(s=>s.code==trader.stateCode);
            setStateCode(state.name);
            setGst(trader.regValue1);
            setTin(trader.regValue2);
            setOther(trader.regValue3);
            setPersonal(trader.contact1);
            setHome(trader.contact2);
            setOffice(trader.contact3);
            setAccountHolderName(trader.accountHolderName);
            setAccountNumber(trader.accountNumber);
            setIfscCode(trader.ifscCode);
            setBranchName(trader.branchName);
        });
    }
    
    const editTraders=()=>{
        //alert('click')
        setIsDisabledButton(true);
        setInputDisabled(false);
    }
    
    const updateTraders=(e)=>{
        
        const tradersData={
            "name":name,
            "address":address,
            "gst":gst,
            "stateCode": stateCode,
            "tin": tin,
            "other": other,
            "personal": personal,
            "home": home,
            "office": office,
            "accountHolderName": accountHolderName,
            "accountNumber": accountNumber,
            "ifscCode": ifscCode,
            "branchName": branchName
        };
        console.log(tradersData);
        /*fetch("/updateTrader",{
         method:"Put",
         header:{
             "content-type": "application/json"
         },
         body: JSON.stringify(tradersData)
        })
        .then((response)=>{
            if(response.ok){
                setInputDisabled(true);
                setIsDisabledButton(false);
            }
        })
        .then(trader=> console.log(trader))
        .catch(error=> console.log(error));*/
    }
    return(
        
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.header}>
            <h1 className={styleClasses.title}>Trader Details</h1>
            <div className={styleClasses.divButton}>
                <Button variant='contained' color='primary' onClick={editTraders} disabled={isDisabledButton}><EditIcon/></Button>
                <Button variant='contained' color='primary' onClick={updateTraders} disabled={!isDisabledButton}><UpdateIcon/>Update</Button>
                <Button variant='contained' color='primary' disabled={!isDisabledButton}><DeleteIcon/></Button>

            </div>
            </div>
            <div className={styleClasses.content}>
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
                    <InputForm title="personal" value={personal} onChange={(ev)=>setPersonal(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="home" value={home} onChange={(ev)=>setHome(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="office" value={office} onChange={(ev)=>setOffice(ev.target.value)} disabled={inputDisabled} />
                </DialogContent>
                <DialogTitle >Bank Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="account-holder-name" required onChange={(ev)=>setAccountHolderName(ev.target.value)} value={accountHolderName} disabled={inputDisabled}/>
                    <InputForm title="account-number" required onChange={(ev)=>setAccountNumber(ev.target.value)} value={accountNumber} disabled={inputDisabled}/>
                    <InputForm title="ifsc-code" required onChange={(ev)=>setIfscCode(ev.target.value)} value={ifscCode} disabled={inputDisabled} />
                    <InputForm title="branch-name" required onChange={(ev)=>setBranchName(ev.target.value)} value={branchName} disabled={inputDisabled} />
                </DialogContent>
                
            </div>


        </div>
    );
    
});

const InputForm=({title,value,required,disabled,onChange})=>{

    const styleClasses=myStyles();
    return (
        <div>
            <TextField
                className={styleClasses.textField}
                label={title}
                required={required}
                variant="outlined"
                value={value}
                id={title} 
                onChange={onChange}
                disabled={disabled}
                fullWidth
                />
        </div>
    )
}
export default Traders;