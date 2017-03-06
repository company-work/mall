'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './index.scss';
let domRoot = new Dom("page-index");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class Index extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    console.log("页面渲染完成");
  }

  /*跳转到我的积分页面*/
  JumpMyPoint() {
    console.log("go 我的积分页面");
  }

  /*跳转到限时抢购页面*/
  JumpLimitSale() {
    APP.JUMP_TO("limitSale.html");
  }
  /*跳转到商品类别页面*/
  JumpCategory() {
    APP.JUMP_TO("category.html");
  }

  render() {
    let self = this;
    return (
      <div className="index-warpper">
        {/*图片滚动*/}
        <div className="scrollBanner">
          <img src={require('../../public/imgs/test/1.jpg')}/>
        </div>
        {/*我的积分*/}
        <Layout onClick={self.JumpMyPoint.bind(self)} orient="row" className="pointBox">
          <Layout flex align="center" className="point-left">我的积分<span>1000</span></Layout>
          <Layout flex align="center" className="point-right">兑换记录</Layout>
        </Layout>
        {/*其它坑位*/}
        <div className="chainBox">外链盒子</div>
        {/*限时抢购*/}
        <Layout onClick={self.JumpLimitSale.bind(self)} orient="column" className="flashSale">
          <Layout className="flashSale-title" orient="row" align="center">
            限时抢购 10点场
            <span>01:12:23</span>
          </Layout>
          <Layout className="flashSale-body" orient="row">
            <Layout pack="center" align="center" className="f-img">
              <img src={require('../../public/imgs/test/2.jpg')}/>
            </Layout>
            <Layout orient="column" className="f-intro goods-intro" flex>
              <p className="g-name">传世琅琊国 马龙系列</p>
              <p className="g-sale">10000</p>
              <del className="g-price">30000</del>
            </Layout>
          </Layout>
        </Layout>
        {/*banner类别*/}
        <Layout className="bannerBox" orient="row" align="center" pack="center">
          <Layout align="center" pack="center" flex>
            <img src={require('../../public/imgs/test/3.jpg')}/>
          </Layout>
          <Layout align="center" pack="center" flex>
            <img src={require('../../public/imgs/test/4.jpg')}/>
          </Layout>

        </Layout>
        {/*推荐栏位*/}
        <div className="recommend">
          <div className="r-title">热卖推荐</div>
          <div className="r-body g-swiper-list">
            <div className="r-body-inner">
              <div className="r-item">
                <div className="r-item-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="r-item-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                  <del className="g-price">30000</del>
                </div>
              </div>
              <div className="r-item">
                <div className="r-item-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="r-item-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系龙系</p>
                  <p className="g-sale">10000</p>
                  <del className="g-price">30000</del>
                </div>
              </div>
              <div className="r-item">
                <div className="r-item-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="r-item-intro goods-intro">
                  <p className="g-name">传世琅系</p>
                  <p className="g-sale">10000</p>
                  <del className="g-price">30000</del>
                </div>
              </div>
              <div className="r-item">
                <div className="r-item-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="r-item-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                  <del className="g-price">30000</del>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*类别*/}
        <div className="categoryBox">
          <div onClick={self.JumpCategory.bind(self)} className="c-title">
            <img src={require('../../public/imgs/test/5.jpg')}/>
          </div>
          <div className="c-body g-swiper-list">
            <div className="g-body-inner">
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*类别*/}
        <div className="categoryBox">
          <div className="c-title">
            <img src={require('../../public/imgs/test/5.jpg')}/>
          </div>
          <div className="c-body g-swiper-list">
            <div className="g-body-inner">
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/2.jpg')}/>
                </div>
                <div className="g-intro goods-intro">
                  <p className="g-name">传世琅琊国马龙系</p>
                  <p className="g-sale">10000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
;


ReactDOM.render(
  <Index />,
  domRoot.root()
);

