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
      dialogFlag: false
    }
  }

  componentDidMount() {
    var self = this;
    Test.initGoodsDetails();
    Axios.get(InterFace.initGoodsDetailsUrl)
      .then(function (res) {
        if (res.data.stat == 'ok') {
          var data = res.data;
          console.log(data);
          self.setState({
            goodsInfo: data.goodsInfo
          })
        }
        else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  Buy() {
    let self = this;
    if (!self.state.dialogFlag) {
      self.setState({
        dialogFlag: true
      })
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

  render() {
    let self = this, state = self.state, goodsInfo = state.goodsInfo;
    let dialogHtm, bannerHtm;
    let sCls = "g-content";
    if (self.state.dialogFlag) {
      dialogHtm = <div className="g-buy">
        <Layout orient="column" className="g-buy-inner">
          <Layout className="g-info">
            <div className="g-info-img">
              <img src={require('../../public/imgs/test/2.jpg')}/>
            </div>
            <div className="g-info-intro">
              <div className="g-sale">
                26000 - 30000
              </div>
              <div className="g-price">
                10000 + ￥160 - 1000000 + ￥200
              </div>
              <div className="g-stock">库存999件</div>
              <div className="g-choose">已选”绿色“”2-1200“</div>
            </div>
            <div onClick={self.BuyClose.bind(self)} className="g-buy-close"><i className="iconfont icon-close"></i>
            </div>
          </Layout>
          <Layout flex orient="column" className="buy-props">
            <div className="b-type buy-color">
              <div className="b-t-title">颜色分类</div>
              <div className="b-t-body">
                <span className="disabled">白色</span>
                <span className="disabled">红色</span>
                <span className="disabled">绿色</span>
                <span className="active">蓝色</span>
                <span className="disabled">紫色</span>
                <span>金色</span>
                <span>粉色</span>
                <span>橙色</span>
              </div>
            </div>
            <div className="b-type buy-styles">
              <div className="b-t-title">型号</div>
              <div className="b-t-body">
                <span>2-1200</span>
                <span>3-3200</span>
                <span>3-5300</span>
              </div>
            </div>
            <Layout className="b-type buy-num">
              <Layout className="b-t-title">购买数量</Layout>
              <Layout flex pack="end" className="b-t-body">
                <Layout align="center" className="buy-num-input">
                  <div className="b-reduce">-</div>
                  <div className="b-input">
                    <input type="number"/>
                  </div>
                  <div className="b-plus">+</div>
                </Layout>
              </Layout>
            </Layout>
            <div className="b-type buy-pay-type">
              <div className="b-t-title">支付方式</div>
              <div className="b-t-body">
                <span>积分兑换</span>
                <span>积分+银行卡</span>
              </div>
            </div>
          </Layout>
        </Layout>
      </div>;

      {/*----*/
      }
      sCls = "g-content g-show-dialog";
    }


    const params = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };

    //商品图片轮播
    if (goodsInfo.coveList) {
      bannerHtm = goodsInfo.coveList.map((item, index)=> {
        return (
          <div key={index} className="g-img" alt={item.imgTitle}>
            <img src={item.goodsImg}/>
          </div>
        )
      });
    }

    //计算展示商品的价格
    var gPrice1,gPrice2;
    if (goodsInfo.minUnion) {
      gPrice1 = goodsInfo.maxPoint ? goodsInfo.minPoint + " - " + goodsInfo.maxPoint : goodsInfo.minPoint;
      gPrice2 = goodsInfo.maxUnion ? goodsInfo.minUnion.unionPoint + " + ￥" + goodsInfo.minUnion.unionRmb + " - " + goodsInfo.maxPoint.unionPoint + " + ￥" + goodsInfo.maxPoint.unionRmb : (goodsInfo.minUnion.unionPoint + " + ￥" + goodsInfo.minUnion.unionRmb);
    }

    //判断是不是特别的产品，有活动标识
    var gTips;
    if(goodsInfo.isShowTeJiao && goodsInfo.isShowTeJiao==='yes'){
      gTips= <span>{goodsInfo.picTop}</span>;
    }

    //插入商品介绍HTML
    if (document.querySelector("#gBody")) {
      document.querySelector("#gBody").innerHTML = goodsInfo.goodsIntro;
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
              <div className="g-sale">{gPrice1}{gTips}</div>
              <div className="g-price">{gPrice2}</div>
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






































