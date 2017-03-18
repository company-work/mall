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
      resultType: "",
      resultTxt: ""
    }
  }

  componentDidMount() {
    var self = this;
    var _n = self.getLocationParams("No");
    Axios.get(InterFace.getOrderStateUrl, {
        params: {
          tradeOrderNO: _n
        }
      })
      .then(function (res) {
        if (res.data.stat == "ok") {
          var data = res.data;
          self.state.resultType = data.statusMsg;
          self.state.resultTxt = data.failReason;
          self.setState(self.state)
        } else {
          APP.TOAST(res.data.msg, 1);
        }
      })
      .catch(function (error) {
        APP.TOAST(error, 1);
      });
  }

  render() {
    let self = this;
    let rTypeCls = "r-info ";// r-info-success , r-info-error , r-info-process
    return (
      <div className="payResult-warp">
        <Layout align="center" pack="center" className="r-info r-info-success">
          <Layout orient="column" className="r-info-inner">
            <div className="r-info-img"></div>
            <div className="r-info-name">{self.state.resultType}</div>
            <div className="r-info-txt">{self.state.resultTxt}</div>
          </Layout>
        </Layout>
        <Layout className="r-btn">
          <Layout align="center" pack="center" className="r-btn-inner">确定</Layout>
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






































