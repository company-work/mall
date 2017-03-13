'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import Swiper from 'react-id-swiper';

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
    this.state = {}
  }

  componentDidMount() {
    console.log("页面渲染完成");
  }


  render() {
    let self = this;
    const params = {
      slidesPerView: 4,
      centeredSlides: true,
      paginationClickable: true,
      grabCursor: true
    };
    return (
      <div className="limitSale-warp">
        <Layout orient="column" className="limit-tabs">
          <div className="tabs-title">
            <div className="tabs-title-inner">
              <Swiper {...params}>
                <div className="t-item">
                  <p>22:00</p>
                  <div>已开抢</div>
                </div>
                <div className="t-item">
                  <p>22:00</p>
                  <div>已开抢</div>
                </div>
                <div className="t-item">
                  <p>22:00</p>
                  <div>已开抢</div>
                </div>
                <div className="t-item">
                  <p>22:00</p>
                  <div>已开抢</div>
                </div>
                <div className="t-item">
                  <p>22:00</p>
                  <div>已开抢</div>
                </div>
              </Swiper>
              <div className="t-item-active"></div>
            </div>
          </div>
          <div className="tabs-intro-time">
            <div>
              本场还剩<span>01:27:54</span>
            </div>
          </div>
          <Layout flex className="tabs-body">

            <Layout orient="column" className="tabs-content">
              <Layout orient="row" className="goods-item">
                <Layout orient="row" pack="center" align="center" className="g-img">
                  <img src={require("../../public/imgs/test/6.jpg")}/>
                </Layout>
                <Layout orient="column" flex className="g-intro">
                  <p className="g-name">传世琅琊锅 马卡龙系列</p>
                  <p className="g-price">
                    <span>10000</span>
                    <del>30000</del>
                  </p>
                  <div className="g-stock">
                    <div className="g-stock-txt">仅剩150件</div>
                    <div className="g-stock-inner"></div>
                  </div>
                  <div className="g-btn">马上抢</div>
                </Layout>
              </Layout>

              <Layout orient="row" className="goods-item">
                <Layout orient="row" pack="center" align="center" className="g-img">
                  <img src={require("../../public/imgs/test/6.jpg")}/>
                </Layout>
                <Layout orient="column" flex className="g-intro">
                  <p className="g-name">传世琅琊锅 马卡龙系列</p>
                  <p className="g-price">
                    <span>10000</span>
                    <del>30000</del>
                  </p>
                  <div className="g-stock">
                    <div className="g-stock-txt">仅剩150件</div>
                    <div className="g-stock-inner"></div>
                  </div>
                  <div className="g-btn">马上抢</div>
                </Layout>
              </Layout>


              <Layout orient="row" className="goods-item">
                <Layout orient="row" pack="center" align="center" className="g-img">
                  <img src={require("../../public/imgs/test/6.jpg")}/>
                </Layout>
                <Layout orient="column" flex className="g-intro">
                  <p className="g-name">传世琅琊锅 马卡龙系列</p>
                  <p className="g-price">
                    <span>10000</span>
                    <del>30000</del>
                  </p>
                  <div className="g-stock">
                    <div className="g-stock-txt">仅剩150件</div>
                    <div className="g-stock-inner"></div>
                  </div>
                  <div className="g-btn">马上抢</div>
                </Layout>
              </Layout>


              <Layout orient="row" className="goods-item">
                <Layout orient="row" pack="center" align="center" className="g-img">
                  <img src={require("../../public/imgs/test/6.jpg")}/>
                </Layout>
                <Layout orient="column" flex className="g-intro">
                  <p className="g-name">传世琅琊锅 马卡龙系列</p>
                  <p className="g-price">
                    <span>10000</span>
                    <del>30000</del>
                  </p>
                  <div className="g-stock">
                    <div className="g-stock-txt">仅剩150件</div>
                    <div className="g-stock-inner"></div>
                  </div>
                  <div className="g-btn">马上抢</div>
                </Layout>
              </Layout>


              <Layout orient="row" className="goods-item">
                <Layout orient="row" pack="center" align="center" className="g-img">
                  <img src={require("../../public/imgs/test/6.jpg")}/>
                </Layout>
                <Layout orient="column" flex className="g-intro">
                  <p className="g-name">传世琅琊锅 马卡龙系列</p>
                  <p className="g-price">
                    <span>10000</span>
                    <del>30000</del>
                  </p>
                  <div className="g-stock">
                    <div className="g-stock-txt">仅剩150件</div>
                    <div className="g-stock-inner"></div>
                  </div>
                  <div className="g-btn">马上抢</div>
                </Layout>
              </Layout>

            </Layout>

          </Layout>
        </Layout>
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

