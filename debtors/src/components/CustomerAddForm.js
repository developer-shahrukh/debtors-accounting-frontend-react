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
// The following is just for testing


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

const CustomerAddForm=()=>{
    const [customerDialogState,setCustomerDialogState]=React.useState(false);

    const [customers,setCustomers]=React.useState([]);
    const [states,setStates]=React.useState([]);

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

    React.useEffect(()=>{
        getCustomers().then((customers)=>{
            setCustomers(customers);
        });
        getStates().then((states)=>{
             setStates(states);
         });
    },[]);

    const stateChange=(ev)=>{
        setSelectedState(ev.target.value);
    }

    function openCustomerDialog()
    {
        setCustomerDialogState(true);
    }
    function clearCustomerForm()
    {
        setName("");
        setAddress("");
    }
    function closeCustomerDialog()
    {
        setCustomerDialogState(false);
        clearCustomerForm();
    }
    function closeSnackbar()
    {
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }
    function customer()
    {
        if(name.length===0) 
        {
            alert('Enter customer name ');
            return;
        }
        if(customers.find((customer)=> customer==customer.name))
        {
            alert(`${name} exists`);
        }
        else
        {
            customers.push(name);
            setSnackbarMessage(`customer ${name}} added`);
            setSnackbarOpenState(true);
            closeCustomerDialog();            
        }
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
                                    states.map((state)=>{
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
        </div>
    );
}

export default CustomerAddForm;