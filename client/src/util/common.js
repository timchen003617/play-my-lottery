import Combinatorics from 'js-combinatorics'

export const logout = () => {
  localStorage.removeItem('token', '')
  localStorage.removeItem('account', '')
}

/**
 * 七星彩下注號碼,類型 回傳對應的玩法:lotteryTypeId, typeParentId
 * @param {*} num 下注號碼
 * @param {*} quickTypeCategory 快打分類: 預設:'A', 四字現:'B', 全转:'C'
 */
export const betNumMappingPlay = (num, quickTypeCategory) => {
  let lotteryTypeId, typeParentId

  const { countX, countNumber, compose } = checkNumber(num)

  //檢查是否有輸入數字
  if (countNumber === 0) {
    return false
  }
  switch (num.length) {
    case 1: //1位數
      break
    case 2:
      if (countX === 0) {
        //無X 對應二字現
        typeParentId = '25'
        lotteryTypeId = '26'
      }
      break
    case 3:
      if (countX === 0) {
        //無X 對應三字現
        typeParentId = '27'
        lotteryTypeId = '28'
      }
      break
    case 4:
      if (countX === 0) {
        //無X
        if (quickTypeCategory === 'A' || quickTypeCategory === 'C') {
          //對應四字定
          typeParentId = '23'
          lotteryTypeId = '24'
        } else if (quickTypeCategory === 'B') {
          //對應四字現
          typeParentId = '29'
          lotteryTypeId = '30'
        } else {
          typeParentId = '23'
          lotteryTypeId = '24'
        }
      } else if (countX === 1) {
        // 1X 對應三字定
        typeParentId = '18'
        switch (compose) {
          case 'OOOX':
            lotteryTypeId = '19'
            break
          case 'OOXO':
            lotteryTypeId = '20'
            break
          case 'OXOO':
            lotteryTypeId = '21'
            break
          case 'XOOO':
            lotteryTypeId = '22'
            break
          default:
            break
        }
      } else if (countX === 2) {
        // 2X 對應二字定
        typeParentId = '7'
        switch (compose) {
          case 'OOXX':
            lotteryTypeId = '8'
            break
          case 'OXOX':
            lotteryTypeId = '9'
            break
          case 'OXXO':
            lotteryTypeId = '10'
            break
          case 'XOOX':
            lotteryTypeId = '11'
            break
          case 'XOXO':
            lotteryTypeId = '12'
            break
          case 'XXOO':
            lotteryTypeId = '13'
            break
          default:
            break
        }
      } else if (countX === 3) {
        typeParentId = '1'
        switch (compose) {
          //對應一字定
          case 'OXXX':
            lotteryTypeId = '2'
            break
          case 'XOXX':
            lotteryTypeId = '3'
            break
          case 'XXOX':
            lotteryTypeId = '4'
            break
          case 'XXXO':
            lotteryTypeId = '5'
            break
          default:
            break
        }
      }
    case 5:
      if (countX === 3) {
        //3X 對應二五定
        typeParentId = '31'
        switch (compose) {
          case 'XXXOO':
            lotteryTypeId = '32'
            break
          case 'OXXXO':
            lotteryTypeId = '33'
            break
          case 'XOXXO':
            lotteryTypeId = '34'
            break
          case 'XXOXO':
            lotteryTypeId = '35'
            break
          default:
            break
        }
      } else if (countX === 4) {
        //4X  對應一字定第五位
        typeParentId = '1'
        switch (compose) {
          case 'XXXXO':
            lotteryTypeId = '6'
            break
          default:
            break
        }
      }
      break
    default:
      break
  }

  return { lotteryTypeId, typeParentId }
}

export const checkNumber = num => {
  let countX = 0,
    countNumber = 0,
    compose = ''
  const regex = new RegExp('^[0-9]$')
  const numArray = num.split('')
  numArray.forEach((num, index) => {
    if (num === 'X' || num === 'x') {
      countX++
      compose += 'X'
    }
    if (regex.test(num)) {
      countNumber++
      compose += 'O'
    }
  })
  return { countX, countNumber, compose }
}

