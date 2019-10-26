//////////////////////////////////////////////////Require NPM///////////////////////////////////////////////////////////
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-bot-e4e78-253800.firebaseio.com"
});



var db = admin.database();
var ref = db.ref("server/saving-data/UserInfo");

var usersRef = ref.child("GeoDaily");
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

// usersRef.child("alanisawesome").set({
//   date_of_birth: "June 23, 1912",
//   full_name: "Alan Turing"
// });
// usersRef.child("gracehop").set({
//   date_of_birth: "December 9, 1906",
//   full_name: "Grace Hopper"
// });





var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const https = require('https')
//////////////////////////////////////////////////Require NPM///////////////////////////////////////////////////////////

//////////////////////////////////////////////////Boolean Status//////////////////////////////////////////////////////////

let isDailyWeather = false;
let is5daysWeather = false;

let isGeoDaily = false;
let isGeo5days = false;

let isGenPicDaily = false;
let isGenPic5days = false;

let isTextDaily = false;
let isText5days = false;

let isGraphDaily = false;
let isGraph5days = false;

let isForLop = false;


//////////////////////////////////////////////////Boolean Status//////////////////////////////////////////////////////////

//////////////////////////////////////////////////API URL/KEY ///////////////////////////////////////////////////////////
//OpenWeatherMap
const OPENWEATHER_KEY = "686d2c96c7002be9b1e714457eac2caf";
const OPENWEATHER_KEY2 = "7e000fadaa5a64cc92c3a6a478e2e193" ;

const OPENWEATHER_API_Daily = "https://api.openweathermap.org/data/2.5/weather/";
const OPENWEATHER_API_5days = "https://api.openweathermap.org/data/2.5/forecast/";


const urlDailyForecastByDistrict = `${OPENWEATHER_API_Daily}?appid=${OPENWEATHER_KEY}&units=metric&type=accurate&zip=`
const url5daysForecastByDistrict = `${OPENWEATHER_API_5days}?appid=${OPENWEATHER_KEY}&units=metric&type=accurate&zip=`


