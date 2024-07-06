import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import { Select, MenuItem, FormControl, InputLabel, } from '@material-ui/core';
import AlertMessage from './AlertMessage';

// The following is just for testing


const CustomerAddForm=(props)=>{
    const [customerDialogState,setCustomerDialogState]=React.useState(false);

    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [stateCode,setStateCode]=React.useState();
    const [selectedState,setSelectedState]=React.useState(0);
    const [gst,setGst]=React.useState("");
    const [tin,setTin]=React.useState("");
    const [other,setOther]=React.useState("");
    const [personalContact,setPersonalContact]=React.useState("");
    const [homeContact,setHomeContact]=React.useState("");
    const [officeContact,setOfficeContact]=React.useState("");

    const [snackbarOpenState,setSnackbarOpenState]=React.useState("");
    const [snackbarMessage,setSnackbarMessage]=React.useState("");

    

    const stateChange=(ev)=>{
        setSelectedState(ev.target.value);
    }

    const openCustomerDialog=()=>{
        setCustomerDialogState(true);
    }
    const clearCustomerForm=()=>{
        setName("");
        setAddress("");
    }
    const closeCustomerDialog=()=>{
        setCustomerDialogState(false);
        clearCustomerForm();
    }
    const closeSnackbar=()=>{
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }

    const clearFormData=()=>{
        setName("");
        setAddress("");
        setStateCode(selectedState);
        setGst("");
        setTin("");
        setOther("");
        setPersonalContact("");
        setHomeContact("");
        setOfficeContact("");
    }



    const customer=()=>{
        if(name.length===0){
            props.setOpenState(true);
            props.setAlertType('warning');
            props.setMessage("Enter name")
            return;
        }
        if(address.length===0){
                props.setOpenState(true);
                props.setAlertType('warning');
                props.setMessage("Enter address")
                return;
            }
        if(selectedState==0){
            props.setOpenState(true);
            props.setAlertType('warning');
            props.setMessage("Select State");
            return;
        }
        const customerData={
            "name": name,
            "address": address,
            "stateCode": selectedState,
            "regTitlte1": "GST",
            "regTitlte2": "TIN",
            "regTitlte3": "LIC",
            "regValue1": gst,
            "regValue2": tin,
            "regValue3": other,
            "contact1": personalContact,
            "contact2": homeContact,
            "contact3": officeContact
        };

        fetch("/addCustomer",{
            method: "Post",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(customerData)
        }).then((response)=>{
            if(response.ok){
                props.setInputDisabled(true);
                props.setActiveButton(true);
                props.setIsEditing(true);
                props.setOpenState(true);
                props.setAlertType("success");
                props.setMessage(`Customer ${customerData.name} added`);
                const addCustomers=[...props.customers];
                addCustomers.push(customerData);
                props.setCustomers(addCustomers);
                setSelectedState(0);
                clearFormData();   
                closeCustomerDialog();  
                setTimeout(() => {
                    if (props.newCustomerRef.current) {
                      props.newCustomerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      //props.newCustomerRef.current.click();
                    }
                  }, 0);          
            }
        }).catch((error)=>{
            alert('error');
            props.setInputDisabled(true);
            props.setActiveButton(true);
            props.setIsEditing(true);
            props.setOpenState(true);
            props.setAlertType("error");
            props.setMessage(`Error ${error}`);
        });
    }
   
    return(
        <div>
            <Button variant='contained' color='primary'
            onClick={openCustomerDialog}><AddIcon/></Button>
            <Dialog
             open={customerDialogState}
             onClose={closeCustomerDialog}
             disableEscapeKeyDown
             disableBackdropClick
             >
                <DialogTitle>Add customer Form</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label="name"
                        value={name}
                        onChange={(ev)=>{setName(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        required
                        label="address"
                        value={address}
                        onChange={(ev)=>{setAddress(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        required
                        label="gst"
                        value={gst}
                        onChange={(ev)=>{setGst(ev.target.value);}}
                        fullWidth/>

                    <TextField
                        required
                        label="tin"
                        value={tin}
                        onChange={(ev)=>{setTin(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        required
                        label="other"
                        value={other}
                        onChange={(ev)=>{setOther(ev.target.value);}}
                        fullWidth/>

                    <TextField
                        label="personal"
                        value={personalContact}
                        onChange={(ev)=>{setPersonalContact(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="home-contact"
                        value={homeContact}
                        onChange={(ev)=>{setHomeContact(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="office-contact"
                        value={officeContact}
                        onChange={(ev)=>{setOfficeContact(ev.target.value);}}
                        fullWidth/>
                    <FormControl>
                        <InputLabel id="state-select-label">States</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                value={selectedState}
                                onChange={stateChange}
                                fullWidth
                            >
                                {
                                    props.states.map((state)=>{
                                        return(
                                            <MenuItem id={state.code} value={state.code} selected>{state.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={customer}>Add</Button>
                    <Button variant='contained' color='primary' onClick={closeCustomerDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar 
            open={snackbarOpenState}
            message={snackbarMessage}
            onClose={closeSnackbar}
            autoHideDuration={5000}
            />
            <AlertMessage
                openState={props.openState}
                duration={3000}
                horizontalAlignment="center"
                verticalAlignment="bottom"
                onClose={props.closeAlert}
                alertType="success"
                message={props.message}
            />
        </div>
    );
}

export default CustomerAddForm;