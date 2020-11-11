import React, { Fragment } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'
import ErrorIcon from '@material-ui/icons/Error'

export const TextInput = ({
  input: { value, onChange },
  label,
  meta: { touched, error, active },
  setFocus = () => {},
  id,
  type,
  ...other
}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'block',
      margin: `${theme.spacing(1)}px auto`
    },
    inputLabel: {
      color: '#000',
      fontSize: '20px',
      margin: 'auto 5px'
    },
    errorIcon: {
      verticalAlign: 'middle',
      marginRight: '3px'
    },
    input: {
      width: other.width || '100%',
      minWidth: other.minWidth || '20px',
      height: other.height || '30px',
      marginLeft: other.margin || '0px',
      marginRight: other.margin || '0px',
      backgroundColor: theme.palette.common.white,
      border: '2px solid #ced4da',
      padding: '5px 10px',
      fontSize: 16,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.15)} 0 0 0 0.1rem`,
        borderColor: theme.palette.primary.main
      }
    },
    inputError: {
      width: other.width || '100%',
      minWidth: other.minWidth || '20px',
      height: other.height || '30px',
      marginLeft: other.margin || '0px',
      marginRight: other.margin || '0px',
      backgroundColor: theme.palette.common.white,
      border: '2px solid #ced4da',
      padding: '5px 5px',
      fontSize: 16,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      borderColor: '#f00',
      '&:focus': {
        boxShadow: `${fade('#f00', 0.15)} 0 0 0 0.1rem`
      }
    }
  }))
  const classes = useStyles()

  return (
    <Fragment>
      <InputLabel htmlFor={id} className={classes.inputLabel}>
        {label}
      </InputLabel>
      <InputBase
        id={id}
        name={label}
        classes={{
          input: touched && error ? classes.inputError : classes.input,
          root: classes.root
        }}
        type={type}
        placeholder={other.placeholder}
        fullWidth={other.fullWidth || false}
        disabled={other.disabled || false}
        multiline={other.multiline || false}
        inputProps={{
          minLength: other.minLength,
          maxLength: other.maxLength
        }}
        inputRef={input => {
          if (active && input) {
            setFocus(input)
          }
        }}
        value={value}
        onChange={event => {
          if (other.toUpperCase) {
            onChange(event.target.value.toUpperCase())
          } else {
            onChange(event.target.value)
          }
          if (other.onKeyFourCode) {
            other.onKeyFourCode(event)
          }
        }}
        onKeyPress={other.onKeyPress}
        onKeyUp={event => {
          other.onPageChange && other.onPageChange(event)
        }}
      />
      {touched && error && (
        <Box className={other.style}>
          <ErrorIcon
            className={classes.errorIcon}
            color='error'
            fontSize='small'
          />
          <Typography variant='caption' color='error'>
            {error}
          </Typography>
        </Box>
      )}
    </Fragment>
  )
}