const OpenWeatherMap5days_BY_GEOHeader = `https://api.openweathermap.org/data/2.5/forecast/?appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate&`

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
function requestImg5days (sender , userLat , userLon){
  var linkImg = "";
  let url5daysByGeo = `https://api.openweathermap.org/data/2.5/forecast/?lat=${userLat}&lon=${userLon}&appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate`;
  request(url5daysByGeo, function (error, response, body) {
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
  
  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', (d) => {
      const image = JSON.parse(d)
      
      linkImg = image["url"];
      linkImg = linkImg+'.jpg';
      send5daysTestImg(senderForImg , linkImg)
      
      
    })
  })
  console.log('imgurl outsider', linkImg)
  function send5daysTestImg (sender , linkImg) {
    let linkImgNew = linkImg;
    console.log(`send5daysTestImg Started ${linkImgNew}`)
    console.log("Tester1"+linkImgNew)
    let data = {
      to: sender,
      messages: [
        {
          type: "image",
          originalContentUrl: linkImgNew,
          previewImageUrl: linkImgNew
          
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
  // send5daysTestImg1(senderForImg , linkImg)
  
})
}

//////////////////////////////////////////////////////Generate img/////////////////////////////////////////


////////////////////////////////////////////////Group word////////////////////////////////////////////////////////////
var weatherToday = ["อากาศวันนี้",  , "สภาพอากาศวันนี้" , "พยากรณ์อากาศประจำวัน" ];
var weatherTodayLocal = ["มื้อนี้เป็นหยังอากาศ", "อากาศมื้อนี้เป็นจั่งใด๋"]
var isTodayRain = ["วันนี้ฝนตกมั้ย", "วันนี้ฝนตกป่าว" , "มื้อนี่ฝนตกบ่"];
var wordGreeting = ["สวัสดี","สวัสดีจ้า" , "สวัสดีครับ" , "สวัสดีค่ะ"];
var greetingWordLocal = [ "เป็นจั่งใด๋" ]
var howToUse = ["พยากรณ์ซิได๋บุ่","ทำหยังได้บ้าง"]
var wordDailyByZipCode = ["พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10230","พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10400","พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10120","พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10170"]
var word5daysByZipCode = ["พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10230","พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10400","พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10120","พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10170"]
//Carousel invoke
var wordStarterWeatherMenu = ["พยากรณ์อากาศ"]
var wordMenuDailyWeather = ["พยากรณ์อากาศประจำวัน"]
var wordMenuForecastWeather = ["พยากรณ์อากาศ 5 วัน"]




////////////////////////////////////////////////Random MSG/////////////////////////////////////////////////////////////////
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let randomGreetingNum = 0;
let greetingMsg = ''
////////////////////////////////////////////////String Method//////////////////////////////////////////////////////////////


////////////////////////////////////////////////String Method//////////////////////////////////////////////////////////////


////////////////////////////////////////////////User Message Invoke////////////////////////////////////////////////////////
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  isForLop = false;
  var eventsType = req.body.events[0].type
  console.log('eventType', eventsType)
  if(eventsType === 'message'){
  var type = req.body.events[0].message.type
  
  if(type === 'text'){
    var text = req.body.events[0].message.text;
    console.log('text from user = ', text)
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
  if(type === 'location' && isDailyWeather){
    if(isGeoDaily){
      geoDaily(sender , userLat , userLon )
      
      isGeoDaily = false;
      isDailyWeather = false;
    }
    
  }
  else if (type === 'location' && isGeo5days){
    console.log('Function Geo5days Started')
    geo5days(sender , userLat , userLon )
    requestImg5days(sender , userLat , userLon)
    isGeo5days = false;

  }
///////////////////////////////////////////Message Type Location///////////////////////////////////////////

///////////////////////////////////////////Message Type Text///////////////////////////////////////////
  else if(type === 'text' && eventsType === 'message'){
    for ( i=0;i  < wordStarterWeatherMenu.length ;  i++ ){
      if (wordStarterWeatherMenu[i]==text) {
        isForLop = true;
        weatherMenuCarouselTemplate(sender)
        break;
        }
      }
    for ( i=0;i  < weatherToday.length ;  i++ ){
      if (weatherToday[i]==text) {
        isGeoDaily = true;
        isDailyWeather = true;
        isForLop = true;
        weatherDailySelectResTypeCarouselTemplate(sender)
        break;
        }
      }
    for ( i=0;i  < wordGreeting.length ;  i++ ){
      if (wordGreeting[i]==text) {
        isForLop = true;
        sendGreetingMessage(sender)
        break;
        }
      }
    for ( i=0;i  < wordDailyByZipCode.length ;  i++ ){
      if (wordDailyByZipCode[i]==text) {
        isForLop = true;
        if(isTextDaily) weatherDailyByZipCodeText(sender,text);
        break;
        }
      }
      for ( i=0;i  < word5daysByZipCode.length ;  i++ ){
        if (word5daysByZipCode[i]==text) {
          isForLop = true;
          isGeo5days = true;
          weather5daysByZipCode(sender,text)
          break;
          }
        }
    
    
  if (text === 'พยากรณ์อากาศประจำวันข้อความ' ) {
    isTextDaily = true;
    weatherDailyMenuCarouselTemplate(sender)
  }
  else if (text === 'เลือกรหัสไปรษณีย์'){
    quickReplyWeatherDailbyZipCode(sender)
    
  }
  else if (text === 'ส่งที่อยู่'){
    sendLocation(sender)
    
  }
  else if (text === 'พยากรณ์อากาศ 5 วันตามรหัสไปรษณีย์'){
    quickReply5daysZipCode(sender)
    
  }
  else if (text === 'ตั้งเวลาแจ้งเตือนฝนตก'){
    quickReplyWarningForecast(sender)
    
  }
  else if( text === 'พยากรณ์อากาศ 5 วัน'){
    isGeo5days = true;
    a5dayMenuCarouselTemplate(sender)
  }
  else if (text === 'สินเชื่อ ธกส.' || text === 'สินเชื่อ' ) {
    creditBAAC(sender)
  }
  else if (text === 'แผ่นดินทอง' ) {
    pandinthongCarousel(sender)
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
    if(!isForLop) deFaultFallback(sender, text);}
  
}
  res.sendStatus(200)
}
})
////////////////////////////////////////////////User Message Invoke////////////////////////////////////////////////////////


