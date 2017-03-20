'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import InterFace from 'public/libs/interFace.js';
import Axios from 'axios';
import Test from '../../test/mockTest.js';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './quickPay.scss';

let domRoot = new Dom("page-quickPay");


import APP from 'public/libs/APP';
window.vTimeOut = null;
//每个页面都作为一个组件
class QuickPay extends React.Component {
  constructor() {
    super();
    this.state = {
      vTimeout: 60,
      isGetCodeFlag: false,
      codeBtnTxt: "验证码",
      alertTxt: "",
      btnFlag: true,
      point: "",
      money: "",
      count: "",
      tel: "12141",
      code: "",
      formFlag: false
    }
  }

  componentDidMount() {
    var self = this;

    Axios.get(InterFace.initQuickUrl, {
        params: {
          orderId: 91150,
          tradeOrderNO: "66082017031700918567",
          channelApiId: 382
        }
      })
      .then(function (res) {
        var data = res.data;
        console.log(data);
        if (data.success) {
          self.state.point = data.pricePoint;
          self.state.money = data.unionRmb;
          self.state.tel = data.cell;
          self.state.alertTxt = data.cellNote;

          var payTools = data.payTools;
          payTools.forEach((item, index)=> {
            if (item.fundBillType == "CARD") {
              self.state.count = item.toolName + "(尾号" + item.toolNo + ")";
            }
          });

          self.setState(self.state);

        }
      })
      .catch(function (error) {

        APP.TOAST(error, 1);
      });
  }

  isTel(num) {
    let s = num;
    if (s != null) {
      var r, re;
      re = /^[1][2-9]\d{9}$/g;
      r = re.test(s);
      return r;
    }
    return false;
  }

  setTelNum(e) {
    var val = e.target.value;
    e.target.value = val.replace(/[^\d]|^[^1]+/ig, "").replace(/(1\d{2})(\d{4})?(\d{4})?/ig, "$1 $2 $3").replace(/\s+$/ig, "").replace(/\s+/ig, " ");


    if (val.length == 13 && this.state.code.length == 6) {
      if (this.state.isGetCodeFlag) {
        this.setState({
          formFlag: true
        })
      }

    }
    else {
      this.setState({
        formFlag: false
      })
    }


    this.setState({
      tel: e.target.value
    })
  }

  getVerifyHandler() {
    var self = this;
    if (self.state.btnFlag) {
      self.setState({
        isGetCodeFlag: true
      });
      self.countDown();
      console.log("click");
    }

  }

  setVerifyCode(e) {
    var val = e.target.value;
    if (val.length == 6 && this.state.tel.length == 13) {
      if (this.state.isGetCodeFlag) {
        this.setState({
          formFlag: true
        })
      }
    } else {
      this.setState({
        formFlag: false
      })
    }
    if (val.length > 6) {
      return false;
    }
    this.setState({
      code: val
    })
  }

  countDown() {

    let self = this;
    console.log(self);
    let oTime = self.state.vTimeout;
    if (oTime == 0) {
      self.setState({
        vTimeout: 60,
        btnFlag: true,
        codeBtnTxt: "获取验证码"
      });
      if (document.querySelector("#codeBtn")) {
        //document.querySelector("#codeBtn").innerText = "获取验证码";
      }
      return false;
    } else {
      if (document.querySelector("#codeBtn")) {
        //document.querySelector("#codeBtn").innerText = "倒计时" + oTime + "s";
      }
      // self._verifyBtn.innerText = "倒计时" + oTime + "s";
      let nTime = --oTime;
      self.setState({
        codeBtnTxt: "(" + oTime + ")重新获取",
        vTimeout: nTime,
        btnFlag: false
      });
    }
    if (window.vTimeOut) clearTimeout(window.vTimeOut);
    window.vTimeOut = setTimeout(function () {
      self.countDown();
    }, 1000)
  }

  submitForm() {
    if (this.state.formFlag) {
      APP.JUMP_TO("payResult.html");
    }
  }

  tipsInfo() {
    APP.ALERT("温馨提示", "银行预留的手机号码是办理该银行时所填写的手机号码。若您没有预留、手机号忘记或者已停用，请联系银行客服更新处理")
  }

  render() {
    let self = this;

    console.log(self.state);

    let codBtnClass = this.state.btnFlag ? 'pay-code-btn' : 'pay-code-btn disabled';

    let btnClass = this.state.formFlag ? 'pay-btn' : 'pay-btn disabled';

    return (
      <div className="quickPay-warp">
        <Layout orient="column" className="pay-info">
          <Layout align="center" className="pay-info-t" flex>支付金额</Layout>
          <Layout flex align="center">
            <Layout flex>积分</Layout>
            <Layout className="icon-point-grey">{self.state.point}</Layout>
          </Layout>
          <Layout flex align="center">
            <Layout flex>{self.state.count}</Layout>
            <Layout>￥{self.state.money}</Layout>
          </Layout>
        </Layout>
        <div className="pay-tel">
          <Layout align="center" className="layout-input">
            <Layout className="l-i-t">手机号</Layout>
            <Layout flex>
              <input type="tel" pattern="[0-9]*" onChange={self.setTelNum.bind(self)} value={self.state.tel}
                     maxLength="13"/>
            </Layout>
            <div onClick={self.tipsInfo.bind(self)} className="l-i-i"></div>
          </Layout>
        </div>
        <Layout align="center" className="pay-tel-tips">手机号码须为银行预留手机号</Layout>

        <Layout className="pay-code">
          <Layout flex align="center" className="layout-input">
            <Layout className="l-i-t">验证码</Layout>
            <Layout flex>
              <input type="text" onChange={self.setVerifyCode.bind(self)} value={self.state.code} pattern="[0-9]*"/>
            </Layout>
          </Layout>
          <Layout pack="center" id="codeBtn" onClick={self.getVerifyHandler.bind(self)} align="center"
                  refs={(el)=>self._verifyBtn=el} className={codBtnClass}>{this.state.codeBtnTxt}</Layout>
        </Layout>
        <Layout pack="center" align="center" onClick={self.submitForm.bind(self)} className={btnClass}>确定</Layout>
      </div>
    );
  }
}
;


ReactDOM.render(
  <QuickPay />,
  domRoot.root()
);






































