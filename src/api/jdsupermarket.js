import axios from "axios"

export function getSupermarket () {
  const url = 'http://localhost:3000/jdsupermarket/supermarketdatas'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getRecomendMarket (id,offset,limit) {
  const url = `http://localhost:3000/jdsupermarket/recommendMarket?id=${id}&offset=${offset}&limit=${limit}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
