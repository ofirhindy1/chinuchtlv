import React, { useState } from 'react'
import Lottie from 'react-lottie'
import animationData from './1860-lock.json'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button';
import '../Home/Home.css'
import cogoToast from 'cogo-toast';
import { BrowserRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";



const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}
const useStyles = makeStyles((theme) => ({
    input: {
    height:150,
    //   fontSize: "50px"
    },
  }));
  


const validateDocument = (password) => ({
    isValid: (password.length !== 0 && password === "12345"),
    errors: {
        password: (password !== '12345') ? cogoToast.error("סיסמה לא נכונה").hide : false
    }
});
const Home = () => {
    const classes = useStyles();

    const history = useHistory();
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [to ,setTo] = useState('')
    const handleClick = () => {
        const validation = validateDocument(password);
        if (validation.isValid) {
            setTo('/map')
            history.push("/map");
            // console.log(email, name, phone, date)
            cogoToast.success("success")
        } else {
            setErrors(validation.errors);
        }


    }
    return (
        <BrowserRouter>
           
            <div>
                <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                />
                <FormControl>
                    <TextField style={{ marginTop: '192px', width: '640px'}}
                        id="filled-error-helper-text"
                        className={classes.input}
                        label="Password"
                        // variant="filled"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required={true}
                        error={errors.password}
                        
                        
                    />
                    <Button variant="contained" color="primary" style={{ marginTop: '24px' }} component={Link}
                        to={to}onClick={handleClick}
                        >
                        Enter
            </Button>
                </FormControl>
            </div>
        </BrowserRouter>

    )

}
export default Home