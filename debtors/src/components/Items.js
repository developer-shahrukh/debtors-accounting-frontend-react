import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const myStyles=makeStyles((theme)=>{
    return ({
    mainContainer: {flexGrow:1},
    content:{
        padding: "10px",
        textAlign: "center"
    },
    mainHeading: {
        fontSize: "24pt",
        fontWeight: "bold",
        color: "#2222aa"
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
                                <TableRow>
                                    <TableCell align='right'>{idx+1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.hsnCode}</TableCell>
                                    <TableCell>edit</TableCell>
                                    <TableCell>delete</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {showProgress && <CircularProgress/>}
            </div>
        </div>
    );    
});

export default Items;