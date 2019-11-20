var express = require('express')
var router = express.Router()
var fs = require('fs')
var url = require('url')
var sliders = require('../mock/sliders');


//获取首页数据
//1、获取轮播图数据:http://localhost:3000/homeList/sliders
router.get('/sliders',function (req,res,nex) {
  res.send(JSON.stringify(sliders))
})
//2、获取classify数据
let classifyData = [
  {id:'1',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png.webp',title:'京东超市'},
  {id:'2',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/39401/17/2391/5859/5cc06fcfE2ad40668/28cda0a571b4a576.png.webp',title:'数码电器'},
  {id:'3',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/17169/3/4127/4611/5c2f35cfEd87b0dd5/65c0cdc1362635fc.png.webp',title:'京东服饰'},
  {id:'4',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png.webp',title:'京东生鲜'},
  {id:'5',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp',title:'京东到家'},
  {id:'6',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png.webp',title:'京东缴费'},
  {id:'7',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp',title:'9.9元拼'},
  {id:'8',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/7068/29/8987/5605/5c120da2Ecae1cc3a/016033c7ef3e0c6c.png.webp',title:'领券'},
  {id:'9',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t16828/63/2653634926/5662/d18f6fa1/5b03b779N5c0b196f.png.webp',title:'赚钱'},
  {id:'10',imgSrc:'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/22262/9/1470/4527/5c120cd0E5d3c6c66/4792ec307a853e9f.png.webp',title:'PLUS会员'},

]
router.get('/classify',function (req,res,next) {
  res.send(JSON.stringify(classifyData))
})

//3、获取推荐数据
let RecommendData = [
  {
    id:'1',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'2',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'3',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'4',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'5',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'6',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
  {
    id:'7',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'8',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'9',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'10',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'11',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'12',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
  {
    id:'13',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'14',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'15',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'16',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'17',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'18',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
  {
    id:'19',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'20',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'21',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'22',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'23',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'24',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
  {
    id:'25',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'26',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'27',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'28',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'29',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'30',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
  {
    id:'31',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/45611/7/14339/228306/5db59998E2d3b45ef/7e2791519436f89c.jpg!q70.dpg.webp',
    description:'SMILINGSHARK 手电筒超强光远射可充电保安保防身防雨电骑行户外灯 【经济款】800米【1电池套餐】加强铝合金',
    price:'69',discount:true
  },
  {
    id:'32',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/61348/1/6419/185477/5d48d51dE529ff43b/75e88cdae00a9710.jpg!q70.dpg.webp',
    description:'德欧老头商务休闲鞋男春季新款内增高男鞋英伦男士真皮皮鞋真皮休闲皮鞋隐形内增高6cm 不增高黄色 37',
    price:'55',
    discount:true
  },
  {
    id:'33',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t1/74350/36/14177/164078/5db823b4E4425a1dc/75ed0fcae0b3b5e1.jpg!q70.dpg.webp',
    description:'飞利浦开关插座飞逸香槟金色五孔插座单开面板86型空调开关面板全套，一键下单，全套购买 五孔插座10只装',
    price:'58',
    discount:false
  },{
    id:'34',
    imgSrc:'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/106583/14/580/189069/5db10ca5Ee5b3668d/94ffbbfa80a4a9f9.jpg!q70.dpg.webp',
    description:'【金鼎盛惠】儿童房身高尺 卡通3d立体墙贴宝宝测量身高贴可移除贴纸儿童房墙面装饰 1537飞侠身高贴红黑天蓝粉红中黄 大 ',
    price:'155',
    discount:true
  },
  {
    id:'35',
    imgSrc:'https://img11.360buyimg.com/mobilecms/s372x372_jfs/t23221/34/1165659410/316818/8ac8f50a/5b53f0aeN0e829270.jpg!q70.dpg.webp',
    description:'素荨针织衫女开衫2019新款韩版宽松百搭女士过膝长外搭披肩中长款毛衣外套女春秋 酒红色8007 M ',
    price:'525',
    discount:true
  },
  {
    id:'36',
    imgSrc:'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/64193/9/13996/112069/5db6a807E34ef5170/aaf38baf3e1bc124.jpg!q70.dpg.webp',
    description:'                                                                  【二手9成新】Apple iPhone 7  苹果7 二手手机 国行4.7英寸 磨砂黑 32G全网通                             ',
    price:'1055',
    discount:false
  },
]
//需要返回的数据有：hasMore、data、

router.get(`/recommend`,function (req,res,next) {
  let {pathname, query} = url.parse(req.url, true);
  let offset = parseInt(query.offset) || 0;
  let limit = parseInt(query.limit) || 6;
  //一次返回6条数据
  let data = RecommendData.slice(offset,limit+offset)
  setTimeout(()=>{
    res.send(JSON.stringify(data))
  },1000)

})

module.exports = router
