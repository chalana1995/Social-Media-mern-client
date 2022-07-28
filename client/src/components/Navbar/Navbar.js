import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import decode from 'jwt-decode'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const Navbar = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodeToken = decode(token);

            if(decodeToken.exp * 1000 < new Date().getTime())
            {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt='memories' height="60" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar