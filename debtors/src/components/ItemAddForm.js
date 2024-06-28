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
const items=[];

const ItemAddForm=()=>{
    const [itemDialogState,setItemDialogState]=React.useState(false);
    const [itemName,setItemName]=React.useState("");
    const [hsnCode,setHsnCode]=React.useState("");
    const [cgst,setCgst]=React.useState("");
    const [sgst,setSgst]=React.useState("");
    const [igst,setIgst]=React.useState("");

    const [snackbarOpenState,setSnackbarOpenState]=React.useState("");
    const [snackbarMessage,setSnackbarMessage]=React.useState("");

    function openItemDialog()
    {
        setItemDialogState(true);
    }
    function clearItemForm()
    {
        setItemName("");
        setHsnCode("");
    }
    function closeItemDialog()
    {
        setItemDialogState(false);
        clearItemForm();
    }
    function closeSnackbar()
    {
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }
    function item()
    {
        if(itemName.length===0) 
        {
            alert('Enter username ');
            return;
        }
        if(items.find((item)=> item==item.name))
        {
            alert(`${itemName} exists`);
        }
        else
        {
            items.push(itemName);
            setSnackbarMessage(`Item ${itemName}} added`);
            setSnackbarOpenState(true);
            closeItemDialog();            
        }
    }
   
    return(
        <div>
            <Button variant='contained' color='primary'
            onClick={openItemDialog}><AddIcon/></Button>
            <Dialog
             open={itemDialogState}
             onClose={closeItemDialog}
             disableEscapeKeyDown
             disableBackdropClick
             >
                <DialogTitle>Add Item Form</DialogTitle>
                <DialogContent>
                    <TextField
                    required
                    label="itemName"
                    value={itemName}
                    onChange={(ev)=>{setItemName(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    required
                    label="hsnCode"
                    value={hsnCode}
                    onChange={(ev)=>{setHsnCode(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    required
                    label="cgst"
                    value={cgst}
                    onChange={(ev)=>{setCgst(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    required
                    label="sgst"
                    value={sgst}
                    onChange={(ev)=>{setSgst(ev.target.value);}}
                    fullWidth/>
                    <TextField
                    required
                    label="igst"
                    value={igst}
                    onChange={(ev)=>{setIgst(ev.target.value);}}
                    require
                    fullWidth/>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={item}>Add</Button>
                    <Button variant='contained' color='primary' onClick={closeItemDialog}>Cancel</Button>
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

export default ItemAddForm;