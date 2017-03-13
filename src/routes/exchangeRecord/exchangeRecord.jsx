'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import InterFace from '../../public/libs/interFace.js';
import InfiniteScroll from 'react-infinite-scroller';
import Axios from 'axios';
import Test from '../../test/mockTest.js';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './exchangeRecord.scss';
let domRoot = new Dom("page-exchange");


import APP from 'public/libs/APP';

window.countNum = 1;

//每个页面都作为一个组件
class ExchangeRecord extends React.Component {
  constructor() {
    super();
    this.state = {
      recordList: [],
      pageNum: 0,
      totalNum: 10,
      next: true
    }
  }

  componentDidMount() {
    var self = this;
    //self.updateData(1);
  }

  updateData(pageIndex) {
    var self = this;
    Test.initPointRecord();
    Axios.get(InterFace.initExchangeUrl)
      .then(function (res) {
        if (res.data.stat == 'ok') {
          var data = res.data;
          self.setState({
            next: data.next,
            pageNum: data.pageNum,
            totalNum: data.totalPages,
            recordList: data.orderSummaryInfos
          });
        } else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  loadFunc() {
    var self = this;
    self.updateData();
  }

  render() {
    let self = this, state = self.state;

    var recordHtm = [];
    if (state.recordList.length > 0) {
      state.recordList.map((item, index)=> {
        var gPrice = item.payRmb ? item.pointAmount + " + ￥" + item.payRmb : item.pointAmount;
        var discountHtm;
        switch (item.goodsType) {
          case "COUPON":
            discountHtm = <div className="r-other">
              <span>券码：</span>
              {item.traceVoucher}
            </div>;
            break;
          case "CHONGZHI":
            discountHtm = <div className="r-tel">手机号：{item.traceVoucher}</div>;
            break;
          default:
            discountHtm = <div></div>;
            break;
        }


        recordHtm.push(
          <div key={index} className="record-item">
            <div className="clearfix top-box">
              <div className="pull-left r-name">{item.itemTitle}</div>
              <div className="pull-right r-price icon-point">{gPrice}</div>
            </div>
            <div className="mid-box">
              {discountHtm}
            </div>
            <div className="clearfix bot-box">
              <div className="pull-left r-time">{item.gmtCreate}</div>
              <div className="pull-right r-state">{item.payStatus}</div>
            </div>
          </div>
        );
      })
    }

    return (
      <div className="exchange-warp">
        <InfiniteScroll
          pageStart={self.state.pageNum}
          loadMore={self.loadFunc.bind(self)}
          hasMore={self.state.next}
          loader={<div className="loader">Loading ...</div>}
          useWindow={false}>

          {recordHtm}

        </InfiniteScroll>
      </div>
    );
  }
}
;


ReactDOM.render(
  <ExchangeRecord />,
  domRoot.root()
);






































