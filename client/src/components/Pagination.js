import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Field,
  reduxForm,
  SubmissionError,
  initialize,
  change
} from 'redux-form'
import { TextInput, SelectInput } from '.'
import { showNotification } from '../actions'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    height: '30px'
  },
  hiden: {
    display: 'none!important'
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderShortHand: {
    borderTop: '1.25px solid rgba(9,9,43,1)',
    borderRight: '1.25px solid rgba(9,9,43,1)',
    borderBottom: '1.25px solid rgba(9,9,43,1)'
  },
  hoverEle: {
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(87,89,120,1)',
      color: 'white'
    }
  },
  wrapper: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  total: {
    padding: '5px',
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#333',
    border: '1.25px solid rgba(9,9,43,1)'
  },
  firstPage: {
    padding: '0 5px',
    height: '100%'
  },
  nextPrevPage: {
    padding: '0 10px',
    fontSize: '14px',
    height: '100%'
  },
  page: {
    fontSize: '20px',
    color: 'white',
    background: 'rgba(9,9,43,1)'
  },
  pageNum: {
    minWidth: '30px',
    padding: '0 5px',
    fontSize: '14px',
    height: '100%'
  },
  lastPage: {
    padding: '0 5px',
    height: '100%'
  },
  form: {
    marginLeft: '5px',
    width: 'auto',
    height: '100%'
  },
  input: {
    width: '100%',
    height: '100%'
  }
}))

