'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import Axios from 'axios';
import Swiper from 'react-id-swiper';
import Test from '../../test/mockTest.js';
import InterFace from '../../public/libs/interFace.js';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import 'public/libs/swiper/swiper.min.css';
import './category.scss';
let domRoot = new Dom("page-category");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      curActiveIndex: 0,
      curCategoryNo: "",
      dropdownFlag: false,
      categoryTitle: [],
      categoryBody: {}
    }
  }

  /*--菜单样式切换--*/
  showDropDown() {
    if (!this.state.dropdownFlag) {
      this.setState({
        dropdownFlag: true
      })
    }
  }

  /*--菜单样式切换--*/
  hideDropDown() {
    if (this.state.dropdownFlag) {
      this.setState({
        dropdownFlag: false
      })
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

  /*--页面初始化--*/
  componentDidMount() {
    var self = this;
    APP.SET_REFRESH();
    //获取类目
    Test.initCategoryList();
    var cNo = self.getLocationParams("categoryNo");
    self.setState({
      curCategoryNo: cNo
    });

    if (cNo == null) {
      APP.TOAST("地址栏类别参数错误", 1);
      return false;
    }


    APP.LOADING("更新数据...");
    Axios.get(InterFace.initCategoryUrl)
      .then(function (res) {
        APP.CLOSE_LOADING();
        if (res.data.stat == 'ok') {
          var
            data = res.data,
            _index = 0;

          data.categoryList.forEach((item, index)=> {
            if (item.categoryNo == cNo) {
              _index = index;
              self.state.curActiveIndex = index;
            }
          });

          self.swiperTabs(cNo, _index, true);

          self.state.categoryTitle = data.categoryList;
          self.setState(self.state);

        }
        else {
          APP.TOAST("亲，服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.TOAST("亲，服务器网线被挖断了", 1);
      });
  }

  /*--选项卡切换--*/
  swiperTabs(cid, index) {
    var self = this;

    if (self.cBodySwiper) {
      //切换到第一个slide，速度为1秒
      self.cBodySwiper.slideTo(index, 0, false);
    }

    if (self.cTitleSwiper) {
      if (self.state.curActiveIndex >= 2) {
        self.cTitleSwiper.slideTo(index, 1000, false);
      } else {

      }
    }

    //如果当前是
    var curIndex = self.state.curActiveIndex;
    //if (curIndex != 0 && curIndex == index) return false;

    self.setState({
      curActiveIndex: index,
      curCategoryNo: cid
    });

    //根据类别编号，获取类目数据
    self.updateGoodsData(cid);

  }

  //更新商品数据
  updateGoodsData(cid, index) {
    var self = this;
    //Mock的测试数据初始化
    //Test.initCategoryGoods();


    //ajax更新数据
    Axios.get(InterFace.initCategoryGoodsUrl, {
        params: {
          pageNum: 1,
          pageSize: 10,
          categoryNo: cid
        }
      })
      .then(function (res) {
        if (res.data.stat == 'ok') {
          var data = res.data;

          //如果
          if (self.state.categoryBody[cid]) {

          }

          var cacheCategoryData = self.state.categoryBody;
          var obj = {};
          obj.categoryNo = cid;
          obj.goodsList = data.goodsInfoList;
          obj.currentPageNum = data.pageNum;
          obj.totalPageNum = data.totalPages;
          obj.goodsInfoImg = data.picSmall;
          obj.nextPageFlag = data.next;
          cacheCategoryData[cid] = obj;

          self.state.curCategoryNo = data.categoryNo;
          self.state.categoryBody = cacheCategoryData;

          self.setState(self.state);

        }
        else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        APP.TOAST("服务器网线被挖断了", 1);
      });

  }


  JumpGoodsDetails(id) {
    APP.JUMP_TO("goodsDetails.html?goodsId=" + id);
  }

  /*--页面渲染--*/
  render() {
    let
      self = this,
      data = self.state,
      cBodyBoxHtm = [],
      cTitleBoxHtm = [];


    data.categoryTitle.map((item, index)=> {

      if (item.categoryNo == data.curCategoryNo) {

        cTitleBoxHtm.push(<span className="active" key={index}
                                onClick={self.swiperTabs.bind(self,item.categoryNo,index)}>{item.name}</span>);

        var cBody = data.categoryBody[item.categoryNo];

        var gItemHtm = [];

        if (cBody) {
          cBody.goodsList.map((goods, num)=> {
            //判断是组合支付中的价格是否存在
            var gSale = goods.unionPointRegular && goods.unionRmbRegular ? goods.unionPointRegular + " + ￥" + goods.unionRmbRegular : goods.pricePointRegular;

            gItemHtm.push(
              <div onClick={self.JumpGoodsDetails.bind(self,goods.goodsId)} key={num} className="g-item">
                <div className="g-img">
                  <img src={goods.picIcon}/>
                </div>
                <div className="g-intro">
                  <div className="g-name">{goods.goodsTitle}</div>
                  <div className="g-price">
                    <div className="g-price-inner">{gSale}</div>
                  </div>
                </div>
              </div>
            )
          });

          /*--banner部分--*/
          cBodyBoxHtm.push(
            <div className="c-body-wrap" key={index}>
              <div className="c-banner">
                <img src={cBody.goodsInfoImg}/>
              </div>
              <div className="c-content">
                <div className="c-g-list">
                  {gItemHtm}
                </div>
              </div>
            </div>
          );
        }
      }
      else {
        cTitleBoxHtm.push(<span key={index}
                                onClick={self.swiperTabs.bind(self,item.categoryNo,index)}>{item.name}</span>);
        cBodyBoxHtm.push(<div className="c-body-wrap" key={index}>

          <div className="content-null">
            <div className="content-null-inner"></div>
          </div>

        </div>);
      }
    });


    /*---商品内容这块的HTML---*/
    const paramsTitle = {
      /*width: (document.documentElement.clientWidth - 80) / 4,*/
      onInit: (swiper) => {
        self.cTitleSwiper = swiper;
      },
      onClick: (swiper, evt)=> {
        var
          activeIndex = swiper.activeIndex,
          translateX = swiper.translate;


        if (activeIndex < 2) {
          evt.stopPropagation();
          evt.preventDefault();
        }

      },
      preventClicksPropagation: true,
      slidesPerView: 4,
      centeredSlides: false,
      freeMode: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };

    /*---商品内容这块的HTML---*/
    const paramsBody = {
      onInit: (swiper) => {
        self.cBodySwiper = swiper;
      },
      onSlideChangeEnd: (swiper)=> {
        var
          activeIndex = swiper.activeIndex,
          cid = self.state.categoryTitle[activeIndex].categoryNo;

        if (self.cTitleSwiper) {
          self.cTitleSwiper.slideTo(activeIndex, 1000, false);
        }
        self.swiperTabs(cid, activeIndex);
      },
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swiper
    };


    var dropDownHtm, dropDownArr = [];
    if (self.state.dropdownFlag) {

      data.categoryTitle.map((item, index)=> {
        if (item.categoryNo == data.curCategoryNo) {

          dropDownArr.push(<span className="active" key={index}
                                 onClick={self.swiperTabs.bind(self,item.categoryNo,index,false)}
                                 data-categoryId={item.categoryNo}>{item.name}</span>);
        } else {

          dropDownArr.push(<span key={index} onClick={self.swiperTabs.bind(self,item.categoryNo,index,false)}
                                 data-categoryId={item.categoryNo}>{item.name}</span>);
        }
      });

      dropDownHtm = <div onClick={self.hideDropDown.bind(self)} className="c-title c-title-grid">
        <div className="g-inner">
          <div className="c-title-list">
            <div className="c-title-inner clearfix">
              {dropDownArr}
            </div>
          </div>
          <div onClick={self.hideDropDown.bind(self)} className="c-title-arrow">
            <i className="iconfont icon-down"></i>
          </div>
        </div>
      </div>
    }


    return (
      <div className="category-warp">

        {/*类别*/}
        <div className="c-title">
          <div className="c-title-list">
            <div className="c-title-inner">
              <Swiper {...paramsTitle}>
                {cTitleBoxHtm}
              </Swiper>

            </div>
          </div>
          <div onClick={self.showDropDown.bind(self)} className="c-title-arrow">
            <i className="iconfont icon-up"></i>
          </div>
        </div>

        {/*类别展开*/}
        {dropDownHtm}

        {/*类别的商品*/}
        <div className="c-body">
          <Swiper {...paramsBody}>
            {cBodyBoxHtm}
          </Swiper>
        </div>

      </div>);
  }
}
;


ReactDOM.render(
  <Category />,
  domRoot.root()
);

