////////////////////////////////////////////////Starter Carousel Weather////////////////////////////////////////////////////
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
            },
            {
              type: "message",
              label: "ตั้งแจ้งเตือนฝนตก",
              text: "ตั้งเวลาแจ้งเตือนฝนตก"
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
///////////////////////////////////////////////Starter Carousel Weather////////////////////////////////////////////////////


function weatherDailySelectResTypeCarouselTemplate (sender, text) {
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
              label: "ข้อความ",
              text: "พยากรณ์อากาศประจำวันข้อความ"
            },
            {
              type: "message",
              label: "รูปภาพ",
              text: "พยากรณ์อากาศประจำวันรูปภาพ"
            },
            {
              type: "message",
              label: "กราฟ",
              text: "พยากรณ์อากาศประจำวันกราฟ"
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


///////////////////////////////////////////////Daily Carousel Weather////////////////////////////////////////////////////
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
              label: "เลือกรหัสไปรษณีย์",
              text: "เลือกรหัสไปรษณีย์"
            },
            {
              type: "message",
              label: "ส่งที่อยู่",
              text: "ส่งที่อยู่"
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
///////////////////////////////////////////////Daily Carousel Weather////////////////////////////////////////////////////

///////////////////////////////////////////////5days Carousel Weather////////////////////////////////////////////////////
function a5dayMenuCarouselTemplate (sender) {
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
              label: "เลือกรหัสไปรษณีย์",
              text: "พยากรณ์อากาศ 5 วันตามรหัสไปรษณีย์"
            },
            {
              type: "uri",
              label: "ส่งที่อยู่",
              uri: "line://nv/location"
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
    if (res) console.log('a5dayMenuCarouselTemplate : POST || Result : success')
    if (body) console.log(body)
  })
} 
///////////////////////////////////////////////5days Carousel Weather////////////////////////////////////////////////////

///////////////////////////////////////////////Datepicker for .....//////////////////////////////////////////////////////

function quickReplyWarningForecast (sender) {
  let data = {
    to: sender,
    messages: [
      {
        type: "text",
        text: "กรุณาเลือกเวลาที่ต้องการตั้งเวลาแจ้งเตือนฝนตกล่วงหน้า",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
              type:"datetimepicker",
              label:"เลือกวันที่",
              data:"storeId=12345",
              mode:"datetime",
              initial:"2019-10-25t00:00",
              max:"2019-12-30t23:59",
              min:"2019-10-25t00:00"
              }
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
    if (res) console.log('quickReplyWeatherDailbyRestrict : POST || Result : success')
    if (body) console.log(body)
  })
} 
///////////////////////////////////////////////Datepicker for .....//////////////////////////////////////////////////////

//////////////////////////////////////////////////Quick Reply for Daily Weather by District///////////////////////////////////////

function quickReplyWeatherDailbyZipCode (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "text",
        text: "กรุณาเลือกรหัสไปรษณีย์เพื่อทำรายการ",
        quickReply: {
          items: [
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10230",
                "text" : "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10230" //10230
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10400",
                "text" : "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10400" //10400
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10120",
                "text" : "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10120" //10120
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10170",
                "text" : "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10170" //10170
              }
            
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
    if (res) console.log('quickReplyWeatherDailbyRestrict : POST || Result : success')
    if (body) console.log(body)
  })
} 

//////////////////////////////////////////////////Quick Reply for Daily Weather by District///////////////////////////////////////

//////////////////////////////////////////////////Daily Weather by Destrict///////////////////////////////////////////////

