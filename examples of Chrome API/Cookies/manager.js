// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}
chrome.cookies.onChanged.addListener(listener =>{
  console.log(listener.cookie.domain)
})

function avito(){
  let cookies = [
    {
      "domain": "www.avito.ru",
     
      "httpOnly": false,
      "name": "buyer_popup_location",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "660060"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1627977944.827886,
     
      "httpOnly": true,
      "name": "isLegalPerson",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "0"
    },
    {
      "domain": "www.avito.ru",
      "expirationDate": 1659426544,
     
      "httpOnly": false,
      "name": "lastViewingTime",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1627890544693"
    },
    {
      "domain": "www.avito.ru",
     
      "httpOnly": false,
      "name": "isWideScreen",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "true"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1658485213.911046,
     
      "httpOnly": true,
      "name": "__ddg1",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "lY4kzshJhodCynS4SuzF"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 33132441044.827766,
     
      "httpOnly": true,
      "name": "buyer_local_priority_v2",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "0"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1628063450,
     
      "httpOnly": false,
      "name": "ft",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "\"IhgPdhxZHxQlFnERgeX/yJSI0vzOolmPfdZ2HRzw3nzaNoRVuTDEyPmIaoLwRb/4uUTSGQsfwIOcdCzBpb0TbOtdpe9yConfdTfkngwd8h4v9gFslovV1RT7yreF39oqChtKLrYEbhrccMIvybWME38YrxEG1AIAN2xAtb112KhONHzrR9JoSXtpOCbaeiBX\""
    },
    {
      "domain": "www.avito.ru",
      "expirationDate": 1630569048,
     
      "httpOnly": false,
      "name": "isCriteoSetNew",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "true"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1690961672,
     
      "httpOnly": false,
      "name": "_ga_9E363E7BES",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "GS1.1.1627888897.47.1.1627889672.60"
    },
    {
      "domain": "www.avito.ru",
     
      "httpOnly": false,
      "name": "abp",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "0"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1627977644.827836,
     
      "httpOnly": true,
      "name": "dfp_group",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "6"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1690961672,
     
      "httpOnly": false,
      "name": "_ga",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "GA1.1.1866827828.1626517511"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1628063450,
     
      "httpOnly": false,
      "name": "f",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "5.0c4f4b6d233fb90636b4dd61b04726f1a6bb7312e5dad7c9a6bb7312e5dad7c9a6bb7312e5dad7c9a6bb7312e5dad7c919308f9a005528bd19308f9a005528bd19308f9a005528bda6bb7312e5dad7c9431077337c77cbe0431077337c77cbe00df103df0c26013a0df103df0c26013a2ebf3cb6fd35a0ac0df103df0c26013a8b1472fe2f9ba6b9ad42d01242e34c7968e2978c700f15b6831064c92d93c3903815369ae2d1a81d04dbcad294c152cb0df103df0c26013aba0ac8037e2b74f9268a7bf63aa148d20df103df0c26013a8b1472fe2f9ba6b97b0d53c7afc06d0b71e7cb57bbcb8e0f03c77801b122405c03c77801b122405c7b0d53c7afc06d0b2ebf3cb6fd35a0ac20f3d16ad0b1c54605b5151ceabede88c031e804cbc8d8935d0810587f6459ea29c45a398d4348adda1e0d03582d0d9fd4857e2eba4a756152f7281c8500eeebfd6c23efc86595147dfeaeba326c9b85fdab8777f57f211ee2415097439d404746b8ae4e81acb9fa786047a80c779d5146b8ae4e81acb9fa1f1985318fbeb234a291fc3f0bfffdd52da10fb74cac1eabb3ae333f3b35fe91de6c39666ae9b0d7312f8fecc8ca5e543486a07687daa291"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1689592081,
     
      "httpOnly": false,
      "name": "__utma",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "99926606.1866827828.1626517511.1626520030.1626520030.1"
    },
    {
      "domain": ".avito.ru",
     
      "httpOnly": false,
      "name": "__utmc",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "99926606"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1642288081,
     
      "httpOnly": false,
      "name": "__utmz",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "99926606.1626520030.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1634618515,
     
      "httpOnly": false,
      "name": "_fbp",
      "path": "/",
      "sameSite": "lax",
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "fb.1.1626517511416.92090919"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1634293510,
     
      "httpOnly": false,
      "name": "_gcl_au",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1.1.997839263.1626517511"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1658053523,
     
      "httpOnly": false,
      "name": "_ym_d",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1626517524"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1628049048,
     
      "httpOnly": false,
      "name": "_ym_isad",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "2"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1658053523,
     
      "httpOnly": false,
      "name": "_ym_uid",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1576840883238862840"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1627978846,
     
      "httpOnly": false,
      "name": "_ym_visorc",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "b"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1784197522.056417,
     
      "httpOnly": true,
      "name": "auth",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1658053508.984459,
     
      "httpOnly": true,
      "name": "buyer_index_tooltip",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1659513044.827717,
     
      "httpOnly": true,
      "name": "buyer_laas_location",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "660060"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1659513044.827736,
     
      "httpOnly": true,
      "name": "buyer_location_id",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "660060"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1628063444.827754,
     
      "httpOnly": true,
      "name": "luri",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "komsomolsk-na-amure"
    },
    {
      "domain": "www.avito.ru",
     
      "httpOnly": false,
      "name": "no-ssr",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1"
    },
    {
      "domain": "www.avito.ru",
     
      "httpOnly": false,
      "name": "SEARCH_HISTORY_IDS",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "4"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1784197522.056394,
     
      "httpOnly": true,
      "name": "sessid",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "c1395eaf92fc19034d15e9dadceb3f0d.1626517523"
    },
    {
      "domain": "www.avito.ru",
      "expirationDate": 1659426544,
     
      "httpOnly": false,
      "name": "showedStoryIds",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "69-68-66-63-62-61-58-50-49-48-47-42-32"
    },
    {
      "domain": "www.avito.ru",
      "expirationDate": 1628063446,
     
      "httpOnly": false,
      "name": "st",
      "path": "/",
      "sameSite": null,
      "secure": false,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidko0TkJ5SlU2TElJTGRDY3VNTkdBYnlzVGk3VTVKRW8wVkZQNXBSVll0ZVlpM0lxVUJ1Q2JQVUtjS0FnSGJvRUdxQXhqYXlCZzY2SXh6aG4wcXhFS21zWEFxRUI0dlNJcVhycWEwckMzUHRvaTVnMjF0SjdUVHdmRTRWa0hxb09Rc0JtSnJhbW9nWWY4WWZkTXg4amZQOXhOZllneG9ZVXdtRTdhU3V4UGUvSjhxUndMa3FCSkVIQXdmZVBCa1lNREV0bmszNDhRU1B0aXh0UzkvVCtEb2pEazdFelBiOW5GVUtidzFmMXVaYU43VEUwU2ZuVlNDVVBhcEE2Q0NyelRvWXJUOXdIK3JDU3JzQ1YvRUlQRHNwV0dnTlRBK2JXOTh3VzRObmZpdHNyc1lhY2MxMWo0dnI1RUlXaXcrTkpGYWkrRXNsODI0TmNZUEcwZUlnMkJ3PT0iLCJpYXQiOjE2Mjc4OTA1NDIsImV4cCI6MTYyOTEwMDE0Mn0.pt75Xjxth4r5G69WZdo2urbduTbYI78ty2InJyYNa9A"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1628581844.827816,
     
      "httpOnly": true,
      "name": "sx",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "H4sIAAAAAAACAw3MMQ6AIAwF0Lt0dvhKg5Xj2ChqB2JI7EC4u6xveI3iIr6vm96nSRYtyMoOy6DU6KNEL1js4vgUiA4v1Rmm2VCrO9NEB6V5NIiBOfT%2BA9hKJY1UAAAA"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1690451610.487514,
     
      "httpOnly": true,
      "name": "u",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "2osvisvh.odsrwy.v2jg08zloig0"
    },
    {
      "domain": ".avito.ru",
      "expirationDate": 1627978856.352135,
     
      "httpOnly": true,
      "name": "v",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      "url": "https://www.avito.ru",
      "storeId": null,
      "value": "1627977043"
    }
  ]
  cookies.forEach(cookie => {
    chrome.cookies.set(cookie)
  })
}

