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