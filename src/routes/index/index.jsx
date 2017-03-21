'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import Axios from 'axios';
import InterFace from 'public/libs/interFace.js';
import Swiper from 'react-id-swiper';
import Test from '../../test/mockTest.js';


/*--引入样式--*/
import 'public/style/base.scss';
import 'public/style/iconfont.css';
import 'public/libs/swiper/swiper.min.css';
import './index.scss';

let domRoot = new Dom("page-index");


import APP from 'public/libs/APP';

window.countDownTimeOut = null;
window.countdowntime = "00:00:00";

//每个页面都作为一个组件
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      countDown: "",
      isLogin: false,
      myPoint: "10000",
      sysTime: "",
      bannerList: [],
      flashSale: [],
      bannerBox: [],
      recommend: [],
      category: []
    }
  }

  componentDidMount() {
    var self = this;
    APP.SET_REFRESH();


    APP.LOADING("加载中...");
    //初始化商城BannerList数据
    Axios.get(InterFace.initIndexUrl)
      .then(function (res) {
        APP.CLOSE_LOADING();
        if (res.data.succ) {
          var data = res.data.banners;
          var bannerBoxArr = [];
          if (data.a0003 && data.a0003.length > 0) {
            bannerBoxArr.push(data.a0003[0]);
          }
          if (data.a0004 && data.a0004.length > 0) {
            bannerBoxArr.push(data.a0004[0]);
          }


          self.setState({
            bannerList: data.a0001,
            flashSale: data.a0002,
            bannerBox: bannerBoxArr,
            recommend: data.a0005
          })


        }
        else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.CLOSE_LOADING();
        APP.TOAST(error, 2);
        console.log(error);
      });


    //获取类别
    Axios.get(InterFace.initIndexCategoryUrl)
      .then(function (res) {
        if (res.data.stat) {
          var data = res.data.categoryList;

          self.setState({
            category: data
          })

        } else {
          APP.TOAST(data.message, 1);
        }
      })
      .catch(function (error) {
        console.log(error);
        APP.TOAST(error, 1);
      });
  }

  /*跳转到我的积分页面*/
  JumpMyPoint() {
    APP.ISLOGIN(function (data) {
      var res = data.response,
        isLogin = res.isLogin;
      if (isLogin) {
        APP.JUMP_TO('myPoint.html');
      } else {
        APP.LOGIN()
      }
    });
  }

  /*跳转到兑换记录页面*/
  JumpExchange() {
    APP.ISLOGIN(function (data) {
      var res = data.response,
        isLogin = res.isLogin;
      if (isLogin) {
        APP.JUMP_TO('exchangeRecord.html')
      } else {
        APP.LOGIN()
      }
    });
  }

  /*跳转到限时抢购页面*/
  JumpLimitSale() {
    APP.JUMP_TO("limitSale.html");
  }

  /*跳转到商品类别页面*/
  JumpCategory(cid) {
    if (cid) {
      APP.JUMP_TO("category.html?categoryNo=" + cid);
    } else {
      APP.JUMP_TO("category.html");
    }
  }

  /*跳转到商品详情页面*/
  JumpGoodsDetails(id) {
    APP.JUMP_TO("goodsDetails.html?goodsId=" + id);
  }

  /*---页面跳转---*/
  JumpToUrl(url) {
    APP.JUMP_TO(url);
  }

  /*---倒计时---*/
  countDown(time) {
    var self = this;
    var theTime = parseInt(time);// 秒
    var theTime1 = "00";// 分
    var theTime2 = "00";// 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }

    var result = parseInt(theTime) > 9 ? parseInt(theTime) : "0" + parseInt(theTime);
    if (theTime1 > 0) {
      result = (parseInt(theTime1) > 9 ? parseInt(theTime1) : "0" + parseInt(theTime1)) + ":" + result;
    } else {
      result = "00:" + result;
    }
    if (theTime2 > 0) {
      result = (parseInt(theTime2) > 9 ? parseInt(theTime2) : "0" + parseInt(theTime2)) + ":" + result;
    } else {
      result = "00:" + result;
    }
    if (time > 0) {
      if (document.querySelector("#cDownTime")) {
        document.querySelector("#cDownTime").innerHTML = result;
      }
    } else {
      if (document.querySelector("#cDownTime")) {
        document.querySelector("#cDownTime").innerHTML = "00:00:00";
      }
      return false;
    }

    time--;
    if (countDownTimeOut) clearTimeout(countDownTimeOut);
    countDownTimeOut = setTimeout(function () {
      self.countDown(time);
    }, 1000);
  }


  render() {
    let
      self = this,
      stateData = self.state,
      bannerHtm, flashHtm, bannerBoxHtm, recommendHtm, categoryHtm;

    /*--首页banner内容--*/
    if (stateData.bannerList && stateData.bannerList.length > 0) {

      /*--banner滚动配置参数--*/
      const params = {
        width: document.body.clientWidth,
        autoplay: 2500,
        speed: 500,
        autoplayDisableOnInteraction: false,
        centeredSlides: true,
        paginationClickable: true,
        grabCursor: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
      };

      var bannerItem = stateData.bannerList.map((item, index)=> {
        let linkUrl = item.targetUrl;
        return (<div onClick={self.JumpToUrl.bind(self,linkUrl)} key={index}>
          <img src={item.picUrl}/>
        </div>);
      });

      bannerHtm = <div className="scrollBanner">
        <Swiper {...params}>
          {bannerItem}
        </Swiper>
      </div>
    }

    /*--限时快抢--*/
    if (stateData.flashSale && stateData.flashSale[0] != null && stateData.flashSale.length > 0) {
      var
        flashSaleData = self.state.flashSale[0],
        flashDataObj = flashSaleData.quickBuyInfo,
        gPriceHtm, gPrice, gSale;

      if (flashDataObj) {
        //判断是组合支付中的价格是否存在
        gPrice = flashDataObj.unionPoint && flashDataObj.unionRmb ? flashDataObj.unionPoint + " + ￥" + flashDataObj.unionRmb : flashDataObj.pricePointDiscount;
        gSale = flashDataObj.unionPointRegular && flashDataObj.unionRmbRegular ? flashDataObj.unionPointRegular + " + ￥" + flashDataObj.unionRmbRegular : flashDataObj.pricePointRegular;


        if (flashDataObj.unionPointRegular != null || flashDataObj.unionRmbRegular != null && gSale != null) {
          gPriceHtm = <del className="g-price">{gSale}</del>
        }

        //console.log();

        self.countDown(flashDataObj.countTime / 1000);


        flashHtm = <Layout onClick={self.JumpLimitSale.bind(self)} orient="column" className="flashSale">
          <Layout className="flashSale-title" orient="row" align="center">
            {flashSaleData.title} {flashDataObj.timesTitle}
            <span id="cDownTime">00:00:00</span>
          </Layout>
          <Layout className="flashSale-body" orient="row">
            <Layout pack="center" align="center" className="f-img">
              <img src={flashSaleData.quickBuyInfo.picIcon}/>
            </Layout>
            <Layout orient="column" className="f-intro goods-intro" flex>
              <p className="g-name">{flashSaleData.quickBuyInfo.goodsTitle}</p>
              <p className="g-sale">{gPrice}</p>
              {gPriceHtm}
            </Layout>
          </Layout>
        </Layout>;
      }
    }


    /*--BannerBox--*/
    if (stateData.bannerBox && stateData.bannerBox.length > 0) {

      var bannerItemHtm = self.state.bannerBox.map((item, index)=> {
        let linkUrl = item.targetUrl;
        return (
          <Layout className="bBox-item" onClick={self.JumpToUrl.bind(self,linkUrl)} key={index} align="center"
                  pack="center" flex>
            <img src={item.picUrl}/>
          </Layout>
        )
      });

      bannerBoxHtm = <Layout className="bannerBox" orient="row" align="center" pack="center">{bannerItemHtm}</Layout>;
    }

    console.log(stateData.recommend);

    /*--推荐模块recommend--*/
    if (stateData.recommend && stateData.recommend[0] != null && stateData.recommend.length > 0) {
      var recommendData = self.state.recommend[0];
      var rItemHtm = recommendData.hotSaleInfo.goodsList.map((item, index)=> {

        //计算价格
        var gPrice, gSale, gPriceHtm;
        gSale = item.minUnion ? item.minUnion.unionPoint + " + ￥" + item.minUnion.unionRmb : item.pricePoint;
        gPrice = item.maxUnionRegular ? item.maxUnionRegular.unionPoint + " + ￥" + item.maxUnionRegular.unionRmb : item.pricePointRegular;


        if (item.maxUnionRegular != null || item.pricePointRegular != null) {
          gPriceHtm = <del className="g-price">{gPrice}</del>
        }


        return (
          <div onClick={self.JumpGoodsDetails.bind(self,item.goodsId)} key={index} className="r-item">
            <div className="r-item-img">
              <img src={item.picIcon}/>
            </div>
            <div className="r-item-intro goods-intro">
              <p className="g-name">{item.goodsTitle}</p>
              <p className="g-sale">{gSale}</p>
              {gPriceHtm}
            </div>
          </div>
        )
      });


      const reParams = {
        slidesPerView: "auto",
        freeMode: true
      };


      /*--更多--*/
      var rItemMoreHtm = <div onClick={self.JumpToUrl.bind(self,recommendData.targetUrl)}
                              className="r-item">
        <div className="r-item-more">
          <div className="r-item-inner">
            <div className="r-item-more-box">
              <i className="iconfont icon-rightcircleo"></i>
              <p>查看全部</p>
            </div>
          </div>
        </div>
      </div>;

      recommendHtm = <div className="recommend">
        <div className="r-title">{recommendData.hotSaleInfo.bannerTitle}</div>
        <div className="r-body g-swiper-list">
          <div className="r-body-inner">
            <Swiper {...reParams}>
              {rItemHtm}
              {rItemMoreHtm}
            </Swiper>
          </div>
        </div>
      </div>
    }

    /*--类别模块--*/
    if (stateData.category && stateData.category.length > 0) {

      categoryHtm = stateData.category.map((item, index)=> {

        var GoodsBoxHtm;

        if (item.goodsList.length > 0) {

          var goodsHtm = item.goodsList.map((goods, index)=> {

            //计算价格
            var gPrice, gSale, gPriceHtm;
            gSale = goods.minUnion ? goods.minUnion.unionPoint + " + ￥" + goods.minUnion.unionRmb : goods.pricePoint;
            gPrice = goods.maxUnionRegular ? goods.maxUnionRegular.unionPoint + " + ￥" + goods.maxUnionRegular.unionRmb : goods.pricePointRegular;


            if (goods.maxUnionRegular != null || goods.pricePointRegular != null) {
              gPriceHtm = <del className="g-price">{gPrice}</del>
            }


            return (
              <div onClick={self.JumpGoodsDetails.bind(self,goods.goodsId)} className="g-item" key={index}>
                <div className="g-img">
                  <img src={goods.picIcon}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">{goods.goodsTitle}</p>
                  <p className="g-sale">{gSale}</p>

                </div>
              </div>
            )
          });


          const caParams = {
            slidesPerView: "auto",
            freeMode: true
          };


          /*--更多--*/
          var rItemMoreHtm = <div onClick={self.JumpCategory.bind(self,item.categoryNo)} className="g-item">
            <div className="r-item-more">
              <div className="r-item-inner">
                <div className="r-item-more-box">
                  <i className="iconfont icon-rightcircleo"></i>
                  <p>查看全部</p>
                </div>
              </div>
            </div>
          </div>;

          GoodsBoxHtm = <div className="c-body g-swiper-list">
            <div className="g-body-inner">
              <Swiper {...caParams}>
                {goodsHtm}
                {rItemMoreHtm}
              </Swiper>
            </div>
          </div>
        }

        var cTitleHtms;

        if (item.picBig != null) {
          cTitleHtms = <div onClick={self.JumpCategory.bind(self,item.categoryNo)} className="c-title">
            <img src={item.picBig}/>
          </div>
        }


        return (
          <div className="categoryBox" key={index}>
            {cTitleHtms}
            {GoodsBoxHtm}
          </div>
        )
      })
    }


    /*--页面渲染--*/
    return (
      <div className="index-warpper">
        {/*图片滚动*/}
        {bannerHtm}
        {/*我的积分*/}
        <Layout orient="row" className="pointBox">
          <Layout onClick={self.JumpMyPoint.bind(self)} flex align="center"
                  className="point-left">我的积分<span>{self.state.myPoint}</span></Layout>
          <Layout onClick={self.JumpExchange.bind(self)} flex align="center" className="point-right">兑换记录</Layout>
        </Layout>
        {/*其它坑位*/}
        <div className="chainBox">外链盒子</div>

        {/*限时抢购*/}
        {flashHtm}
        {/*banner类别*/}
        {bannerBoxHtm}

        {/*推荐栏位*/}
        {recommendHtm}
        {/*类别*/}
        {categoryHtm}
      </div>);
  }
}
;


ReactDOM
  .render(
    <Index />,
    domRoot
      .root()
  )
;

