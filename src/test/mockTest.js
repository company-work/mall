"use strict";
import Mock from 'mockjs';
import InterFace from '../public/libs/interFace.js';

var Test = {
  initIndex(){
    console.log("----积分商城首页测试数据----");
    Mock.mock('/activity/banner/appBannerList.do?channel=app_index', {
      // a0001:积分商城新版顶部;(banner)
      // a0002:首页栏位下部;(限时快抢）
      // a0003:首页左侧大栏位;（chainbox第一个）
      // a0004:首页右侧大栏位;（chainbox第二个）
      // a0005:左右侧下方（recommend推荐）
      'banners': {
        'a0001': [
          {
            "picUrl": "http://image.uisdc.com/wp-content/uploads/2017/01/motion-design-software-top-banner-750x380.jpg",
            "targetUrl": "http://image.uisdc.com/wp-content/uploads/2017/01/motion-design-software-top-banner-750x380.jpg",
            "des": ""
          },
          {
            "picUrl": "http://image.uisdc.com/wp-content/uploads/2016/12/2017-ux-design-trends-banner-750x380.jpg",
            "targetUrl": "http://image.uisdc.com/wp-content/uploads/2016/12/2017-ux-design-trends-banner-750x380.jpg",
            "des": ""
          },
          {
            "picUrl": "http://image.uisdc.com/wp-content/uploads/2017/01/motion-design-software-top-banner-750x380.jpg",
            "targetUrl": "http://image.uisdc.com/wp-content/uploads/2017/01/motion-design-software-top-banner-750x380.jpg",
            "des": ""
          }
        ],
        'a0002': [
          {
            "title": "限时快抢",
            "quickBuyInfo": {                         //显示快抢对象
              "bannerTitle": "限时快抢20170223",        //banner标题
              "goodsTitle": "限时快抢HYT集分宝",         //商品标题
              "timesTitle": "15点场",                  //场次
              "countTime": "2017-02-24 18:00:00",     //倒计时
              "picIcon": "http://b1.hucdn.com/upload/item/1702/23/34744725302877_500x500.jpg!230x230.jpg",      //商品图片地址

              "pricePointDiscount": 1,     //折扣积分
              "pricePointRegular": 5000,   //积分原价

              "a": "200 +　200",
              "b": "5000",
              "unionPoint": 200,           //组合支付中的折扣积分价
              "unionRmb": 400,             //组合支付中的折扣现金价

              "unionPointRegular": null,    //组合支付中的积分原价
              "unionRmbRegular": null       //组合支付中的现金原价
            }
          }
        ],
        'a0003': [
          {
            "picUrl": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",
            "targetUrl": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",
            "des": ""
          }
        ],
        'a0004': [
          {
            "picUrl": "http://b2.hucdn.com/upload/hmp/1702/10/16425328961675_750x300.jpg?webp=0",
            "targetUrl": "http://b2.hucdn.com/upload/hmp/1702/10/16425328961675_750x300.jpg?webp=0",
            "des": ""
          }
        ],
        'a0005': [
          {
            "title": "限时快抢",
            "hotSaleInfo": {
              "bannerTitle": "限时快抢20170223",   //热卖推荐banner标题
              "goodsList": [               //热卖推荐中的商品（推荐到首页的商品）
                {
                  "pricePoint": 100,   //积分价
                  "pricePointRegular": 1000, //积分原价
                  "goodsTitle": "【精选】牛津布抽屉式收纳盒CW",         //商品标题
                  "picIcon": "http://192.168.2.112/fup/image/pointmall/goods/201511/20151123150517.png",     //商品图片
                  "minUnion": {      //组合支付最低现价
                    "unionPoint": 100,    //积分价
                    "unionRmb": 200      //现金价
                  },
                  "maxUnionRegular": {   //组合支付最高原来价
                    "unionPoint": 300,
                    "unionRmb": 400
                  },
                  "goodsId": 551,   //商品Id
                  "goodsTag": "精选实物"   //商品标签
                },
                {
                  "pricePoint": 4000,
                  "pricePointRegular": 10000,
                  "goodsTitle": "精选卡券czd003",
                  "picIcon": "http://b1.hucdn.com/upload/item/1703/02/47090663137089_800x800.jpg!230x230.jpg",
                  "minUnion": null,
                  "maxUnionRegular": null,
                  "goodsId": 246,
                  "goodsTag": ""
                },
                {
                  "pricePoint": 8000,
                  "pricePointRegular": 20000,
                  "goodsTitle": "精选卡券czd003",
                  "picIcon": "http://b1.hucdn.com/upload/item/1606/01/67914099760612_800x800.jpg!230x230.jpg",
                  "minUnion": null,
                  "maxUnionRegular": null,
                  "goodsId": 246,
                  "goodsTag": ""
                }
              ]
            }
          }
        ]
      },
      "message": "",
      "timeout": false,
      "succ": true,
      "is_succ": true,
      "err_msg": "",
      "overdue": false,
      "err_code": ""
    });
  },
  initIndexCategory(){
    console.log("----积分商城首页产品类别测试数据----");
    Mock.mock('/activity/goods/categoryList.do', {
      // a0001:积分商城新版顶部;(banner)
      // a0002:首页栏位下部;(限时快抢）
      // a0003:首页左侧大栏位;（chainbox第一个）
      // a0004:首页右侧大栏位;（chainbox第二个）
      // a0005:左右侧下方（recommend推荐）
      "categoryList": [
        {
          "categoryNo": "0L",   //分类编号
          "goodsList": [     //类目下商品  (字段意义同热卖推荐中的字段)
            {
              "pricePoint": 100,
              "pricePointRegular": 1000,
              "goodsTitle": "【精选】牛津布抽屉式收纳盒CW",
              "picIcon": "http://192.168.2.112/fup/image/pointmall/goods/201511/20151123150517.png",
              "minUnion": {
                "unionPoint": 100,
                "unionRmb": 200
              },
              "maxUnionRegular": {
                "unionPoint": 300,
                "unionRmb": 400
              },
              "goodsId": 551,
              "goodsTag": "精选实物"
            },
            {
              "pricePoint": 1500,
              "pricePointRegular": 10000,
              "goodsTitle": "精选卡券czd003",
              "picIcon": "http://b1.hucdn.com/upload/item/1702/28/70836539016719_800x800.jpg!230x230.jpg",
              "minUnion": null,
              "maxUnionRegular": null,
              "goodsId": 246,
              "goodsTag": ""
            },
            {
              "pricePoint": 500,
              "pricePointRegular": 2000,
              "goodsTitle": "精选卡券czd003",
              "picIcon": "http://b1.hucdn.com/upload/item/1701/21/79547129398474_800x800.jpg!230x230.jpg",
              "minUnion": null,
              "maxUnionRegular": null,
              "goodsId": 246,
              "goodsTag": ""
            },
            {
              "pricePoint": 3223,
              "pricePointRegular": 1000,
              "goodsTitle": "精选卡券czd003",
              "picIcon": "http://b1.hucdn.com/upload/item/1703/02/23091292760141_800x800.jpg!230x230.jpg",
              "minUnion": null,
              "maxUnionRegular": null,
              "goodsId": 246,
              "goodsTag": ""
            },
            {
              "pricePoint": 15000,
              "pricePointRegular": 1000,
              "goodsTitle": "精选卡券czd003",
              "picIcon": "http://b1.hucdn.com/upload/item/1702/14/60047428221536_800x800.jpg!230x230.jpg",
              "minUnion": null,
              "maxUnionRegular": null,
              "goodsId": 246,
              "goodsTag": ""
            },
            {
              "pricePoint": 5000,
              "pricePointRegular": 1000,
              "goodsTitle": "精选卡券czd003",
              "picIcon": "http://b1.hucdn.com/upload/item/1601/14/41009174191961_800x800.jpg!230x230.jpg",
              "minUnion": null,
              "maxUnionRegular": null,
              "goodsId": 246,
              "goodsTag": ""
            }
          ],
          "picBig": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",   //分类大图
          "categoryName": "精选-测试数据组"           //分类名
        },
        {
          "categoryNo": "0H",
          "goodsList": [],
          "picBig": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",
          "categoryName": "红包测试"
        },
        {
          "categoryNo": "02",
          "goodsList": [],
          "picBig": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",
          "categoryName": "家居/厨房"
        },
        {
          "categoryNo": "0I",
          "goodsList": [],
          "picBig": "http://image.uisdc.com/wp-content/uploads/2017/03/uisdc-camp-ps-ai-ae-banner.jpg",
          "categoryName": "虚拟卡券"
        }
      ],
      "stat": "ok",
      "msg": null
    });
  },
  initCategoryList(){
    console.log("----积分商城类别页面大类测试数据----");
    Mock.mock('/activity/goods/categoryAll.do', {
      "categoryList": [
        {
          "name": "全部",
          "categoryNo": "0Q"
        },
        {
          "name": "家居用品",
          "categoryNo": "0N"
        },
        {
          "name": "虚拟卡券",
          "categoryNo": "0M"
        },
        {
          "name": "卫生洗护",
          "categoryNo": "0J"
        },
        {
          "name": "盈盈专区",
          "categoryNo": "0K"
        },
        {
          "name": "厨房用品",
          "categoryNo": "0R"
        },
        {
          "name": "汽车用品",
          "categoryNo": "0A"
        },
        {
          "name": "数码专区",
          "categoryNo": "0B"
        }
      ],
      "stat": "ok",
      "msg": null
    });
  },
  initCategoryGoods(){
    console.log("----积分商城类别下的商品列表测试数据----");
    Mock.mock('/activity/goods/goodsList.do', {
      "name": "红包测试",
      "goodsInfoList": [
        {
          "pricePointRegular": 11,
          "pricePoint": 1,
          "goodsTitle": "红包有效期",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/28/52524031096417_800x800.jpg!320x320.jpg",
          "goodsId": 477,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 21,
          "pricePoint": 21,
          "goodsTitle": "商品上传3",
          "picIcon": "http://b1.hucdn.com/upload/item/1703/03/03915412146417_800x800.jpg!320x320.jpg",
          "goodsId": 388,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 1111,
          "pricePoint": 1,
          "goodsTitle": "优化页面",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/25/88983051646417_800x800.jpg!320x320.jpg",
          "goodsId": 478,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 555,
          "pricePoint": 1,
          "goodsTitle": "红包包有效期",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/27/94259791976417_800x800.jpg!320x320.jpg",
          "goodsId": 472,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 1111,
          "pricePoint": 1,
          "goodsTitle": "优化页面",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/25/88983051646417_800x800.jpg!320x320.jpg",
          "goodsId": 478,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 555,
          "pricePoint": 1,
          "goodsTitle": "红包包有效期",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/27/94259791976417_800x800.jpg!320x320.jpg",
          "goodsId": 472,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 1111,
          "pricePoint": 1,
          "goodsTitle": "优化页面",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/25/88983051646417_800x800.jpg!320x320.jpg",
          "goodsId": 478,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 555,
          "pricePoint": 1,
          "goodsTitle": "红包包有效期",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/27/94259791976417_800x800.jpg!320x320.jpg",
          "goodsId": 472,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 1111,
          "pricePoint": 1,
          "goodsTitle": "优化页面",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/25/88983051646417_800x800.jpg!320x320.jpg",
          "goodsId": 478,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        },
        {
          "pricePointRegular": 555,
          "pricePoint": 1,
          "goodsTitle": "红包包有效期",
          "picIcon": "http://b1.hucdn.com/upload/item/1702/27/94259791976417_800x800.jpg!320x320.jpg",
          "goodsId": 472,
          "minUnion": null,
          "maxUnionRegular": null,
          "goodsTag": ""
        }
      ],
      "categoryNo|1": ["0Q", "0N", "0M", "0J", "0K", "0R", "0A", "0B"],
      "picSmall": "http://b1.hucdn.com/upload/show/1702/27/02698652799521_750x350.jpg!hphb.jpg",
      "pageNum": 1,
      "totalPages": 2,
      "next": true,
      "stat": "ok",
      "msg": null
    });
  },
  initMyPoint(){
    console.log("----初始化我的积分数据----");
    Mock.mock(InterFace.initMyPointUrl, {
      "totalPointAmount": "20000",
      "availablePointAmount": "20000",
      "pointList": [
        {
          "typeName":"积分兑商品",   //积分子名称
          "title":"2000集分宝-脚...",  //积分名称
          "pointAmount":1,    //兑换的积分数量
          "tranDate":"2017-03-13 06:06",
          "direction":"O"   //积分流失方向 out:支出  in:收入
        },
        {
          "typeName":"积分兑商品",
          "title":"517获取红包回归",
          "pointAmount":10,
          "tranDate":"2017-03-13 06:05",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"流量包-脚本勿动",
          "pointAmount":1,
          "tranDate":"2017-03-13 06:05",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"2000集分宝-脚...",
          "pointAmount":1,
          "tranDate":"2017-03-12 06:05",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"517获取红包回归",
          "pointAmount":10,
          "tranDate":"2017-03-12 06:04",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"流量包-脚本勿动",
          "pointAmount":1,
          "tranDate":"2017-03-12 06:03",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"2000集分宝-脚...",
          "pointAmount":1,
          "tranDate":"2017-03-11 06:04",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"517获取红包回归",
          "pointAmount":10,
          "tranDate":"2017-03-11 06:03",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"流量包-脚本勿动",
          "pointAmount":1,
          "tranDate":"2017-03-11 06:03",
          "direction":"O"
        },
        {
          "typeName":"积分兑商品",
          "title":"2000集分宝-脚...",
          "pointAmount":1,
          "tranDate":"2017-03-10 06:05",
          "direction":"O"
        }
      ],
      "stat": "ok",
      "currentPage": 1,
      "totalPages": 10,
      "next": false,
      "msg": null
    });
  },
  initPointRecord(){
    console.log("----初始化兑换记录----");
    Mock.mock(InterFace.initExchangeUrl, {
      "orderSummaryInfos": [
        {
          "tradeOrderNO": "66082017021600916069",   //交易订单号
          "payStatus": "已付款",                      //支付状态
          "dispatchStatus": "DISPATCHED",           //配送状态
          "itemCode": "166",                        // 商品编号/活动编号
          "quantity": 1,                            //数量
          "itemTitle": "2000集分宝-脚本勿动",          //商品标题
          "goodsType": "JIFENBAO",                  //商品类型
          "gmtCreate": "2017-02-16",                //购买时间
          "rmb": 0,                                 //订单人民币
          "payRmb": 0,                              //支付人民币
          "tradeType": null,                        //交易支付方式
          "orderNO": 90855,                         //订单号
          "traceVoucher": "",                       //配送凭证
          "pointAmount": 2100,                      //订单金额(积分)
          "pointPayAmount": 1                       //实际支付金额(积分)
        },
        {
          "tradeOrderNO": "66082017021600916068",
          "payStatus": "已付款",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "481",
          "quantity": 1,
          "itemTitle": "还款金兑换-脚本专用",
          "goodsType": "REPAYMENT_MONEY",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90854,
          "traceVoucher": "61201702160074216",
          "pointAmount": 1,
          "pointPayAmount": 1
        },
        {
          "tradeOrderNO": "66082017021600916067",
          "payStatus": "状态",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "60",
          "quantity": 1,
          "itemTitle": "话费-脚本专用",
          "goodsType": "CHONGZHI",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90853,
          "traceVoucher": "1656565655656",
          "pointAmount": 7000,
          "pointPayAmount": 1
        },
        {
          "tradeOrderNO": "66082017021600916069",   //交易订单号
          "payStatus": "已付款",                      //支付状态
          "dispatchStatus": "DISPATCHED",           //配送状态
          "itemCode": "166",                        // 商品编号/活动编号
          "quantity": 1,                            //数量
          "itemTitle": "2000集分宝-脚本勿动",          //商品标题
          "goodsType": "JIFENBAO",                  //商品类型
          "gmtCreate": "2017-02-16",                //购买时间
          "rmb": 0,                                 //订单人民币
          "payRmb": 0,                              //支付人民币
          "tradeType": null,                        //交易支付方式
          "orderNO": 90855,                         //订单号
          "traceVoucher": "",                       //配送凭证
          "pointAmount": 2100,                      //订单金额(积分)
          "pointPayAmount": 1                       //实际支付金额(积分)
        },
        {
          "tradeOrderNO": "66082017021600916068",
          "payStatus": "已付款",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "481",
          "quantity": 1,
          "itemTitle": "还款金兑换-脚本专用",
          "goodsType": "REPAYMENT_MONEY",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90854,
          "traceVoucher": "61201702160074216",
          "pointAmount": 1,
          "pointPayAmount": 1
        },
        {
          "tradeOrderNO": "66082017021600916067",
          "payStatus": "状态",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "60",
          "quantity": 1,
          "itemTitle": "话费-脚本专用",
          "goodsType": "CHONGZHI",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90853,
          "traceVoucher": "1656565655656",
          "pointAmount": 7000,
          "pointPayAmount": 1
        },
        {
          "tradeOrderNO": "66082017021600916069",   //交易订单号
          "payStatus": "已付款",                      //支付状态
          "dispatchStatus": "DISPATCHED",           //配送状态
          "itemCode": "166",                        // 商品编号/活动编号
          "quantity": 1,                            //数量
          "itemTitle": "2000集分宝-脚本勿动",          //商品标题
          "goodsType": "JIFENBAO",                  //商品类型
          "gmtCreate": "2017-02-16",                //购买时间
          "rmb": 0,                                 //订单人民币
          "payRmb": 0,                              //支付人民币
          "tradeType": null,                        //交易支付方式
          "orderNO": 90855,                         //订单号
          "traceVoucher": "",                       //配送凭证
          "pointAmount": 2100,                      //订单金额(积分)
          "pointPayAmount": 1                       //实际支付金额(积分)
        },
        {
          "tradeOrderNO": "66082017021600916068",
          "payStatus": "已付款",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "481",
          "quantity": 1,
          "itemTitle": "还款金兑换-脚本专用",
          "goodsType": "REPAYMENT_MONEY",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90854,
          "traceVoucher": "61201702160074216",
          "pointAmount": 1,
          "pointPayAmount": 1
        },
        {
          "tradeOrderNO": "66082017021600916067",
          "payStatus": "状态",
          "dispatchStatus": "DISPATCHED",
          "itemCode": "60",
          "quantity": 1,
          "itemTitle": "话费-脚本专用",
          "goodsType": "CHONGZHI",
          "gmtCreate": "2017-02-16",
          "rmb": 0,
          "payRmb": 0,
          "tradeType": null,
          "orderNO": 90853,
          "traceVoucher": "1656565655656",
          "pointAmount": 7000,
          "pointPayAmount": 1
        }
      ],
      "pageNum": 1,
      "totalPages": 29,
      "next": false,
      "stat": "ok",
      "msg": null
    });
  },
  initGoodsDetails(){
    console.log("----初始化商品详情数据----");
    Mock.mock(InterFace.initGoodsDetailsUrl, {
      "goodsInfo": {
        "goodsId": 599,                //商品ID
        "goodsTitle": "【京东超市】百草味 和田红枣夹核桃仁 干果零食特产 抱抱果260g/袋",    //标题

        "coveList": [                    //商品封面列表
          {
            "goodsImg": "http://m.360buyimg.com/n12/jfs/t3241/141/6349677155/118770/5370f76f/58a3b766Nf2357e9a.jpg!q70.jpg",
            "imgTitle": "1"
          },
          {
            "goodsImg": "http://m.360buyimg.com/n12/jfs/t3097/267/5721605369/172484/131deea7/587dc017N642716aa.jpg!q70.jpg",
            "imgTitle": "2"
          },
          {
            "goodsImg": "http://m.360buyimg.com/n12/jfs/t3838/322/3238024219/78332/6e37659c/587c93e4Nb206ea0b.jpg!q70.jpg",
            "imgTitle": "3"
          },
          {
            "goodsImg": "http://m.360buyimg.com/n12/s828x828_jfs/t3853/112/1457234920/99775/b32aa658/587c93e5N8545d9ca.jpg!q70.jpg",
            "imgTitle": "4"
          }
        ],
        "goodsIntro": "<p>Carat系列锅具的设计灵感来源于闪亮的钻石，第一次的设计中锅钮材质是如香水瓶盖的ABS或SAN，但亚克力不耐高温后改成不锈钢材质，更好的还原钻石棱角质感。为体现了“厨房中闪耀的宝石”这一主题搭配的锅盖呼应钻石的多角形状，整个厨房也随之晶莹闪亮。内表面陶瓷安全涂层，采用自然界天然矿物中提取的陶瓷喷涂技术。添加紫水晶，与现有的一般喷涂相比，提高抗菌能力抗霉能力。</p><p><img src='http://img30.360buyimg.com/jgsq-productsoa/jfs/t3877/223/1532759576/704129/c66daa34/587dcc37Ne2bbcadf.jpg' /></p>",         //商品介绍
        "pricePointRegular": 200,  //积分原价
        "pricePoint": 100,        //积分现价

        "isShowTeJiao": "no",
        "picIcon": "小图",          //商品小图
        "priceRMB": 2,             //人民币价格
        "inventory": 19,           //商品当前库存(总库存)
        "shareId": 0,              //分享配置ID
        "picBanner": null,         // 商品banner图

        "gmtSaleStart": null,       //商品开售时间
        "goodsStatus": "SHELVED",   //商品上下架状态
        "showOrder": 999999999,     //排序(越大越前)
        "gmtSaleEnd": "2017-02-27", //商品停售时间
        "picTop": "头部图片",         //商品头部大图
        "originalInventory": 120,   //商品原始库存


        "minPoint": 110,               //现在最低积分价
        "minUnion": {                  //现在的最低组合
          "unionPoint": 100,
          "unionRmb": 200
        },

        "minPointRegular": 220,         //原来最低积分价
        "minUnionRegular": {            //原来的 最低组合
          "unionPoint": 200,
          "unionRmb": 300
        },
        "maxPoint": null,              //现在最高积分价
        "maxUnionRegular": null,        //原来的 最高组合
        "maxPointRegular": null,        //原来 最高积分价
        "maxUnion": null,               //现在的最高组合

        "goodsTag": "",                 //商品标签
        "effectiveTime": null,          //商品有效期

        "importantInfo": "重要说明",      //重要说明
        "buyFlow": "购买流程",
        "pricePointDiscount": null,     //商品折扣价
        "hitPriceNum": null,            // 中奖号
        "goodsShowType": "SELECTNESS",  // 商品展示类型
        "restSecondStart": -1,          //商品开售剩余秒数
        "restSecondEnd": -60648,        // 商品停售剩余秒数
        "applyNum": 0                  //订单数量

      },
      "stat": "ok",
      "msg": null
    });
  }

};


export default Test;
