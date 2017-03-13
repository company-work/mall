'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dom} from 'public/libs/utils';
import Layout from 'components/layerUI/Layout';
import InterFace from '../../public/libs/interFace.js';
import Axios from 'axios';
import Test from '../../test/mockTest.js';

import 'public/style/base.scss';
import 'public/style/iconfont.css';
import './myPoint.scss';
let domRoot = new Dom("page-myPoint");


import APP from 'public/libs/APP';

//每个页面都作为一个组件
class MyPoint extends React.Component {
  constructor() {
    super();
    this.state = {
      point:"",
      pointList:[],
      pageNum:1,
      pageTotal:10,
      next:false
    }
  }

  componentDidMount() {
    var self = this;

    self.updateData(1);


  }

  updateData(pageIndex){
    var self = this;
    Test.initMyPoint();

    Axios.get(InterFace.initMyPointUrl)
      .then(function (res) {
        if (res.data.stat=='ok') {
          var data = res.data;
          self.setState({
            point:data.totalPointAmount,
            pointList:data.pointList,
            pageNum:data.currentPage,
            pageTotal:data.totalPages,
            next:data.next
          })


        } else {
          APP.TOAST("服务器网线被挖断了", 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  JumpMallIndex(){
    APP.JUMP_TO("index.html");
  }
  JumpExchange(){
    APP.JUMP_TO("exchangeRecord.html");
  }

  render() {
    let
        self = this,
        state = self.state,
        pointItemHtm;

    pointItemHtm = state.pointList.map((item,index)=>{
      var price,priceHtm,clsName;
      if(item.direction=="I"){
        price = "+ "+item.pointAmount;
        clsName = "p-item-right p-item-add";
        priceHtm = <Layout flex align="center" pack="end" className={clsName}>{price}</Layout>
      }else{
        price = "- "+item.pointAmount;
        clsName = "p-item-right p-item-reduce";
        priceHtm = <Layout flex align="center" pack="end" className={clsName}>{price}</Layout>
      }

      return (
        <Layout key={index} className="p-item">
          <div className="p-item-left">
            <p>{item.title}</p>
            <p>{item.tranDate}</p>
          </div>
          {priceHtm}
        </Layout>
      );
    });






    return (
      <div className="myPoint-warp">
        <div className="point-title">
          <Layout pack="center" orient="column" className="point-num">
            总积分
            <p>{state.point}</p>
          </Layout>
          <Layout className="point-link">
            <Layout flex align="center" onClick={self.JumpMallIndex.bind(self)}  className="link-item">积分商城</Layout>
            <Layout flex align="center"  onClick={self.JumpExchange.bind(self)}  className="link-item">兑换记录</Layout>
          </Layout>
        </div>
        <div className="point-body">
          <h3>积分明细</h3>
          <div className="point-in-list">
            {pointItemHtm}
          </div>
        </div>
      </div>);
  }
}
;


ReactDOM.render(
  <MyPoint />,
  domRoot.root()
);






































