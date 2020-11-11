import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  SubmissionError,
  formValueSelector,
  focus,
  blur,
  initialize,
} from "redux-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import {
  betNumMappingPlay,
  permutator,
  statusMapping,
  isNow,
  validateNumberAndDot,
  handleNextPage,
  handlePrevPage,
  handleJumpPage,
} from "../../util";
import Btn from "../../components/Btn/Btn";
import { StyledCheckbox, TextInput } from "../../components";
import Pagination from "../../components/Pagination";
import { getLotteryList, speedBet, showNotification } from "../../actions";

const useStyles = makeStyles((theme) => ({
  typeBlock: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
  },
  table: {
    minWidth: 700,
    "& th": {
      whiteSpace: "nowrap",
      "@media(max-width: 1299px)": {
        fontSize: "15px",
        padding: "5px 0px",
        letterSpacing: "-2px",
      },
    },
    "& td": {
      "@media(max-width: 1299px)": {
        fontSize: "15px",
        padding: "5px 0px",
        letterSpacing: "-2px",
      },
    },
  },
  button: {
    width: "124px",
    fontSize: "18px",
  },
  typographyMargin: {
    margin: "auto 10px",
  },
  paper: {
    borderRadius: "15px",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    overflowX: "auto",
  },
  redFont: {
    color: "red",
  },
  greenFont: {
    color: "green",
  },
  redBg: {
    backgroundColor: "#fef2de",
    color: "red !important",
    "& th": {
      color: "red !important",
    },
    "& td": {
      color: "red !important",
    },
  },
  yellowBg: {
    backgroundColor: "yellow",
  },
  smallScreenCount: {
    display: "inline-block",
    "& h6": {
      display: "inline-block",
    },
    "@media(max-width: 1299px)": {
      display: "block",
      width: "100%",
      marginTop: "20px",
    },
  },
  num_error: {
    "@media(max-width: 1299px)": {
      position: "absolute",
      bottom: "30px",
      left: "60px",
    },
  },
  betAmount_error: {
    "@media(max-width: 1299px)": {
      position: "absolute",
      bottom: "30px",
      left: "235px",
    },
  },
  mobileRow: {
    display: "flex",
    "@media(max-width: 768px)": {
      display: "inline-flex",
      marginBottom: "10px",
    },
  },
  pagination: {
    margin: "15px 5px",
  },
}));

const validate = (values) => {
  const errors = {};

  const regex = new RegExp("^[xX0-9]+$");

  if (!values.num) {
    errors.num = "请输入号码!";
  } else if (!regex.test(values.num)) {
    errors.num = "号码錯誤!";
  }

  if (!values.betAmount) {
    errors.betAmount = "请输入金额！";
  } else if (values.betAmount <= 0) {
    errors.betAmount = "金额小於或等於0!";
  } else if (values.betAmount.toString().split(".")[1]) {
    let length = values.betAmount.toString().split(".")[1].length;
    if (length > 1) {
      errors.betAmount = "金额不能超出小数点位数!";
    }
  }

  return errors;
};

const countVar = (num) => {
  let countX = 0,
    countNumber = 0;
  const regex = new RegExp("^[0-9]$");

  const numArray = num.split("");
  numArray.forEach((num) => {
    if (num === "X" || num === "x") {
      countX++;
    }
    if (regex.test(num)) {
      countNumber++;
    }
  });
  return { countX, countNumber };
};

const handleOnChangeValidateNum = (num) => {
  const { countX, countNumber } = countVar(num);
  if (num.length === 4 && countX >= 3) {
    return false;
  }

  //檢查是否有輸入數字
  if (countNumber === 0) {
    return false;
  }
  // 輸入1-3個字元
  if (num.length >= 1 && num.length <= 3) {
    //檢查只輸入1個字元
    if (num.length === 1) {
      return false;
    } else {
      if (countX > 0) {
        return false;
      }
    }
  }

  return true;
};