function weatherDailyByZipCodeText (sender, text) {
  isTextDaily = false;
  let eachCaseDestrict = '';
  eachCaseDestrict = translateZipCodeTH(eachCaseDestrict);

  
  let urlDailyByRestrici = `${urlDailyForecastByDistrict}${eachCaseDestrict},th`
  request(urlDailyByRestrici, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log('Request api success ')
      console.log('The response body after parse => ',body)
    
                
  let cityName = body.name;
  cityName = translateDistrictTH(cityName);

  let weather = body.weather[0].description;
  weather = translateWeatherTH(weather);

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

  usersRef.child(sender).set({
    Lat: userLat,
    Lon: userLon
  });

  let DAILYWEATHER_BY_GEO = `https://api.openweathermap.org/data/2.5/weather/?lat=${userLat}&lon=${userLon}&appid=686d2c96c7002be9b1e714457eac2caf&units=metric&type=accurate`;
    request(DAILYWEATHER_BY_GEO, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        console.log('Request api success ')
        console.log('The response body after parse => ',body)
      
        
    
    let cityName = body.name;
    cityName = translateDistrictTH(cityName);
    
    let weather = body.weather[0].description;
    weather = translateWeatherTH(weather);
   
    console.log('weather', weather)
    const dMsg = `พยากรณ์อากาศประจำวัน\nเขต: ${cityName}`;
    const dMsg2 = `อุณภูมิ:  ${body.main.temp} °C \n สภาพอากาศ: ${weather}  \n ความชื้น : ${body.main.humidity}% \n ทิศทางลม : ${body.wind.deg}° \n ความเร็วลม : ${body.wind.speed} กม./ชม. `
    
    return pushGeoWeatherDaily( dMsg ,dMsg2 , sender);
      }else if (error){
        console.log('Request api ERROR ')
      }
    })
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
  }
//////////////////////////////////////////////////Daily Weather by Geo/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////5days Weather by Geo/////////////////////////////////////////////////////////////

function geo5days (sender , userLat , userLon) {}
  
  
//////////////////////////////////////////////////5days Weather by Geo/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////Quick Reply for 5days Weather by District///////////////////////////////////////

function quickReply5daysZipCode (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: "text",
        text: "กรุณาเลือกรหัสไปรษณีย์เพื่อทำรายการ",
        quickReply: {
          items: [
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10230",
                "text" : "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10230" //10230
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10400",
                "text" : "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10400" //10400
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10120",
                "text" : "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10120" //10120
              }
            },
            {
              "type": "action",
              "action": {
                "type": "message",
                "label": "10170",
                "text" : "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10170" //10170
              }
            
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
    if (res) console.log('quickReplyWeather5daysbyRestrict : POST || Result : success')
    if (body) console.log(body)
  })
} 

//////////////////////////////////////////////////Quick Reply for 5days Weather by District///////////////////////////////////////

//////////////////////////////////////////////////5days Weather by District///////////////////////////////////////////////

