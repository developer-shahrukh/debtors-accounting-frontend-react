import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import ItemAddForm from './ItemAddForm';


const myStyles=makeStyles((theme)=>{
    return ({
    mainContainer: {
        flexGrow:1,
        marginTop:"65px",
        height:"600px",
        padding:"20px",
        margin:"10px",
        border:"1px solid black"
    },
    content:{
        padding: "10px",
        textAlign:"center",
        color:"gray",
    },
    mainHeading: {
        fontSize: "24pt",
        fontWeight: "bold",
        color: "#2222aa"
    },
    itemAddForm: {
        float: "right"
    },
    tableData:{
        '&:hover':{
            color: "white",
            background: "orange",
            cursor:"pointer"
        },
        '&:active':{
                color:"white",
                background:"green"
            },
        cusrsor:"pointer",
    },
    detailsPanel:{
        marginTop:"40px",
        border: "1px solid black",
        height: "150px",
        padding:"5px"
    },
    detailsContent:{
        padding: "10px",
        fontWeight:"bold",
        
    }
})
});


const getItems=()=>{
        var promise=new Promise((resolve,reject)=>{
            fetch("/getItems").then((response)=>{
                if(!response.ok) throw Error("Unable to fetch data,try after some time");
                return response.json();
            }).then((items)=>{
                resolve(items);
            }).catch((error)=>{
                reject(error);
            });
        });
        return promise;
    }
    
const getByCode=(code)=>{
    var promise=new Promise((resolve,reject)=>{
        fetch(`/getByCode?code=${code}`).then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
                return response.json();
            }).then((item)=>{
                resolve(item);
            }).catch((error)=>{
                reject(error);
            });
        });
        return promise;
    }
   


const editItem=(ev)=>{
    alert(ev.currentTarget.id);
}
const deleteItem=(ev)=>{
    //alert('delete click '+ev.currentTarget.id);
}

const ItemSelected=(ev)=>{
    //alert('Item Id '+ev.currentTarget.id);
    var code=ev.currentTarget.id;
    getByCode(code).then((item)=>{
      console.log(item);
    });
}

const Items=(()=>{

    const [items,setItems]=React.useState([]);
    const [showProgress,setShowProgress]=React.useState(true);
    
    const styleClasses=myStyles();

    React.useEffect(()=>{
        getItems().then((items)=>{
            setItems(items);
            setShowProgress(false);            
        });
    },[]);


    return (
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.mainHeading}>Debtors Accounting</div>
            <div className={styleClasses.content}>
                <h1>Items Details</h1>
                <div style={{float:"right"}}>
                    <ItemAddForm/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='right'>S.No.</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>HSN Code</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item,idx)=>{
                            return(
                                <TableRow className={styleClasses.tableData} onClick={ItemSelected} id={item.code}>
                                    <TableCell align='right'>{idx+1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.hsnCode}</TableCell>
                                    <TableCell><FontAwesomeIcon icon={faEdit} style={{cursor:"pointer"}} id={item.code} onClick={editItem}/></TableCell>
                                    <TableCell><FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}} id={item.code} onClick={deleteItem}/></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {showProgress && <CircularProgress/>}
            </div>
           <ItemDetails/>
        </div>
    );    
});


const ItemDetails=(item)=>{

    const styleClasses=myStyles();
    return(
        <div className={styleClasses.detailsPanel}>
            <span className={styleClasses.detailsContent}>Item Name : </span><br/>
            <span className={styleClasses.detailsContent}>HSN Code : </span><br/>
            <span className={styleClasses.detailsContent}>CGST : </span><br/>
            <span className={styleClasses.detailsContent}>SGST : </span><br/>
            <span className={styleClasses.detailsContent}>IGST : </span><br/>
        </div>
    )
}

export default Items;