'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import InterFace from 'public/libs/interFace.js';
import Axios from 'axios';
import Test from '../../test/mockTest.js';

import $ from 'zepto';

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
      formFlag: false,


      smsToken: "",
      quickPayNo: "",
      quickPayWay: ""
    }
  }


  /*--获取地址栏参数--*/
  getLocationParams(name) {
    var href = window.location.href,
      subIndex = href.indexOf("?"),
      paramsObj = {};
    if (subIndex != -1) {
      var params = href.substr(subIndex + 1);
      var paramsMany = params.indexOf("&");
      if (paramsMany != -1) {
        var paramsArr = params.split("&");
        paramsArr.forEach((item, index)=> {
          paramsObj[item.split("=")[0]] = item.split("=")[1];
        })
      } else {
        paramsObj[params.split("=")[0]] = params.split("=")[1];
      }
    }

    if (paramsObj.hasOwnProperty(name)) {
      return paramsObj[name];
    } else {
      return null
    }
  }

  componentDidMount() {
    var self = this;
    var oid = self.getLocationParams("oid");
    var tid = self.getLocationParams("tid");
    var pid = self.getLocationParams("pid");

    if (!oid || !tid || !pid) {

      APP.TOAST("参数错误", 2);
      return false;
    }

    Axios.get(InterFace.initQuickUrl, {
        params: {
          orderId: oid,
          tradeOrderNO: tid,
          channelApiId: pid
        }
      })
      .then(function (res) {
        var data = res.data;
        if (data.success) {
          self.state.point = data.pricePoint;
          self.state.money = data.unionRmb;
          self.state.tel = self.inputTelWhite(data.cell);
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

  inputTelWhite(val) {
    return val.replace(/[^\d]|^[^1]+/ig, "").replace(/(1\d{2})(\d{4})?(\d{4})?/ig, "$1 $2 $3").replace(/\s+$/ig, "").replace(/\s+/ig, " ");
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
    var oid = self.getLocationParams("oid");
    var tid = self.getLocationParams("tid");
    var pid = self.getLocationParams("pid");


    if (self.state.btnFlag) {
      self.setState({
        isGetCodeFlag: true
      });
      var cel = self.state.tel.replace(/\s/g, "");
      if (cel.length != 11) {
        APP.TOAST("手机号码格式不正确");
        return false;
      }

      APP.LOADING("正在发送...");

      Axios.get(InterFace.getVerifyCodeUrl, {
          params: {
            orderId: oid,
            tradeOrderNO: tid,
            channelApiId: pid,
            cell: cel
          }
        })
        .then(function (res) {
          var data = res.data;
          if (data.success) {
            APP.CLOSE_LOADING();
            APP.TOAST("发送成功", 1);

            self.setState({
              smsToken: data.smsToken,
              quickPayNo: data.quickPaySerialNo,
              quickPayWay: data.verifyWay
            });

            self.countDown();
          } else {
            APP.TOAST("发送失败", 2);
          }
        })
        .catch(function (error) {
          APP.TOAST(error, 1);
        });

    }

  }

  setVerifyCode(e) {
    var val = e.target.value, self = this;

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
      this.setState({
        formFlag: true
      });
      return false;
    }

    this.setState({
      code: val
    })
  }

  countDown() {
    let self = this;
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
    var self = this;
    var oid = self.getLocationParams("oid");
    var tid = self.getLocationParams("tid");
    var pid = self.getLocationParams("pid");
    var type = self.getLocationParams("type");
    if (self.state.formFlag) {

      $.ajax({
        url: InterFace.payOfRmb,
        type: "POST",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        data: {
          userId: "8201408060003261",
          tradeOrderNO: tid,
          orderId: oid,
          cell: self.state.tel.replace(/\s/g, ""),
          quickSerialNo: self.state.quickPayNo,
          smsToken: self.state.smsToken,
          validCode: self.state.code,
          //verifyWay: self.state.quickPayWay,
          verifyWay: "ONESELF",
          channelApiId: pid
        },
        beforeSend: function () {
          APP.LOADING("正在提交...");
        },
        success: function (res) {
          APP.CLOSE_LOADING();
          if (res.success) {
            APP.JUMP_TO("payResult.html?tid=" + tid + "&type=" + type)
          } else {
            APP.TOAST(res.message, 2);
          }
        },
        error: function (err) {
          APP.TOAST(err, 2);
        }
      });
    }
  }

  tipsInfo() {
    APP.ALERT("温馨提示", "银行预留的手机号码是办理该银行时所填写的手机号码。若您没有预留、手机号忘记或者已停用，请联系银行客服更新处理")
  }

  render() {
    let self = this;
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






