function google(){
  let cookies = [
    {
      "domain": ".google.com",
      "expirationDate": 1679729653.089366,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "SAPISID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      
      "storeId": null,
      "value": "SrFFzAznuAF4a2B5/A0evzgOmDTXyRErIk"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1679729653.089386,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "__Secure-3PAPISID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "SrFFzAznuAF4a2B5/A0evzgOmDTXyRErIk"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1673954750.527825,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "ANID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "AHWqTUksS09LhPb9ReKmJdYbJGfTvKHxj0q47WUAabbYJa-z51gCa8xVKdiFKi_t"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1643788227.768011,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "NID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "220=X1OMGS7Jy2nbMpnTW-ELPn2aYLKNsbsjP479KSOhKrQvUxzAqtC-RPqS39glo_7XKVi6gvxeATq_h_eP2V_Oip1fSwNnEqQACOK-fUpdVLruNFZRPSDUkknG_9mnNjRG8nYLgF-KViUHz69xqSR_JGklYBos6e2im6rqKfa8G2s4pZKokkwfRd6SanSQPFuf-FGgkObkUkZZBmqH_czBPXRGYLlUuCY_LHVgOlLMj5sJNCXYnEpSN0saOQpbiv5qJebGNeWfXdIcack"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1679729653.089347,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "APISID",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "Fjs9GyIJwh5UlShz/AClZrQE2TETZCfPnn"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1633162377,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "OGPC",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "19022552-1:"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1690509842.09763,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "__Secure-3PSID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "AQi_ODLGDLLQBz_icdGNN4uvxDQZK4WilCTOisfUEP3MwIaXW7M1sYLABjUMbgC0wUb89A."
    },
    {
      "domain": ".google.com",
      "expirationDate": 1630570379.494775,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "1P_JAR",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "2021-08-03-08"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1659514381.168819,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "__Secure-3PSIDCC",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "AJi4QfG29Nx5Xr0VG1_3zrgItspnyClRaS7u7lCwUOFlO_PXWt5T1ZZNohbXinmvnf_tmoIPDig"
    },
    {
      "domain": "www.google.com",
      "expirationDate": 1627978412,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "DV",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "c6IFZRW7O_ZMQAgxTl7ANXbAMqCwsBfWSxWyBWS9uAIAALDvYO7I265HWgEAADSuK0_N0U9ZWAAAAA"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1679729653.08931,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "HSID",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "AToNe1umA9mpirxlR"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1633162379,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "OGP",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "-19022552:"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1641292409.87844,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "SEARCH_SAMESITE",
      "path": "/",
      "sameSite": "strict",
      "secure": false,
      
      "storeId": null,
      "value": "CgQIgJMB"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1690509842.097604,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "SID",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "AQi_ODLGDLLQBz_icdGNN4uvxDQZK4WilCTOisfUEP3MwIaX1LArPl_nWQrkfbGB0dhi8w."
    },
    {
      "domain": ".google.com",
      "expirationDate": 1659514381.168767,
      "url": "https://www.google.com",
      "httpOnly": false,
      "name": "SIDCC",
      "path": "/",
      "sameSite": null,
      "secure": false,
      
      "storeId": null,
      "value": "AJi4QfGYTuEacrc0Rm7fppo16ahPXfV01juDXLA_z2WMvI59OuYNS-wLSOkBolw4xSHSrWtcgJY"
    },
    {
      "domain": ".google.com",
      "expirationDate": 1679729653.089329,
      "url": "https://www.google.com",
      "httpOnly": true,
      "name": "SSID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      
      "storeId": null,
      "value": "Ah8J38GAhIeSBU1bB"
    }
  ]
  cookies.forEach(cookie => {
    chrome.cookies.set(cookie)
  })
}

