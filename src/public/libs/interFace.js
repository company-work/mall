'use strict';
var host = "http://192.168.2.242:8090";
//var host = "";
module.exports = {
  initIndexUrl: host + "/activity/banner/appBannerList.do?channel=APP_INDEX",
  initIndexCategoryUrl: host + "/activity/goods/categoryList.do",
  initCategoryUrl: host + "/activity/goods/categoryAll.do",
  initCategoryGoodsUrl: host + "/activity/goods/goodsList.do",
  initGoodsDetailsUrl: host + "/activity/goods/goodsDetail.do",
  initOrderResult: host + "/activity/order/getTradeResult.do",
  initCheckBuyBefore: host + "/activity/order/preSku.do",
  initBuyInfo: host + "/activity/goods/selectSku.do",
  initOrderDetails: host + "/activity/order/orderDetail.do",
  initMyPointUrl: host + "/activity/pointm/pntDetail.do",
  initExchangeUrl: host + "/activity/order/list.do",
  initLimitSaleUrl: host + "/activity/topic/specialTopic.do",
  checkAuth: host + "/activity/order/preTrade.do",
  checkGoodsUrl: host + "/activity/order/prexchange.do",
  getSkuUrl: host + "/activity/goods/selectSku.do",
  checkOrderUrl: host + "/activity/order/preSku.do",
  getOrderUrl: host + "/activity/order/orderDetail.do",
  subOrderUrl: host + "/activity/order/orderSubmit.do",
  getOrderStateUrl: host + "/activity/order/getTradeResult.do",
  putOrderUrl: host + "/activity/order/orderSubmit.do",
  checkPayUrl: host + "/activity/pay/tradePreCheck.do",
  initQuickUrl: host + "/activity/pay/quickPayInit.do",
  getVerifyCodeUrl: host + "/activity/pay/quickPayVerify.do",
  payOfPoint: host + "/activity/order/payOrder.do",
  payOfRmb: host + "/activity/order/payOrder.do"
};
