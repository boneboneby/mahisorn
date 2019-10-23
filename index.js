//////////////////////////////////////////////////Require NPM///////////////////////////////////////////////////////////
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const https = require('https')
//////////////////////////////////////////////////Require NPM///////////////////////////////////////////////////////////

//////////////////////////////////////////////////Boolean Status//////////////////////////////////////////////////////////

let isDailyWeather = false;
let is5daysWeather = false;
let isRestrictDaily = false;
let isGeoDaily = false;
let isGeo5days = false;
let isSwitchCase = false;
let isGreetingMsgT1 = false;
let isGreetingMsgT2 = false;

//////////////////////////////////////////////////Boolean Status//////////////////////////////////////////////////////////

//////////////////////////////////////////////////API URL/KEY ///////////////////////////////////////////////////////////
//OpenWeatherMap
const OPENWEATHER_KEY = "686d2c96c7002be9b1e714457eac2caf";
const OPENWEATHER_KEY2 = "7e000fadaa5a64cc92c3a6a478e2e193" ;

const OPENWEATHER_API_Daily = "https://api.openweathermap.org/data/2.5/weather/";
const OPENWEATHER_API_5days = "https://api.openweathermap.org/data/2.5/forecast/";


const dailyForecastByDestrictUrl = `${OPENWEATHER_API_Daily}?appid=${OPENWEATHER_KEY}&units=metric&type=accurate&zip=`
const fivedaysForecastHeader = `${OPENWEATHER_API_5days}?appid=${OPENWEATHER_KEY}&units=metric&type=accurate&zip=10230,th`
const OpenWeatherMapDaily_BY_GEOHeader = `https://api.openweathermap.org/data/2.5/weather/?appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate&`

//DarkSky
const darkAPIURLwithUserLocateHeader = 'https://api.darksky.net/forecast/6fde4f9a0ea5e1b971b1df0cd62158e1/';
const darkSkyAPIKEY = '6fde4f9a0ea5e1b971b1df0cd62158e1';

//////////////////////////////////////////////////API URL/KEY ///////////////////////////////////////////////////////////

//////////////////////////////////////////////////Example API Call//////////////////////////////////////////////////////

//OpenWeatherMap By geolocation https://api.openweathermap.org/data/2.5/weather/?appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate&lat=13.832873405469542&lon=100.61856782191913
//TMD API https://data.tmd.go.th/api/WeatherForecast7Days/V1/?uid=u62bbabbabgune&ukey=b1749b2f5295a55a5d78ea31a29d61b8?type=json
//OpenWeatherMap By restirct `https://api.openweathermap.org/data/2.5/weather/?appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate&&zip=10230,th`
//DarkSky 'https://api.darksky.net/forecast/6fde4f9a0ea5e1b971b1df0cd62158e1/42.3601,-71.0589'

//////////////////////////////////////////////////Example API Call//////////////////////////////////////////////////////


//////////////////////////////////////////////////LINE Enclapsulated//////////////////////////////////////////////////////
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer 3ZP9XTq2s8J/phgB9G6NJkUX+3yKi0f2Ydt+FbDX9sgpnzjnjVd6DhAsQwgRN3EaUTwevI1GEmO/AhYo5Lkk6Q7JlMY+2ac1AqYRoPW5B0tyo9RDfPBIICdVv1eLCCe504zdYcPpXUAZC190i3KuxgdB04t89/1O/w1cDnyilFU="
};
const CH_ACCESS_TOKEN = '3ZP9XTq2s8J/phgB9G6NJkUX+3yKi0f2Ydt+FbDX9sgpnzjnjVd6DhAsQwgRN3EaUTwevI1GEmO/AhYo5Lkk6Q7JlMY+2ac1AqYRoPW5B0tyo9RDfPBIICdVv1eLCCe504zdYcPpXUAZC190i3KuxgdB04t89/1O/w1cDnyilFU=';