function weather5daysByZipCode (sender, text) {
  let eachCase5daysDistrict = '';
  eachCase5daysDistrict = translateZipCodeTH(eachCase5daysDistrict);
  
  let url5daysByDistrict = `${url5daysForecastByDistrict}${eachCase5daysDistrict},th`
  request(url5daysByDistrict, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log('Request api success ')
      console.log('The response body after parse => ',body)
    
                
      let cityName = body.city.name;
      cityName = translateDistrictTH(cityName);
      
    let alldates = body['list'].map(body => body.dt);

    let weatherDates = []

    alldates.forEach(res => {
        let jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleTimeString('th' , {year: 'numeric', month : 'short' , day : 'numeric' , timeZone : 'Asia/Bangkok'}))
      })
      const msg5daysByDistrict1  = `พยากรณ์อากาศ 5 วัน\nเขต: ลาดพร้าว`;
      const msg5daysByDistrict2 = `วัน/เวลา: ${weatherDates[0]} \nสภาพอากาศ: ${translateWeatherTH(body.list[0].weather[0].description)} 
      \nวัน/เวลา: ${weatherDates[1]} \nอุณภูมิ:  ${body.list[1].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[1].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[2]} \nอุณภูมิ:  ${body.list[2].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[2].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[3]} \nอุณภูมิ:  ${body.list[3].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[3].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[4]} \nอุณภูมิ:  ${body.list[4].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[4].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[5]} \nอุณภูมิ:  ${body.list[5].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[5].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[6]} \nอุณภูมิ:  ${body.list[6].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[6].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[7]} \nอุณภูมิ:  ${body.list[7].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[7].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[8]} \nอุณภูมิ:  ${body.list[8].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[8].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[9]} \nอุณภูมิ:  ${body.list[9].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[9].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[10]} \nอุณภูมิ:  ${body.list[10].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[10].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[11]} \nอุณภูมิ:  ${body.list[11].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[11].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[12]} \nอุณภูมิ:  ${body.list[12].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[12].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[13]} \nอุณภูมิ:  ${body.list[13].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[13].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[14]} \nอุณภูมิ:  ${body.list[14].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[14].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[15]} \nอุณภูมิ:  ${body.list[15].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[15].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[16]} \nอุณภูมิ:  ${body.list[16].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[16].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[17]} \nอุณภูมิ:  ${body.list[17].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[17].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[18]} \nอุณภูมิ:  ${body.list[18].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[18].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[19]} \nอุณภูมิ:  ${body.list[19].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[19].weather[0].description)}
      \nวัน/เวลา: ${weatherDates[20]} \nอุณภูมิ:  ${body.list[20].main.temp} องศา \nสภาพอากาศ:  ${translateWeatherTH(body.list[20].weather[0].description)}`
     
      const msg5daysByDistrict3 = `วัน/เวลา: ${body.list[21].dt_txt} \nอุณภูมิ:  ${body.list[21].main.temp} องศา \nสภาพอากาศ:  ${body.list[21].weather[0].description}
      \nวัน/เวลา: ${body.list[22].dt_txt} \nอุณภูมิ:  ${body.list[22].main.temp} องศา \nสภาพอากาศ:  ${body.list[22].weather[0].description}
      \nวัน/เวลา: ${body.list[23].dt_txt} \nอุณภูมิ:  ${body.list[23].main.temp} องศา \nสภาพอากาศ:  ${body.list[23].weather[0].description}
      \nวัน/เวลา: ${body.list[24].dt_txt} \nอุณภูมิ:  ${body.list[24].main.temp} องศา \nสภาพอากาศ:  ${body.list[24].weather[0].description}
      \nวัน/เวลา: ${body.list[25].dt_txt} \nอุณภูมิ:  ${body.list[25].main.temp} องศา \nสภาพอากาศ:  ${body.list[25].weather[0].description}
      \nวัน/เวลา: ${body.list[26].dt_txt} \nอุณภูมิ:  ${body.list[26].main.temp} องศา \nสภาพอากาศ:  ${body.list[26].weather[0].description}
      \nวัน/เวลา: ${body.list[27].dt_txt} \nอุณภูมิ:  ${body.list[27].main.temp} องศา \nสภาพอากาศ:  ${body.list[27].weather[0].description}
      \nวัน/เวลา: ${body.list[28].dt_txt} \nอุณภูมิ:  ${body.list[28].main.temp} องศา \nสภาพอากาศ:  ${body.list[28].weather[0].description}
      \nวัน/เวลา: ${body.list[29].dt_txt} \nอุณภูมิ:  ${body.list[29].main.temp} องศา \nสภาพอากาศ:  ${body.list[29].weather[0].description}
      \nวัน/เวลา: ${body.list[30].dt_txt} \nอุณภูมิ:  ${body.list[30].main.temp} องศา \nสภาพอากาศ:  ${body.list[30].weather[0].description}
      \nวัน/เวลา: ${body.list[31].dt_txt} \nอุณภูมิ:  ${body.list[31].main.temp} องศา \nสภาพอากาศ:  ${body.list[31].weather[0].description}
      \nวัน/เวลา: ${body.list[32].dt_txt} \nอุณภูมิ:  ${body.list[32].main.temp} องศา \nสภาพอากาศ:  ${body.list[32].weather[0].description}
      \nวัน/เวลา: ${body.list[33].dt_txt} \nอุณภูมิ:  ${body.list[33].main.temp} องศา \nสภาพอากาศ:  ${body.list[33].weather[0].description}
      \nวัน/เวลา: ${body.list[34].dt_txt} \nอุณภูมิ:  ${body.list[34].main.temp} องศา \nสภาพอากาศ:  ${body.list[34].weather[0].description}
      \nวัน/เวลา: ${body.list[35].dt_txt} \nอุณภูมิ:  ${body.list[35].main.temp} องศา \nสภาพอากาศ:  ${body.list[35].weather[0].description}
      \nวัน/เวลา: ${body.list[36].dt_txt} \nอุณภูมิ:  ${body.list[36].main.temp} องศา \nสภาพอากาศ:  ${body.list[36].weather[0].description}
      \nวัน/เวลา: ${body.list[37].dt_txt} \nอุณภูมิ:  ${body.list[37].main.temp} องศา \nสภาพอากาศ:  ${body.list[37].weather[0].description}
      \nวัน/เวลา: ${body.list[38].dt_txt} \nอุณภูมิ:  ${body.list[38].main.temp} องศา \nสภาพอากาศ:  ${body.list[38].weather[0].description}
      \nวัน/เวลา: ${body.list[39].dt_txt} \nอุณภูมิ:  ${body.list[39].main.temp} องศา \nสภาพอากาศ:  ${body.list[39].weather[0].description}`
      return push5daysByDistrict( msg5daysByDistrict1 , msg5daysByDistrict2 , msg5daysByDistrict3, sender);
    }
    })
  
    let push5daysByDistrict = async  (msg5daysByDistrict1 , msg5daysByDistrict2 , msg5daysByDistrict3, userId ) => {
      request.post({
        uri: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify({
          to: userId,
          messages: [{ type: "text", text: msg5daysByDistrict1 }, { type: "text", text: msg5daysByDistrict2 } , { type: "text", text: msg5daysByDistrict3 }]
        })
      });
      return res.status(200).send({ message: `Push: ${msg}` });
    };
    }
      
      

