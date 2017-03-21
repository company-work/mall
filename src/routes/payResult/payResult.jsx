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
import './payResult.scss';
let domRoot = new Dom("page-payResult");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class PayResult extends React.Component {
  constructor() {
    super();
    this.state = {
      gType: "",
      resultType: "",
      resultTxt: ""
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
    var _n = self.getLocationParams("tid");
    var _gType = self.getLocationParams("type");

    self.setState({
      gType: _gType
    });

    Axios.get(InterFace.getOrderStateUrl, {
        params: {
          tradeOrderNO: _n
        }
      })
      .then(function (res) {
        if (res.data.stat == "ok") {

          var data = res.data;
          self.state.resultType = data.tradeStatus;
          self.state.resultTxt = data.statusMsg;
          self.setState(self.state)
        } else {

          APP.TOAST("服务器挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.TOAST(error, 1);
      });
  }

  JumpIndex() {
    APP.JUMP_TO("exchangeRecord.html");
  }

  render() {
    let self = this;

    let rTypeCls;// r-info-success , r-info-error , r-info-process
    let rTitle;
    switch (self.state.resultType) {
      case "SUCC":
        rTypeCls = "r-info r-info-success";
        rTitle = <div>支付成功</div>;

        /*  switch (self.state.gType) {
         case "ENTITY":
         self.setState({
         resultTxt:"兑换成功 预计5个工作日内发放"
         })
         break;
         case "COUPON":
         self.setState({
         resultTxt:"兑换成功 预计3个工作日内发放"
         })
         break;
         case "CHONGZHI":
         self.setState({
         resultTxt:"兑换成功 预计3个工作日内入账"
         });
         break;
         }*/

        break;

      case "PAY_IN":
        rTypeCls = "r-info r-info-process";
        rTitle = <div>系统处理中</div>;
        break;

      case "PAY_FAIL":
        rTypeCls = "r-info r-info-error";
        rTitle = <div>支付失败</div>;
        break;
    }


    return (
      <div className="payResult-warp">
        <Layout align="center" pack="center" className={rTypeCls}>
          <Layout orient="column" className="r-info-inner">
            <div className="r-info-img"></div>
            <div className="r-info-name">{rTitle}</div>
            <div className="r-info-txt">{self.state.resultTxt}</div>
          </Layout>
        </Layout>
        <Layout className="r-btn">
          <Layout align="center" pack="center" onClick={self.JumpIndex.bind(self)} className="r-btn-inner">确定</Layout>
        </Layout>
      </div>
    );
  }
}
;


ReactDOM.render(
  <PayResult />,
  domRoot.root()
);






































