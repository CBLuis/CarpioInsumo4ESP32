
#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include <addons/TokenHelper.h>
#include <ArduinoJson.h>

//Conectar a una red WiFi 
const char* WIFI_SSID = "PAINxzx";//el nombre de la red
const char* WIFI_PASSWORD = "carpio1234";//la contraseña de la red
//Recursos de Firebase
const char* API_KEY = "AIzaSyBkW9-AF2nWysnVmdbPJWYkdJb1rTJ3TXw";
const char* FIREBASE_PROJECT_ID = "iotcarpiochililin";
//CONFIGURAR UN EMAIL Y CONTRASEÑA EN AUTHENTICATION de Firebase
const char* USER_EMAIL = "carpio@esp.com";
const char* USER_PASSWORD = "123456";

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

const int LED1 = 23;
const int LED2 = 22;
const int LED3 = 21;

//Funcion para configuara WiFi
void setupWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase() {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;  // Ver addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setup() {
  Serial.begin(115200);
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);//Verificamos la version
  setupWiFi();//Llamamos la funcion de configuración wifi
  setupFirebase();//Llamamos la funcion de configuración Firebase
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
}

void loop(){
String path = "controlLED";//RUTA DE COLECCION
  FirebaseJson json;

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", path.c_str(), "")) {

    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

    if (!error) {
      for (JsonObject document : doc["documents"].as<JsonArray>()) {
        const char* document_name = document["name"];//PARAMETRO NOMBRE == ID Documento
        //Serial.print(document);
        const bool state = document["fields"]["encender"]["booleanValue"];//PARAMETRO DE CAMPOS A REVISAR
        Serial.print(" : ");
        if (strstr(document_name, "LED1") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED1 On") : Serial.print("LED1 OFF");
            if(state==true){
              digitalWrite(LED1,1);
            }         
          }
          
        if (strstr(document_name, "LED2") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED2 On") : Serial.print("LED2 OFF");
          if(state==true){
              digitalWrite(LED2,1);
            }      
          }
        if (strstr(document_name, "LED3") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED3 On") : Serial.print("LED3 OFF");
           if(state==true){
              digitalWrite(LED3,1);
            }      
          }
        delay(500);
		  }
      
      for (JsonObject document : doc["documents"].as<JsonArray>()) {
        const char* document_name = document["name"];//PARAMETRO NOMBRE == ID Documento
        //Serial.print(document);
        const bool state = document["fields"]["apagar"]["booleanValue"];//PARAMETRO DE CAMPOS A REVISAR
        Serial.print(" : ");
        if (strstr(document_name, "LED1") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED1 On") : Serial.print("LED1 OFF");
            if(state==true){
              digitalWrite(LED1,0);
            }         
          }
          
        if (strstr(document_name, "LED2") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED2 On") : Serial.print("LED2 OFF");
          if(state==true){
              digitalWrite(LED2,0);
            }      
          }
        if (strstr(document_name, "LED3") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.print("LED3 On") : Serial.print("LED3 OFF");
           if(state==true){
              digitalWrite(LED3,0);
            }      
          }
        delay(500);
		  }

	  }
  }
}