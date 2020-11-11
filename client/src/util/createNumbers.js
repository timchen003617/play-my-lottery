import { permutator, permutatorArray } from './index'

/**
 * 快選生成號碼使用
 */
export const createNumbers = (() => {
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let numbersX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X']
  let allresult = [] //當前玩法的所有可能排列組合數字清單
  let inputCount = 0 // 仟百十個 四個input 有幾個input被輸入 , 檢核用
  let inputArr = []
  let play = '' //玩法
  let excludeInclude = {} // 除取
  let thousand = [] //定位置千 input
  let hundred = [] //定位置百 input
  let ten = [] //定位置十 input
  let one = [] //定位置個 input
  let allNumber1 = '' //配數input1
  let allNumber2 = '' //配數input2
  let allNumber3 = '' //配數input3
  let allNumber4 = '' //配數input4
  let numberList = [] // 存放定位置或配數全轉或配數產生的數字清單
  let combinedAllList = [] //合分產生的數字清單
  let positionCombinedList = [] // 存放不定位合分產生的數字清單
  let valRangeList = [] // 存放值範圍產生的數字清單
  let sevenThGroupAllList = [] // 存放全轉產生的數字清單
  let sevenThGroupAllIncludeList = [] // 存放上獎產生的數字清單
  let sevenThGroupExcludeList = [] //存放排除產生的數字清單
  let multiplicationList = [] //存放乘號位置產生的數字清單
  let includeList = [] //存放含的數字清單
  let repeatList = [] //存放复式的數字清單
  let twoSameList = [] // 存放雙重產生的數字清單
  let twoTwoSameList = [] // 存放雙雙重產生的數字清單
  let threeSameList = [] // 存放三重產生的數字清單
  let fourSameList = [] // 存放四重產生的數字清單
  let twoBrotherList = [] //存放二兄弟產生的數字清單
  let threeBrotherList = [] //存放三兄弟產生的數字清單
  let fourBrotherList = [] //存放四兄弟產生的數字清單
  let singleList = [] //存放單產生的數字清單
  let doubleList = [] //存放雙產生的數字清單
  let logList = [] //存放對數結果的數字清單
  let generateNumChecked = {} //checkbox
  let combinedNum1 = '' //合分input1
  let combinedNum2 = '' //合分input2
  let combinedNum3 = '' //合分input3
  let combinedNum4 = '' //合分input4
  let positionCombinedInput = '' //不定位合分:兩數合,三數合input
  let startValueRangeInput = '' //值範圍起始值
  let endValueRangeInput = '' //值範圍結束值
  let sevenThGroupAll = '' //全轉
  let sevenThGroupAllInclude = '' //上獎
  let sevenThGroupExclude = '' //排除
  let includeInput = '' //含
  let repeatInput = '' //复式
  let logNum1Input = '' // 對數input1
  let logNum2Input = '' // 對數input2
  let logNum3Input = '' // 對數input3
  let inputLimited = 4
  let mulCheckedCount = 0 //乘號位置checked 數量
  let singleCheckedCount = 0 //單checked 數量
  let doubleCheckedCount = 0 //雙checked 數量
  const setInputCount = value => (inputCount = value)
  const setPlay = value => (play = value)
  const setExcludeInclude = value => (excludeInclude = value)
  const setThousand = value => (thousand = value)
  const setHundred = value => (hundred = value)
  const setTen = value => (ten = value)
  const setOne = value => (one = value)
  const setCombinedNum1 = value => (combinedNum1 = value)
  const setCombinedNum2 = value => (combinedNum2 = value)
  const setCombinedNum3 = value => (combinedNum3 = value)
  const setCombinedNum4 = value => (combinedNum4 = value)
  const setGenerateNumChecked = value => (generateNumChecked = value)
  const setAllNumber1 = value => (allNumber1 = value)
  const setAllNumber2 = value => (allNumber2 = value)
  const setAllNumber3 = value => (allNumber3 = value)
  const setAllNumber4 = value => (allNumber4 = value)
  const setPositionCombinedInput = value => (positionCombinedInput = value)
  const setStartValueRange = value => (startValueRangeInput = value)
  const setEndValueRange = value => (endValueRangeInput = value)
  const setSevenThGroupAll = value => (sevenThGroupAll = value)
  const setSevenThGroupAllInclude = value => (sevenThGroupAllInclude = value)
  const setSevenThGroupExclude = value => (sevenThGroupExclude = value)
  const setIncludeInput = value => (includeInput = value)
  const setRepeatInput = value => (repeatInput = value)
  const setLogNum1Input = value => (logNum1Input = value)
  const setLogNum2Input = value => (logNum2Input = value)
  const setLogNum3Input = value => (logNum3Input = value)
  const setAllresult = value => (allresult = value)
  const getAllResult = () => allresult

  //號碼清單結果初始化
  const init = () => {
    inputCount = 0
    numberList = []
    combinedAllList = []
    positionCombinedList = []
    valRangeList = []
    sevenThGroupAllList = []
    sevenThGroupAllIncludeList = []
    sevenThGroupExcludeList = []
    multiplicationList = []
    mulCheckedCount = 0
    singleCheckedCount = 0
    doubleCheckedCount = 0
    includeList = []
    repeatList = []
    twoSameList = []
    twoTwoSameList = []
    threeSameList = []
    fourSameList = []
    twoBrotherList = []
    threeBrotherList = []
    fourBrotherList = []
    singleList = []
    doubleList = []
    logList = []
    inputArr = ['', '', '', '']
  }

  const createAllPossible = () => {
    if (play === '7' || play === '18' || play === '23') {
      createAllPositionPossible()
    }
    if (play === '25' || play === '27' || play === '29') {
      createAllNotPositionPossible()
    }
  }
  //驗證輸入的資料
  const validateInput = () => {
    const regex = new RegExp('^[xX0123456789]+$')
    if (
      thousand.length === 0 &&
      hundred.length === 0 &&
      ten.length === 0 &&
      one.length === 0 &&
      !allNumber1 &&
      !allNumber2 &&
      !allNumber3 &&
      !allNumber4 &&
      (!combinedNum1 ||
        (!generateNumChecked['combined-1-1'] &&
          !generateNumChecked['combined-1-2'] &&
          !generateNumChecked['combined-1-3'] &&
          !generateNumChecked['combined-1-4'])) &&
      (!combinedNum2 ||
        (!generateNumChecked['combined-2-1'] &&
          !generateNumChecked['combined-2-2'] &&
          !generateNumChecked['combined-2-3'] &&
          !generateNumChecked['combined-2-4'])) &&
      (!combinedNum3 ||
        (!generateNumChecked['combined-3-1'] &&
          !generateNumChecked['combined-3-2'] &&
          !generateNumChecked['combined-3-3'] &&
          !generateNumChecked['combined-3-4'])) &&
      (!combinedNum4 ||
        (!generateNumChecked['combined-4-1'] &&
          !generateNumChecked['combined-4-2'] &&
          !generateNumChecked['combined-4-3'] &&
          !generateNumChecked['combined-4-4'])) &&
      positionCombinedInput.length === 0 &&
      !startValueRangeInput &&
      !endValueRangeInput &&
      !sevenThGroupAll &&
      !sevenThGroupAllInclude &&
      !sevenThGroupExclude &&
      !generateNumChecked['multiplication-1'] &&
      !generateNumChecked['multiplication-2'] &&
      !generateNumChecked['multiplication-3'] &&
      !generateNumChecked['multiplication-4'] &&
      !includeInput &&
      !repeatInput &&
      !Object.keys(excludeInclude).some(item => item.includes('same')) &&
      !Object.keys(excludeInclude).some(item => item.includes('brother')) &&
      !Object.keys(generateNumChecked).some(
        item => item.includes('single') || item.includes('double')
      ) &&
      !excludeInclude['log'] &&
      !logNum1Input &&
      !logNum2Input &&
      !logNum3Input
    ) {
      alert('请选择或填写条件生成')
      return false
    }

    for (let i = 1; i <= 4; i++) {
      let isMulChecked = generateNumChecked[`multiplication-${i}`]
      let isSingleChecked = generateNumChecked[`single-${i}`]
      let isDoubleChecked = generateNumChecked[`double-${i}`]
      if (isMulChecked) {
        mulCheckedCount++
      }
      if (isSingleChecked) {
        singleCheckedCount++
      }
      if (isDoubleChecked) {
        doubleCheckedCount++
      }
    }
    if (mulCheckedCount > 0) {
      if (play === '7' && mulCheckedCount !== 2) {
        alert('请选中正确的乘号位置!')
        return false
      }

      if (play === '18' && mulCheckedCount !== 1) {
        alert('请选中正确的乘号位置!')
        return false
      }
    }
    if (singleCheckedCount > 0) {
      if (play === '7' && singleCheckedCount !== 2) {
        alert('请选中正确的乘号位置!')
        return false
      }
      if (play === '18' && singleCheckedCount !== 3) {
        alert('请选中正确的乘号位置!')
        return false
      }
    }
    if (doubleCheckedCount > 0) {
      if (play === '7' && doubleCheckedCount !== 2) {
        alert('请选中正确的乘号位置!')
        return false
      }
      if (play === '18' && doubleCheckedCount !== 3) {
        alert('请选中正确的乘号位置!')
        return false
      }
    }

    if (thousand.length > 0) {
      if (!regex.test(thousand.join(''))) {
        alert('没有这样的号码。')
        return false
      }
      inputCount++
      inputArr[0] = thousand
    }
    if (hundred.length > 0) {
      if (!regex.test(hundred.join(''))) {
        alert('没有这样的号码。')
        return false
      }
      inputCount++
      inputArr[1] = hundred
    }
    if (ten.length > 0) {
      if (!regex.test(ten.join(''))) {
        alert('没有这样的号码。')
        return false
      }
      inputCount++
      inputArr[2] = ten
    }
    if (one.length > 0) {
      if (!regex.test(one.join(''))) {
        alert('没有这样的号码。')
        return false
      }
      inputCount++
      inputArr[3] = one
    }

    //定位置
    if (play === '23') {
      if (isIncludeX()) {
        alert('没有这样的号码。')
        return false
      }
    }
    if (inputCount > inputLimited) {
      alert('没有这样的号码。')
      return false
    } else {
      return true
    }
  }
  //產生定的所有可能結果
  const createAllPositionPossible = () => {
    allresult = []
    let allArr = []
    //二字定全部可能
    if (play === '7') {
      allArr = [numbers, numbers, ['X'], ['X']]
    }
    if (play === '7') {
      let allper = permutatorArray(allArr)
      allper.forEach(ele => {
        let per = permutator(ele.split(''))
        allresult = allresult.concat(per)
        //去除重複
        allresult = Array.from(new Set(allresult))
      })
    } else if (play === '23') {
      numbers.forEach(i => {
        numbers.forEach(j => {
          numbers.forEach(k => {
            numbers.forEach(l => {
              let newArr = `${i}${j}${k}${l}`
              allresult.push(newArr)
            })
          })
        })
      })
    } else if (play === '18') {
      numbersX.forEach(i => {
        numbersX.forEach(j => {
          if (i === 'X' && i === j) return
          numbersX.forEach(k => {
            if (i === 'X' && i === k) return
            if (j === 'X' && j === k) return
            numbersX.forEach(l => {
              if (i === 'X' && i === l) return
              if (j === 'X' && j === l) return
              if (k === 'X' && k === l) return
              if (l === 'X' && l === i) return
              let newArr = `${i}${j}${k}${l}`
              allresult.push(newArr)
            })
          })
        })
      })
      allresult = allresult.filter(ele => ele.indexOf('X') !== -1)
    }
  }

  //產生現的所有可能結果
  const createAllNotPositionPossible = () => {
    allresult = []
    if (play === '25') {
      numbers.forEach(i => {
        numbers.forEach(j => {
          if (Number(j) >= Number(i)) {
            allresult = allresult.concat([[i, j].join('')])
          }
        })
      })
    }
    if (play === '27') {
      numbers.forEach(i => {
        numbers.forEach(j => {
          numbers.forEach(k => {
            if (Number(k) >= Number(j) && Number(j) >= Number(i)) {
              allresult = allresult.concat([[i, j, k].join('')])
            }
          })
        })
      })
    }
    if (play === '29') {
      numbers.forEach(i => {
        numbers.forEach(j => {
          numbers.forEach(k => {
            numbers.forEach(l => {
              if (
                Number(l) >= Number(k) &&
                Number(k) >= Number(j) &&
                Number(j) >= Number(i)
              ) {
                allresult = allresult.concat([[i, j, k, l].join('')])
              }
            })
          })
        })
      })
    }
  }

  //配數全轉
  const generatePermutator = () => {
    let firstNum = allNumber1 ? allNumber1.split('') : []
    let secondNum = allNumber2 ? allNumber2.split('') : []
    let thirdNum = allNumber3 ? allNumber3.split('') : []
    let fourNum = allNumber4 ? allNumber4.split('') : []
    let result = []
    if (play === '7' || play === '18' || play === '23') {
      let newArr = []
      let newFirstNum = []
      if (firstNum.length === 0) {
        newFirstNum = numbers
      } else {
        newFirstNum = firstNum
      }
      let newSecondNum = []
      if (secondNum.length === 0) {
        newSecondNum = numbers
      } else {
        newSecondNum = secondNum
      }

      //二字定取
      if (play === '7') {
        newArr = [newFirstNum, newSecondNum, ['X'], ['X']]
      }
      //三字定取
      if (play === '18') {
        let newThirdNum = []
        if (thirdNum.length === 0) {
          newThirdNum = numbers
        } else {
          newThirdNum = thirdNum
        }
        newArr = [newFirstNum, newSecondNum, newThirdNum, ['X']]
      }
      //四字定取
      if (play === '23') {
        let newThirdNum = []
        if (thirdNum.length === 0) {
          newThirdNum = numbers
        } else {
          newThirdNum = thirdNum
        }
        let newFourNum = []
        if (fourNum.length === 0) {
          newFourNum = numbers
        } else {
          newFourNum = fourNum
        }
        newFirstNum.forEach(i => {
          newSecondNum.forEach(j => {
            newThirdNum.forEach(k => {
              newFourNum.forEach(l => {
                let newStr = `${i}${j}${k}${l}`
                if (result.includes(newStr)) {
                  return false
                }
                let per = permutator(newStr.split(''))
                result = result.concat(per)
                result = Array.from(new Set(result))
              })
            })
          })
        })
      }

      if (play !== '23') {
        let getper = permutatorArray(newArr)
        getper.forEach(ele => {
          let per = permutator(ele.split(''))
          result = result.concat(per)
          result = Array.from(new Set(result))
        })
      }

      //排除
      if (excludeInclude['first'] === 'allnumber-exclude') {
        //用所有的結果過濾出不是取的結果
        let excluderesult = allresult.filter(allrs => {
          return result.every(rs => {
            return rs !== allrs
          })
        })
        numberList = excluderesult
      } else {
        numberList = result
      }
    }

    // 二字現, 三字現, 四字現 配數
    if (play === '25' || play === '27' || play === '29') {
      let result = []
      let newArr = []
      let newFirstNum = []
      if (firstNum.length === 0) {
        newFirstNum = numbers
      } else {
        newFirstNum = firstNum
      }
      let newSecondNum = []
      if (secondNum.length === 0) {
        newSecondNum = numbers
      } else {
        newSecondNum = secondNum
      }
      newArr = [newFirstNum, newSecondNum]
      let per = permutatorArray(newArr)
      //重小到大排序
      per = per.map(ele => {
        return ele.split('').sort((a, b) => Number(a) - Number(b))
      })
      //二字現取
      if (play === '25') {
        result = allresult.filter(ele => {
          return per.some(p => {
            return p.join('') === ele
          })
        })
      }
      //三字現or四字現取
      if (play === '27' || play === '29') {
        let newThirdNum = []
        if (thirdNum.length === 0) {
          newThirdNum = numbers
        } else {
          newThirdNum = thirdNum
        }
        //三字現取
        if (play === '27') {
          newArr = [newFirstNum, newSecondNum, newThirdNum]
          let per = permutatorArray(newArr)
          //重小到大排序
          per = per.map(ele => {
            return ele.split('').sort((a, b) => Number(a) - Number(b))
          })
          result = allresult.filter(ele => {
            return per.some(p => {
              return p.join('') === ele
            })
          })
        }
        //四字現取
        if (play === '29') {
          let newFourNum = []
          if (fourNum.length === 0) {
            newFourNum = numbers
          } else {
            newFourNum = fourNum
          }
          newArr = [newFirstNum, newSecondNum, newThirdNum, newFourNum]
          let per = permutatorArray(newArr)
          //重小到大排序
          per = per.map(ele => {
            return ele.split('').sort((a, b) => Number(a) - Number(b))
          })
          result = allresult.filter(ele => {
            return per.some(p => {
              return p.join('') === ele
            })
          })
        }
      }

      //排除
      if (excludeInclude['number'] === 'exclude') {
        //用所有的結果過濾出不是取的結果
        let excluderesult = allresult.filter(allrs => {
          return result.every(rs => {
            return rs !== allrs
          })
        })
        numberList = excluderesult
      } else {
        numberList = result
      }
    }
  }

  const isIncludeX = () => {
    let result = inputArr.some(input => {
      let result = input.includes('X')
      return result
    })
    return result
  }
  //定位置
  const generateFixPosition = () => {
    if (play === '7' || play === '18') {
      //用所有的結果過濾出輸入條件的號碼
      let result = allresult.filter(ele => {
        let eleArr = ele.split('')
        let newthousand = []
        let newhundred = []
        let newten = []
        let newone = []
        if (thousand.length === 0) {
          newthousand = numbersX
        } else {
          newthousand = thousand
        }
        let matchtho = newthousand.some(tho => {
          return eleArr[0] === tho
        })
        if (hundred.length === 0) {
          newhundred = numbersX
        } else {
          newhundred = hundred
        }
        let matchhun = newhundred.some(hun => {
          return eleArr[1] === hun
        })
        if (ten.length === 0) {
          newten = numbersX
        } else {
          newten = ten
        }
        let matchten = newten.some(ten => {
          return eleArr[2] === ten
        })
        if (one.length === 0) {
          newone = numbersX
        } else {
          newone = one
        }
        let matchone = newone.some(one => {
          return eleArr[3] === one
        })
        return matchtho && matchhun && matchten && matchone
      })
      //排除
      if (excludeInclude['first'] === 'position-exclude') {
        //用所有的結果過濾出不是取的結果
        let excluderesult = allresult.filter(allrs => {
          return result.every(rs => {
            return rs !== allrs
          })
        })
        numberList = excluderesult
      } else {
        numberList = result
      }
    }
    //四字定
    if (play === '23') {
      //用所有的結果過濾出輸入條件的號碼
      let newthousand = []
      let newhundred = []
      let newten = []
      let newone = []

      if (thousand.length === 0) {
        newthousand = numbers
      } else {
        newthousand = thousand
      }

      if (hundred.length === 0) {
        newhundred = numbers
      } else {
        newhundred = hundred
      }

      if (ten.length === 0) {
        newten = numbers
      } else {
        newten = ten
      }

      if (one.length === 0) {
        newone = numbers
      } else {
        newone = one
      }
      let result = []
      newthousand.forEach(i => {
        newhundred.forEach(j => {
          newten.forEach(k => {
            newone.forEach(l => {
              let newArr = `${i}${j}${k}${l}`
              result.push(newArr)
            })
          })
        })
      })
      //排除
      if (excludeInclude['first'] === 'position-exclude') {
        //用所有的結果過濾出不是取的結果
        let excluderesult = allresult.filter(allrs => {
          return result.every(rs => {
            return rs !== allrs
          })
        })
        numberList = excluderesult
      } else {
        numberList = result
      }
    }
  }

  //合分
  const generateCombined = () => {
    let countCombinedInput = 0
    for (let combinedid = 1; combinedid <= 4; combinedid++) {
      let combinedList = []
      let variable = ''
      if (combinedid === 1) {
        variable = combinedNum1
      } else if (combinedid === 2) {
        variable = combinedNum2
      } else if (combinedid === 3) {
        variable = combinedNum3
      } else if (combinedid === 4) {
        variable = combinedNum4
      }
      if (
        variable &&
        (generateNumChecked[`combined-${combinedid}-1`] ||
          generateNumChecked[`combined-${combinedid}-2`] ||
          generateNumChecked[`combined-${combinedid}-3`] ||
          generateNumChecked[`combined-${combinedid}-4`])
      ) {
        let countCombinedChecked = 0
        if (generateNumChecked[`combined-${combinedid}-1`]) {
          countCombinedChecked++
        }
        if (generateNumChecked[`combined-${combinedid}-2`]) {
          countCombinedChecked++
        }
        if (generateNumChecked[`combined-${combinedid}-3`]) {
          countCombinedChecked++
        }
        if (generateNumChecked[`combined-${combinedid}-4`]) {
          countCombinedChecked++
        }
        let combinedNumArray = variable.split('')
        // 去除重複
        combinedNumArray = combinedNumArray.filter((element, index, arr) => {
          return arr.indexOf(element) === index
        })
        if (countCombinedChecked === 1) {
          //合分合計勾選一個checkbox
          countCombinedInput++
          for (let id = 1; id <= 4; id++) {
            if (generateNumChecked[`combined-${combinedid}-${id}`]) {
              combinedList = allresult.filter(ele => {
                return combinedNumArray.some(num => {
                  return ele[id - 1] === num
                })
              })
            }
          }
        } else if (countCombinedChecked === 2) {
          //合分合計勾選2個checkbox
          countCombinedInput++
          //勾選12,23,34
          for (let id = 1; id < 4; id++) {
            if (
              generateNumChecked[`combined-${combinedid}-${id}`] &&
              generateNumChecked[`combined-${combinedid}-${id + 1}`]
            ) {
              combinedList = allresult.filter(ele => {
                return combinedNumArray.some(num => {
                  return (
                    (Number(ele[id - 1]) + Number(ele[id])) % 10 === Number(num)
                  )
                })
              })
            }
          }
          //勾選13, 24
          for (let id = 1; id < 3; id++) {
            if (
              generateNumChecked[`combined-${combinedid}-${id}`] &&
              generateNumChecked[`combined-${combinedid}-${id + 2}`]
            ) {
              combinedList = allresult.filter(ele => {
                return combinedNumArray.some(num => {
                  return (
                    (Number(ele[id - 1]) + Number(ele[id + 1])) % 10 ===
                    Number(num)
                  )
                })
              })
            }
          }
          //勾選combinedid1 and 勾選combinedid14 checkbox
          if (
            generateNumChecked[`combined-${combinedid}-1`] &&
            generateNumChecked[`combined-${combinedid}-4`]
          ) {
            combinedList = allresult.filter(ele => {
              return combinedNumArray.some(num => {
                return (Number(ele[0]) + Number(ele[3])) % 10 === Number(num)
              })
            })
          }
        } else if (countCombinedChecked === 3) {
          //合分合計勾選3個checkbox
          countCombinedInput++
          if (play !== '7') {
            //三字定, 四字定
            //OOOX ,XOOO
            for (let id = 1; id <= 2; id++) {
              if (
                generateNumChecked[`combined-${combinedid}-${id}`] &&
                generateNumChecked[`combined-${combinedid}-${id + 1}`] &&
                generateNumChecked[`combined-${combinedid}-${id + 2}`]
              ) {
                combinedList = allresult.filter(ele => {
                  return combinedNumArray.some(num => {
                    return (
                      (Number(ele[id - 1]) +
                        Number(ele[id]) +
                        Number(ele[id + 1])) %
                        10 ===
                      Number(num)
                    )
                  })
                })
              }
            }
            //OOXO
            if (
              generateNumChecked[`combined-${combinedid}-1`] &&
              generateNumChecked[`combined-${combinedid}-2`] &&
              generateNumChecked[`combined-${combinedid}-4`]
            ) {
              combinedList = allresult.filter(ele => {
                return combinedNumArray.some(num => {
                  return (
                    (Number(ele[0]) + Number(ele[1]) + Number(ele[3])) % 10 ===
                    Number(num)
                  )
                })
              })
            }
            //OXOO
            if (
              generateNumChecked[`combined-${combinedid}-1`] &&
              generateNumChecked[`combined-${combinedid}-3`] &&
              generateNumChecked[`combined-${combinedid}-4`]
            ) {
              combinedList = allresult.filter(ele => {
                return combinedNumArray.some(num => {
                  return (
                    (Number(ele[0]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                    Number(num)
                  )
                })
              })
            }
          }
        } else if (countCombinedChecked === 4) {
          //合分合計勾選4個checkbox
          countCombinedInput++
          if (play === '23') {
            combinedList = allresult.filter(ele => {
              return combinedNumArray.some(num => {
                return (
                  (Number(ele[0]) +
                    Number(ele[1]) +
                    Number(ele[2]) +
                    Number(ele[3])) %
                    10 ===
                  Number(num)
                )
              })
            })
          }
        }
        if (countCombinedInput > 1) {
          // 合分輸入欄位輸入兩個以上 取交集
          combinedAllList = combinedAllList.filter(ele => {
            return combinedList.includes(ele)
          })
        } else {
          combinedAllList = combinedList
        }
      }
    }

    //除
    if (excludeInclude['combined'] === 'exclude') {
      //用所有的結果過濾出不是取的結果
      let excluderesult = allresult.filter(allrs => {
        return combinedAllList.every(rs => {
          return rs !== allrs
        })
      })
      combinedAllList = excluderesult
    }
  }
  //不定位合分兩數和
  const notPositionedTwoCombined = () => {
    if (play === '7' || play === '18' || play === '23') {
      positionCombinedList = allresult.filter(ele => {
        return positionCombinedInput.some(input => {
          return (
            (Number(ele[0]) + Number(ele[1])) % 10 === Number(input) ||
            (Number(ele[0]) + Number(ele[2])) % 10 === Number(input) ||
            (Number(ele[0]) + Number(ele[3])) % 10 === Number(input) ||
            (Number(ele[1]) + Number(ele[2])) % 10 === Number(input) ||
            (Number(ele[1]) + Number(ele[3])) % 10 === Number(input) ||
            (Number(ele[2]) + Number(ele[3])) % 10 === Number(input)
          )
        })
      })
    }
    // 二字現, 三字現, 四字現
    if (play === '25' || play === '27' || play === '29') {
      positionCombinedList = allresult.filter(ele => {
        if (play === '25') {
          return positionCombinedInput.some(input => {
            return (Number(ele[0]) + Number(ele[1])) % 10 === Number(input)
          })
        } else if (play === '27') {
          return positionCombinedInput.some(input => {
            return (
              (Number(ele[0]) + Number(ele[1])) % 10 === Number(input) ||
              (Number(ele[0]) + Number(ele[2])) % 10 === Number(input) ||
              (Number(ele[1]) + Number(ele[2])) % 10 === Number(input)
            )
          })
        } else if (play === '29') {
          return positionCombinedInput.some(input => {
            return (
              (Number(ele[0]) + Number(ele[1])) % 10 === Number(input) ||
              (Number(ele[0]) + Number(ele[2])) % 10 === Number(input) ||
              (Number(ele[0]) + Number(ele[3])) % 10 === Number(input) ||
              (Number(ele[1]) + Number(ele[2])) % 10 === Number(input) ||
              (Number(ele[1]) + Number(ele[3])) % 10 === Number(input) ||
              (Number(ele[2]) + Number(ele[3])) % 10 === Number(input)
            )
          })
        } else {
          return false
        }
      })
    }
  }

  //不定位合分三數和
  const notPositionedThreeCombined = () => {
    if (play === '18' || play === '23') {
      positionCombinedList = allresult.filter(ele => {
        return positionCombinedInput.some(input => {
          //三字定
          if (play === '18') {
            if (ele[0] === 'X') {
              return (
                (Number(ele[1]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input)
              )
            } else if (ele[1] === 'X') {
              return (
                (Number(ele[0]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input)
              )
            } else if (ele[2] === 'X') {
              return (
                (Number(ele[0]) + Number(ele[1]) + Number(ele[3])) % 10 ===
                Number(input)
              )
            } else if (ele[3] === 'X') {
              return (
                (Number(ele[0]) + Number(ele[1]) + Number(ele[2])) % 10 ===
                Number(input)
              )
            }
          } else if (play === '23') {
            return (
              (Number(ele[0]) + Number(ele[1]) + Number(ele[2])) % 10 ===
                Number(input) ||
              (Number(ele[0]) + Number(ele[1]) + Number(ele[3])) % 10 ===
                Number(input) ||
              (Number(ele[0]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input) ||
              (Number(ele[1]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input)
            )
          } else {
            return false
          }
        })
      })
    }
    // 三字現, 四字現
    if (play === '27' || play === '29') {
      positionCombinedList = allresult.filter(ele => {
        if (play === '27') {
          return positionCombinedInput.some(input => {
            return (
              (Number(ele[0]) + Number(ele[1]) + Number(ele[2])) % 10 ===
              Number(input)
            )
          })
        } else if (play === '29') {
          return positionCombinedInput.some(input => {
            return (
              (Number(ele[0]) + Number(ele[1]) + Number(ele[2])) % 10 ===
                Number(input) ||
              (Number(ele[0]) + Number(ele[1]) + Number(ele[3])) % 10 ===
                Number(input) ||
              (Number(ele[0]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input) ||
              (Number(ele[1]) + Number(ele[2]) + Number(ele[3])) % 10 ===
                Number(input)
            )
          })
        } else {
          return false
        }
      })
    }
  }
  //生成值範圍
  const generateValRange = () => {
    //四字定 加總每組生成結果的四個號碼, 是否在輸入的最小值和最大值之間
    if (play === '23' && startValueRangeInput >= 0 && endValueRangeInput >= 0) {
      let allArr = [numbers, numbers, numbers, numbers]
      let allResult = permutatorArray(allArr)
      valRangeList = allResult.filter(result => {
        let sumFourNum = result
          .split('')
          .reduce((accumulator, currentValue) => {
            return Number(accumulator) + Number(currentValue)
          })
        if (
          startValueRangeInput !== '' &&
          endValueRangeInput !== '' &&
          sumFourNum >= Number(startValueRangeInput) &&
          sumFourNum <= Number(endValueRangeInput)
        ) {
          return true
        } else {
          return false
        }
      })
    }
  }
  //生成全轉
  const generateSevenThAllResult = () => {
    let allArr = []
    let inputArr = sevenThGroupAll.split('')
    if (inputArr.length === 0) {
      return false
    }
    if (play === '7') {
      if (inputArr.length < 2) {
        return false
      }
    }
    if (play === '18') {
      if (inputArr.length < 3) {
        return false
      }
    }
    if (play === '23') {
      if (inputArr.length < 4) {
        return false
      }
    }
    if (play === '7' || play === '18' || play === '23') {
      //二字定
      if (play === '7') {
        allArr = [inputArr, inputArr, ['X'], ['X']]
      }
      //三字定
      if (play === '18') {
        allArr = [inputArr, inputArr, inputArr, ['X']]
      }
      //四字定
      if (play === '23') {
        allArr = [inputArr, inputArr, inputArr, inputArr]
      }

      //先產生二字定 or 三字定所有排列組合
      if (play === '7' || play === '18') {
        let allper = permutatorArray(allArr)
        allper.forEach(ele => {
          let per = permutator(ele.split(''))
          sevenThGroupAllList = sevenThGroupAllList.concat(per)
          //去除重複
          sevenThGroupAllList = Array.from(new Set(sevenThGroupAllList))
        })
      } else {
        //先產生四字定所有排列組合
        sevenThGroupAllList = permutatorArray(allArr)
      }
      sevenThGroupAllList = sevenThGroupAllList.filter(result => {
        let resultArr = result.split('')
        //去除陣列中的X資料
        resultArr = resultArr.filter(ele => {
          return ele !== 'X'
        })
        if (play === '7') {
          if (resultArr[0] === resultArr[1]) {
            return false
          } else {
            return true
          }
        } else if (play === '18') {
          if (
            resultArr[0] === resultArr[1] ||
            resultArr[1] === resultArr[2] ||
            resultArr[0] === resultArr[2]
          ) {
            return false
          } else {
            return true
          }
        } else if (play === '23') {
          if (
            resultArr[0] === resultArr[1] ||
            resultArr[0] === resultArr[2] ||
            resultArr[0] === resultArr[3] ||
            resultArr[1] === resultArr[2] ||
            resultArr[1] === resultArr[3] ||
            resultArr[2] === resultArr[3]
          ) {
            return false
          } else {
            return true
          }
        }
      })
    }
  }

  //生成上獎
  const generateSevenThAllIncludeResult = () => {
    if (play === '7' || play === '18' || play === '23') {
      let inputArr = sevenThGroupAllInclude.split('')
      if (inputArr.length === 0) {
        return false
      }
      let allArr = []
      //二字定
      if (play === '7') {
        // 全轉
        if (inputArr.length === 1) {
          allArr = [inputArr, numbers, ['X'], ['X']]
        } else if (inputArr.length > 1) {
          allArr = [inputArr, inputArr, ['X'], ['X']]
        }
      }
      //三字定
      if (play === '18') {
        // 全轉
        if (inputArr.length === 1) {
          allArr = [inputArr, numbers, numbers, ['X']]
        } else if (inputArr.length === 2) {
          allArr = [inputArr, inputArr, numbers, ['X']]
        } else if (inputArr.length > 2) {
          allArr = [inputArr, inputArr, inputArr, ['X']]
        }
      }
      //四字定
      if (play === '23') {
        // 全轉
        if (inputArr.length === 1) {
          allArr = [inputArr, numbers, numbers, numbers]
        } else if (inputArr.length === 2) {
          allArr = [inputArr, inputArr, numbers, numbers]
        } else if (inputArr.length === 3) {
          allArr = [inputArr, inputArr, inputArr, numbers]
        } else if (inputArr.length > 3) {
          allArr = [inputArr, inputArr, inputArr, inputArr]
        }
      }
      let allper = permutatorArray(allArr)
      allper.forEach(ele => {
        let per = permutator(ele.split(''))
        sevenThGroupAllIncludeList = sevenThGroupAllIncludeList.concat(per)
        //去除重複
        sevenThGroupAllIncludeList = Array.from(
          new Set(sevenThGroupAllIncludeList)
        )
      })
      sevenThGroupAllIncludeList = sevenThGroupAllIncludeList.filter(result => {
        let resultArr = result.split('')
        //去除陣列中的X資料
        resultArr = resultArr.filter(ele => {
          return ele !== 'X'
        })
        let isInclude = true
        if (play === '7' && inputArr.length <= 2) {
          //輸入的數字都必須在產生的數字結果中
          isInclude = inputArr.every(ele => {
            return resultArr.includes(ele)
          })
        }
        if (play === '18' && inputArr.length <= 3) {
          //輸入的數字都必須在產生的數字結果中
          isInclude = inputArr.every(ele => {
            return resultArr.includes(ele)
          })
        }
        if (play === '23' && inputArr.length <= 4) {
          //輸入的數字都必須在產生的數字結果中
          isInclude = inputArr.every(ele => {
            return resultArr.includes(ele)
          })
        }
        let isNotRepeat = false
        if (play === '7') {
          if (inputArr.length >= 2) {
            if (resultArr[0] === resultArr[1]) {
              isNotRepeat = false
            } else {
              isNotRepeat = true
            }
          } else {
            isNotRepeat = true
          }
        } else if (play === '18') {
          if (inputArr.length >= 3) {
            if (
              resultArr[0] === resultArr[1] ||
              resultArr[1] === resultArr[2] ||
              resultArr[0] === resultArr[2]
            ) {
              isNotRepeat = false
            } else {
              isNotRepeat = true
            }
          } else {
            isNotRepeat = true
          }
        } else if (play === '23') {
          if (inputArr.length >= 4) {
            if (
              resultArr[0] === resultArr[1] ||
              resultArr[0] === resultArr[2] ||
              resultArr[0] === resultArr[3] ||
              resultArr[1] === resultArr[2] ||
              resultArr[1] === resultArr[3] ||
              resultArr[2] === resultArr[3]
            ) {
              isNotRepeat = false
            } else {
              isNotRepeat = true
            }
          } else {
            isNotRepeat = true
          }
        }
        return isNotRepeat && isInclude
      })
    }
  }
  //生成排除
  const generateSevenThExcludeResult = () => {
    let inputArr = sevenThGroupExclude.split('')
    if (inputArr.length === 0) {
      return false
    }
    if (play === '7' || play === '18' || play === '23') {
      //所有排列組合排除inputArr
      sevenThGroupExcludeList = allresult.filter(result => {
        let resultArr = result.split('')
        return !inputArr.some(input => {
          return resultArr.includes(input)
        })
      })
    }
  }
  //生成乘號位置
  const generateMultiplicationResult = () => {
    if (mulCheckedCount === 0) {
      return false
    }
    if (play === '7' || play === '18') {
      multiplicationList = allresult.filter(result => {
        let resultArr = result.split('')
        let mulArray = [1, 2, 3, 4]
        return mulArray.every((ele, index) => {
          let isChecked = generateNumChecked[`multiplication-${ele}`]
          if (isChecked) {
            return resultArr[index] === 'X'
          } else {
            return true
          }
        })
      })
    }
  }

  //生成含
  const generateIncludeResult = () => {
    let inputArr = includeInput.split('')
    if (inputArr.length === 0) {
      return false
    }
    //產生取的結果
    let result = allresult.filter(result => {
      let resultArr = []
      if (Array.isArray(result)) {
        resultArr = result
      } else {
        resultArr = result.split('')
      }
      return inputArr.some(input => {
        return resultArr.includes(input)
      })
    })
    //排除
    if (excludeInclude['includeAndRepeat'] === 'exclude') {
      //用所有的結果過濾出不是取的結果
      let excluderesult = allresult.filter(allrs => {
        return result.every(rs => {
          return rs !== allrs
        })
      })
      includeList = excluderesult
    } else {
      includeList = result
    }
  }

  //生成複式
  const generateRepeatResult = () => {
    let inputArr = repeatInput.split('')
    let result = []
    if (inputArr.length === 0) {
      return false
    }
    if (play === '7' || play === '18' || play === '23') {
      let allArr = []
      if (play === '7') {
        allArr = [inputArr, inputArr, ['X'], ['X']]
      }
      if (play === '18') {
        allArr = [inputArr, inputArr, inputArr, ['X']]
      }
      if (play === '23') {
        allArr = [inputArr, inputArr, inputArr, inputArr]
      }

      if (play === '7' || play === '18') {
        let allper = permutatorArray(allArr)
        allper.forEach(ele => {
          let per = permutator(ele.split(''))
          result = result.concat(per)
          result = Array.from(new Set(result))
        })
      } else if (play === '23') {
        result = permutatorArray(allArr)
      }
    }
    if (play === '25' || play === '27' || play === '29') {
      let allArr = []
      if (play === '25') {
        allArr = [inputArr, inputArr]
      }
      if (play === '27') {
        allArr = [inputArr, inputArr, inputArr]
      }
      if (play === '29') {
        allArr = [inputArr, inputArr, inputArr, inputArr]
      }
      result = permutatorArray(allArr)

      result = allresult.filter(allrs => {
        return result.some(rs => {
          return rs === allrs
        })
      })
    }
    if (excludeInclude['includeAndRepeat'] === 'include') {
      repeatList = result
    }
    if (excludeInclude['includeAndRepeat'] === 'exclude') {
      let excluderesult = []
      //用所有的結果過濾出不是取的結果
      excluderesult = allresult.filter(allrs => {
        return result.every(rs => {
          return rs !== allrs
        })
      })
      repeatList = excluderesult
    }
  }

  // 雙重
  const generateTwoSame = () => {
    // 判斷是否為 二字定/二字現 雙重
    if (excludeInclude['same-2']) {
      const getMethod = excludeInclude['same-2']
      // 二字定 雙重
      if (play === '7') {
        // 判斷是否為 雙重 取
        if (getMethod === 'include') {
          twoSameList = allresult.filter(item => {
            const splitItem = item.split('')
            const filterItem = splitItem.filter(item1 => item1 !== 'X')
            return filterItem[0] === filterItem[1]
          })
        }

        // 判斷是否為 雙重 除
        if (getMethod === 'exclude') {
          const getIncludes = allresult.filter(item => {
            const splitItem = item.split('')
            const numberItem = splitItem.filter(item1 => item1 !== 'X')
            return numberItem[0] === numberItem[1]
          })

          const getExclude = allresult.filter(item => {
            return getIncludes.indexOf(item) === -1
          })

          twoSameList = getExclude
        }
      }
      // 二字現
      if (play === '25') {
        let getTwoSame = allresult.filter(item => {
          const splitItem = item.split('')
          return splitItem[0] === splitItem[1]
        })

        if (getMethod === 'include') {
          twoSameList = getTwoSame.filter(item => item !== 'XXXX')
        }

        if (getMethod === 'exclude') {
          const getExclude = allresult.filter(item => {
            return getTwoSame.indexOf(item) === -1
          })
          twoSameList = getExclude
        }
      }
    }

    // 判斷條件是否為 三字定/三字現 二重
    if (excludeInclude['same-3-2']) {
      const getMethod = excludeInclude['same-3-2']
      // 三字定 雙重
      if (play === '18') {
        const getThreeTwo = allresult.filter(item => {
          let splitItem = item.split('')
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          return (
            filterItem[0] === filterItem[1] ||
            filterItem[1] === filterItem[2] ||
            filterItem[0] === filterItem[2]
          )
        })

        if (getMethod === 'include') {
          twoSameList = getThreeTwo
        }

        if (getMethod === 'exclude') {
          twoSameList = allresult.filter(item => {
            return getThreeTwo.indexOf(item) === -1
          })
        }
      }

      // 三字現 雙重
      if (play === '27') {
        const getThreeOneTwo = allresult.filter(item => {
          let splitItem = item.split('')
          return (
            splitItem[0] === splitItem[1] ||
            splitItem[1] === splitItem[2] ||
            splitItem[0] === splitItem[2]
          )
        })

        if (getMethod === 'include') {
          twoSameList = getThreeOneTwo
        }

        if (getMethod === 'exclude') {
          twoSameList = allresult.filter(item => {
            return getThreeOneTwo.indexOf(item) === -1
          })
        }
      }
    }

    // 判斷條件是否為 四字定/四字現 二重
    if (excludeInclude['same-4-2'] || excludeInclude['same-4-1-2']) {
      const getFourOneTwo = allresult.filter(item => {
        let splitItem = item.split('')
        return (
          splitItem[0] === splitItem[1] ||
          splitItem[2] === splitItem[3] ||
          splitItem[1] === splitItem[2] ||
          splitItem[0] === splitItem[3] ||
          splitItem[0] === splitItem[2] ||
          splitItem[1] === splitItem[3]
        )
      })

      // 四字定 雙重
      if (play === '23') {
        const getMethod = excludeInclude['same-4-2']

        if (getMethod === 'include') {
          twoSameList = getFourOneTwo
        }

        if (getMethod === 'exclude') {
          twoSameList = allresult.filter(item => {
            return getFourOneTwo.indexOf(item) === -1
          })
        }
      }
      // 四字現 雙重
      if (play === '29') {
        const getMethod = excludeInclude['same-4-1-2']

        if (getMethod === 'include') {
          twoSameList = getFourOneTwo
        }

        if (getMethod === 'exclude') {
          twoSameList = allresult.filter(item => {
            return getFourOneTwo.indexOf(item) === -1
          })
        }
      }
    }
  }
  // 雙雙重
  const generateTwoTwoSame = () => {
    if (excludeInclude['same-4-2-2']) {
      const getMethod = excludeInclude['same-4-2-2']
      const getFourTwoTwo = allresult.filter(item => {
        let splitItem = item.split('')
        return (
          (splitItem[0] === splitItem[1] && splitItem[2] === splitItem[3]) ||
          (splitItem[0] === splitItem[2] && splitItem[1] === splitItem[3]) ||
          (splitItem[0] === splitItem[3] && splitItem[1] === splitItem[2])
        )
      })

      if (getMethod === 'include') {
        twoTwoSameList = getFourTwoTwo
      }

      if (getMethod === 'exclude') {
        twoTwoSameList = allresult.filter(item => {
          return getFourTwoTwo.indexOf(item) === -1
        })
      }
    }
  }

  // 三重
  const generateThreeSame = () => {
    // 三字定/三字現 三重
    if (excludeInclude['same-3-3']) {
      const getMethod = excludeInclude['same-3-3']

      if (play === '18') {
        const getThreeThree = allresult.filter(item => {
          let splitItem = item.split('')
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          return (
            filterItem[0] === filterItem[1] && filterItem[1] === filterItem[2]
          )
        })
        // 三字定 三重取
        if (getMethod === 'include') {
          threeSameList = getThreeThree
        }

        // 三字定 三重除
        if (getMethod === 'exclude') {
          threeSameList = allresult.filter(item => {
            return getThreeThree.indexOf(item) === -1
          })
        }
      }
      // 三字現 三重
      if (play === '27') {
        const getThreeOneThree = allresult.filter(item => {
          let splitItem = item.split('')
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          return (
            filterItem[0] === filterItem[1] && filterItem[1] === filterItem[2]
          )
        })
        // 三字現 取
        if (getMethod === 'include') {
          threeSameList = getThreeOneThree
        }
        // 三字現 除
        if (getMethod === 'exclude') {
          threeSameList = allresult.filter(item => {
            return getThreeOneThree.indexOf(item) === -1
          })
        }
      }
    }

    // 四字定 三重
    if (excludeInclude['same-4-3']) {
      const getMethod = excludeInclude['same-4-3']
      // 四字定
      if (play === '23') {
        const getFourThree = allresult.filter(item => {
          let splitItem = item.split('')
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          return (
            (filterItem[0] === filterItem[1] &&
              filterItem[1] === filterItem[2]) ||
            (filterItem[1] === filterItem[2] &&
              filterItem[2] === filterItem[3]) ||
            (filterItem[0] === filterItem[1] &&
              filterItem[1] === filterItem[3]) ||
            (filterItem[0] === filterItem[2] && filterItem[2] === filterItem[3])
          )
        })
        if (getMethod === 'include') {
          threeSameList = getFourThree
        }

        if (getMethod === 'exclude') {
          threeSameList = allresult.filter(item => {
            return getFourThree.indexOf(item) === -1
          })
        }
      }
    }

    // 四字現 三重
    if (excludeInclude['same-4-1-3']) {
      const getMethod = excludeInclude['same-4-1-3']
      // 四字現
      if (play === '29') {
        const getFourThree = allresult.filter(item => {
          let splitItem = item.split('')
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          return (
            (filterItem[0] === filterItem[1] &&
              filterItem[1] === filterItem[2]) ||
            (filterItem[1] === filterItem[2] &&
              filterItem[2] === filterItem[3]) ||
            (filterItem[0] === filterItem[1] &&
              filterItem[1] === filterItem[3]) ||
            (filterItem[0] === filterItem[2] && filterItem[2] === filterItem[3])
          )
        })
        if (getMethod === 'include') {
          threeSameList = getFourThree
        }

        if (getMethod === 'exclude') {
          threeSameList = allresult.filter(item => {
            return getFourThree.indexOf(item) === -1
          })
        }
      }
    }
  }

  // 四重
  const generateFourSame = () => {
    // 四字定 四重
    if (play === '23') {
      if (excludeInclude['same-4-4']) {
        const getMethod = excludeInclude['same-4-4']
        const getFourFour = allresult.filter(item => {
          let splitItem = item.split('')
          return (
            splitItem[0] === splitItem[1] &&
            splitItem[1] === splitItem[2] &&
            splitItem[2] === splitItem[3]
          )
        })

        if (getMethod === 'include') {
          fourSameList = getFourFour
        }

        if (getMethod === 'exclude') {
          fourSameList = allresult.filter(item => {
            return getFourFour.indexOf(item) === -1
          })
        }
      }
    }

    // 四字現 四重
    if (play === '29') {
      if (excludeInclude['same-4-1-4']) {
        const getMethod = excludeInclude['same-4-1-4']
        const getFourOneFour = allresult.filter(item => {
          let splitItem = item.split('')
          return (
            splitItem[0] === splitItem[1] &&
            splitItem[1] === splitItem[2] &&
            splitItem[2] === splitItem[3]
          )
        })

        if (getMethod === 'include') {
          fourSameList = getFourOneFour
        }

        if (getMethod === 'exclude') {
          fourSameList = allresult.filter(item => {
            return getFourOneFour.indexOf(item) === -1
          })
        }
      }
    }
  }
  //生成二兄弟
  const generateTwoBrother = () => {
    // 二字定/二字現 二兄弟
    if (excludeInclude['brother-2']) {
      const getMethod = excludeInclude['brother-2']
      const getTwoBrother = allresult.filter(item => {
        let splitItem = item.split('')
        let getNumOne = ''
        let getNumTwo = ''
        if (play === '7') {
          let filterItem = splitItem.filter(item1 => item1 !== 'X')
          getNumOne = Number(filterItem[0])
          getNumTwo = Number(filterItem[1])
        }

        if (play === '25') {
          getNumOne = Number(splitItem[0])
          getNumTwo = Number(splitItem[1])
        }

        if (
          (getNumOne === 0 && getNumTwo === 9) ||
          (getNumOne === 9 && getNumTwo === 0)
        ) {
          return true
        }

        if (getNumOne - getNumTwo === 1 || getNumOne - getNumTwo === -1) {
          return true
        }
        return false
      })

      // 二字定/二字現 二兄弟
      if (play === '7' || play === '25') {
        if (getMethod === 'include') {
          twoBrotherList = getTwoBrother
        }

        if (getMethod === 'exclude') {
          twoBrotherList = allresult.filter(item => {
            return getTwoBrother.indexOf(item) === -1
          })
        }
      }
    }

    // 三字定/三字現 二兄弟
    if (excludeInclude['brother-3-2']) {
      const getMethod = excludeInclude['brother-3-2']
      const getThreeTwoBrother = allresult
        .filter(item => {
          let splitItem = item.split('')
          let getNumOne = ''
          let getNumTwo = ''
          let getNumThree = ''

          if (play === '18') {
            let filterItem = splitItem.filter(item1 => item1 !== 'X')
            getNumOne = Number(filterItem[0])
            getNumTwo = Number(filterItem[1])
            getNumThree = Number(filterItem[2])
          }

          if (play === '27') {
            getNumOne = Number(splitItem[0])
            getNumTwo = Number(splitItem[1])
            getNumThree = Number(splitItem[2])
          }

          if (
            (getNumOne === 0 && getNumTwo === 9) ||
            (getNumOne === 9 && getNumTwo === 0) ||
            (getNumTwo === 0 && getNumThree == 9) ||
            (getNumTwo === 9 && getNumThree == 0) ||
            (getNumThree === 0 && getNumOne == 9) ||
            (getNumThree === 9 && getNumOne == 0)
          ) {
            return true
          }

          if (
            getNumOne - getNumTwo === 1 ||
            getNumOne - getNumTwo === -1 ||
            getNumTwo - getNumThree === 1 ||
            getNumTwo - getNumThree === -1 ||
            getNumThree - getNumOne === 1 ||
            getNumThree - getNumOne === -1
          ) {
            return true
          }
          return false
        })
        .filter(item => item.length > 0)

      // 三字定/三字現 二兄弟
      if (play === '18' || play === '27') {
        if (getMethod === 'include') {
          twoBrotherList = getThreeTwoBrother
        }

        if (getMethod === 'exclude') {
          twoBrotherList = allresult.filter(item => {
            return getThreeTwoBrother.indexOf(item) === -1
          })
        }
      }
    }

    // 四字定/四字現 二兄弟
    if (excludeInclude['brother-4-2']) {
      const getMethod = excludeInclude['brother-4-2']
      const getFourTwoBrother = allresult.filter(item => {
        let splitItem = item.split('')
        let getNumOne = Number(splitItem[0])
        let getNumTwo = Number(splitItem[1])
        let getNumThree = Number(splitItem[2])
        let getNumFour = Number(splitItem[3])

        if (
          (getNumOne === 0 && getNumTwo === 9) ||
          (getNumOne === 9 && getNumTwo === 0) ||
          (getNumTwo === 0 && getNumThree === 9) ||
          (getNumTwo === 9 && getNumThree === 0) ||
          (getNumThree === 0 && getNumFour === 9) ||
          (getNumThree === 9 && getNumFour === 0) ||
          (getNumFour === 0 && getNumOne === 9) ||
          (getNumFour === 9 && getNumOne === 0) ||
          (getNumOne === 9 && getNumThree === 0) ||
          (getNumOne === 0 && getNumThree === 9) ||
          (getNumTwo === 9 && getNumFour === 0) ||
          (getNumTwo === 0 && getNumFour === 9)
        ) {
          return true
        }

        if (
          getNumOne - getNumTwo === 1 ||
          getNumOne - getNumTwo === -1 ||
          getNumTwo - getNumThree === 1 ||
          getNumTwo - getNumThree === -1 ||
          getNumThree - getNumFour === 1 ||
          getNumThree - getNumFour === -1 ||
          getNumFour - getNumOne === 1 ||
          getNumFour - getNumOne === -1 ||
          getNumOne - getNumThree === 1 ||
          getNumOne - getNumThree === -1 ||
          getNumTwo - getNumFour === 1 ||
          getNumTwo - getNumFour === -1
        ) {
          return true
        }
        return false
      })

      // 四字定/四字現 二兄弟
      if (play === '23' || play === '29') {
        if (getMethod === 'include') {
          twoBrotherList = getFourTwoBrother
        }

        if (getMethod === 'exclude') {
          twoBrotherList = allresult.filter(item => {
            if (item === 'XXXX') return
            return getFourTwoBrother.indexOf(item) === -1
          })
        }
      }
    }
  }
  //生成三兄弟
  const generateThreeBrother = () => {
    // 三字定/三字現 三兄弟
    if (excludeInclude['brother-3-3']) {
      const getMethod = excludeInclude['brother-3-3']
      const getThreeBrother = allresult.filter(item => {
        let splitItem = item.split('')
        let getNumOne = ''
        let getNumTwo = ''
        let getNumThree = ''

        if (play === '18') {
          let filterItem = splitItem.filter(item1 => item1 !== 'X').sort()
          getNumOne = Number(filterItem[0])
          getNumTwo = Number(filterItem[1])
          getNumThree = Number(filterItem[2])
        }

        if (play === '27') {
          let sortItem = splitItem.sort()
          getNumOne = Number(sortItem[0])
          getNumTwo = Number(sortItem[1])
          getNumThree = Number(sortItem[2])
        }

        if (
          (splitItem.includes('9') &&
            splitItem.includes('0') &&
            splitItem.includes('1')) ||
          (splitItem.includes('8') &&
            splitItem.includes('0') &&
            splitItem.includes('9'))
        ) {
          return true
        }

        if (play === '18') {
        }

        if (
          (getNumOne - getNumTwo === 1 && getNumTwo - getNumThree === 1) ||
          (getNumOne - getNumTwo === -1 && getNumTwo - getNumThree === -1)
        ) {
          return true
        }
        return false
      })

      // 三字定/三字現 三兄弟
      if (play === '18' || play === '27') {
        if (getMethod === 'include') {
          threeBrotherList = getThreeBrother
        }

        if (getMethod === 'exclude') {
          threeBrotherList = allresult.filter(item => {
            return getThreeBrother.indexOf(item) === -1
          })
        }
      }
    }

    // 四字定/四字現 三兄弟
    if (excludeInclude['brother-4-3']) {
      const getMethod = excludeInclude['brother-4-3']
      const getFourThreeBrother = allresult.filter(item => {
        let splitItem = item.split('')
        let getNumOne = ''
        let getNumTwo = ''
        let getNumThree = ''
        let getNumFour = ''
        let filterItem = splitItem.sort()
        let newSetItem = [...new Set(filterItem)]

        if (newSetItem.length === 4) {
          getNumOne = Number(newSetItem[0])
          getNumTwo = Number(newSetItem[1])
          getNumThree = Number(newSetItem[2])
          getNumFour = Number(newSetItem[3])
        }

        if (newSetItem.length === 3) {
          getNumOne = Number(newSetItem[0])
          getNumTwo = Number(newSetItem[1])
          getNumThree = Number(newSetItem[2])
        }

        if (
          (splitItem.includes('9') &&
            splitItem.includes('0') &&
            splitItem.includes('1')) ||
          (splitItem.includes('8') &&
            splitItem.includes('0') &&
            splitItem.includes('9'))
        ) {
          return true
        }

        if (newSetItem.length === 4) {
          if (
            (getNumThree - getNumTwo === 1 && getNumTwo - getNumOne === 1) ||
            (getNumFour - getNumThree === 1 && getNumThree - getNumTwo === 1)
          ) {
            return true
          }
        }

        if (newSetItem.length === 3) {
          if (getNumThree - getNumTwo === 1 && getNumTwo - getNumOne === 1) {
            return true
          }
        }
        return false
      })

      // 四字定/四字現 三兄弟
      if (play === '23' || play === '29') {
        if (getMethod === 'include') {
          threeBrotherList = getFourThreeBrother
        }

        if (getMethod === 'exclude') {
          threeBrotherList = allresult.filter(item => {
            return getFourThreeBrother.indexOf(item) === -1
          })
        }
      }
    }
  }

  //生成四兄弟
  const generateFourBrother = () => {
    // 四字定/四字現 四兄弟
    if (excludeInclude['brother-4-4']) {
      const getMethod = excludeInclude['brother-4-4']
      const getFourFourBrother = allresult.filter(item => {
        let splitItem = item.split('')
        let getNumOne = ''
        let getNumTwo = ''
        let getNumThree = ''
        let getNumFour = ''
        let filterItem = splitItem.sort()
        getNumOne = Number(filterItem[0])
        getNumTwo = Number(filterItem[1])
        getNumThree = Number(filterItem[2])
        getNumFour = Number(filterItem[3])

        if (
          (splitItem.includes('7') &&
            splitItem.includes('8') &&
            splitItem.includes('9') &&
            splitItem.includes('0')) ||
          (splitItem.includes('8') &&
            splitItem.includes('9') &&
            splitItem.includes('0') &&
            splitItem.includes('1')) ||
          (splitItem.includes('9') &&
            splitItem.includes('0') &&
            splitItem.includes('1') &&
            splitItem.includes('2'))
        ) {
          return true
        }

        if (
          getNumFour - getNumThree === 1 &&
          getNumThree - getNumTwo === 1 &&
          getNumTwo - getNumOne === 1
        ) {
          return true
        }
        return false
      })

      // 四字定/四字現 四兄弟
      if (play === '23' || play === '29') {
        if (getMethod === 'include') {
          fourBrotherList = getFourFourBrother
        }

        if (getMethod === 'exclude') {
          fourBrotherList = allresult.filter(item => {
            return getFourFourBrother.indexOf(item) === -1
          })
        }
      }
    }
  }

  const createIncludeLogList = allresult => {
    let result = allresult.filter(result => {
      let log0 = ['0', '5']
      let isMatch0 = log0.every(ele => {
        return result.indexOf(ele) !== -1
      })
      let log1 = ['1', '6']
      let isMatch1 = log1.every(ele => {
        return result.indexOf(ele) !== -1
      })
      let log2 = ['2', '7']
      let isMatch2 = log2.every(ele => {
        return result.indexOf(ele) !== -1
      })
      let log3 = ['3', '8']
      let isMatch3 = log3.every(ele => {
        return result.indexOf(ele) !== -1
      })
      let log4 = ['4', '9']
      let isMatch4 = log4.every(ele => {
        return result.indexOf(ele) !== -1
      })
      return isMatch0 || isMatch1 || isMatch2 || isMatch3 || isMatch4
    })
    return result
  }

  const createLogNumInput = allresult => {
    if (logNum1Input.length > 1) {
      let logNum1InputArray = logNum1Input.split('')
      logList = allresult.filter(result => {
        return logNum1InputArray.every(ele => {
          return result.indexOf(ele) !== -1
        })
      })
    }
    if (logNum2Input.length > 1) {
      let logNum2InputArray = logNum2Input.split('')
      logList = logList.concat(
        allresult.filter(result => {
          return logNum2InputArray.every(ele => {
            return result.indexOf(ele) !== -1
          })
        })
      )
    }
    if (logNum3Input.length > 1) {
      let logNum3InputArray = logNum3Input.split('')
      logList = logList.concat(
        allresult.filter(result => {
          return logNum3InputArray.every(ele => {
            return result.indexOf(ele) !== -1
          })
        })
      )
    }
    //去除重複
    logList = Array.from(new Set(logList))
  }

  //生成對數
  const generateLogResult = () => {
    //取
    if (excludeInclude['log'] === 'include') {
      //定位置
      //兩數相差等於5
      if (logNum1Input === '' && logNum2Input === '' && logNum3Input === '') {
        logList = createIncludeLogList(allresult)
      } else {
        createLogNumInput(allresult)
      }
    }
    //排除
    if (excludeInclude['log'] === 'exclude') {
      if (logNum1Input === '' && logNum2Input === '' && logNum3Input === '') {
        logList = createIncludeLogList(allresult)
      } else {
        createLogNumInput(allresult)
      }
      logList = allresult.filter(result => {
        return logList.every(rs => {
          return rs !== result
        })
      })
    }
  }
  //生成單數
  const generateSingle = () => {
    if (singleCheckedCount < 1) {
      return false
    }
    let singleNumChecked = Object.keys(generateNumChecked).filter(item =>
      item.includes('single')
    )
    let methodAry = []
    let regex = ''
    let regexExclude = ''
    let regexX = '\\X'
    let regexSingle = `\\d*[13579]`
    let regexNum = `\\d`
    let getMethod = excludeInclude['single']
    // 二字定 三字定 四字定
    if (play === '7' || play === '18' || play === '23') {
      methodAry = [false, false, false, false]
    }
    // 二字現
    if (play === '25') {
      methodAry = [false, false]
    }
    // 三字現
    if (play === '27') {
      methodAry = [false, false, false]
    }
    // 四字現
    if (play === '29') {
      methodAry = [false, false, false, false]
    }
    // 檢查與組合 X 跟 numbers 的位子
    const getRule = singleNumChecked.filter(key => generateNumChecked[key])

    const formMethodAry = methodAry.map((item, idx) => {
      let hasX = false
      getRule.forEach(key => {
        if (key.includes(idx + 1)) {
          hasX = true
          return
        }
      })
      return hasX
    })

    let makeRegexIndex = formMethodAry.map(item => (item ? '1' : '0')).join('')

    if (play === '23') {
      makeRegexIndex = ['f', ...makeRegexIndex].join('')
    }

    if (play === '29') {
      makeRegexIndex = ['a', ...makeRegexIndex].join('')
    }

    switch (makeRegexIndex) {
      // 二字定
      case '1100':
        regex = new RegExp(`^${regexSingle}${regexSingle}${regexX}${regexX}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexX}${regexX}$`)
        break
      case '0011':
        regex = new RegExp(`^${regexX}${regexX}${regexSingle}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexX}${regexX}${regexNum}${regexNum}$`)
        break
      case '1001':
        regex = new RegExp(`^${regexSingle}${regexX}${regexX}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexX}${regexX}${regexNum}$`)
        break
      case '0110':
        regex = new RegExp(`^${regexX}${regexSingle}${regexSingle}${regexX}$`)
        regexExclude = new RegExp(`^${regexX}${regexNum}${regexNum}${regexX}$`)
        break
      case '0101':
        regex = new RegExp(`^${regexX}${regexSingle}${regexX}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexX}${regexNum}${regexX}${regexNum}$`)
        break
      case '1010':
        regex = new RegExp(`^${regexSingle}${regexX}${regexSingle}${regexX}$`)
        regexExclude = new RegExp(`^${regexNum}${regexX}${regexNum}${regexX}$`)
        break

      // 三字定
      case '1110':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexSingle}${regexX}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexX}$`
        )
        break
      case '1101':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexX}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexX}${regexNum}$`
        )
        break
      case '1011':
        regex = new RegExp(
          `^${regexSingle}${regexX}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexX}${regexNum}${regexNum}$`
        )
        break
      case '0111':
        regex = new RegExp(
          `^${regexX}${regexSingle}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexX}${regexNum}${regexNum}${regexNum}$`
        )
        break

      // 四字定/四字現
      case 'f1111':
      case 'a1111':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1110':
      case 'a1110':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexSingle}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0111':
      case 'a0111':
        regex = new RegExp(
          `^${regexNum}${regexSingle}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1011':
      case 'a1011':
        regex = new RegExp(
          `^${regexSingle}${regexNum}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1101':
      case 'a1101':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexNum}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1100':
      case 'a1100':
        regex = new RegExp(
          `^${regexSingle}${regexSingle}${regexNum}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0110':
      case 'a0110':
        regex = new RegExp(
          `^${regexNum}${regexSingle}${regexSingle}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0011':
      case 'a0011':
        regex = new RegExp(
          `^${regexNum}${regexNum}${regexSingle}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1010':
      case 'a1010':
        regex = new RegExp(
          `^${regexSingle}${regexNum}${regexSingle}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0101':
      case 'a0101':
        regex = new RegExp(
          `^${regexNum}${regexSingle}${regexNum}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1001':
      case 'a1001':
        regex = new RegExp(
          `^${regexSingle}${regexNum}${regexNum}${regexSingle}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1000':
      case 'a1000':
        regex = new RegExp(`^${regexSingle}${regexNum}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0100':
      case 'a0100':
        regex = new RegExp(`^${regexNum}${regexSingle}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0010':
      case 'a0010':
        regex = new RegExp(`^${regexNum}${regexNum}${regexSingle}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0001':
      case 'a0001':
        regex = new RegExp(`^${regexNum}${regexNum}${regexNum}${regexSingle}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      // 二字現
      case '11':
        regex = new RegExp(`^${regexSingle}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break
      case '10':
        regex = new RegExp(`^${regexSingle}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break
      case '01':
        regex = new RegExp(`^${regexNum}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break

      // 三字現
      case '111':
        regex = new RegExp(`^${regexSingle}${regexSingle}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '100':
        regex = new RegExp(`^${regexSingle}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '010':
        regex = new RegExp(`^${regexNum}${regexSingle}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '001':
        regex = new RegExp(`^${regexNum}${regexNum}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '110':
        regex = new RegExp(`^${regexSingle}${regexSingle}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '011':
        regex = new RegExp(`^${regexNum}${regexSingle}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '101':
        regex = new RegExp(`^${regexSingle}${regexNum}${regexSingle}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      default:
        break
    }

    if (getMethod === 'include') {
      singleList = allresult
        .map(item => (regex.test(item) ? item : ''))
        .filter(item => item.length > 0)
    }

    if (getMethod === 'exclude') {
      singleList = allresult
        .map(item =>
          regex.test(item) ? '' : regexExclude.test(item) ? item : ''
        )
        .filter(item => item.length > 0)
    }
  }
  //生成雙數
  const generateDouble = () => {
    if (doubleCheckedCount < 1) {
      return false
    }
    let doubleNumChecked = Object.keys(generateNumChecked).filter(item =>
      item.includes('double')
    )

    let methodAry = []
    let regex = ''
    let regexExclude = ''
    let regexX = '\\X'
    let regexDouble = `\\d*[02468]`
    let regexNum = `\\d`
    let getMethod = excludeInclude['double']

    // 二字定 三字定 四字定
    if (play === '7' || play === '18' || play === '23') {
      methodAry = [false, false, false, false]
    }
    // 二字現
    if (play === '25') {
      methodAry = [false, false]
    }
    // 三字現
    if (play === '27') {
      methodAry = [false, false, false]
    }
    // 四字現
    if (play === '29') {
      methodAry = [false, false, false, false]
    }

    // 檢查與組合 X 跟 numbers 的位子
    const getRule = doubleNumChecked.filter(key => generateNumChecked[key])

    const formMethodAry = methodAry.map((item, idx) => {
      let hasX = false
      getRule.forEach(key => {
        if (key.includes(idx + 1)) {
          hasX = true
          return
        }
      })
      return hasX
    })

    let makeRegexIndex = formMethodAry.map(item => (item ? '1' : '0')).join('')

    if (play === '23') {
      makeRegexIndex = ['f', ...makeRegexIndex].join('')
    }

    if (play === '29') {
      makeRegexIndex = ['a', ...makeRegexIndex].join('')
    }

    switch (makeRegexIndex) {
      // 二字定
      case '1100':
        regex = new RegExp(`^${regexDouble}${regexDouble}${regexX}${regexX}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexX}${regexX}$`)
        break
      case '0011':
        regex = new RegExp(`^${regexX}${regexX}${regexDouble}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexX}${regexX}${regexNum}${regexNum}$`)
        break
      case '1001':
        regex = new RegExp(`^${regexDouble}${regexX}${regexX}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexX}${regexX}${regexNum}$`)
        break
      case '0110':
        regex = new RegExp(`^${regexX}${regexDouble}${regexDouble}${regexX}$`)
        regexExclude = new RegExp(`^${regexX}${regexNum}${regexNum}${regexX}$`)
        break
      case '0101':
        regex = new RegExp(`^${regexX}${regexDouble}${regexX}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexX}${regexNum}${regexX}${regexNum}$`)
        break
      case '1010':
        regex = new RegExp(`^${regexDouble}${regexX}${regexDouble}${regexX}$`)
        regexExclude = new RegExp(`^${regexNum}${regexX}${regexNum}${regexX}$`)
        break

      // 三字定
      case '1110':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexDouble}${regexX}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexX}$`
        )
        break
      case '1101':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexX}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexX}${regexNum}$`
        )
        break
      case '1011':
        regex = new RegExp(
          `^${regexDouble}${regexX}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexX}${regexNum}${regexNum}$`
        )
        break
      case '0111':
        regex = new RegExp(
          `^${regexX}${regexDouble}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexX}${regexNum}${regexNum}${regexNum}$`
        )
        break

      // 四字定/四字現
      case 'f1111':
      case 'a1111':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1110':
      case 'a1110':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexDouble}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0111':
      case 'a0111':
        regex = new RegExp(
          `^${regexNum}${regexDouble}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1011':
      case 'a1011':
        regex = new RegExp(
          `^${regexDouble}${regexNum}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1101':
      case 'a1101':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexNum}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1100':
      case 'a1100':
        regex = new RegExp(
          `^${regexDouble}${regexDouble}${regexNum}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0110':
      case 'a0110':
        regex = new RegExp(
          `^${regexNum}${regexDouble}${regexDouble}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0011':
      case 'a0011':
        regex = new RegExp(
          `^${regexNum}${regexNum}${regexDouble}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1010':
      case 'a1010':
        regex = new RegExp(
          `^${regexDouble}${regexNum}${regexDouble}${regexNum}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0101':
      case 'a0101':
        regex = new RegExp(
          `^${regexNum}${regexDouble}${regexNum}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1001':
      case 'a1001':
        regex = new RegExp(
          `^${regexDouble}${regexNum}${regexNum}${regexDouble}$`
        )
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f1000':
      case 'a1000':
        regex = new RegExp(`^${regexDouble}${regexNum}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0100':
      case 'a0100':
        regex = new RegExp(`^${regexNum}${regexDouble}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0010':
      case 'a0010':
        regex = new RegExp(`^${regexNum}${regexNum}${regexDouble}${regexNum}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      case 'f0001':
      case 'a0001':
        regex = new RegExp(`^${regexNum}${regexNum}${regexNum}${regexDouble}$`)
        regexExclude = new RegExp(
          `^${regexNum}${regexNum}${regexNum}${regexNum}$`
        )
        break

      // 二字現
      case '11':
        regex = new RegExp(`^${regexDouble}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break
      case '10':
        regex = new RegExp(`^${regexDouble}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break
      case '01':
        regex = new RegExp(`^${regexNum}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}$`)
        break

      // 三字現
      case '111':
        regex = new RegExp(`^${regexDouble}${regexDouble}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '100':
        regex = new RegExp(`^${regexDouble}${regexNum}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '010':
        regex = new RegExp(`^${regexNum}${regexDouble}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '001':
        regex = new RegExp(`^${regexNum}${regexNum}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '110':
        regex = new RegExp(`^${regexDouble}${regexDouble}${regexNum}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '011':
        regex = new RegExp(`^${regexNum}${regexDouble}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break

      case '101':
        regex = new RegExp(`^${regexDouble}${regexNum}${regexDouble}$`)
        regexExclude = new RegExp(`^${regexNum}${regexNum}${regexNum}$`)
        break
      default:
        break
    }

    if (getMethod === 'include') {
      doubleList = allresult
        .map(item => (regex.test(item) ? item : ''))
        .filter(item => item.length > 0)
    }

    if (getMethod === 'exclude') {
      doubleList = allresult
        .map(item =>
          regex.test(item) ? '' : regexExclude.test(item) ? item : ''
        )
        .filter(item => item.length > 0)
    }
  }
  //取所有條件結果的交集
  const mixedResult = () => {
    let result = allresult
    //二字定 or 三字定 or 四字定
    if (play === '7' || play === '18' || play === '23') {
      //定位置or 配數全轉
      if (
        thousand.length === 0 &&
        hundred.length === 0 &&
        ten.length === 0 &&
        one.length === 0 &&
        !allNumber1 &&
        !allNumber2 &&
        !allNumber3 &&
        !allNumber4
      ) {
        numberList = allresult
      }

      //合分
      if (
        (!combinedNum1 ||
          (!generateNumChecked['combined-1-1'] &&
            !generateNumChecked['combined-1-2'] &&
            !generateNumChecked['combined-1-3'] &&
            !generateNumChecked['combined-1-4'])) &&
        (!combinedNum2 ||
          (!generateNumChecked['combined-2-1'] &&
            !generateNumChecked['combined-2-2'] &&
            !generateNumChecked['combined-2-3'] &&
            !generateNumChecked['combined-2-4'])) &&
        (!combinedNum3 ||
          (!generateNumChecked['combined-3-1'] &&
            !generateNumChecked['combined-3-2'] &&
            !generateNumChecked['combined-3-3'] &&
            !generateNumChecked['combined-3-4'])) &&
        (!combinedNum4 ||
          (!generateNumChecked['combined-4-1'] &&
            !generateNumChecked['combined-4-2'] &&
            !generateNumChecked['combined-4-3'] &&
            !generateNumChecked['combined-4-4']))
      ) {
        combinedAllList = allresult
      }

      //不定位合分兩數和 or 三數和
      if (positionCombinedInput.length === 0) {
        positionCombinedList = allresult
      }
      //四字定值範圍
      if (play === '23') {
        if (!startValueRangeInput && !endValueRangeInput) {
          valRangeList = allresult
        }
      }
      //全轉
      if (!sevenThGroupAll) {
        sevenThGroupAllList = allresult
      }
      //上獎
      if (!sevenThGroupAllInclude) {
        sevenThGroupAllIncludeList = allresult
      }
      //排除
      if (!sevenThGroupExclude) {
        sevenThGroupExcludeList = allresult
      }
      //乘號位置 二字定
      if (play === '7') {
        if (mulCheckedCount !== 2) {
          multiplicationList = allresult
        }
      }
      //乘號位置 三字定
      if (play === '18') {
        if (mulCheckedCount !== 1) {
          multiplicationList = allresult
        }
      }
      //含
      if (!includeInput) {
        includeList = allresult
      }
      //複式
      if (!repeatInput) {
        repeatList = allresult
      }

      //二字定雙重
      if (play === '7') {
        if (!excludeInclude['same-2']) {
          twoSameList = allresult
        }
      }
      //三字定雙重 三重
      if (play === '18') {
        if (!excludeInclude['same-3-2']) {
          twoSameList = allresult
        }
        if (!excludeInclude['same-3-3']) {
          threeSameList = allresult
        }
      }
      //四字定雙重,雙雙重,三重,四重
      if (play === '23') {
        if (!excludeInclude['same-4-2']) {
          twoSameList = allresult
        }
        if (!excludeInclude['same-4-2-2']) {
          twoTwoSameList = allresult
        }
        if (!excludeInclude['same-4-3']) {
          threeSameList = allresult
        }
        if (!excludeInclude['same-4-4']) {
          fourSameList = allresult
        }
      }
      //二字定二兄弟
      if (play === '7') {
        if (!excludeInclude['brother-2']) {
          twoBrotherList = allresult
        }
      }
      //三字定二兄弟,三兄弟
      if (play === '18') {
        if (!excludeInclude['brother-3-2']) {
          twoBrotherList = allresult
        }
        if (!excludeInclude['brother-3-3']) {
          threeBrotherList = allresult
        }
      }
      //四字定二兄弟,三兄弟,四兄弟
      if (play === '23') {
        if (!excludeInclude['brother-4-2']) {
          twoBrotherList = allresult
        }
        if (!excludeInclude['brother-4-3']) {
          threeBrotherList = allresult
        }
        if (!excludeInclude['brother-4-4']) {
          fourBrotherList = allresult
        }
      }
      // 對數
      if (
        !excludeInclude['log'] &&
        !logNum1Input &&
        !logNum2Input &&
        !logNum3Input
      ) {
        logList = allresult
      }

      //單
      if (
        !generateNumChecked['single-1'] &&
        !generateNumChecked['single-2'] &&
        !generateNumChecked['single-3'] &&
        !generateNumChecked['single-4']
      ) {
        singleList = allresult
      }

      //雙
      if (
        !generateNumChecked['double-1'] &&
        !generateNumChecked['double-2'] &&
        !generateNumChecked['double-3'] &&
        !generateNumChecked['double-4']
      ) {
        doubleList = allresult
      }

      //定位置or配數全轉 交集 合分
      if (combinedAllList.length !== allresult.length) {
        result = numberList.filter(num => {
          return combinedAllList.some(ele => {
            return ele === num
          })
        })
      } else {
        result = numberList
      }

      //上個結果交集不定位合分兩數和 or 三數和
      if (positionCombinedList.length !== allresult.length) {
        result = result.filter(rs => {
          return positionCombinedList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集值範圍
      if (play === '23') {
        if (valRangeList.length !== allresult.length) {
          result = result.filter(rs => {
            return valRangeList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集全轉
      if (sevenThGroupAllList.length !== allresult.length) {
        result = result.filter(rs => {
          return sevenThGroupAllList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集上獎
      if (sevenThGroupAllIncludeList.length !== allresult.length) {
        result = result.filter(rs => {
          return sevenThGroupAllIncludeList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集排除
      if (sevenThGroupExcludeList.length !== allresult.length) {
        result = result.filter(rs => {
          return sevenThGroupExcludeList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集乘號位置
      if (play === '7' || play === '18') {
        if (multiplicationList.length !== allresult.length) {
          result = result.filter(rs => {
            return multiplicationList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集含
      if (includeList.length !== allresult.length) {
        result = result.filter(rs => {
          return includeList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集複式
      if (repeatList.length !== allresult.length) {
        result = result.filter(rs => {
          return repeatList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集雙重
      if (twoSameList.length !== allresult.length) {
        result = result.filter(rs => {
          return twoSameList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集三重
      if (play === '18' || play === '23') {
        if (threeSameList.length !== allresult.length) {
          result = result.filter(rs => {
            return threeSameList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      if (play === '23') {
        //上個結果交集雙雙重
        if (twoTwoSameList.length !== allresult.length) {
          result = result.filter(rs => {
            return twoTwoSameList.some(ele => {
              return ele === rs
            })
          })
        }
        //上個結果交集四重
        if (fourSameList.length !== allresult.length) {
          result = result.filter(rs => {
            return fourSameList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集二兄弟
      if (twoBrotherList.length !== allresult.length) {
        result = result.filter(rs => {
          return twoBrotherList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集三兄弟
      if (play === '18' || play === '23') {
        if (threeBrotherList.length !== allresult.length) {
          result = result.filter(rs => {
            return threeBrotherList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集四兄弟
      if (play === '23') {
        if (fourBrotherList.length !== allresult.length) {
          result = result.filter(rs => {
            return fourBrotherList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集對數
      if (logList.length !== allresult.length) {
        result = result.filter(rs => {
          return logList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集單
      if (singleList.length !== allresult.length) {
        result = result.filter(rs => {
          return singleList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集雙
      if (doubleList.length !== allresult.length) {
        result = result.filter(rs => {
          return doubleList.some(ele => {
            return ele === rs
          })
        })
      }
    }
    //二字現 or 三字現 or 四字現
    if (play === '25' || play === '27' || play === '29') {
      //配數
      if (!allNumber1 && !allNumber2 && !allNumber3 && !allNumber4) {
        numberList = allresult
      }
      //不定位合分兩數和 or 三數和
      if (positionCombinedInput.length === 0) {
        positionCombinedList = allresult
      }
      //含
      if (!includeInput) {
        includeList = allresult
      }
      //複式
      if (!repeatInput) {
        repeatList = allresult
      }

      //二字現雙重
      if (play === '25') {
        if (!excludeInclude['same-2']) {
          twoSameList = allresult
        }
      }
      //三字現雙重 三重
      if (play === '27') {
        if (!excludeInclude['same-3-2']) {
          twoSameList = allresult
        }
        if (!excludeInclude['same-3-3']) {
          threeSameList = allresult
        }
      }

      //四字現雙重,三重,四重
      if (play === '29') {
        if (!excludeInclude['same-4-1-2']) {
          twoSameList = allresult
        }
        if (!excludeInclude['same-4-1-3']) {
          threeSameList = allresult
        }
        if (!excludeInclude['same-4-1-4']) {
          fourSameList = allresult
        }
      }

      //二字現二兄弟
      if (play === '25') {
        if (!excludeInclude['brother-2']) {
          twoBrotherList = allresult
        }
      }
      //三字現二兄弟,三兄弟
      if (play === '27') {
        if (!excludeInclude['brother-3-2']) {
          twoBrotherList = allresult
        }
        if (!excludeInclude['brother-3-3']) {
          threeBrotherList = allresult
        }
      }
      //四字現二三四兄弟
      if (play === '29') {
        if (!excludeInclude['brother-4-2']) {
          twoBrotherList = allresult
        }
        if (!excludeInclude['brother-4-3']) {
          threeBrotherList = allresult
        }
        if (!excludeInclude['brother-4-4']) {
          fourBrotherList = allresult
        }
      }
      // 對數
      if (
        !excludeInclude['log'] &&
        !logNum1Input &&
        !logNum2Input &&
        !logNum3Input
      ) {
        logList = allresult
      }

      if (play === '25') {
        if (
          !generateNumChecked['single-1'] &&
          !generateNumChecked['single-2']
        ) {
          singleList = allresult
        }
        if (
          !generateNumChecked['double-1'] &&
          !generateNumChecked['double-2']
        ) {
          doubleList = allresult
        }
      }
      if (play === '27') {
        if (
          !generateNumChecked['single-1'] &&
          !generateNumChecked['single-2'] &&
          !generateNumChecked['single-3']
        ) {
          singleList = allresult
        }
        if (
          !generateNumChecked['double-1'] &&
          !generateNumChecked['double-2'] &&
          !generateNumChecked['double-3']
        ) {
          doubleList = allresult
        }
      }
      if (play === '29') {
        if (
          !generateNumChecked['single-1'] &&
          !generateNumChecked['single-2'] &&
          !generateNumChecked['single-3'] &&
          !generateNumChecked['single-4']
        ) {
          singleList = allresult
        }

        if (
          !generateNumChecked['double-1'] &&
          !generateNumChecked['double-2'] &&
          !generateNumChecked['double-3'] &&
          !generateNumChecked['double-4']
        ) {
          doubleList = allresult
        }
      }

      result = numberList
      //配數交集不定位合分兩數和 or 三數和
      result = numberList.filter(rs => {
        return positionCombinedList.some(ele => {
          return ele === rs
        })
      })

      //上個結果交集含
      if (includeList.length !== allresult.length) {
        result = result.filter(rs => {
          return includeList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集複式
      if (repeatList.length !== allresult.length) {
        result = result.filter(rs => {
          return repeatList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集雙重
      if (twoSameList.length !== allresult.length) {
        result = result.filter(rs => {
          return twoSameList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集三重
      if (play === '27' || play === '29') {
        if (threeSameList.length !== allresult.length) {
          result = result.filter(rs => {
            return threeSameList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      if (play === '29') {
        //上個結果交集四重
        if (fourSameList.length !== allresult.length) {
          result = result.filter(rs => {
            return fourSameList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集二兄弟
      if (twoBrotherList.length !== allresult.length) {
        result = result.filter(rs => {
          return twoBrotherList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集三兄弟
      if (play === '27' || play === '29') {
        if (threeBrotherList.length !== allresult.length) {
          result = result.filter(rs => {
            return threeBrotherList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集四兄弟
      if (play === '29') {
        if (fourBrotherList.length !== allresult.length) {
          result = result.filter(rs => {
            return fourBrotherList.some(ele => {
              return ele === rs
            })
          })
        }
      }
      //上個結果交集對數
      if (logList.length !== allresult.length) {
        result = result.filter(rs => {
          return logList.some(ele => {
            return ele === rs
          })
        })
      }

      //上個結果交集單
      if (singleList.length !== allresult.length) {
        result = result.filter(rs => {
          return singleList.some(ele => {
            return ele === rs
          })
        })
      }
      //上個結果交集雙
      if (doubleList.length !== allresult.length) {
        result = result.filter(rs => {
          return doubleList.some(ele => {
            return ele === rs
          })
        })
      }
    }
    return result
  }

  return {
    init,
    validateInput,
    createAllPossible,
    setInputCount,
    setPlay,
    setThousand,
    setHundred,
    setTen,
    setOne,
    setExcludeInclude,
    setAllNumber1,
    setAllNumber2,
    setAllNumber3,
    setAllNumber4,
    getAllResult,
    setCombinedNum1,
    setCombinedNum2,
    setCombinedNum3,
    setCombinedNum4,
    setGenerateNumChecked,
    setStartValueRange,
    setEndValueRange,
    setSevenThGroupAll,
    setSevenThGroupAllInclude,
    setSevenThGroupExclude,
    setIncludeInput,
    setRepeatInput,
    setLogNum1Input,
    setLogNum2Input,
    setLogNum3Input,
    setAllresult,
    generatePermutator,
    generateFixPosition,
    generateCombined,
    setPositionCombinedInput,
    notPositionedTwoCombined,
    notPositionedThreeCombined,
    generateValRange,
    generateSevenThAllResult,
    generateSevenThAllIncludeResult,
    generateSevenThExcludeResult,
    generateMultiplicationResult,
    generateIncludeResult,
    generateRepeatResult,
    generateLogResult,
    generateTwoSame,
    generateTwoTwoSame,
    generateThreeSame,
    generateFourSame,
    generateTwoBrother,
    generateThreeBrother,
    generateFourBrother,
    generateSingle,
    generateDouble,
    mixedResult
  }
})()