//////////////////////////////////////////////////LINE Enclapsulated//////////////////////////////////////////////////////

//////////////////////////////////////////////////////Generate img/////////////////////////////////////////
function requestImg (sender , userLat , userLon){
  const OpenWeatherMapDaily_BY_GEOHeaderANDinfo = `${OpenWeatherMapDaily_BY_GEOHeader}+${userLat}+&+${userLon}`
  request(OpenWeatherMapDaily_BY_GEOHeaderANDinfo, function (error, response, body) {
    let senderForImg = sender;
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log('Request api success ')
      console.log('The response body after parse => ',body)
    }else if (error){
      console.log('Request api ERROR ')
    }
  let imgHeader = 'พยากรณ์อากาศ เขต:'+body.city.name ;
  let imgDay1Date = 'วันที่: '+body.list[0].dt_txt;
  let imgDay1Temp = 'อุณภูมิ: '+body.list[0].main.temp+'°C';
  let imgDay1Weather = 'สภาพอากาศ: '+body.list[0].weather[0].description;
  let imgDay1Humidity = 'ความชื้น'+body.list[0].main.humidity+'%';

  let imgDay2Date = 'วันที่:'+body.list[9].dt_txt;
  let imgDay2Temp = 'อุณภูมิ: '+body.list[9].main.temp+'°C';
  let imgDay2Weather = 'สภาพอากาศ: '+body.list[9].weather[0].description;
  let imgDay2Humidity = 'ความชื้น'+body.list[9].main.humidity+'%';

  let imgDay3Date = 'วันที่:'+body.list[17].dt_txt;
  let imgDay3Temp = 'อุณภูมิ: '+body.list[17].main.temp+'°C';
  let imgDay3Weather = 'สภาพอากาศ: '+body.list[17].weather[0].description;
  let imgDay3Humidity = 'ความชื้น'+body.list[17].main.humidity+'%';

  let imgDay4Date = 'วันที่:'+body.list[25].dt_txt;
  let imgDay4Temp = 'อุณภูมิ: '+body.list[25].main.temp+'°C';
  let imgDay4Weather = 'สภาพอากาศ: '+body.list[25].weather[0].description;
  let imgDay4Humidity = 'ความชื้น'+body.list[25].main.humidity+'%';

  let imgDay5Date = 'วันที่:'+body.list[33].dt_txt;
  let imgDay5Temp = 'อุณภูมิ: '+body.list[33].main.temp+'°C';
  let imgDay5Weather = 'สภาพอากาศ: '+body.list[33].weather[0].description;
  let imgDay5Humidity = 'ความชื้น'+body.list[33].main.humidity+'%';

  



  const dataImgApiTest = JSON.stringify({
    html: `<div class='box'><style>h5 {text-align: center;position: relative;bottom: 0;right: 0;color: white;}h8{position: fixed;bottom: 20;right: 20;color: white;text-align: left;font-size:20px;   }</style><h5>${imgHeader}</h5><h8>${imgDay1Date}<br> ${imgDay1Temp} <br> ${imgDay1Weather}<br>${imgDay1Humidity} <br><br><br>${imgDay2Date} <br> ${imgDay2Temp} <br>${imgDay2Weather} <br>${imgDay2Humidity}<br><br><br>${imgDay3Date} <br> ${imgDay3Temp} <br>${imgDay3Weather} <br>${imgDay3Humidity}<br><br><br>${imgDay4Date}<br>${imgDay4Temp}<br> ${imgDay4Weather} <br>${imgDay4Humidity} <br><br><br>${imgDay5Date} <br>${imgDay5Temp} <br> ${imgDay5Weather} <br> ${imgDay5Humidity} </h8></div>`,
    css: ".box {border: 0px #8FB3E7; padding: 20px; color: white; font-size:45px;width: 700px; height:1000px; font-family: 'Roboto';  background-color: #8BC6EC;background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);}",
    google_fonts: "Roboto"
  })
  
  const apiIdImgApiTest = "9ec372c0-9b95-4791-8588-05638103ff22";
  const apiKeyImgApiTest = "872e8286-91f3-4a3b-a354-ee5ece3d9213";
  
  const options = {
    hostname: 'hcti.io',
    port: 443,
    path: '/v1/image',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + new Buffer(apiIdImgApiTest + ':' + apiKeyImgApiTest).toString('base64')
    }
  }
  let linkImg = "";
  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', (d) => {
      const image = JSON.parse(d)
      linkImg = image["url"];
      linkImg = linkImg+'.jpg';
      console.log('imgurl', linkImg)
    })
  })
  
  function send5daysTestImg (sender , linkImg) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'image',
          originalContentUrl: linkImg,
          previewImageUrl: linkImg
        }
      ]
    }
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('URL : https://api.line.me/v2/bot/message/push || Type of method : POST || Result : success')
      if (body) console.log(body)
    })
  }


  
  req.on('error', (error) => {
    console.error(error)
  })
  
  req.write(dataImgApiTest)
  req.end()
  send5daysTestImg(senderForImg , linkImg)
  s5dayMenuCarouselTemplate(senderForImg , linkImg)
})
}

