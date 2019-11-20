import axios from "axios"

export function getSliders () {
  const url = 'http://localhost:3000/homeList/sliders'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getClassify () {
  const url = 'http://localhost:3000/homeList/classify'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

//在前端设置一个上拉加载数据的功能，上拉一次加载6个数据
//limit、offset、
export function getRecommend(offset,limit) {
  const url = `http://localhost:3000/homeList/recommend?offset=${offset}&limit=${limit}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
