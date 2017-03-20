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
import './order.scss';
let domRoot = new Dom("page-order");


window.APP = require('../../public/libs/APP');

//每个页面都作为一个组件
class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboardFlag: false,
      address: {},
      telNum: "",
      iframeSecretUrl: "http://192.168.2.246:9001/assets/index.html",
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
    var obj = {};
    obj.goodsId = _g;
    if (_s) {
      obj.skuId = _s;
    }
    obj.quantity = _q;
    obj.tradePayType = _p;


   /* $.ajax({
      url: "http://192.168.2.246:9001/assets/index.html",
      type: "get",
      dataType: "html",
      success: function (result) {
        var dataHtm = result;
        self.state.keyboardFlag = true;
        self.setState(self.state);
        window.frames["iFrame"].document.write(dataHtm);
      },
      error: function (msg) {
        console.log(msg);
      }
    });*/


    APP.SET_REFRESH();
    Axios.get(InterFace.getOrderUrl, {
        params: obj
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

  submitOrder() {
    var self = this;
    var state = self.state;

    //直接弹框
    if (state.goodsInfo.type == "CHONGZHI") {


      if (!state.telNum) {
        APP.TOAST("手机号不能能为空", 2);
        return false;
      }

      if (!self.isTel(state.telNum)) {
        APP.TOAST("手机号码格式不正确", 2);
        return false;
      }

      if (APP.BROWSER.isclient) {

        var alertTxt = "充值号码为" + state.telNum;
        APP.CONFIRM("温馨提示", alertTxt, function (data) {

          var
            res = data.response,
            btnIndex = res.buttonIndex;
          if (btnIndex == 1) {
            //确定手机号码没有问题就过去
            self.submitOrderReal();
          }
        })
      }
      else {
        //确定手机号码没有问题就过去
        self.submitOrderReal();
      }
    }
    else if (state.goodsInfo.type == "ENTITY") {

      //判断地址
      if (state.address == null) {
        APP.TOAST("请完善收货地址", 1);
        return false;
      }

      self.submitOrderReal();
    }else{
      self.submitOrderReal();
    }

  }

  submitOrderReal() {
    var self = this,
      state = self.state;

    var obj = {};
    if (state.address != null) {
      obj.userName = state.address.name;
      obj.detailAddress = state.address.address;
      obj.phoneNumber = state.address.tel;
    } else {
      obj.userName = "";
      obj.detailAddress = "";
      obj.phoneNumber = "";
    }

    obj.userId = "8201506170006346";//测试的时候写死
    obj.orderId = state.goodsInfo.orderId;
    if (state.telNum) {
      obj.extraParam = state.telNum;
    }


    Axios.get(InterFace.putOrderUrl, {
        params: obj
      })
      .then(function (res) {
        var data = res.data;
        var payTools = state.goodsInfo.payToolsList,
            payToolStr = JSON.stringify(payTools);
        if (data.success) {
          $.ajax({
            url: InterFace.checkPayUrl,
            type: "POST",
            data: {
              tradeOrderNO:data.tradeOrderNO,
              orderId:state.goodsInfo.orderId,
              toolsInfo:payToolStr,
              pricePoint:data.pricePoint,
              unionRmb:data.unionRmb
            },
            success: function (res) {
              console.log(res);

              $.ajax({
                url: "http://192.168.2.246:9001/assets/index.html",
                type: "get",
                dataType: "html",
                success: function (result) {
                  var dataHtm = result;
                  self.state.keyboardFlag = true;
                  self.setState(self.state);
                  window.frames["iFrame"].document.write(dataHtm);
                },
                error: function (msg) {
                  console.log(msg);
                }
              });




            },
            error: function () {

            }
          });


        }
      })
      .catch(function (error) {
        APP.TOAST(error, 1);
      });

  }

  //更新手机号码
  setTelNum(e) {
    var self = this,
      val = e.target.value;

    if (val.length > 11) {
      return false;
    }
    self.setState({
      telNum: val
    })
  }

  //关闭密码iframe弹框
  closeKeyBoard() {
    var self = this;
    if (self.state.keyboardFlag) {
      self.setState({
        keyboardFlag: false
      })
    }
  }


  render() {
    let self = this;
    let state = self.state;
    let keyboardHtm;
    var goodsInfo = state.goodsInfo;

    //支付密码的键盘
    if (state.keyboardFlag) {
      keyboardHtm = <div onClick={self.closeKeyBoard.bind(self)} className="keyboardBox">
        <div className="keyboardBox-inner">
          <iframe width="100%" src={state.iframeSecretUrl} height="100%" id="iFrame" name="iFrame"></iframe>
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
        }
        else {

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
            <input onChange={self.setTelNum.bind(self)} placeholder="请输入您的手机号码" value={self.state.telNum} type="number"
                   pattern="[0-9]*"/>
          </Layout>
        </Layout>;

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
      if (goodsInfo.pricePoint) {
        priceHtm = <div className="g-price">{goodsInfo.pricePoint} + ￥{goodsInfo.priceRMB}</div>
      }
      pribotHtm = <span>+ ￥{goodsInfo.priceRMB}</span>;


      if (goodsInfo.payToolsList && goodsInfo.payToolsList != null && goodsInfo.payToolsList.length > 0) {
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

    var clsName = state.keyboardFlag ? "order-warp keyboard-show" : "order-warp";

    return (
      <div className={clsName}>

        {/*收获地址*/}
        {addressHtm}


        <div className="o-content">
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
                <span>{goodsInfo.pricePoint}</span>{pribotHtm}
              </p>
            </div>

          </Layout>
          <Layout pack="center" onClick={self.submitOrder.bind(self)} align="center"
                  className="o-submit-btn">提交订单</Layout>
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






