//////////////////////////////////////////////////////Generate img/////////////////////////////////////////


////////////////////////////////////////////////Group word////////////////////////////////////////////////////////////
const weatherToday = ["อากาศวันนี้",  , "สภาพอากาศวันนี้" ];
const weatherTodayLocal = ["มื้อนี้เป็นหยังอากาศ", "อากาศมื้อนี้เป็นจั่งใด๋"]
const isTodayRain = ["วันนี้ฝนตกมั้ย", "วันนี้ฝนตกป่าว" , "มื้อนี่ฝนตกบ่"];
const wordGreeting = ["สวัสดี","สวัสดีจ้า" , "สวัสดีครับ" , "สวัสดีค่ะ"];
const greetingWordLocal = [ "เป็นจั่งใด๋" ]
const howToUse = ["พยากรณ์ซิได๋บุ่","ทำหยังได้บ้าง"]
const wordDailyByZipCode = ["พยากรณ์อากาศประจำวันเขตลาดพร้าว","พยากรณ์อากาศประจำวันเขตดินแดง","พยากรณ์อากาศประจำวันเขตตลิ่งชัน","พยากรณ์อากาศประจำวันเขตคันนายาว", "พยากรณ์อากาศประจำวันเขตสาทร"]

//Carousel invoke
const wordStarterWeatherMenu = ["พยากรณ์อากาศ"]
const wordMenuDailyWeather = ["พยากรณ์อากาศประจำวัน"]
const wordMenuForecastWeather = ["พยากรณ์อากาศ 5 วัน"]




////////////////////////////////////////////////Random MSG/////////////////////////////////////////////////////////////////
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let randomGreetingNum = 0;
let greetingMsg = ''
////////////////////////////////////////////////String Method//////////////////////////////////////////////////////////////

function check_conditions(text, array) {
  let find = false;
  array.forEach(element => {
    if (text.search(element) !== -1) {
      find = text;
    }
  });

  if (find) {
    return true;
  } else {
    return false;
  }
}
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

////////////////////////////////////////////////String Method//////////////////////////////////////////////////////////////


////////////////////////////////////////////////User Message Invoke////////////////////////////////////////////////////////
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  isGreetingMsgT1 = false;
  isGreetingMsgT2 = false;
  isDailyWeather = false;
  isSwitchCase = false;
  var type = req.body.events[0].message.type
  var eventsType = req.body.events[0].type
  if(type === 'text'){
    var text = req.body.events[0].message.text;
    console.log('text', text)
  }
  else if(type === 'location'){
    var userLat = req.body.events[0].message.latitude
    var userLon = req.body.events[0].message.longitude
    console.log('lat', userLat)
    console.log('lon', userLon)
  }
  
  console.log('type', type)
 
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log("Message from User : "+ text + " || UserId : " + sender )
  console.log("Type of sender ID : "+ typeof sender + " || Sender type : " + typeof text)
  

