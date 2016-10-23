import axios from 'axios'
import lodash from 'lodash'

const API_URL = "https://prosper-canada.herokuapp.com"
//const API_URL = "http://localhost:5000"

export function urlParamsExtractor(query){
  const p = new Promise((res, rej)=>{
    // eg. financialbot.prospercanada.com?userId=foobar&category=living&subcategory=rent&startdate=5472390572395&enddate=294759357345
    console.log("Extracting url params...")
    const params = {}
    if(query.userId){
      params.userId = query.userId
      if(query.category){
        params.category = query.category
      }
      if(query.category && query.subcategory){
        params.subcategory = query.subcategory
      }
      if(query.startdate){
        params.startdate = query.startdate
      }
      if(query.enddate){
        params.enddate = query.enddate
      }
    }
    res(params)
  })
  return p
}

export function getDataFromDb(userId, config){
  /*
      config = {
        userId: String,
        startDate: Date,
        endDate: Date,
        categoryId: String,             // optional
        subcategoryId: String         // optional
      }
  */
  console.log(config)
  const p = new Promise((res, rej)=>{
    const url = urlGenerator(config)
    axios.get(url)
      .then((response, err)=>{
        res(response.data)
      })
      .catch((err)=>{
        rej(err)
      })
  })
  return p
}

function urlGenerator(config){
  let url = API_URL + "/transactions?userId="+config.userId
  if(config.category){
    url = url + "&category=" + config.category
  }
  if(config.category && config.subcategory){
    url = url + "&subcategory=" + config.subcategory
  }
  if(config.startdate){
    url = url + "&startdate=" + config.startdate
  }
  if(config.enddate){
    url = url + "&enddate=" + config.enddate
  }
  return url
}


export function getUserCategories(userId){
  const p = new Promise((res, rej)=>{
    axios.get(API_URL+"/users/"+userId)
      .then((response, err)=>{
        if(err){rej(err)}
        res(response.data)
      })
  })
  return p
}

export function filterData(cachedData, subcat){
    const p = new Promise((res, rej)=>{
      const filtered = cachedData.filter((transaction)=>{
        if(transaction.subcategory){
          return transaction.subcategory.toLowerCase() == subcat.toLowerCase()
        }else{
          return false
        }
      })
      console.log(filtered)
      res(filtered)
    })
    return p
}

export function formatDataForChart(data, type){
  let cumulative = {
    name: "Cumulative",
    values: []
  }
  let transaction = {
    name: "Transaction",
    values: [],
    strokeWidth: 3,
  }
  let cumulativeAmount = 0
  data.forEach((trans)=>{
    let transDate = new Date(trans.date)
    let unixDate = transDate.getTime()/1000
    cumulativeAmount += trans.amount
    cumulative.values.push({
      x: unixDate,
      y:cumulativeAmount
    })
    transaction.values.push({
      x: unixDate,
      y: trans.amount
    })
  })
  if(type=='cumulative'){
    return [cumulative]
  }else{
    return [transaction]
  }
}

export function renderPieData(data){
  const uniqueCats = data.reduce((prev, curr, index)=>{
    // filter for only unique categories
  })
  console.log(uniqueCats)
  data.forEach((data)=>{
    for(let i = 0; i<uniqueCats.length; i++){
      if(uniqueCats[i].label == data.category){
        uniqueCats[i].value += data.amount
        break
      }
    }
  })
  return uniqueCats
}
