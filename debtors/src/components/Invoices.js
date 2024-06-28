import React from 'react';
import {makeStyles} from '@mui/styles';
import { startTransition } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';



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
        }
    });
})

const Invoices=()=>{

    const styleClasses=myStyles();
    return(
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.headingsContent}>
                <h1 className={styleClasses.heading}>Invoices Generate</h1>
                <Button className={styleClasses.button} variant='contained' color='primary'><DeleteIcon/></Button>
            </div>
                
                <RightSideContainer/>
                <LeftSideContainer/>
                <RightSideContainer/>
                <LeftSideContainer/>       
                
        </div>
    )
}


const LeftSideContainer=()=>{
    const styleClasses=myStyles();
    return(
        <div className={styleClasses.innerContainer}>
            <div className={styleClasses.leftSideContainer}></div>
        </div>
    )
}
const RightSideContainer=()=>{
    const styleClasses=myStyles();
    return(
        <div className={styleClasses.innerContainer}>
            <div className={styleClasses.rightSideContainer}></div>
        </div>
    )
}



export default Invoices;