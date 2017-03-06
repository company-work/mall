'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './order.scss';
let domRoot = new Dom("page-order");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class Order extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    console.log("页面渲染完成");
  }


  render() {
    let self = this;
    return (
      <div className="order-warp">
        <Layout orient="row" className="o-address">
          <Layout className="o-a-left" flex align="center">登录完善详细收货地址</Layout>
          <Layout className="o-a-right" align="center"><i className="iconfont icon-right"></i></Layout>
        </Layout>
        <Layout orient="row" className="o-address-active">

        </Layout>
        <div className="o-content mt20">
          <Layout className="o-goods">
            <Layout pack="center" align="center" className="o-g-img">
              <img src={require('../../public/imgs/test/6.jpg')}/>
            </Layout>
            <Layout flex align="center" className="o-g-info">
              <div className="g-info">
                <div className="g-name">日式多功能晶振</div>
                <div className="g-types">
                  <span>颜色：<b>白色</b></span>
                  <span>型号：<b>2-1200</b></span>
                </div>
                <div className="g-price">10000</div>
              </div>
            </Layout>
          </Layout>
          <Layout align="center" className="o-nums">
            <Layout className="o-nums-left">购买数量</Layout>
            <Layout className="o-nums-right" flex pack="end">1</Layout>
          </Layout>
          <Layout align="center" className="o-nums o-tels">
            <Layout className="o-nums-left">充值手机号：</Layout>
            <Layout className="o-nums-right" flex>
              <input placeholder="请输入您的手机号码" type="tel"/>
            </Layout>
          </Layout>
          <Layout orient="column" pack="center" className="o-pays mt20">
            <Layout className="o-pays-inner" orient="column">
              <Layout>支付金额</Layout>
              <Layout className="p-item">
                <Layout flex className="p-left">积分</Layout>
                <Layout pack="end" className="p-p-right p-right">
                  <img src={require('../../public/imgs/icon-2-grey.jpg')}/>10000
                </Layout>
              </Layout>
              <Layout className="p-item">
                <Layout flex className="p-left">现金</Layout>
                <Layout pack="end" className="p-right">￥50</Layout>
              </Layout>
            </Layout>
          </Layout>
        </div>
        <Layout className="o-submit-box">
          <Layout flex align="center" className="o-submit-info">
            <div className="submit-info-inner">
              <p>商品总额</p>
              <p className="s-info-price">
                <span>10000</span>+
                <span>￥50</span>
              </p>
            </div>
          </Layout>
          <Layout pack="center" align="center" className="o-submit-btn">提交订单</Layout>
        </Layout>

        {/*密码框*/}

        <div className="o-password">
          <div className="o-p-mask"></div>
          <div className="o-p-body">
            <div className="o-title">请输入支付密码<i className="iconfont icon-close"></i></div>
            <div className="o-info">
              <div>金额</div>
              <div className="o-price">￥160 + 10000</div>
              <Layout className="o-secret">
                <Layout flex align="center" className="active" pack="center"></Layout>
                <Layout flex align="center" pack="center"></Layout>
                <Layout flex align="center" pack="center"></Layout>
                <Layout flex align="center" pack="center"></Layout>
                <Layout flex align="center" pack="center"></Layout>
                <Layout flex align="center" pack="center"></Layout>
              </Layout>
              <Layout pack="center" align="center" className="o-tips">
                <Layout className="o-tips-inner">盈盈理财安全键盘</Layout>
              </Layout>
            </div>
            <div className="o-keyboard">
              <div className="o-keyboard-inner">
                <div className="k-num">1</div>
                <div className="k-num">2</div>
                <div className="k-num">3</div>
                <div className="k-num">4</div>
                <div className="k-num">5</div>
                <div className="k-num">6</div>
                <div className="k-num">7</div>
                <div className="k-num">8</div>
                <div className="k-num">9</div>
                <div className="k-num k-num-last k-num-grey"></div>
                <div className="k-num k-num-last">0</div>
                <div className="k-num k-num-last k-num-grey">
                  <img src={require('../../public/imgs/icon-close.jpg')}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
;


ReactDOM.render(
  <Order />,
  domRoot.root()
);






































