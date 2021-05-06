# Release Notes

## 2.3.2
**Technical Enhancements**

* Updated `barchart/common-js` to the v4.9.0.
* Updated `gulp` script.

## 2.3.1
**Other**

* Updated hostname for _admin_ environment.


## 2.2.0
**New Features**

* Added ```JwtProvider.forAdmin``` function.

## 2.1.0
**New Features**

* Added static factory function for ```JwtProvider``` class.

**Other**

* Improved refresh logic for JWT.

## 2.0.0
**Initial Public Release**

**Breaking Changes**

* The mechanism for passing JSON Web Tokens to the ```UserConfigurationGateway``` has changed. Consumers are now required to provide ```JwtProvider``` instances instead of a ```RequestInterceptor``` instances. Here are the specifics:
  * The ```RequestInterceptor``` argument was replaced with a ```JwtProvider``` argument on static factory functions (e.g. ```UserConfigurationGateway.forProduction```).
  * The ```RequestInterceptor``` argument was removed from the ```UserConfigurationGateway``` constructor.
  * The ```UserConfigurationGateway.start``` function was renamed to ```UserConfigurationGateway.connect``` and now has a ```JwtProvider``` argument.
  * The ```JwtGateway``` and ```JwtEndpoint``` classes were removed.
  * Static factory functions for impersonating users in the ```test``` and ```development``` environments were added. See ```JwtProvider.forTest``` and ```JwtProvider.forDevelopment```.
