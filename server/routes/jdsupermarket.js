var express = require('express')
var router = express.Router()
var fs = require('fs')
var url = require('url')

//获取推荐上面的数据
var supermarketdatas = {
  sliders: [
    'https://m.360buyimg.com/babel/jfs/t1/97904/25/537/142154/5dafa95aE743e4eca/0ebc8519b58b599d.jpg!q70.webp',
    'https://m.360buyimg.com/babel/jfs/t1/44787/20/14521/198611/5db8fdb5E2024cd16/e1109e2ae832e1fc.jpg!q70.webp',
    'https://m.360buyimg.com/babel/jfs/t1/62022/26/13244/229861/5dad10c8Eea4bfba5/359ea8e21bfbf909.jpg!q70.webp',
    'https://m.360buyimg.com/babel/jfs/t1/70439/38/14293/195037/5db9b898E2b1a6bd7/ac06f561e9d43b4b.jpg!q70.webp'
  ],
  serverImg: 'https://m.360buyimg.com/mobilecms/jfs/t1/72337/16/14150/18134/5db93982E369e57d0/f9bf261501493533.png!q70.webp',
  superjie: 'https://m.360buyimg.com/mobilecms/jfs/t1/66332/1/14203/247701/5db8f62dEa7215c0b/d9e05c9f3604d565.gif!q70.webp',
  classify: [
    {
      title: '时令生鲜',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/69599/39/8717/17741/5d68e820E8776e6d2/c2d0c68d86399419.png!q70.webp'
    },
    {
      title: '居家用品',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/56073/2/13315/38811/5da13c50Ea830d8c1/cf33a079a668ce7b.png!q70.webp'
    },
    {
      title: '个人护理',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/40623/34/275/8584/5cc15bdeE36893bc4/166bd93db2883142.png!q70.webp'
    },
    {
      title: 'Plus会员',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/81826/4/13442/9799/5da99931E349ef513/9c50e1390e50b267.png!q70.webp'
    },
    {
      title: '坚果蜜饯',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/30772/34/15471/11597/5cc15bf7Eef0d8313/6af74e699fec52e9.png!q70.webp'
    },
    {
      title: '京东到家',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/37507/13/5323/6345/5cc15b80E7f939968/80b16edc70677e96.png!q70.webp'
    },
    {
      title: '山姆会员',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/34674/34/5893/5394/5cc15b88Eabf3078d/221095402d71717b.png!q70.webp'
    },
    {
      title: '沃尔玛',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/36542/16/5886/5110/5cc15b90E151c7d96/b8e7542a04d091ec.png!q70.webp'
    },
    {
      title: '香水彩妆',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/30353/32/15345/10751/5cc15bf0Ecacbcf0d/1badec8e6667865c.png!q70.webp'
    },
    {
      title: '超市签到',
      srcImg: 'https://m.360buyimg.com/babel/jfs/t1/83056/4/12770/17940/5da7c0f6E1ba2f316/26d28d4e8d621b65.png!q70.webp'
    },
  ],
  shoppingRush: [
    {
      imgSrc: 'http://m.360buyimg.com/babel/jfs/t1/44841/3/14673/330667/5dba356aE5cb0cef8/90078e5bcb61833e.jpg!q70.webp',
      descript: '韩束护肤品化妆品套装巨补水保湿提亮肤色 墨菊补水润养礼盒八件套(洗面奶爽肤水乳液精华霜BB霜眼霜）',
      oriPrice: '399',
      price: '219',
      count: 12
    },
    {
      imgSrc: 'https://m.360buyimg.com/babel/jfs/t1/76974/12/14222/219936/5dba7118Ea362d567/bf78ae97e04911d2.jpg!q70.webp',
      descript: 'Pouch 帛琦 欧式婴儿餐椅儿童多功能宝宝餐椅可折叠便携式吃饭桌椅座椅K05 藏青色',
      oriPrice: '199',
      price: '119',
      count: 0
    },
    {
      imgSrc: 'https://m.360buyimg.com/babel/jfs/t1/65389/31/13376/343530/5da8077fE1758bc9b/a81b517e422e9454.jpg!q70.webp',
      descript: '独角兽厨房全麦面包无添加蔗糖健身餐高饱腹粗粮杂粮吐司切片面包早餐食品代餐2斤装整箱 ',
      oriPrice: '199',
      price: '219',
      count: 3
    },
    {
      imgSrc: 'https://m.360buyimg.com/babel/jfs/t25429/345/1351017193/901258/821966a9/5baddaacN2068de9e.jpg!q70.webp',
      descript: '麦酥园肉类休闲零食大礼包一整箱送女友女生儿童礼盒豆干食品超市网红好吃的组合装1500g',
      oriPrice: '399',
      price: '219',
      count: 3
    },
    {
      imgSrc: 'https://m.360buyimg.com/babel/jfs/t1/82857/24/11559/348321/5d8efaedEcbeb7107/a5bd25b6809a7228.png!q70.webp',
      descript: '蒙牛 特仑苏纯牛奶 250mlx16 礼盒装【官方旗舰店】',
      oriPrice: '399',
      price: '219',
      count: 3
    },
    {
      imgSrc: 'https://m.360buyimg.com/babel/jfs/t23761/88/513571179/290007/ccdc0af3/5b32ee98N04ff0a88.jpg!q70.webp',
      descript: '鲁花 食用油 5S 压榨一级 花生油 5L（赠酱油或香油，赠完为止，新老包装随机发放）',
      oriPrice: '399',
      price: '219',
      count: 3
    },
  ],
  DiscountSale: {
    titleImg: 'https://m.360buyimg.com/deepvisual/jfs/t1/66077/36/9779/14235/5d7710ccE8077000d/6b246f6a42cb4a67.png!q70.webp',
    bigImg: 'https://m.360buyimg.com/babel/jfs/t1/62808/19/13378/158754/5dad456cE4420ef4b/fa05a2472fbf74ff.jpg!q70.webp',
    smallImgs: [
      'https://m.360buyimg.com/babel/jfs/t1/49691/27/14019/65919/5daec21cEe1c8616e/3cfca8589cb3350f.png!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/55348/22/13660/71652/5da6e7e5E36cf23bc/ec1914527d311ef8.png!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/47756/5/14162/42389/5daed288E4458a6bc/bd57e5cd64ae744e.jpg!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/47613/15/14509/59814/5db7e8e7Ed61eee62/37f7c40dc801d210.png!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/60939/8/14126/50628/5db6916cE4f9758e7/7745b4cbcbd1dbee.png!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/60939/8/14126/50628/5db6916cE4f9758e7/7745b4cbcbd1dbee.png!q70.webp',
      'https://m.360buyimg.com/babel/jfs/t1/60939/8/14126/50628/5db6916cE4f9758e7/7745b4cbcbd1dbee.png!q70.webp',
    ]
  },
  OverflowVolume: {
    titleImg: 'https://m.360buyimg.com/deepvisual/jfs/t1/48562/25/10348/13171/5d76fcd2E64e80389/29541795ab2b5a5a.png!q70.webp',
    hotDataImg: 'https://m.360buyimg.com/babel/jfs/t1/48811/38/11102/140219/5d804029Ec6ca683a/f63c2e2d7b3b0d2f.png!q70.webp',
    rightDatas: [
      {
        imgSrc: 'https://m.360buyimg.com/deepvisual/jfs/t1/102007/21/1134/261681/5dba56e6E81913946/8b449a87eaebb4f4.jpg!q70.webp',
        description: 'utena佑天兰黄金果冻面膜3盒9片补水保湿 提亮肤色 紧致面膜(男女护肤套装)日本面膜',
        price: '199'
      },
      {
        imgSrc: 'https://m.360buyimg.com/deepvisual/jfs/t1/102007/21/1134/261681/5dba56e6E81913946/8b449a87eaebb4f4.jpg!q70.webp',
        description: 'utena佑天兰黄金果冻面膜3盒9片补水保湿 提亮肤色 紧致面膜(男女护肤套装)日本面膜',
        price: '199'
      },
      {
        imgSrc: 'https://m.360buyimg.com/deepvisual/jfs/t1/102007/21/1134/261681/5dba56e6E81913946/8b449a87eaebb4f4.jpg!q70.webp',
        description: 'utena佑天兰黄金果冻面膜3盒9片补水保湿 提亮肤色 紧致面膜(男女护肤套装)日本面膜',
        price: '199'
      },
      {
        imgSrc: 'https://m.360buyimg.com/deepvisual/jfs/t1/102007/21/1134/261681/5dba56e6E81913946/8b449a87eaebb4f4.jpg!q70.webp',
        description: 'utena佑天兰黄金果冻面膜3盒9片补水保湿 提亮肤色 紧致面膜(男女护肤套装)日本面膜',
        price: '199'
      },

    ],
  },
}
router.get('/supermarketdatas', function (req, res, next) {
  setTimeout(()=>{
    res.send(JSON.stringify(supermarketdatas))

  })
})

