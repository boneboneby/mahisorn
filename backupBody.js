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
        weatherDailyMenuCarouselTemplate(sender)
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
        weatherDailyByZipCode(sender,text)
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
    
    
  if (text === 'แผ่นดินทอง' ) {
    pandinthongCarousel(sender)
  }
  else if (text === 'พยากรณ์อากาศประจำวันตามรหัสไปรษณีย์'){
    quickReplyWeatherDailbyZipCode(sender)
    isGeoDaily = false;
  }
  else if (text === 'พยากรณ์อากาศ 5 วันตามรหัสไปรษณีย์'){
    quickReply5daysZipCode(sender)
    isGeo5days = false;
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