//傳入數字陣列，回傳所有排列組合(去除重複))
// permutator([1,2,3]);
// [ [ 1, 2, 3 ],
//   [ 1, 3, 2 ],
//   [ 2, 1, 3 ],
//   [ 2, 3, 1 ],
//   [ 3, 1, 2 ],
//   [ 3, 2, 1 ] ]
// export const permutator = inputArr => {
//   let result = []

//   const permute = (arr, m = []) => {
//     if (arr.length === 0) {
//       result.push(m)
//     } else {
//       for (let i = 0; i < arr.length; i++) {
//         let curr = arr.slice()
//         let next = curr.splice(i, 1)
//         permute(curr.slice(), m.concat(next))
//       }
//     }
//   }

//   permute(inputArr)
//   //去除重複組合
//   let qs = result.map(ele => ele.join(''))
//   let s = Array.from(new Set(qs))
//   return s
// }
//傳入數字陣列，回傳所有排列組合(去除重複))
// permutator([1,2,3]);
// [ [ 1, 2, 3 ],
//   [ 1, 3, 2 ],
//   [ 2, 1, 3 ],
//   [ 2, 3, 1 ],
//   [ 3, 1, 2 ],
//   [ 3, 2, 1 ] ]
export const permutator = inputArr => {
  let cmb = Combinatorics.permutation(inputArr)
  //去除重複組合
  let result = cmb.toArray().map(ele => ele.join(''))
  result = Array.from(new Set(result))
  return result
}

//傳入陣列，回傳所有排列組合(去除重複))
// permutator([[1,2,3],[3,4,5],[4,5,6]]);
// [ [ 123 ],
//   [ 132 ],
//   [ 213 ],
//   [ 231 ],
//   [ 312 ],
//   [ 321 ] ]
export const permutatorArray = inputArr => {
  let cp = Combinatorics.cartesianProduct(...inputArr)
  //去除重複組合
  let result = cp.toArray().map(ele => ele.join(''))
  result = Array.from(new Set(result))
  return result
}

export const combination = (inputArr, play) => {
  let cp = Combinatorics.combination(inputArr, play)
  //去除重複組合
  let result = cp.toArray().map(ele => ele.join(''))
  result = Array.from(new Set(result))
  return result
}

export const statusMapping = status => {
  if (status === '4') {
    return '退码'
  } else if (status === '1') {
    return '中奖'
  } else if (status === '2') {
    return '未中奖'
  } else if (status === '3') {
    return '未开奖'
  }
}

export const isNow = lotteryTypeId => {
  if (
    lotteryTypeId === '26' ||
    lotteryTypeId === '28' ||
    lotteryTypeId === '30'
  ) {
    return true
  } else {
    return false
  }
}

export const switchLotteryParentId = lotteryTypeId => {
  let typeParentId
  switch (lotteryTypeId) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      typeParentId = '1'
      break
    case '7':
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
      typeParentId = '7'
      break
    case '18':
    case '19':
    case '20':
    case '21':
    case '22':
      typeParentId = '18'
      break
    case '23':
    case '24':
      typeParentId = '23'
      break
    case '25':
    case '26':
      typeParentId = '25'
      break
    case '27':
    case '28':
      typeParentId = '27'
      break
    case '29':
    case '30':
      typeParentId = '29'
      break
    //二五定
    case '32':
    case '33':
    case '34':
    case '35':
      typeParentId = '31'
      break
  }
  return typeParentId
}