//获取推荐数据
let recommendMarket = [
  {
    id: 1,
    title: '超市精选',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '0001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '0002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '0003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '0004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '0005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '0006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '0007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '0008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '0009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '0010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '0011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '0012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '0013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '0014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '0015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '0016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '0017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '0018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '0019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '0020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '0021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '0022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '0023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '0024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '0025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '0026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '0027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '0028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '0029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '0030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '0031'
      }

    ],
  },
  {
    id: 2,
    title: '宠物生活',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2031'
      }

    ],
  },
  {
    id: 3,
    title: '家居日用',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2031'
      }

    ],

  },
  {
    id: 4,
    title: '时令生鲜',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2031'
      }

    ],

  },
  {
    id: 5,
    title: '中外名酒',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2031'
      }

    ],

  },
  {
    id: 6,
    title: '母婴玩具',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2001'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2002'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2003'
      },
      {
        sid:4,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2004'
      },
      {
        sid:5,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2005'
      },
      {
        sid:6,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2006'
      },
      {
        sid:7,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2007'
      },
      {
        sid:8,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2008'
      },
      {
        sid:9,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2009'
      },
      {
        sid:10,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2010'
      },
      {
        sid:11,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2011'
      },
      {
        sid:12,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2012'
      },
      {
        sid:13,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2013'
      },
      {
        sid:14,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2014'
      },
      {
        sid:15,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2015'
      },
      {
        sid:16,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2016'
      },
      {
        sid:17,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2017'
      },
      {
        sid:18,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2018'
      },
      {
        sid:19,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2019'
      },
      {
        sid:20,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2020'
      },
      {
        sid:21,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '2021'
      },
      {
        sid:22,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '2022'
      },
      {
        sid:23,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '2023'
      },
      {
        sid:24,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t30199/77/1181910653/355709/b910d52d/5cd914acNe74aa448.jpg!q70.webp',
        description: '哈根达斯 经典口味 六杯装 组合装 分享装 家庭装 81g*6  巧克力香草草莓',
        price: '2024'
      },
      {
        sid:25,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t3250/19/5843004323/78089/7aeafb1c/58881982Nb26b1ca8.jpg!q70.webp',
        description: '百加得（Bacardi ) 洋酒 朗姆酒 黑朗姆酒 750ml',
        price: '2025'
      },
      {
        sid:26,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/60604/25/13244/392692/5da5cd0eE9d322751/baa6233519a138ce.jpg!q70.webp',
        description: '伊利 安慕希希腊风味常温酸奶原味205g*16盒',
        price: '2026'
      },
      {
        sid:27,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/71537/23/9091/239510/5d6decb1Eaa142d04/597465938ff50140.jpg!q70.webp',
        description: '清风（APP）抽纸 原木纯品金装系列 3层120抽软抽*24包纸巾（整箱销售）（新老包装交替发货）',
        price: '2027'
      },
      {
        sid:28,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/46844/7/11606/341540/5d8886bfE7dede0b8/30dcfb85087cbbd7.jpg!q70.webp',
        description: '京东华为专享水果礼品册',
        price: '2028'
      },
      {
        sid:29,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/33011/33/299/200961/5c9dc732E6bc4f367/9ea9c090b57ed4ae.jpg!q70.webp',
        description: '可洁可净 牙刷 纤巧纳米软胶刷毛 3支装',
        price: '2029'
      },
      {
        sid:30,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2030'
      },
      {
        sid:31,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/67568/28/14295/372363/5dbb1f91E08d2293f/df64909d4d615513.jpg!q70.webp',
        description: '利得背心式手提垃圾袋加厚100只 50cm*60cm黑色 垃圾分类',
        price: '2031'
      }

    ],

  },
  {
    id: 7,
    title: '个人护理',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '258'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '69.9'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '258'
      },

    ],

  },
  {
    id: 8,
    title: '食品饮料',
    products: [
      {
        sid:1,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/59493/17/14335/171315/5dbae294E8932b764/b940dc02a6541957.jpg!q70.webp',
        description: '惠氏启赋（Wyeth illuma）3段奶粉 爱尔兰进口 12-36月幼儿配方  900克（罐装）',
        price: '258'
      },
      {
        sid:2,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t1/31624/11/14623/110411/5cbee9a3E956ab4c4/bd040c6a29865ed7.jpg!q70.webp',
        description: '蒙牛 特仑苏 纯牛奶 250ml*16 礼盒装',
        price: '69.9'
      },
      {
        sid:3,
        productImg: 'https://m.360buyimg.com/n1/s333x333_jfs/t28861/185/1388518411/797432/78807799/5cde80acN53ed7dab.png!q70.webp',
        description: '【京东秒杀148元】今聚鲜 原肉整切微腌1500g/十片厚切澳洲牛排套餐A级眼肉西冷儿童黑椒牛肉生鲜',
        price: '258'
      },

    ],

  }
]
router.get('/recommendMarket', function (req, res, next) {
  //传入不同的参数，返回不同的种类
  //query设置为superSelect、petLife、householdDaily、seasonalFresh、vintageWine、maternaltoys、personalCare、foodBeverage
  let { id, offset, limit } = req.query
  id = parseInt(id)
  offset = parseInt(offset)
  limit = parseInt(limit)+parseInt(offset)
  let getCurrentDatas = (id, offset, limit) => {
    let currentData = recommendMarket.filter((item, index) => {
      return item.id === id
    })
    let products = currentData[0].products.slice(offset,limit);
    let title = currentData[0].title;
    let classifyId = currentData[0].id;

    return{
      id:classifyId,
      title:title,
      products:products
    }
  }

  let curPageData = getCurrentDatas(id, offset, limit)
  // console.log(curPageData)
  let hasMore;
  if(curPageData.products.length==10){
    hasMore=true
  }else if(curPageData.products.length<10){
    hasMore=false
  }

    res.send(JSON.stringify({
      code:0,
      hasMore:hasMore,
      ...curPageData,
    }))
 
})

module.exports = router
