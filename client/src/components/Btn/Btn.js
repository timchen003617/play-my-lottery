import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    btnStyle: {
        display: 'inline-block',
        textDecoration: 'none',
        background: 'linear-gradient(90deg, rgba(42,197,219,1) 0%, rgba(55,123,210,1) 100%)',
        color: '#FFFFFF',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        padding: '5px 15px',
        letterSpacing: '1px',
        margin: '0 3px',
        whiteSpace: 'nowrap',
        '&:hover': {
            background: 'linear-gradient(90deg, rgba(55,123,210,1) 0%, rgba(42,197,219,1) 100%)',
        },
        '@media(max-width: 1299px)': {
            fontSize: '18px',
        }
    },
    secondary: {
        color: theme.palette.secondary.contrastText,
        borderRadius: '10px',
        padding: '1px 5px',
        '&:disabled': {
            background: 'rgba(206,217,224,.5)'
        }
    }
}))

const Btn = ({ type = 'button', variant = 'text', size = 'medium', color = 'default', disabled, btnId, btnUrl, btnText, onClick, customStyle }) => {
    const classes = useStyles()
    return (
        <Button type={type} variant={variant} size={size} disabled={disabled || false}
            className={color === 'default' ? clsx(classes.btnStyle, customStyle) : clsx(classes.secondary, customStyle)} id={btnId} href={btnUrl} color={color}
            onClick={onClick}>{btnText}</Button>
    )
}
export default Btn