///////////////////////////////////////////Message Type Location///////////////////////////////////////////
  if(type === 'location' && eventsType === 'message' && isDailyWeather){
    if(isGeoDaily){
      geoDaily(sender , userLat , userLon )
    }
    //requestImg(sender , userLat , userLon)

  }
///////////////////////////////////////////Message Type Location///////////////////////////////////////////

///////////////////////////////////////////Message Type Text///////////////////////////////////////////
  else if(type === 'text' && eventsType === 'message'){
    console.log('text from user before compare with Switch case', text)
    switch(text){
      
      case check_conditions(text, wordStarterWeatherMenu) === true && text : 
      isSwitchCase = true
      weatherMenuCarouselTemplate(sender);
      
      case check_conditions(text, wordGreeting) === true && text :
        isSwitchCase = true;
        sendGreetingMessage(sender, text) 

      
      case check_conditions(text, weatherToday || wordMenuDailyWeather) === true && text :
        isSwitchCase = true;
        isDailyWeather = true;
        weatherDailyMenuCarouselTemplate(sender, text) 

      
      case check_conditions(text, wordMenuForecastWeather) === true && text :
        isSwitchCase = true;
        a5dayMenuCarouselTemplate(sender, text) 

      
      case check_conditions(text, wordGreeting) === true && text :
        isSwitchCase = true;
        sendGreetingMessage(sender, text) 

      
      case check_conditions(text, wordDailyByZipCode) === true && text :
        isSwitchCase = true;
        weatherDailyByDestrict(sender, text) 

      
    }
  
  
  
  if (text === 'แผ่นดินทอง' ) {
    pandinthongCarousel(sender)
  }
  else if (text == 'พยากรณ์อากาศตามเขต'){
    quickReplyWeatherDailbyRestrict(sender)
  }
  
  else if (text === 'สินเชื่อ ธกส.' || text === 'สินเชื่อ' ) {
    creditBAAC(sender)
  }
  else if (text === 'สินเชื่อส่วนบุคคล') {
    personalCredit(sender)
  }
  else if (text === 'สินเชื่อกลุ่ม' ) {
    groupCredit(sender)
  }
  else if (text === 'สินเชื่อผู้ประกอบการ' ) {
    entrepreneurCredit(sender)
  }
  else {
    if(!isSwitchCase){
      deFaultFallback(sender, text);}
  }
}
  res.sendStatus(200)
})
////////////////////////////////////////////////User Message Invoke////////////////////////////////////////////////////////

////////////////////////////////////////////////Function handle User Message//////////////////////////////////////////////

