import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';

// The following is just for testing
const customers=[];

const CustomerAddForm=()=>{
    const [customerDialogState,setCustomerDialogState]=React.useState(false);
    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [gst,setGst]=React.useState("");
    const [contact,setContact]=React.useState("");
    const [homeContact,setHomeContact]=React.useState("");
    const [officeContact,setOfficeContact]=React.useState("");

    const [snackbarOpenState,setSnackbarOpenState]=React.useState("");
    const [snackbarMessage,setSnackbarMessage]=React.useState("");

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
                    label="contact"
                    value={contact}
                    onChange={(ev)=>{setContact(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    label="home-contect"
                    value={homeContact}
                    onChange={(ev)=>{setHomeContact(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    label="office-contect"
                    value={officeContact}
                    onChange={(ev)=>{setOfficeContact(ev.target.value);}}
                    fullWidth/>
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