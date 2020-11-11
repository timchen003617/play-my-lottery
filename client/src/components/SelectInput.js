import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

export const SelectInput = ({
  input: { value, onChange },
  label,
  meta: { touched, error },
  id,
  children,
  ...other
}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      minWidth: '114px',
      marginLeft: '5px'
    },
    label: {
      color: '#000',
      marginRight: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return (
    <Fragment>
      <InputLabel htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <Select
        className={other.customStyle || classes.root}
        native
        value={value}
        onChange={event => {
          onChange(event.target.value)
        }}
        inputProps={{
          name: id,
          id: id
        }}
      >
        {children}
      </Select>
      {touched && error && (
        <Typography variant='caption' color='error'>
          {error}
        </Typography>
      )}
    </Fragment>
  )
}