function weatherMenuCarouselTemplate (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
        altText: "This is a buttons template",
        template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/21/cIocp0.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "พยากรณ์อากาศ",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "message",
              label: "พยากรณ์อากาศประจำวัน",
              text: "พยากรณ์อากาศประจำวัน"
            },
            {
              type: "message",
              label: "พยากรณ์อากาศ 5 วัน",
              text: "พยากรณ์อากาศ 5 วัน"
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('weatherMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function weatherDailyMenuCarouselTemplate (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
        altText: "This is a buttons template",
        template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/21/cIocp0.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "พยากรณ์อากาศประจำวัน",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "message",
              label: "เลือกเขต",
              text: "พยากรณ์อากาศตามเขต"
            },
            {
              type: "uri",
              label: "ส่งที่อยู่",
              uri: "line://nv/location"
            }
            ,
            {
              type: "message",
              label: "test",
              text: "default"
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('weatherMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function a5dayMenuCarouselTemplate (sender, linkImg) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
    altText: "This is a buttons template",
    template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/21/cIocp0.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "พยากรณ์อากาล่วงหน้า 5 วัน",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "message",
              label: "ข้อความ",
              text: "พยากรณ์อากาศ 5 วัน"
            },
            {
              type: "message",
              label: "รูปภาพ",
              text: linkImg
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('s5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

//////////////////////////////////////////////////Quick Reply for Daily Weather by Destrict///////////////////////////////////////

function quickReplyWeatherDailbyRestrict (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        "type": "text",
        "text": "Hello Quick Reply!",
        "quickReply": {
          "items": [
              {
              type: "message",
              label: "เขตลาดพร้าว",
              text: "พยากรณ์อากาศประจำวันเขตลาดพร้าว" //10230
              },
              {
              type: "message",
              label: "เขตดินแดง",
              text: "พยากรณ์อากาศประจำวันเขตดินแดง" //10400
              },
              {
                type: "message",
                label: "เขตสาทร",
                text: "พยากรณ์อากาศประจำวันเขตสาทร" //10120
              },
              {
                type: "message",
                label: "เขตตลิ่งชัน",
                text: "พยากรณ์อากาศประจำวันเขตตลิ่งชัน" //10170
              },
              {
                type: "message",
                label: "เขตคันนายาว",
                text: "พยากรณ์อากาศประจำวันเขตคันนายาว" //10230
              }
         
            ]
          }
        }
       ]
    }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('weatherMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

//////////////////////////////////////////////////Quick Reply for Daily Weather by Destrict///////////////////////////////////////

//////////////////////////////////////////////////Daily Weather by Destrict///////////////////////////////////////////////

function weatherDailyByDestrict (sender, text) {
  let eachCaseDestrict = '';
  if(text === "พยากรณ์อากาศประจำวันเขตลาดพร้าว" || text === "พยากรณ์อากาศประจำวันเขตคันนายาว") eachCaseDestrict = '10230'
  
  else if(text == "พยากรณ์อากาศประจำวันเขตดินแดง") eachCaseDestrict = '10400'

  else if(text == "พยากรณ์อากาศประจำวันเขตสาทร") eachCaseDestrict = '10120'

  else if(text == "พยากรณ์อากาศประจำวันเขตตลิ่งชัน") eachCaseDestrict = '10170'


  let urlDailyByRestrici = `${dailyForecastByDestrictUrl}${eachCaseDestrict},th`
  request(urlDailyByRestrici, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log('Request api success ')
      console.log('The response body after parse => ',body)
    
                
  let cityName = body.name;
  if(cityName ===  'Lat Phrao' ) cityName = "ลาดพร้าว";
  
  else if (cityName ===  'ฟหกฟหก' ) cityName = "ดินแดง";

  else if (cityName ===  'ฟหกฟหก' ) cityName = "สาทร";

  else if (cityName ===  'ฟหกฟหก' ) cityName = "ตลิ่งชัน";

  let weather = body.weather[0].description;
  if(weather === 'light intensity drizzle'){
    weather = "ฝนตกแดดออก"
  }
  else if (weather === 'scattered clouds'){
    weather = "เมฆฝนฟ้าคะนองกระจายตัว"
  }
  
  console.log('weather', weather)
  const dMsg = `พยากรณ์อากาศประจำวัน\nเขต: ${cityName}`;
  const dMsg2 = `อุณภูมิ:  ${body.main.temp} °C \nสภาพอากาศ: ${weather}  \nความชื้น : ${body.main.humidity}% \nทิศทางลม : ${body.wind.deg}° \n ความเร็วลม : ${body.wind.speed} กม./ชม. `
  

  return pushWeatherDaily( dMsg ,dMsg2 , sender);
    } else console.log('Request url failed', urlDailyByRestrici)
  })
}

const pushWeatherDaily = async (dMsg ,dMsg2  , userId) => {
  request.post({
    uri: `${LINE_MESSAGING_API}/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text: dMsg }, { type: "text", text: dMsg2 }]
    })
  });
  return res.status(200).send({ message: `Push: ${msg}` });
};

//////////////////////////////////////////////////Daily Weather by Destrict///////////////////////////////////////////////


//////////////////////////////////////////////////Daily Weather by Geo/////////////////////////////////////////////////////////////

function geoDaily (sender , userLat , userLon) {
  let DAILYWEATHER_BY_GEO = `https://api.openweathermap.org/data/2.5/weather/?lat=${userLat}&lon=${userLon}&appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate`;
    request(DAILYWEATHER_BY_GEO, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        console.log('Request api success ')
        console.log('The response body after parse => ',body)
      
        
    // let res = response;
    let cityName = body.name;
    if(cityName ===  'Lat Phrao' ) {
      cityName = "ลาดพร้าว";
    }
  
    let weather = body.weather[0].description;
    if(weather === 'light intensity drizzle'){
      weather = "ฝนตกแดดออก"
    }
    else if (weather === 'scattered clouds'){
      weather = "เมฆฝนฟ้าคะนองกระจายตัว"
    }
   
    console.log('weather', weather)
    const dMsg = `พยากรณ์อากาศประจำวัน\nเขต: ${cityName}`;
    const dMsg2 = `อุณภูมิ:  ${body.main.temp} °C \n สภาพอากาศ: ${weather}  \n ความชื้น : ${body.main.humidity}% \n ทิศทางลม : ${body.wind.deg}° \n ความเร็วลม : ${body.wind.speed} กม./ชม. `
    
    return pushGeoWeatherDaily( dMsg ,dMsg2 , sender);
      }else if (error){
        console.log('Request api ERROR ')
      }
    })
  }
  
  const pushGeoWeatherDaily = async (dMsg ,dMsg2  , userId) => {
    request.post({
      uri: `${LINE_MESSAGING_API}/push`,
      headers: LINE_HEADER,
      body: JSON.stringify({
        to: userId,
        messages: [{ type: "text", text: dMsg }, { type: "text", text: dMsg2 }]
      })
    });
    return res.status(200).send({ message: `Push: ${msg}` });
  };
  
//////////////////////////////////////////////////Daily Weather by Geo/////////////////////////////////////////////////////////////
















function pandinthongCarousel (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
    altText: "This is a buttons template",
    template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/07/cPYQp9.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "แผ่นดินทอง",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "uri",
              label: "ราคาพืชผล",
              uri: "https://www.pandinthong.com/price/"
            },
            {
              type: "uri",
              label: "เตือนภัย",
              uri: "https://www.pandinthong.com/warning/"
            },
            {
              type: "uri",
              label: "ผลิตภัณฑ์ OTOP",
              uri: "https://www.pandinthong.com/otop/"
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('pandinthongCarousel : POST || Result : success')
    if (body) console.log(body)
  })
} 

