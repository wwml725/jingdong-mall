let arr = [
  {name:"wangwei",age:11},
  {name:"wangwei",age:12},
  {name:"wangwei",age:13},
]
console.log(arr.find((item, index) => {
  return item.age == 11
}));
