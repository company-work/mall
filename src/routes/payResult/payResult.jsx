'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './payResult.scss';
let domRoot = new Dom("page-payResult");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class PayResult extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    let self = this;
    let rTypeCls = "r-info ";// r-info-success , r-info-error , r-info-process
    return (
      <div className="payResult-warp">
        <Layout align="center" pack="center" className="r-info r-info-success">
          <Layout orient="column" className="r-info-inner">
            <div className="r-info-img"></div>
            <div className="r-info-name">支付成功</div>
            <div className="r-info-txt">预计X个工作日内发货</div>
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






































