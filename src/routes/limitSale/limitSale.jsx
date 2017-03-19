'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import Swiper from 'react-id-swiper';
import Axios from 'axios';
import InterFace from 'public/libs/interFace.js';
import Test from '../../test/mockTest.js';

/*--样式引入--*/
import 'public/style/base.scss';
import 'public/style/iconfont.css';
import 'public/libs/swiper/swiper.min.css';
import './limitSale.scss';
let domRoot = new Dom("page-limitSale");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class LimitSale extends React.Component {
  constructor() {
    super();
    this.state = {
      curIndex: 0,
      curDataTime: GOKU.SYS_TIME,
      tabsTitle: [],
      tabsBody: []
    }
  }

  getTimeStr(str) {
    var t = str.split(" ")[1],
      eIndex = t.lastIndexOf(":");

    return t.substring(0, eIndex);

  }

  convertSecond(dates) {
    return (new Date(dates).getTime());
  }

  sortArr(arr) {
    arr.sort(function (a, b) {
      return a - b;
    });
    return arr;
  }

  JumpGoodsDetails(id) {
    APP.JUMP_TO("goodsDetails.html?goodsId=" + id + "&isQuickly=Y");
  }

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

  componentDidMount() {
    var self = this;
    var nowSecond = GOKU.SYS_TIME_SECOND;
    //nowSecond = 1489483223000;


    APP.SET_REFRESH();

    Test.initLimitSale();
    APP.LOADING("加载数据...");
    Axios.get(InterFace.initLimitSaleUrl)
      .then(function (res) {
        if (res.data.stat == "ok") {
          APP.CLOSE_LOADING();
          var data = res.data.targetList;
          var _title = [];
          var _body = [];
          var cache = [];

          data.forEach((item, index)=> {
            var _second = item.startTimeSecond;
            var _time = self.getTimeStr(item.startTime);
            var obj = {};
            obj.s = _second;
            obj.t = _time;
            //往里面写入选项卡的头部
            _title.push(obj);

            //往里面写入选项卡的内容部分
            _body.push(item.p);


            if (_second <= nowSecond) {
              cache[index] = _second;
            }
          });

          var sortNewArr = self.sortArr(cache);

          if (sortNewArr.length) {
            self.state.curIndex = sortNewArr.length
          } else {
            self.state.curIndex = 0;
          }


          self.state.tabsTitle = _title;
          self.state.tabsBody = _body;
          self.setState(self.state);

        } else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.CLOSE_LOADING();
        APP.TOAST(error, 2);
        console.log(error);
      });
  }

  render() {
    let self = this,
      _curIndex = self.state.curIndex,
      _tabsTitleHtm,
      _tabsBodyHtm = [];

    const titleParams = {
      onInit: (swiper) => {
        self.limitSwiperTitle = swiper;
      },
      onClick: (swiper)=> {
        var activeIndex = swiper.activeIndex;
        //切换到当前
        if (self.limitSwiperBody) {
          self.limitSwiperBody.slideTo(activeIndex, 0, false);//切换到第一个slide，速度为1秒
        }
      },
      onSlideChangeEnd: (swiper)=> {
        var activeIndex = swiper.activeIndex;
        //切换到当前
        if (self.limitSwiperBody) {
          self.limitSwiperBody.slideTo(activeIndex, 0, false);//切换到第一个slide，速度为1秒
        }
      },
      slidesPerView: 4,
      centeredSlides: true,
      preventClicksPropagation: true,
      paginationClickable: true,
      slideToClickedSlide: true,
      grabCursor: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };

    //切换到当前
    if (self.limitSwiperTitle) {
      self.limitSwiperTitle.slideTo(self.state.curIndex, 1000, false);//切换到第一个slide，速度为1秒
    }

    _tabsTitleHtm = self.state.tabsTitle.map((item, index)=> {
      var descHtm;
      if (_curIndex == index) {
        descHtm = <div>抢购中</div>;
      } else if (_curIndex > index) {
        descHtm = <div>已开抢</div>;
      } else {
        descHtm = <div>即将开抢</div>;
      }
      return (
        <div key={index} className="t-item">
          <p>{item.t}</p>
          {descHtm}
        </div>
      )
    });


    const bodyParams = {
      width: document.body.clientWidth,
      onInit: (swiper) => {
        self.limitSwiperBody = swiper;
      },
      onSlideChangeEnd: (swiper)=> {
        var activeIndex = swiper.activeIndex;
        //切换到当前
        if (self.limitSwiperTitle) {
          self.limitSwiperTitle.slideTo(activeIndex, 500, false);//切换到第一个slide，速度为1秒
        }
      },
      autoHeight: true,
      grabCursor: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };

    //切换到当前
    if (self.limitSwiperBody) {
      self.limitSwiperBody.slideTo(self.state.curIndex, 1000, false);
    }


    self.state.tabsBody.map((item, index)=> {

      var tipsHtm;
      var limitItem = [];
      if (_curIndex == index) {
        tipsHtm = <div className="tabs-intro-time">
          <div className="t-time">
            本场还剩<span>01:27:54</span>
          </div>
        </div>;


        item.map((goods, num)=> {

          var per = Math.ceil(goods.inventory / goods.originalInventory * 100);
          var styles = {
            width: per + "%"
          };
          var btnHtm;
          if (goods.inventory > 0) {
            btnHtm = <div className="g-btn">马上抢</div>;
          } else {
            btnHtm = <div className="g-btn g-btn-grey">抢光了</div>;
          }
          var gPrice, gSale;
          if (goods.minUnion != null) {
            gSale = goods.minUnion.unionPoint + "+ ￥" + goods.minUnion.unionRmb;
            gPrice = goods.minUnionRegular.unionPoint + "+ ￥" + goods.minUnionRegular.unionRmb;
          } else {
            gSale = goods.minPoint;
            gPrice = goods.minPointRegular;
          }


          limitItem.push(
            <Layout onClick={self.JumpGoodsDetails.bind(self,goods.goodsId)} key={goods.goodsId} orient="row"
                    className="goods-item">
              <Layout orient="row" pack="center" align="center" className="g-img">
                <img src={goods.picIcon}/>
              </Layout>
              <Layout orient="column" flex className="g-intro">
                <p className="g-name">{goods.goodsTitle}</p>
                <p className="g-price">
                  <span>{gSale}</span>
                  <del>{gPrice}</del>
                </p>
                <div className="g-stock">
                  <div className="g-stock-txt">仅剩{goods.inventory}件</div>
                  <div className="g-stock-inner" style={styles}></div>
                </div>


                {btnHtm}

              </Layout>
            </Layout>
          );


        });
      }
      else if (_curIndex > index) {
        tipsHtm = <div className="tabs-intro-time">
          <div className="t-time">
            还有商品可以抢购哦
          </div>
        </div>;

        item.map((goods, num)=> {


          var per = Math.ceil(goods.inventory / goods.originalInventory * 100);
          var styles = {
            width: per + "%"
          };
          var btnHtm;
          if (goods.inventory > 0) {
            btnHtm = <div className="g-btn">马上抢</div>;
          } else {
            btnHtm = <div className="g-btn g-btn-grey">抢光了</div>;
          }
          var gPrice, gSale;
          if (goods.minUnion != null) {
            gSale = goods.minUnion.unionPoint + "+ ￥" + goods.minUnion.unionRmb;
            gPrice = goods.minUnionRegular.unionPoint + "+ ￥" + goods.minUnionRegular.unionRmb;
          } else {
            gSale = goods.minPoint;
            gPrice = goods.minPointRegular;
          }


          limitItem.push(
            <Layout onClick={self.JumpGoodsDetails.bind(self,goods.goodsId)} key={goods.goodsId} orient="row"
                    className="goods-item">
              <Layout orient="row" pack="center" align="center" className="g-img">
                <img src={goods.picIcon}/>
              </Layout>
              <Layout orient="column" flex className="g-intro">
                <p className="g-name">{goods.goodsTitle}</p>
                <p className="g-price">
                  <span>{gSale}</span>
                  <del>{gPrice}</del>
                </p>
                <div className="g-stock">
                  <div className="g-stock-txt">仅剩{goods.inventory}件</div>
                  <div className="g-stock-inner" style={styles}></div>
                </div>

                {btnHtm}

              </Layout>
            </Layout>
          );

        });
      }
      else {
        tipsHtm = <div className="tabs-intro-time">
          <div className="t-time">
            即将开始 好物不可错过
          </div>
        </div>;


        item.map((goods, num)=> {


          var per = Math.ceil(goods.inventory / goods.originalInventory * 100);
          var styles = {
            width: per + "%"
          };
          var btnHtm = <div className="g-btn g-btn-grey g-btn-long">即将开抢</div>;

          var gPrice, gSale;
          if (goods.minUnion != null) {
            gSale = goods.minUnion.unionPoint + "+ ￥" + goods.minUnion.unionRmb;
            gPrice = goods.minUnionRegular.unionPoint + "+ ￥" + goods.minUnionRegular.unionRmb;
          } else {
            gSale = goods.minPoint;
            gPrice = goods.minPointRegular;
          }


          limitItem.push(
            <Layout onClick={self.JumpGoodsDetails.bind(self,goods.goodsId)} key={goods.goodsId} orient="row"
                    className="goods-item">
              <Layout orient="row" pack="center" align="center" className="g-img">
                <img src={goods.picIcon}/>
              </Layout>
              <Layout orient="column" flex className="g-intro">
                <p className="g-name">{goods.goodsTitle}</p>
                <p className="g-price">
                  <span>{gSale}</span>
                  <del>{gPrice}</del>
                </p>

                <div className="g-stock g-stock-comming">
                  <div className="g-stock-txt">限量{goods.inventory}件</div>
                </div>

                {btnHtm}

              </Layout>
            </Layout>
          );


        });
      }


      var _key = "s" + index;
      _tabsBodyHtm.push(
        <Layout key={_key} orient="column" className="tabs-content">
          {tipsHtm}
          <div className="tabs-list">
            {limitItem}
          </div>
        </Layout>
      )
    });


    return (
      <div className="limitSale-warp">
        <div className="limit-tabs">

          <div className="tabs-title">
            <div className="tabs-title-inner">
              <Swiper {...titleParams}>
                {_tabsTitleHtm}
              </Swiper>
              <div className="t-item-active"></div>
            </div>
          </div>

          {/**--切换的内容部分--**/}
          <div className="tabs-body">
            <div className="tabs-body-inner">
              <Swiper {...bodyParams}>
                {_tabsBodyHtm}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    )
      ;
  }
}
;


ReactDOM.render(
  <LimitSale />,
  domRoot.root()
);

