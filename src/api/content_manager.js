import axios from 'axios'

//const API_URL = "https://prosper-canada.herokuapp.com"
const API_URL = "http://localhost:5000"

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
  let url = API_URL + "/users?userId="+config.userId
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
