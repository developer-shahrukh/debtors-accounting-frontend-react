import React from 'react';
import {makeStyles} from '@mui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const myStyles=makeStyles((them)=>{
    return({
        mainContainer:{
            marginTop:"90px",
            height: "430px",
            margin:"10px;",
            borderRadius: "5px",
            border:"1px solid black",
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

const openTraderDialog=()=>{

}

const Traders =(()=>{

    const [traders,setTraders]=React.useState({
        name:"",
        address:""
    });
    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [disabled,setDisabled]=React.useState("true");

    const styleClasses=myStyles();

    React.useEffect(()=>{
        getTraders().then((traders)=>{
            setTraders(traders);
            console.log(traders);
            traders.forEach((trader)=>{
               console.log(trader.name)
               setName(trader.name);
               setAddress(trader.address);
            });
            
        });
    },[]);

    const handleInputChange=(e)=>{
        const {id,value}=e.target;
        setTraders(prevState=>({
            ...prevState,
            [id]: value
        }));
        console.log(e.target);
    }

    return(
        <div className={styleClasses.mainContainer}>
            <div className={styleClasses.header}>
            <h1 className={styleClasses.title}>Trader Details</h1>
            <div className={styleClasses.divButton}>
                <Button variant='contained' color='primary'><EditIcon/></Button>
                <Button variant='contained' color='primary'><DeleteIcon/></Button>
            </div>
            </div>
            <div className={styleClasses.content}>
                <DialogTitle >Personal Information</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <TextField
                        className={styleClasses.textField}
                        label="name"
                        disabled={disabled}
                        required
                        variant="outlined"
                        value={name}
                        onChange={setAddress}
                        id="name"
                        fullWidth
                    />
                    <TextField
                        className={styleClasses.textField}
                        label="address"
                        disabled={disabled}
                        required
                        variant="outlined"
                        value={address}
                        onChange={setAddress}
                        id="address"
                        fullWidth
                    />
                </DialogContent>
                
            </div>


        </div>
    );

});

const InputForm=({title,value,required,onChang})=>{

    const styleClasses=myStyles();
    return (
        <div>
            <TextField
                className={styleClasses.textField}
                label={title}
                required={required}
                variant="outlined"
                value={value}
                onChang={onChang}
                id={title} 
                fullWidth
                />
        </div>
    )
}
export default Traders;