export const composeGetLotteryListData = (values, rowsPerPage) => {
  let data = Object.assign({}, values)
  let lotteryId = localStorage.getItem('lotteryId')
  data.lotteryId = lotteryId
  const list = values.list
  const start = values.start ? values.start.trim() : ''
  const end = values.end ? values.end.trim() : ''
  if (start && end) {
    if (list === '0') {
      //赔率
      data.odds = [Number(start.trim()), Number(end.trim())]
    } else if (list === '1') {
      //金額
      data.betAmount = [Number(start.trim()), Number(end.trim())]
    }
  }
  let lotteryTypeId = values.category

  const startTime = values.startTime
  const endTime = values.endTime
  const status = values.status
  const num = values.num ? values.num.trim() : '' //去除空白
  const isnow = values.isnow
  if (num && num.length === 4) {
    if (isnow) {
      lotteryTypeId = '30'
    } else if (num.indexOf('X') === -1) {
      lotteryTypeId = '24'
    }
  }

  //分類選全部lotteryTypeId  = '0' 不傳lotteryTypeId
  if (lotteryTypeId && lotteryTypeId !== '0') {
    const typeParentId = switchLotteryParentId(lotteryTypeId)
    if (typeParentId) {
      data.typeParentId = typeParentId
    }
    data.lotteryTypeId = lotteryTypeId
  }
  if (isnow) {
    data.kind = '2'
  }
  data.status = status
  data.num = num
  data.page = 1
  data.limit = rowsPerPage
  return data
}
//帶小數的四捨五入
export const roundDecimal = (val, precision) => {
  return (
    Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
    Math.pow(10, precision || 0)
  )
}

export const validateNumberAndDot = event => {
  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault()
  }
}

export const validateNumberAndX = event => {
  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 88) {
    event.preventDefault()
  }
}

export const validateNumber = event => {
  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault()
  }
}

export const limitRepeat = set => event => {
  let value = event.target.value
  let num = value.length
  let startV = value.slice(0, num - 1)
  let endV = value.slice(num - 1, num)
  if (startV.indexOf(endV) != -1) {
    event.target.value = startV
    set(event.target.value)
  }
}
//排除陣列重複的元素
export const dedup = arr => {
  let result = arr.reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current)
    }
    return init
  }, [])
  return result
}

//排除陣列物件重複的元素
export const dedupObj = arr => {
  let newArr = [] //盛放去重後資料的新陣列
  for (let item1 of arr) {
    //迴圈arr陣列物件的內容
    let flag = true //建立標記，判斷資料是否重複，true為不重複
    for (let item2 of newArr) {
      //迴圈新陣列的內容
      if (item1.name === item2.name) {
        //讓arr陣列物件的內容與新陣列的內容作比較，相同的話，改變標記為false
        flag = false
      }
    }
    if (flag) {
      //判斷是否重複
      newArr.push(item1) //不重複的放入新陣列。  新陣列的內容會繼續進行上邊的迴圈。
    }
  }
  return newArr
}

export const serialArray = arr => {
  let lengthArr = []
  let productArr = []
  let result = []
  let length = 1
  for (let i = 0; i < arr.length; i++) {
    let len = arr[i].length
    lengthArr.push(len)
    let product = i === 0 ? 1 : arr[i - 1].length * productArr[i - 1]
    productArr.push(product)
    length *= len
  }
  for (let i = 0; i < length; i++) {
    let resultItem = ''
    for (let j = 0; j < arr.length; j++) {
      resultItem += arr[j][Math.floor(i / productArr[j]) % lengthArr[j]]
    }
    result.push(resultItem)
  }
  //去除重複組合
  result = Array.from(new Set(result))
  return result
}

// Pagination start
export const handleNextPage = (
  currentPage,
  lastPage,
  setPage,
  actionToCallAPI,
  rowsPerPage,
  other
) => {
  const getNexPage = currentPage + 1
  if (getNexPage > lastPage) return alert('无下一页')
  other.page = getNexPage
  other.limit = rowsPerPage || 10
  actionToCallAPI(other)
  setPage(getNexPage)
}

export const handlePrevPage = (
  currentPage,
  setPage,
  actionToCallAPI,
  rowsPerPage,
  other
) => {
  const getPrevPage = currentPage - 1
  if (getPrevPage < 1) return alert('无上一页')
  other.page = getPrevPage
  other.limit = rowsPerPage || 10
  actionToCallAPI(other)
  setPage(getPrevPage)
}

export const handleJumpPage = (
  pageNum,
  setPage,
  actionToCallAPI,
  rowsPerPage,
  other
) => {
  other.page = pageNum
  other.limit = rowsPerPage || 10
  actionToCallAPI(other)
  setPage(pageNum)
}
// Pagination end