let HomePage = (props) => {
  const classes = useStyles();
  const {
    error,
    handleSubmit,
    pristine,
    submitting,
    formInit,
    lotteryListIsLoading,
    betDetailData,
    number,
    getLotteryList,
    speedBet,
  } = props;
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quickTypeCategory, setQuickTypeCategory] = useState("A"); // A=預設, B=四字線, C=全轉
  const [isAll, setIsAll] = useState(false); //下注明細是否全選 true=是
  const [betDetailListChecked, setBetDetailListChecked] = useState({});
  const [numberLength, setNumberLength] = useState(4);
  const [isFiveLength, setIsFiveLength] = useState(false);

  useEffect(() => {
    formInit("QuickType");
    setIsFiveLength(false);
    setBetDetailListChecked({});
    getLotteryList({
      page,
      limit: rowsPerPage,
    });
  }, []);

  const handleQuickTypeCategoryChange = (event) => {
    const type = event.target.value;
    setQuickTypeCategory(type);

    if (
      number &&
      number.length > 2 &&
      handleOnChangeValidateNum(number)
    ) {
      const { lotteryTypeId } = betNumMappingPlay(number, type);
    }
  };

  const validateNumberFormat = (num) => {
    const { countX, countNumber } = countVar(num);
    //檢查是否出現3次以上X 非高頻彩排除一字定OXXX, XOXX, XXOX, XXXO
    if (num.length === 4 && countX >= 3) {
      throw new SubmissionError({
        _error: "号码出错，没有定位号码！",
      });
    }
    //檢查是否有輸入數字
    if (countNumber === 0) {
      throw new SubmissionError({
        _error: "号码出错，没有定位号码！",
      });
    }
    // 輸入1-3個數字
    if (num.length >= 1 && num.length <= 3) {
      //檢查只輸入1個數字
      if (num.length === 1) {
        throw new SubmissionError({
          _error: "请输入正确号码，如果无号码位置请用X代替！",
        });
      } else {
        if (countX > 0) {
          throw new SubmissionError({
            _error: "请输入正确号码，如果无号码位置请用X代替！",
          });
        }
      }
    }
  };

  const handleCheckedAllChange = (event) => {
    const checked = event.target.checked;
    setIsAll(checked);
    let newBetDetailList = betDetailData.list
      .filter((number) => number.status !== "4")
      .map((number) => {
        return { id: number.id, checked };
      });
    let sumObj = {};
    newBetDetailList.forEach((number) => {
      let sourceObj = { [number.id]: number.checked };
      sumObj = Object.assign(sumObj, sourceObj);
    });
    setBetDetailListChecked({ ...sumObj });
  };

  const handleCheckedChange = (id) => (event) => {
    let sourceObj = { [id]: event.target.checked };
    setBetDetailListChecked({ ...betDetailListChecked, ...sourceObj });
  };

  const submit = (values) => {
    const num = values.num;
    validateNumberFormat(num);

    const betAmount = values.betAmount;

    if (betAmount <= 0) {
      throw new SubmissionError({
        _error: "金额小於或等於0",
      });
    }

    let numberArray = [];
    let betAmountArray = [];

    if (quickTypeCategory === "C" && num.length >= 4) {
      //全轉
      let numArray = num.split("");
      //1234, 123X, 4個號碼產生4! = 24種排列組合...
      //12XX , 4個號碼,2個重複號碼產生 4!/2! 種排列組合
      numberArray = permutator(numArray);

      numberArray = numberArray
        .map((num) => {
          const { countX } = countVar(num);
          //號碼長度為五位時
          if (num.length === 5) {
            //一字定或二五定, 回傳原本號碼
            if (countX === 4 || countX === 3) {
              return num;
            } else {
              //其餘一律移除最後一碼
              return num.slice(0, 4);
            }
          } else {
            return num;
          }
        })
        .filter((num) => {
          const { countX } = countVar(num);
          // 過濾掉號碼最後一碼為 X
          if (num.length === 5 && countX === 3 && num[4] === "X") {
            return false;
          } else {
            return true;
          }
        });

      numberArray.forEach((number) => {
        betAmountArray.push(betAmount);
      });
      speedBet({
        betAmount: betAmountArray,
        num: numberArray,
      });
    } else {
      numberArray.push(num);
      betAmountArray.push(betAmount);
      speedBet({
        betAmount: betAmountArray,
        num: numberArray,
      });
    }
    formInit("QuickType");
  };

  const BetListTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#243337",
      color: theme.palette.common.white,
      fontSize: "18px",
    },
    body: {
      fontSize: "18px",
    },
  }))(TableCell);

  const BetListTableRow = withStyles((theme) => ({
    hover: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#fef2de",
      },
    },
  }))((props) => <TableRow classes={{ hover: props.hover }} {...props} />);

  const QuickTypeGroup = () => (
    <RadioGroup
      aria-label="type"
      name="quickTypeGroup"
      value={quickTypeCategory}
      onChange={handleQuickTypeCategoryChange}
      row
    >
      <FormControlLabel
        value="A"
        control={<Radio color="primary" />}
        label="預設"
        labelPlacement="end"
      />
      <FormControlLabel
        value="C"
        control={<Radio color="primary" />}
        label="全转"
        labelPlacement="end"
      />
    </RadioGroup>
  );

  return (
    <Fragment>
      {lotteryListIsLoading && (
        <Box
          component="div"
          textAlign="center"
          fontWeight="fontWeightBold"
          color="text.secondary"
        >
          <img src="/images/loading.svg" alt="loading" />
        </Box>
      )}
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="betlist">
          <TableHead>
            <TableRow>
              <BetListTableCell align="center">注单编号</BetListTableCell>
              <BetListTableCell align="center">号码</BetListTableCell>
              <BetListTableCell align="center">金额</BetListTableCell>
              <BetListTableCell align="center">状态</BetListTableCell>
              <BetListTableCell align="center">
                {
                  <Fragment>
                    <FormControlLabel
                      value={isAll}
                      control={
                        <StyledCheckbox
                          checked={isAll}
                          onChange={handleCheckedAllChange}
                        />
                      }
                      label="全选"
                    />
                  </Fragment>
                }
              </BetListTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betDetailData &&
              Array.isArray(betDetailData.list) &&
              betDetailData.list.map((row, index) => (
                <BetListTableRow key={`${row.orderId}_${index}`}>
                  <BetListTableCell align="center">
                    {row.orderId}
                  </BetListTableCell>
                  <BetListTableCell
                    align="center"
                    className={classes.greenFont}
                  >
                    {isNow(row.lotteryTypeId) ? (
                      <Fragment>
                        <span>{row.num}</span>
                        <span className={classes.redFont}>{`现`}</span>
                      </Fragment>
                    ) : (
                      row.num
                    )}
                  </BetListTableCell>
                  <BetListTableCell align="center">
                    {row.betAmount}
                  </BetListTableCell>
                  <BetListTableCell align="center">
                    {statusMapping(row.status)}
                  </BetListTableCell>
                  <BetListTableCell align="center">
                    {row.status === "4" ? (
                      "--"
                    ) : (
                      <StyledCheckbox
                        checked={betDetailListChecked[row.id] || false}
                        onChange={handleCheckedChange(row.id)}
                      />
                    )}
                  </BetListTableCell>
                </BetListTableRow>
              ))}
          </TableBody>
        </Table>
        <div className={classes.pagination}>
          <Pagination
            action={getLotteryList}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            dataLength={
              betDetailData && betDetailData.list.length > 0
                ? betDetailData.totalCount
                : 0
            }
            rowsPerPage={rowsPerPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handleJumpPage={handleJumpPage}
            other={{}}
            setIsAll={setIsAll}
          />
        </div>
      </Paper>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(submit)}>
            <FormGroup row>
              <FormLabel component="label">类型：</FormLabel>
              <QuickTypeGroup />
            </FormGroup>
            <div className={classes.typeBlock}>
              <div className={classes.mobileRow}>
                <Field
                  name="num"
                  component={TextInput}
                  type="text"
                  id="num"
                  label="号码:"
                  maxLength={numberLength}
                  width="80px"
                  margin="8px"
                  toUpperCase
                  style={classes.num_error}
                />
                {quickTypeCategory === "B" && (
                  <Typography
                    variant="h6"
                    color="error"
                    className={classes.typographyMargin}
                  >
                    现
                  </Typography>
                )}
              </div>
              <div className={classes.mobileRow}>
                <Field
                  name="betAmount"
                  component={TextInput}
                  type="text"
                  id="betAmount"
                  label="金额:"
                  maxLength={8}
                  width="100px"
                  margin="8px"
                  onKeyPress={validateNumberAndDot}
                  setFocus={(input) => input.focus()}
                  style={classes.betAmount_error}
                />
              </div>
              <Btn
                type="submit"
                variant="contained"
                btnText="确认下注"
                customStyle={`${classes.button}`}
                disabled={pristine || submitting}
              />
            </div>
            {error && (
              <Typography variant="h6" color="error">
                {error}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Fragment>
  );
};
const selector = formValueSelector("QuickType");
const mapStateToProps = (state, props) => {
  return {
    betDetailData: state.lotteryList.data && state.lotteryList.data,
    number: selector(state, "num"),
  };
};

const mapDispatchToProps = {
  getLotteryList,
  speedBet,
  formInit: initialize,
  formFocus: focus,
  formBlur: blur,
  showNotification,
};

HomePage = reduxForm({
  form: "QuickType",
  validate,
})(HomePage);

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