function creditBAAC (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
    altText: "This is a buttons template",
    template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "สินเชื่อ ธกส.",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "message",
              label: "ส่วนบุคคล",
              text: "สินเชื่อส่วนบุคคล"
            },
            {
              type: "message",
              label: "ผู้ประกอบการ",
              text: "สินเชื่อผู้ประกอบการ"
            },
            {
              type: "message",
              label: "สหกรณ์ องค์กร",
              text: "สินเชื่อกลุ่ม"
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('s5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function personalCredit (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "actions": [],
          "columns": [
            {
              "thumbnailImageUrl": "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
              "title": "สินเชื่อส่วนบุคคล",
              "text": "กรุณาเลือกทำรายการ",
              "actions": [
                {
                  "type": "uri",
                  "label": "สินเชื่อจักรยานยนตร์",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14676"
                },
                {
                  "type": "uri",
                  "label": "Green credit",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14262"
                }
              ]
            },
            {
              "thumbnailImageUrl": "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
              "title": "สินเชื่อส่วนบุคคล",
              "text": "กรุณาเลือกทำรายการ",
              "actions": [
                {
                  "type": "uri",
                  "label": "สินเชื่อปรับโครงสร้าง",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14261"
                },
                {
                  "type": "uri",
                  "label": "สินเชื่อเฟรนไชส์",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14260"
                }
              ]
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('s5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function entrepreneurCredit (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "actions": [],
          "columns": [
            {
              "thumbnailImageUrl": "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
              "title": "สินเชื่อผู้ประกอบการ",
              "text": "กรุณาเลือกทำรายการ",
              "actions": [
                {
                  "type": "uri",
                  "label": "SME เครื่องจักร",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14560"
                },
                {
                  "type": "uri",
                  "label": "SME เกษตร",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=14559"
                }
              ]
            },
            {
              "thumbnailImageUrl": "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
              "title": "สินเชื่อผู้ประกอบการ",
              "text": "กรุณาเลือกทำรายการ",
              "actions": [
                {
                  "type": "uri",
                  "label": "ตั๋วสัญญา",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=13724"
                },
                {
                  "type": "uri",
                  "label": "ธุรกิจรายย่อย",
                  "uri": "https://www.baac.or.th/th/media.php?content_id=13723"
                }
              ]
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('s5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function groupCredit (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "template",
    altText: "This is a buttons template",
    template: {
        type: "buttons",
        thumbnailImageUrl: "https://sv1.picz.in.th/images/2019/10/16/cpAi3P.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "สินเชื่อกลุ่มองค์กร",
        text: "กรุณาเลือกรายการ",
        defaultAction: {
            type: "uri",
            label: "View detail",
            uri: "https://www.google.com"
        },
        actions: [
            {
              type: "uri",
              label: "องค์กรส่วนท้องถิ่น",
              uri: "https://www.baac.or.th/th/content-product.php?content_id=11628&content_group_semi=0003&content_group_sub=2&content_group=4&inside=1"
            },
            {
              type: "uri",
              label: "สหกรณ์ออมทรัพย์",
              uri: "https://www.baac.or.th/th/content-product.php?content_id=11113&content_group_semi=0003&content_group_sub=2&content_group=4&inside=1"
            }
          ]
        }
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('s5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 

function sendGreetingMessage (sender, text) {
  randomGreetingNum = getRandomInt(3);
  greetingMsg = "";
  if(randomGreetingNum == 0 ){
    greetingMsg = "สวัสดีค่ะ BAAC-Smart พร้อมให้บริการค่ะ";
  }
  else if (randomGreetingNum == 1){
    greetingMsg = "สวัสดีค่า~ สามารถเลือกใช้งานได้โดยกดที่เมนูได้เลยค่ะ";
  }
  else if(randomGreetingNum == 2 ){
    greetingMsg = "สวัสดีค่ะ BAAC-Smart ยินดีให้บริการค่ะ";
  }  
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: greetingMsg 
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('URL : https://api.line.me/v2/bot/message/push || Type of method : POST || Result : success')
    if (body) console.log(body)
  })
}


function deFaultFallback (sender, text) {
  randomGreetingNum = getRandomInt(3);
  let fallbackMsg = "";
  if(randomGreetingNum == 0){
    fallbackMsg = 'ฉันไม่เข้าใจค่ะ กรุณาพิมพ์อีกครั้งนะคะ ^^';
  }
  else if (randomGreetingNum == 1){
    fallbackMsg = "ขออภัยด้วยนะคะ แต่ฉันไม่เข้าใจที่คุณพูด กรุณาพิมพ์ใหม่อีกครั้งนะคะ";
  }
  else if(randomGreetingNum == 2){
    fallbackMsg = "ขออภัยค่ะ ระบบยังไม่รองรับประโยคดังกล่าว กรุณาเลือกทำรายการผ่านหน้าเมนูค่ะ";
  }
      
  
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: fallbackMsg
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('URL : https://api.line.me/v2/bot/message/push || Type of method : POST || Result : success')
    if (body) console.log(body)
  })
}

////////////////////////////////////////////////Function handle User Message//////////////////////////////////////////////
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})