function facebook(){
  let cookies = [
    {
      "domain": ".facebook.com",
      "expirationDate": 1691049813.977927,
      "url":"https://www.facebook.com",
      "httpOnly": true,
      "name": "datr",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "VPgIYXBiRFEdd6tAFCKL7v_O"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1635753823.176698,
      "url": "https://www.facebook.com",
      "httpOnly": true,
      "name": "fr",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "05UrBJP8bt7m8hfsd.AWWJTNzLP80BaOYVCqnA_0dkkKE.BgBDF1.I1.AAA.0.0.BhCPhi.AWUjRAhRnYw"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1659513826.176682,
      "url": "https://www.facebook.com",
      "httpOnly": true,
      "name": "xs",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "41%3AJsiZLwLIlCWcEA%3A2%3A1627977826%3A-1%3A14476"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1659513826.176668,
      "url": "https://www.facebook.com",
      "httpOnly": false,
      "name": "c_user",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "100005475161515"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1691049829.176595,
      "url": "https://www.facebook.com",
      "httpOnly": true,
      "name": "sb",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "U_gIYQPQcfZ1ERopN8JaAh__"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1628067837.243896,
      "url": "https://www.facebook.com",
      "httpOnly": true,
      "name": "spin",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      
      "storeId": null,
      "value": "r.1004195978_b.trunk_t.1627977836_s.1_v.2_"
    },
    {
      "domain": ".facebook.com",
      "expirationDate": 1628582619,
      "url": "https://www.facebook.com",
      "httpOnly": false,
      "name": "wd",
      "path": "/",
      "sameSite": "lax",
      "secure": true,
      
      "storeId": null,
      "value": "1879x970"
    }
  ]
  cookies.forEach(cookie => {
    chrome.cookies.set(cookie)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#avito_button').addEventListener(
    'click', avito);
  document.querySelector('#facebook_button').addEventListener(
      'click', facebook);
  document.querySelector('#google_button').addEventListener(
      'click', google);
});
