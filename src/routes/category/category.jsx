'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './category.scss';
let domRoot = new Dom("page-category");


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


  render() {
    let self = this;
    return (
      <div className="category-warp">
        <div className="c-title">
          <div className="c-title-list">
            <div className="c-title-inner">
              <span>全部商品</span>
              <span>家居用品</span>
              <span>虚拟卡券</span>
              <span>卫生洗护</span>
              <span>生活用品</span>
              <span>成人用品</span>
              <span>休闲零食</span>
              <span>酒水饮料</span>
              <span>全部商品</span>
            </div>
          </div>
          <div className="c-title-arrow">
            <i className="iconfont icon-up"></i>
          </div>
          <div className="c-title-grid"></div>
        </div>
        <div className="c-body">
          <div className="c-banner">
            <img src={require("../../public/imgs/test/5.jpg")}/>
          </div>
          <div className="c-content">
            <div className="c-g-list">
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
                </div>
              </div>
              <div className="g-item">
                <div className="g-img">
                  <img src={require('../../public/imgs/test/6.jpg')} />
                </div>
                <div className="g-intro">
                  <div className="g-name">欧式呀粗多用过</div>
                  <div className="g-price">
                    <div className="g-price-inner">10000</div>
                  </div>
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






































