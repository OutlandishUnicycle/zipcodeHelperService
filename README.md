#Discollect Zipcode service!

##End points

###/api/zip
Send in lat and lng coords and receive back an associated zipcode
####SAMPLE:
GET request:
/api/zip?lng=-91.4821482&lat=44.95309659999999

Response:
19525

###/api/coords
Send in zipcode and receive back the associated lat and lng coords
####SAMPLE:
GET request:
/api/coords?zip=54729

Response:
{"lat":44.95309659999999,"lng":-91.4821482}

###/api/state
Send in a zipcode and recieve back a two character state code
GET request:
/api/state?zip=54729

Response:
"WI"

###/api/nearby
Send in a zipcode and recieve back an array of zips within 20 miles
####SAMPLE:
GET request:
/api/nearby?zip=54729

Response:
[
  "54701",
  "54742",
  "54720",
  "54702",
  "54703",
  "54739",
  "54774",
  "54726",
  "54729",
  "54727",
  "54730",
  "54748",
  "54724",
  "54732"
]