//////////////////////////////////////////////////5days Weather by District///////////////////////////////////////////////


//////////////////////////////////////////////////ETC.///////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////ETC.///////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////Translate Function///////////////////////////////////////////////////////////////////
function translateWeatherTH(weather){
  if(weather === 'clear sky') weather = "ท้องฟ้าปลอดโปร่ง";
  else if (weather === 'few clouds') weather = "เมฆปกคลุมบางเบา";
  else if (weather === 'scattered clouds') weather = "เมฆปกคลุมกระจายตัว";
  else if (weather === 'broken clouds') weather = "เมฆเป็นหย่อมๆ กระจายตัวกว้าง";
  else if (weather === 'light rain') weather = "ฝนตกบางเบา";
  else if (weather === 'light intensity drizzle') weather = "ฝนตกแดดออก";
  return weather
}

function translateDistrictTH(cityName){
  if(cityName ===  'Lat Phrao' ) cityName = "ลาดพร้าว";
  
  else if (cityName ===  'Phaya Thai' ) cityName = "พญาไท";

  else if (cityName ===  'Bang Kholaem' ) cityName = "บางคอแหลม";

  else if (cityName ===  'Thawi Watthana' ) cityName = "ทวีวัฒนา";

  return cityName
}

function translateZipCodeTH(zipCode){
  if(zipCode === "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10230") zipCode = '10230'
  
  else if(zipCode === "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10400") zipCode = '10400'

  else if(zipCode === "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10120") zipCode = '10120'

  else if(zipCode === "พยากรณ์อากาศ 5 วันรหัสไปรษณีย์ 10170") zipCode = '10170'

  else if(zipCode === "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10230") zipCode = '10230'
  
  else if(zipCode === "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10400") zipCode = '10400'

  else if(zipCode === "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10120") zipCode = '10120'

  else if(zipCode === "พยากรณ์อากาศประจำวันรหัสไปรษณีย์ 10170") zipCode = '10170'
  return zipCode
}

//////////////////////////////////////////////////Translate Function///////////////////////////////////////////////////////////////////
function sendLocation (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type": "uri",
                  "label": "กดเพื่อส่งตำแหน่ง",
                  "uri": "line://nv/location"
              }
            }
          ]
        }
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



// app.set('port', (process.env.PORT || 80))
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})