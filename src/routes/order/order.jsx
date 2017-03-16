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
import './order.scss';
let domRoot = new Dom("page-order");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboardFlag: false,
      address: {},
      telNum:"",
      goodsInfo: {}
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
    var _g = self.getLocationParams("g");
    var _s = self.getLocationParams("s");
    var _q = self.getLocationParams("q");
    var _p = self.getLocationParams("p");
    Axios.get(InterFace.getOrderUrl, {
        params: {
          goodsId: _g,
          skuId: _s,
          quantity: _q,
          tradePayType: "UNION"
        }
      })
      .then(function (res) {
        if (res.data.stat == "ok") {
          var obj = {};
          var data = res.data.orderDetailInfo;
          if (data.detailAddress) {
            obj.name = data.userName;
            obj.tel = data.phoneNumber;
            obj.address = data.detailAddress;
            obj.dFlag = true;
            self.state.address = obj;

          } else {
            self.state.address = null;
          }
          self.state.goodsInfo = data;
          self.setState(self.state)
        } else {
          APP.TOAST(res.data.msg, 1);
        }
      })
      .catch(function (error) {
        APP.TOAST(error, 1);
      });
  }

  chooseAddress() {
    var self = this;
    APP.CHOOSE_ADDRESS(function (arg) {
      var data = arg.response;
      var obj = {};
      obj.name = data.name;
      obj.tel = data.cell;
      obj.address = data.provinceName + data.cityName + data.areaName + data.address;
      obj.dFlag = data.defaultFlag;

      self.setState({
        address: obj
      })

    }, "329")
  }


  submitOrder(){
    var self = this;
    var state = self.state;
    if(state.address==null){
      APP.TOAST("请完善收货地址",1);
      return false;
    }
    Axios.get(InterFace.getOrderUrl, {
        params: {
          tradeOrderNO: state.goodsInfo.tradeOrderNO,
          userName: state.address.name,
          detailAddress: state.address.address,
          phoneNumber: state.address.tel,
          extraParam: state.telNum,
          orderId: state.goodsInfo.orderId,
          pricePoint: state.goodsInfo.pricePoint,
          unionRmb: state.goodsInfo.priceRMB,
        }
      })
      .then(function (res) {
        if (res.data.stat == "ok") {
            //这里判断是否需要把iframe展示出来
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
    let state = self.state;
    let keyboardHtm;
    var goodsInfo = state.goodsInfo;

    //支付密码的键盘
    if (state.keyboardFlag) {
      keyboardHtm = <div className="o-password">
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
    }

    //根据订单商品类型展现不同的样子
    var addressHtm, telHtm;
    switch (goodsInfo.type) {

      case "ENTITY":
        //收获地址
        if (state.address == null) {
          addressHtm = <Layout onClick={self.chooseAddress.bind(self)} orient="row" className="o-address">
            <Layout className="o-a-left" flex align="center">登录完善详细收货地址</Layout>
            <Layout className="o-a-right" align="center"><i className="iconfont icon-right"></i></Layout>
          </Layout>
        } else {

          var flag = state.address.dFlag, dHtm;
          if (flag) {
            dHtm = <div className="o-m">默认</div>
          }

          addressHtm = <Layout onClick={self.chooseAddress.bind(self)} orient="column" className="o-address-active">
            <Layout className="o-address-top" align="center">
              <Layout className="o-a-left" flex align="center">
                <div className="clearfix">
                  <div className="pull-left">
                    {state.address.name}
                  </div>
                  <div className="pull-right">
                    {state.address.tel}
                  </div>
                </div>
              </Layout>
              <Layout className="o-a-right"> </Layout>
            </Layout>

            <Layout className="o-address-bot" flex align="center">
              {dHtm}
              <Layout className="o-a-left clearfix" flex align="center">
                {state.address.address}
              </Layout>
              <Layout className="o-a-right" align="center" pack="end"><i className="iconfont icon-right"></i></Layout>
            </Layout>

          </Layout>
        }
        break;

      case "CHONGZHI":
        telHtm = <Layout align="center" className="o-nums o-tels">
          <Layout className="o-nums-left">充值手机号：</Layout>
          <Layout className="o-nums-right" flex>
            <input placeholder="请输入您的手机号码" type="tel"/>
          </Layout>
        </Layout>

        break;

      case "COUPON":
        break;

    }


    //根据支付类型显示支付的信息
    var priceHtm, detailsPriceHtm, pribotHtm;
    if (goodsInfo.tradePayType == "POINT") {
      priceHtm = <div className="g-price">{goodsInfo.pricePoint}</div>
    }
    else {
      priceHtm = <div className="g-price">{goodsInfo.pricePoint} + ￥{goodsInfo.priceRMB}</div>
      pribotHtm = <span>￥{goodsInfo.priceRMB}</span>;
      console.log(goodsInfo);
      if (goodsInfo.payToolsList && goodsInfo.payToolsList.length > 0) {
        goodsInfo.payToolsList.forEach((item, index)=> {
          if (item.fundBillType == "CARD") {
            detailsPriceHtm = <Layout className="p-item">
              <Layout flex className="p-left">{item.toolName}(尾号{item.toolNo})</Layout>
              <Layout pack="end" className="p-right">￥{goodsInfo.priceRMB}</Layout>
            </Layout>
          }
        });
      }
    }

    var _q = self.getLocationParams("q");

    return (
      <div className="order-warp">

        {/*收获地址*/}
        {addressHtm}


        <div className="o-content mt20">
          {/*商品基本信息*/}
          <Layout className="o-goods">
            <Layout pack="center" align="center" className="o-g-img">
              <img src={goodsInfo.picIcon}/>
            </Layout>
            <Layout flex align="center" className="o-g-info">
              <div className="g-info">
                <div className="g-name">{goodsInfo.goodsTitle}</div>
                <div className="g-types">
                  <span>{goodsInfo.skuInfo}</span>
                </div>
                {priceHtm}
              </div>
            </Layout>
          </Layout>

          {/*购买数量*/}
          <Layout align="center" className="o-nums">
            <Layout className="o-nums-left">购买数量</Layout>
            <Layout className="o-nums-right" flex pack="end">{_q}</Layout>
          </Layout>

          {/*手机号码*/}
          {telHtm}

          <Layout orient="column" pack="center" className="o-pays mt20">
            <Layout className="o-pays-inner" orient="column">
              <Layout>支付金额</Layout>
              <Layout className="p-item">
                <Layout flex className="p-left">积分</Layout>
                <Layout pack="end" className="p-p-right p-right">
                  <img src={require('../../public/imgs/icon-2-grey.jpg')}/>{goodsInfo.pricePoint}
                </Layout>
              </Layout>
              {detailsPriceHtm}
            </Layout>
          </Layout>

        </div>

        <Layout className="o-submit-box">
          <Layout flex align="center" className="o-submit-info">

            <div className="submit-info-inner">
              <p>商品总额</p>
              <p className="s-info-price">
                <span>{goodsInfo.pricePoint} +</span>{pribotHtm}
              </p>
            </div>

          </Layout>
          <Layout pack="center" onClick={self.submitOrder.bind(self)} align="center" className="o-submit-btn">提交订单</Layout>
        </Layout>

        {/*密码框*/}
        {keyboardHtm}

      </div>
    );
  }



}
;


ReactDOM.render(
  <Order />,
  domRoot.root()
);






































