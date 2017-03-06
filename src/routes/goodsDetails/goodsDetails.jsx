'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './goodsDetails.scss';
let domRoot = new Dom("page-goodsDetails");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class GoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      dialogFlag: false
    }
  }

  componentDidMount() {
    console.log("页面渲染完成");
  }

  Buy() {
    let self = this;
    if (!self.state.dialogFlag) {
      self.setState({
        dialogFlag: true
      })
    }
  }

  BuyClose(){
    let self = this;
    if (self.state.dialogFlag) {
      self.setState({
        dialogFlag: false
      })
    }
  }

  render() {
    let self = this;
    let dialogHtm;
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
            <div onClick={self.BuyClose.bind(self)} className="g-buy-close"><i className="iconfont icon-close"></i></div>
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


    return (
      <div className="goodsDetails-warp">
        <div className={sCls}>
          <div className="g-title">
            <div className="g-img">
              <img src={require('../../public/imgs/test/7.jpg')}/>
            </div>
            <div className="g-intro">
              <div className="g-name">Carat砖石汤锅24cm</div>
              <div className="g-sale">10000 + ￥200<span>限时抢购</span></div>
              <del className="g-price">10000 + ￥160</del>
            </div>
          </div>
          <div className="g-desc">
            <h3>商品介绍</h3>
            <div className="g-desc-body">
              Carat系列锅具的设计灵感来源于闪亮的钻石，第一次的设计中锅钮材质是如香水瓶盖的ABS或SAN，但亚克力不耐高温后改成不锈钢材质，更好的还原钻石棱角质感。为体现了“厨房中闪耀的宝石”这一主题搭配的锅盖呼应钻石的多角形状，整个厨房也随之晶莹闪亮。
              内表面陶瓷安全涂层，采用自然界天然矿物中提取的陶瓷喷涂技术。添加紫水晶，与现有的一般喷涂相比，提高抗菌能力抗霉能力。
            </div>
          </div>
          <div className="g-details">
            <h3>宝贝详情</h3>
            <div className="g-details-body">
              <img src={require('../../public/imgs/test/8.jpg')}/>
              <img src={require('../../public/imgs/test/7.jpg')}/>
              <img src={require('../../public/imgs/test/6.jpg')}/>
              <img src={require('../../public/imgs/test/5.jpg')}/>
            </div>
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






































