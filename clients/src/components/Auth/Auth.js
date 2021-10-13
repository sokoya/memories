import React, { useState } from 'react'
import { Avatar, Button, Grid, Typography, Container , Paper} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Input from './Input';
import Icon from './icon';
import useStyles from './styles';

import { signup, signin } from '../../actions/auth';

const initialState = { firstName : '', lastName: '', email : '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState( false );
    const [formData, setFormData] = useState(initialState);

    const [isSignUp, setIsSignUp] = useState( false );
    
    const handleShowPassword = () => setShowPassword( ( prevShowPassword ) => !prevShowPassword);
    
    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        setShowPassword(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( isSignUp ){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
    }

    const handleChange = ( e ) => {
        setFormData({ ...formData, [e.target.name] : e.target.value});
    }

    const googleSuccess = async ( res ) => {
        
        const result = res?.profileObj; //?. optional chaining operator, to avoid getting error for not defined object
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: { result, token }});
            history.push('/');
        } catch (error) {
            console.log( error );
        }
    };

    const googleFailure = ( error ) => {
        console.log( error );
        console.log( "Google Sign In Failed: Try again later...");
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin 
                        clientId="788436451681-fqgt8ht5qhcpojm3jisomkod2lsfs37d.apps.googleusercontent.com"
                        render={( renderProps ) => (
                            <Button className={classes.googleButton} color="primary" fullWidth  onClick={renderProps.onClick}  disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In

                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justifyContent="flex-middle">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : 'Create an account to get started'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

// 788436451681-fqgt8ht5qhcpojm3jisomkod2lsfs37d.apps.googleusercontent.com

