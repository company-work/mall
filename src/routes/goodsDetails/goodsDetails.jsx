'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import InterFace from 'public/libs/interFace.js';
import Axios from 'axios';
import Swiper from 'react-id-swiper';
import Test from '../../test/mockTest.js';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import 'public/libs/swiper/swiper.min.css';
import './goodsDetails.scss';
let domRoot = new Dom("page-goodsDetails");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class GoodsDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      goodsInfo: {},
      dialogFlag: false,
      selectNum: 1,
      selectKey: {},
      selectPay: "",
      payType: [],
      specData: [],
      skuObj: {},
      normsInfo: {
        thumbImg: "",
        stock: "",
        point: "",
        money: "",
        selected: ""
      },
      normsDatabase: {
        "11": {}
      }
    }
  }

  AddNum() {
    var self = this;
    var num = self.state.selectNum;
    var stock = self.state.normsInfo.stock;
    console.log(num, stock);
    if (num === stock) {
      APP.TOAST("数量不能超过当前库存", 1);
      return;
    }
    self.setState({
      selectNum: ++num
    });

  }

  ReduceNum() {
    var self = this;
    var num = self.state.selectNum;
    if (num == 1) {
      APP.TOAST("购买数量不能小于1", 2);
      return;
    }
    self.setState({
      selectNum: --num
    });
  }

  ChangeNum(e) {
    var val = e.target.value;
    var self = this;
    var stock = self.state.normsInfo.stock;

    if (val > stock) {
      APP.TOAST("数量不能超过当前库存", 1);
      return;
    }
    self.setState({
      selectNum: val
    });

    console.log(val);
  }


  componentDidMount() {
    var self = this;
    APP.SET_REFRESH();
    //Test.initGoodsDetails();

    APP.PAGE_WILL_LOAD(function () {
      self.setState({
        dialogFlag: false
      })
    })

    var gId = self.getLocationParams("goodsId"),
      flashSaleFlag = self.getLocationParams("flashSaleFlag") ? "Y" : "N";

    if (!gId) return false;

    Axios.get(InterFace.initGoodsDetailsUrl,
      {
        params: {
          goodsId: gId,
          isQuickly: flashSaleFlag
        }
      })
      .then(function (res) {
        console.log(res);
        if (res.data.stat == 'ok') {
          var data = res.data;
          self.setState({
            goodsInfo: data.goodsInfo
          })
        }
        else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.TOAST(error, 1);
      });
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

  /*检验三要素*/
  checkAuth() {
    var self = this;
    if (APP.BROWSER.isclient) {
      APP.CHECKTAUTH(function (res) {
        if (res.response.resultCode == 0) {
          //校验商品
          self.checkGoods();
        } else {
          APP.TOAST("没认证过，不能买东西哦", 1);
        }
      })
    } else {
      //校验商品
      self.checkGoods();
    }
  }

  /*检验商品信息*/
  checkGoods() {
    var self = this;
    var gId = self.getLocationParams("goodsId");
    if (!gId) {
      APP.TOAST("商品ID无效或不存在", 1);
    }
    Axios.get(InterFace.checkGoodsUrl, {
        params: {
          goodsId: gId
        }
      })
      .then(function (res) {
        if (res.data.stat == 'ok') {

          //获取商品的规格
          self.getSku();
        }
        else {
          APP.TOAST(res.data.msg, 1);
          console.log(res.data.msg);
        }
      })
      .catch(function (error) {
        APP.TOAST("服务器网线被挖断了", 1);
      });

  }

  /*获取规格内容*/
  getSku() {
    var self = this;
    var gId = self.getLocationParams("goodsId");
    if (!gId) {
      APP.TOAST("商品ID无效或不存在", 1);
    }
    Axios.get(InterFace.getSkuUrl, {
        params: {
          goodsId: gId
        }
      })
      .then(function (res) {
        if (res.data.stat == 'ok') {


          //这里设置信息
          var normsData = res.data.skuGoodInfo;
          var obj = {};
          if (normsData.defaultSku && normsData.defaultSku != null) {
            var defaultData = normsData.defaultSku;
            obj.thumbImg = defaultData.imgPath;
            obj.point = defaultData.pricePoint;
            obj.money = defaultData.unionPoint ? (defaultData.unionPoint + " + ￥" + defaultData.unionRmb) : "";
            obj.stock = defaultData.inventory;

            var skuJson = JSON.parse(defaultData.propertiesJson);
            var selectKey = {};
            var selectStr = "已选";
            skuJson.forEach((item, index)=> {
              selectKey[item.kid] = item.vid;
              //selectKey.push(item.vid);
              selectStr += "“" + item.value + "“";
            });
            obj.selected = selectStr;

            self.state.selectKey = selectKey;


            //拼装数据
            var skuList = normsData.skuSimpList;
            var skuObj = {};
            var sObj = {};
            skuList.forEach((item, index)=> {
              var keyStr = "";
              var propJson = JSON.parse(item.propertiesJson);


              propJson.forEach((prop, num)=> {
                var skuStr = "";
                keyStr += prop.vid;
                skuStr = prop.kid + "-" + prop.vid;

                sObj[skuStr] = item;
              });

              skuObj[keyStr] = item;
            });


            self.state.normsDatabase = skuObj;
            self.state.skuObj = sObj;

          }
          else {
            obj.thumbImg = normsData.picIcon;
            obj.point = normsData.pricePoint;
            obj.money = normsData.unionPoint ? (normsData.unionPoint + " + ￥" + normsData.unionRmb) : "";
            obj.stock = normsData.inventory;
            obj.selected = "";
          }

          self.state.normsInfo = obj;
          self.state.specData = normsData.dataList;
          self.state.payType = normsData.tradePayTypeList;

          if (normsData.tradePayTypeList.length == 1) {
            self.state.selectPay = normsData.tradePayTypeList[0].tradePayCode;
          }


          self.setState(self.state);


          //显示规格弹出框
          if (!self.state.dialogFlag) {
            self.setState({
              dialogFlag: true
            })
          }

        }
        else {
          APP.TOAST(res.data.msg, 1);
          console.log(res.data.msg);
        }
      })
      .catch(function (error) {
        APP.TOAST("服务器网线被挖断了", 1);
      });

  }

  Buy() {
    let self = this;
    if (!self.state.dialogFlag) {
      self.checkAuth();
    } else {
      var gId = self.getLocationParams("goodsId");
      var data = self.state;
      var _n = data.selectNum;
      var _p = data.selectPay;
      var _keyNum = "";
      for (var k in data.selectKey) {
        _keyNum += data.selectKey[k];
      }

      var params = {
        goodsId: gId,
        quantity: _n,
        tradePayType: _p
      };


      var _skuId;
      if (data.normsDatabase[_keyNum]) {
        params.skuId = data.normsDatabase[_keyNum].id;
        _skuId = data.normsDatabase[_keyNum].id;
      }


      var qs = require('qs');
      Axios.get(InterFace.checkOrderUrl, {
          params: params
        })
        .then(function (res) {
          if (res.data.stat == "ok") {
            if (data.normsDatabase[_keyNum]) {
              APP.JUMP_TO("order.html?g=" + gId + "&s=" + _skuId + "&q=" + _n + "&p=" + _p);
            } else {
              APP.JUMP_TO("order.html?g=" + gId + "&q=" + _n + "&p=" + _p);
            }

          }
        })
        .catch(function (error) {
          APP.TOAST(error, 1);
        });
    }
  }

  BuyClose() {
    let self = this;
    if (self.state.dialogFlag) {
      self.setState({
        dialogFlag: false
      })
    }
  }

  switchSku(kid, vid, index) {
    let self = this, state = self.state;
    var keyStr = "";
    for (var k in state.selectKey) {

      if (k != kid) {
        keyStr = state.selectKey[k];
      }
    }

    var key;
    if (index > 0) {
      key = keyStr + "" + vid;
    } else {
      key = vid + "" + keyStr;
    }

    var curData = self.state.normsDatabase[key];
    var obj = {};

    obj.thumbImg = curData.imgPath;
    obj.point = curData.pricePoint;
    obj.money = curData.unionPoint ? (curData.unionPoint + " + ￥" + curData.unionRmb) : "";
    obj.stock = curData.inventory;

    var skuJson = curData.properties;
    var selectKey = {};
    var selectStr = "已选";
    skuJson.forEach((item, index)=> {
      selectKey[item.kid] = item.vid;
      selectStr += "“" + item.value + "“";
    });

    obj.selected = selectStr;

    self.state.normsInfo = obj;
    self.state.selectKey = selectKey;

    self.setState(self.state);

  }

  switchPay(payType) {
    var self = this;
    self.state.selectPay = payType;
    self.setState(self.state);
  }

  render() {
    let
      self = this,
      state = self.state,
      goodsInfo = state.goodsInfo;
    let dialogHtm, bannerHtm;
    let sCls = "g-content";


    const params = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };

    //商品图片轮播
    if (goodsInfo.coveList && goodsInfo.coveList.length) {

      bannerHtm = goodsInfo.coveList.map((item, index)=> {
        return (
          <div key={index} className="g-img" alt={item.imgTitle}>
            <img src={item.goodsImg}/>
          </div>
        )
      });
    }

    //判断是不是特别的产品，有活动标识
    var GoodsPriceHtm;
    if (goodsInfo.isQuickly && goodsInfo.isQuickly === 'Y') {


      var priceDefault, priceRegular;

      if (goodsInfo.minUnion) {
        priceDefault = goodsInfo.minUnion.unionPoint + " + ￥" + goodsInfo.minUnion.unionRmb;
        if (goodsInfo.minUnionRegular) {
          priceRegular = goodsInfo.minUnionRegular.unionPoint + " + ￥" + goodsInfo.minUnionRegular.unionRmb;
        }
      }
      else {
        priceDefault = goodsInfo.pricePoint;
        if (goodsInfo.pricePointRegular) {
          priceRegular = goodsInfo.pricePointRegular;
        }
      }

      var per = Math.ceil(goodsInfo.inventory / goodsInfo.originalInventory * 100);

      var styles = {
        width: per + "%"
      };


      //有组合显示组合价，没有组合显示积分价
      GoodsPriceHtm = <Layout align="center" className="g-price-quick">
        <Layout className="g-price-box" orient="column" flex>
          <h3>限时特价</h3>
          <div className="g-price">
            <span className="g-price-sale">{priceDefault}</span>
            <del className="g-price-regular">{priceRegular}</del>
          </div>
        </Layout>
        <Layout className="g-stock-box" pack="center">
          <div className="g-stock">
            <div className="g-stock-txt">仅剩{goodsInfo.inventory}件</div>
            <div className="g-stock-inner" style={styles}></div>
          </div>
        </Layout>
      </Layout>

    }
    else {
      //计算展示商品的价格
      var
        gPrice1,
        gPrice1Htm, //积分价
        gPrice2,
        gPrice2Htm; //组合价


      if (goodsInfo.maxPoint != null) {
        gPrice1 = goodsInfo.minPoint + "-" + goodsInfo.maxPoint;
        gPrice1Htm = <div className="g-price-box">积分价：
          <div className="g-sale">{gPrice1}</div>
        </div>
      }
      else if (goodsInfo.minPoint != null) {
        gPrice1 = goodsInfo.minPoint;
        gPrice1Htm = <div className="g-price-box">积分价：
          <div className="g-sale">{gPrice1}</div>
        </div>
      }


      if (goodsInfo.maxUnion != null) {
        var maxP = goodsInfo.maxUnion,
          minP = goodsInfo.minUnion;

        gPrice2 = minP.unionPoint + " + ￥" + minP.unionRmb + " - " + maxP.unionPoint + " + ￥" + maxP.unionRmb;


        gPrice2Htm = <div className="g-price-box">组合价：
          <div className="g-sale">{gPrice2}</div>
        </div>

      }
      else if (goodsInfo.minUnion != null) {
        gPrice2 = goodsInfo.minUnion.unionPoint + " + ￥" + goodsInfo.minUnion.unionRmb;
        gPrice2Htm = <div className="g-price-box">组合价：
          <div className="g-sale">{gPrice2}</div>
        </div>
      }


      GoodsPriceHtm = <div className="g-price-default">{gPrice1Htm}{gPrice2Htm}</div>
    }

    //插入商品介绍HTML
    if (document.querySelector("#gBody")) {
      document.querySelector("#gBody").innerHTML = goodsInfo.goodsIntro;
    }


    if (self.state.dialogFlag) {

      var skuPropsHtm = [];

      state.specData.map((item, index)=> {
        var pList = item.valueList;
        var propHtm = [];
        var sKey;
        for (var k in state.selectKey) {
          if (item.kid == k) {
            sKey = state.selectKey[k];
          }
        }

        pList.map((props, num)=> {
          if (props.vid == sKey) {
            propHtm.push(<span onClick={self.switchSku.bind(self,props.kid,props.vid,index)} key={num}
                               className="active">{props.value}</span>)
          } else {
            propHtm.push(<span onClick={self.switchSku.bind(self,props.kid,props.vid,index)}
                               key={num}>{props.value}</span>)
          }
        });

        skuPropsHtm.push(
          <div key={index} className="b-type buy-color">
            <div className="b-t-title">{item.key}</div>
            <div className="b-t-body">
              {propHtm}
            </div>
          </div>
        )

      });


      var _payLen = state.payType.length;
      var payHtm;
      if (_payLen == 1) {
        var payCode = state.payType[0].tradePayCode;
        payHtm =
          <span className="active" onClick={self.switchPay.bind(self,payCode)}>{state.payType[0].tradePayName}</span>;
      }
      else {
        state.payType.map((item, index)=> {
          return (<span onClick={self.switchPay.bind(self,item.tradePayCode)} key={index}>{item.tradePayName}</span>)
        })
      }

      var payType = self.state.selectPay;
      var priceHtm;
      switch (payType) {
        case "POINT":
          priceHtm = <div className="g-sale icon-point">
            {state.normsInfo.point}
          </div>;
          break;
        case "UNION":
          priceHtm = <div className="g-sale icon-point">
            {state.normsInfo.money}
          </div>;
          break;
      }


      {/*规格选择HTML*/
      }

      dialogHtm = <div className="g-buy">
        <Layout orient="column" className="g-buy-inner">
          <Layout className="g-info">
            <div className="g-info-img">
              <img src={state.normsInfo.thumbImg}/>
            </div>
            <div className="g-info-intro">
              {priceHtm}
              <div className="g-stock">库存{state.normsInfo.stock}件</div>
              <div className="g-choose">{state.normsInfo.selected}</div>
            </div>
            <div onClick={self.BuyClose.bind(self)} className="g-buy-close"><i className="iconfont icon-close"></i>
            </div>
          </Layout>
          <Layout flex orient="column" className="buy-props">

            {/*规格*/}
            {skuPropsHtm}


            <Layout className="b-type buy-num">
              <Layout className="b-t-title">购买数量</Layout>
              <Layout flex pack="end" className="b-t-body">
                <Layout align="center" className="buy-num-input">
                  <div onClick={self.ReduceNum.bind(self)} className="b-reduce">-</div>
                  <div className="b-input">
                    <input onChange={self.ChangeNum.bind(self)} value={state.selectNum} type="number" pattern="[0-9]*"/>
                  </div>
                  <div onClick={self.AddNum.bind(self)} className="b-plus">+</div>
                </Layout>
              </Layout>
            </Layout>

            <div className="b-type buy-pay-type">
              <div className="b-t-title">支付方式</div>
              <div className="b-t-body">
                {payHtm}
              </div>
            </div>
          </Layout>
        </Layout>
      </div>;

      sCls = "g-content g-show-dialog";
    }


    return (
      <div className="goodsDetails-warp">
        <div className={sCls}>
          <div className="g-title">
            {/*商品轮播图片*/}
            <Swiper {...params}>
              {bannerHtm}
            </Swiper>
            <div className="g-intro">
              <div className="g-name">{goodsInfo.goodsTitle}</div>

              {GoodsPriceHtm}
            </div>
          </div>
          <div className="g-desc">
            <h3>商品介绍</h3>
            <div id="gBody" className="g-desc-body"></div>
          </div>
          <div className="g-btn-submit" onClick={self.Buy.bind(self)}>立即购买</div>
        </div>

        {/*--弹出来--*/}
        {dialogHtm}
      </div>);
  }
}
;


ReactDOM.render(
  <GoodsDetails />,
  domRoot.root()
);






































