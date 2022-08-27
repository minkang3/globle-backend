# Globle Backend #
First Place in LA Hack's Best Getaway Hack
## Authors ##
- Elliot Lee
- Pushu Zhang
- Min Kang

## Getting Started ##
I used npm to set up the dependencies and environment for the server.
Currently it is using node 17.9.0 but i am willing to change it if anyone prefers.
After installing node 17.9.0, npm, and git, run the following:
```
$ git clone https://github.com/eal001/globle-server.git
$ npm install
```

In order to run the server: 
```
$ npm start
```

In order to test the server functions, we can use the test scripts:
```
$ node scripts/[script-name].js
```

## Formatting ##
Each endpoint will take a set of query arguments

### /generate-getaway ###
a post endpoint with no body arguments necessary


### /get-getaway ###
a get endpoint that needs the latitude and longitude of the player's location
```
{
    latitude: 33.8,
    longitude: -118.3
}
```


### /players-nearby ###
a get endpoint that needs the latitude and longitude of the player's location
```
{
    latitude: 33.8,
    longitude: -118.3
}
```

a post endpoint that needs the latitude and longitude of the player's location,  
```
{
    latitude: 33.8,
    longitude: -118.3,
    increment: true
}
```



## Goals ##
The overall goal of this server is to manage the logic of the globle app. this should perform all of the calculations, EXCLUDING distance. Each new globle location is calculated here, so are the amount of persons in the area of the globle location. In the future we may want a notion of accounts and users in order to keep track of their awards and achievements. I have not thought about that, but it would require some type of databasing.
Again, the distance from the user's globle location will be calculated client side so that it can be updated in real time, faster than we are able to process server requests.

## See Also ##
Globle Frontend: https://github.com/minkang543/globle-frontend
