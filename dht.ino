#include<WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"
const char* ssid = "Wokwi-GUEST";
const char* pass = "";

#define DHTPIN 15
#define DHTTYPE DHT22   
DHT dht(DHTPIN, DHTTYPE);

unsigned const long interval = 2000;
unsigned long zero = 0;

void setup(){
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  while(WiFi.status() != WL_CONNECTED){
    delay(100);
    Serial.println(".");
  }
  Serial.println("WiFi Connected!");
  Serial.println(WiFi.localIP());
  dht.begin();

}

void loop(){
  delay(2000);
  if(millis()-zero > interval){
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
    float hic = dht.computeHeatIndex(t, h, false);
    HTTPClient http;
    http.begin("http://15.228.159.221:3000/update?temperature="+ String(t)+"&humidity="+ String(h));
    int httpResponCode = http.GET();
    Serial.println(httpResponCode);
    if(httpResponCode > 0){
      String payload = http.getString();
      Serial.print(payload);
    }else{
      Serial.print("error ");
      Serial.println(httpResponCode);
    }
    zero = millis();
  }
  
}