import React, { Fragment } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'

export const StyledTextField = ({ label, id, type, ...other }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'block'
    },
    inputLabel: {
      color: '#000',
      fontSize: '14px',
      margin: 'auto 5px'
    },
    errorIcon: {
      verticalAlign: 'middle',
      marginRight: '3px'
    },
    input: {
      width: other.width,
      minWidth: other.minWidth || '20px',
      height: other.height || '22px',
      marginLeft: other.margin || '0px',
      marginRight: other.margin || '0px',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      padding: '5px 10px',
      fontSize: '14px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.15)} 0 0 0 0.1rem`,
        borderColor: theme.palette.primary.main
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
          input: classes.input,
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
        {...other}
      />
    </Fragment>
  )
}
