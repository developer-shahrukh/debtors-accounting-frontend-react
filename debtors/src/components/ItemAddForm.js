import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import './CSS/ItemAddForm.css'
import AlertMessage from './AlertMessage';


const ItemAddForm=(props)=>{
    const [itemDialogState,setItemDialogState]=React.useState(false);
    const [itemName,setItemName]=React.useState("");
    const [hsnCode,setHsnCode]=React.useState("");
    const [cgst,setCgst]=React.useState("");
    const [sgst,setSgst]=React.useState("");
    const [igst,setIgst]=React.useState("");
    const [uoms,setUoms]=React.useState([]);
    const [snackbarOpenState,setSnackbarOpenState]=React.useState("");
    const [snackbarMessage,setSnackbarMessage]=React.useState("");


    const [leftList, setLeftList] = React.useState([props.uoms]);
    const [rightList, setRightList] = React.useState([]);
    const [selectedRightItems, setSelectedRightItems] =React.useState([]);
    const [selectedLeftItems, setSelectedLeftItems] =React.useState([]);

    React.useEffect(() => {
        setLeftList(props.uoms);
        props.setOpenState(false);
      }, []);
    
      const handleSelectRightItem = (item) => {
        setSelectedRightItems(prevSelectedItems => {
          if (prevSelectedItems.includes(item)) {
            return prevSelectedItems.filter(i => i !== item);
          } else {
            return [...prevSelectedItems, item];
          }
        });
      };

      const handleSelectLeftItem = (item) => {
        setSelectedLeftItems(prevSelectedItems => {
          if (prevSelectedItems.includes(item)) {
            return prevSelectedItems.filter(i => i !== item);
          } else {
            return [...prevSelectedItems, item];
          }
        });
      };
    
      const handleMoveToRight = () => {
        setRightList(prevRightList => [...prevRightList, ...selectedRightItems]);
        setLeftList(prevLeftList => prevLeftList.filter(item => !selectedRightItems.includes(item)));
        setSelectedRightItems([]);
      };
    
      const handleMoveToLeft = () => {
        setLeftList(prevLeftList => [...prevLeftList, ...selectedLeftItems]);
        setRightList(prevRightList => prevRightList.filter(item => !selectedLeftItems.includes(item)));
        setSelectedLeftItems([]);
      };
    
    const openItemDialog=()=>{
        setItemDialogState(true);
    }
    const clearItemForm=()=>
    {
        setItemName("");
        setHsnCode("");
        setCgst("");
        setSgst("");
        setIgst("");
        setRightList([]);
    }
    const closeItemDialog=()=>{
        setItemDialogState(false);
        clearItemForm();
    }
    const closeSnackbar=()=>{
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }
    const addItem=()=>{
        if(itemName.length==0) 
        {
            props.setOpenState(true);
            props.setMessage("Name required");
            props.setAlertType("error");
            return;
        }
        if(props.items.find((item)=> item==item.name))
        {
            alert(`${itemName} exists`);
        }
        else
        {
            //props.items.push(itemName);
            alert(itemName+","+hsnCode);
            alert(cgst+","+sgst+","+igst);
            console.log(rightList);
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
                    <div className={"mainContainer"}>
                            <div className={"leftContainer"}>
                                <h3 className={"heading"}>Select From</h3>
                                {leftList.map(item => (
                                    <div key={item.code} id={item.code}>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRightItems.includes(item)} 
                                        onChange={() => handleSelectRightItem(item)} 
                                    />
                                    {item.name}
                                    </div>
                                ))}
                            </div>
                        <div className={"buttonContainer"}>
                        <button onClick={handleMoveToRight}><ArrowForwardIos/></button>
                        <button onClick={handleMoveToLeft}><ArrowBackIos/></button>
                        </div>
                        <div className={"rightContainer"}>
                            <h3 className={"heading"}>Selected</h3>
                            {rightList.map(item => (
                                <div key={item.code} id={item.code}>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedLeftItems.includes(item)} 
                                        onChange={() => handleSelectLeftItem(item)} 
                                    />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={addItem}>Add</Button>
                    <Button variant='contained' color='primary' onClick={closeItemDialog}>Cancel</Button>
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
                alertType={props.alertType}
                message={props.message}
            />
        </div>
    );
}

export default ItemAddForm;