let Pagination = props => {
  const classes = useStyles()
  const {
    page,
    setPage,
    setRowsPerPage,
    dataLength,
    rowsPerPage,
    handleNextPage,
    handlePrevPage,
    handleJumpPage,
    showNotification,
    handleSubmit,
    setIsAll,
    action: actionToCallAPI,
    other,
    formInit,
    formChange
  } = props

  useEffect(() => {
    if (rowsPerPage > 0) {
      formInit('pagination', {
        limit: rowsPerPage,
        page: page
      })
    }
  }, [rowsPerPage])
  // 第一頁為常數 1
  let firstPage = 1
  // 最後一頁 125筆資料 / 每頁顯示筆數10 => 13頁，最後一頁有5筆資料
  // 所以需要無條件進位
  let lastPage = Math.ceil(dataLength / rowsPerPage) || 1
  // startPage 到 endPage 為常駐 10 頁
  // page - 2 如果小於 1 的話，代表最小頁數可能為 2 或者 1
  let startPage = page - 2 < 1 ? 1 : page - 2
  // 如果當前頁數小於第4頁 最後一頁為第10頁
  // 如果當前頁數大於等於第4頁 則再判斷
  // 當前頁數 + 7 是否大於最後一頁 如果是 endPage等於 lastPage
  // 如果否就當前頁數 + 7
  let endPage = page < 4 ? 10 : page + 7 > lastPage ? lastPage : page + 7

  let pages = []

  if (endPage - startPage < 9) startPage = endPage - 9
  if (lastPage <= 10) {
    startPage = 1
    endPage = lastPage
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <div
        key={i}
        className={clsx(
          classes.flexCenter,
          classes.pageNum,
          classes.borderShortHand,
          classes.hoverEle,
          {
            [classes.page]: i === Number(page)
          }
        )}
        onClick={() => {
          if (setIsAll) {
            setIsAll(false)
          }
          handleJumpPage(i, setPage, actionToCallAPI, rowsPerPage, other)
        }}
      >
        {i}
      </div>
    )
  }

  const inputSubmit = values => {
    if (values.page) {
      const pattern = /^[0-9]+$/
      let pageNum = Number(values.page)
      if (pattern.test(pageNum)) {
        if (Number(pageNum) > lastPage) {
          showNotification('超出最大页码!', 'error')
          throw new SubmissionError({
            page: '超出最大页码!'
          })
        }

        setPage(pageNum)
      }

      if (!pattern.test(pageNum)) {
        showNotification('请输入正确页码!', 'error')
        throw new SubmissionError({
          page: '请输入正确页码!'
        })
      }
    }

    let newPage = 1

    if (values.limit) {
      setRowsPerPage(Number(values.limit))
      setPage(newPage)
    }

    actionToCallAPI({
      limit: Number(values.limit) || 10,
      page: newPage,
      ...other
    })
  }

  const handlePageChange = e => {
    let getKeyCode = e.which ? e.which : e.keyCode
    let newPage = e.target.value
    if (!newPage) return
    const pattern = /^[0-9]+$/
    let pageNum = Number(newPage)
    if (pageNum < 1) return showNotification('请输入正确页码!', 'error')

    if (pattern.test(pageNum)) {
      if (Number(pageNum) > lastPage) {
        return showNotification('超出最大页码!', 'error')
      }
    }

    if (setIsAll) {
      setIsAll(false)
    }

    if (getKeyCode === 13) {
      actionToCallAPI({
        limit: rowsPerPage || 10,
        page: newPage || 1,
        ...other
      })
      setPage(Number(newPage))
      e.preventDefault()
    }
  }

  const SelectInputList = (props, values) => {
    return (
      <SelectInput id='limit' {...props}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </SelectInput>
    )
  }

  return (
    <div className={clsx(classes.root, classes.wrapper, classes.flexCenter)}>
      <div className={clsx(classes.flexCenter, classes.total)}>
        共 {dataLength} 条
      </div>
      <div
        className={clsx(
          classes.flexCenter,
          classes.firstPage,
          classes.hoverEle,
          classes.borderShortHand,
          {
            [classes.hiden]: startPage === 1
          }
        )}
        onClick={() => {
          if (setIsAll) {
            setIsAll(false)
          }
          handleJumpPage(1, setPage, actionToCallAPI, rowsPerPage, other)
        }}
      >
        {firstPage}...
      </div>
      <div
        className={clsx(
          classes.flexCenter,
          classes.nextPrevPage,
          classes.hoverEle,
          classes.borderShortHand,
          {
            [classes.hiden]: firstPage === page
          }
        )}
        onClick={() => {
          if (setIsAll) {
            setIsAll(false)
          }
          handlePrevPage(page, setPage, actionToCallAPI, rowsPerPage, other)
        }}
      >
        {'<<'}
      </div>
      {pages}
      <div
        className={clsx(
          classes.flexCenter,
          classes.nextPrevPage,
          classes.hoverEle,
          classes.borderShortHand,
          {
            [classes.hiden]: lastPage === page
          }
        )}
        onClick={() => {
          if (setIsAll) {
            setIsAll(false)
          }
          handleNextPage(
            page,
            lastPage,
            setPage,
            actionToCallAPI,
            rowsPerPage,
            other
          )
        }}
      >
        {'>>'}
      </div>
      <div
        className={clsx(
          classes.flexCenter,
          classes.lastPage,
          classes.hoverEle,
          classes.borderShortHand,
          {
            [classes.hiden]: lastPage - startPage === 9 || lastPage < 10
          }
        )}
        onClick={() => {
          if (setIsAll) {
            setIsAll(false)
          }
          handleJumpPage(lastPage, setPage, actionToCallAPI, rowsPerPage, other)
        }}
      >
        ...{lastPage}
      </div>
      {rowsPerPage !== 500 &&
        <form
          className={clsx(classes.form, classes.flexCenter)}
          onChange={() => setTimeout(handleSubmit(inputSubmit))}
        >
          <Field
            type='select'
            name='limit'
            component={SelectInputList}
            width='70px'
            height='25px'
            label='每页笔数'
          />
        </form>
      }
      {rowsPerPage !== 500 &&
        <Field
          name='page'
          type='number'
          id='pagination'
          component={TextInput}
          width='50px'
          height='16px'
          fontSize='16px'
          onPageChange={handlePageChange}
        />
      }
    </div>
  )
}

Pagination.propTypes = {
  action: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleJumpPage: PropTypes.func.isRequired,
  other: PropTypes.object
}

const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      limit: props.rowsPerPage,
      page: props.page
    },
    enableReinitialize: true
  }
}

const mapDispatchToProps = {
  showNotification,
  formInit: initialize,
  formChange: change
}

Pagination = reduxForm({
  form: 'pagination'
})(Pagination)

Pagination = connect(mapStateToProps, mapDispatchToProps)(Pagination)

export default Pagination
