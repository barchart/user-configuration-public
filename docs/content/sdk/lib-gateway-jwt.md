## Contents {docsify-ignore}

* [JwtProvider](#JwtProvider) 

* [Callbacks](#Callbacks) 


* * *

## JwtProvider :id=jwtprovider
> <p>Generates and caches a signed token (using a delegate). The cached token
> is refreshed periodically.</p>

**Kind**: global class  
**Access**: public  
**Import**: @barchart/user-configuration-client-js/lib/gateway/jwt/JwtProvider  
**File**: /lib/gateway/jwt/JwtProvider.js  

* [JwtProvider](#JwtProvider)
    * _instance_
        * [.getToken()](#JwtProvidergetToken) ⇒ <code>Promise.&lt;String&gt;</code>
    * _static_
        * [.forTest(userId, contextId, [permissions])](#JwtProviderforTest) ⇒ [<code>JwtProvider</code>](#JwtProvider)
        * [.forDevelopment(userId, contextId, [permissions])](#JwtProviderforDevelopment) ⇒ [<code>JwtProvider</code>](#JwtProvider)
    * _constructor_
        * [new JwtProvider(generator, interval)](#new_JwtProvider_new)


* * *

### jwtProvider.getToken() :id=jwtprovidergettoken
> <p>Reads the current token, refreshing if necessary.</p>

**Kind**: instance method of [<code>JwtProvider</code>](#JwtProvider)  
**Returns**: <code>Promise.&lt;String&gt;</code>  
**Access**: public  

* * *

### JwtProvider.forTest(userId, contextId, [permissions]) :id=jwtproviderfortest
> <p>Builds a [JwtProvider](/content/sdk/lib-gateway-jwt?id=jwtprovider) which will generate tokens impersonating the specified
> user. These tokens will only work in the &quot;test&quot; environment.</p>
> <p>Recall, the &quot;test&quot; environment is not &quot;secure&quot; -- any data saved here can be accessed
> by anyone (using this feature). Furthermore, data is periodically purged from the
> test environment.</p>

**Kind**: static method of [<code>JwtProvider</code>](#JwtProvider)  
**Returns**: [<code>JwtProvider</code>](#JwtProvider)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>String</code> | <p>The user identifier to impersonate.</p> |
| contextId | <code>String</code> | <p>The context identifier of the user to impersonate.</p> |
| [permissions] | <code>String</code> | <p>The desired permission level.</p> |


* * *

### JwtProvider.forDevelopment(userId, contextId, [permissions]) :id=jwtproviderfordevelopment
> <p>Builds a [JwtProvider](/content/sdk/lib-gateway-jwt?id=jwtprovider) which will generate tokens impersonating the specified
> user. The &quot;development&quot; environment is for Barchart use only and access is restricted
> to Barchart's internal network.</p>

**Kind**: static method of [<code>JwtProvider</code>](#JwtProvider)  
**Returns**: [<code>JwtProvider</code>](#JwtProvider)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>String</code> | <p>The user identifier to impersonate.</p> |
| contextId | <code>String</code> | <p>The context identifier of the user to impersonate.</p> |
| [permissions] | <code>String</code> | <p>The desired permission level.</p> |


* * *

### new JwtProvider(generator, interval) :id=new_jwtprovider_new
**Kind**: constructor of [<code>JwtProvider</code>](#JwtProvider)  

| Param | Type | Description |
| --- | --- | --- |
| generator | [<code>JwtTokenGenerator</code>](#CallbacksJwtTokenGenerator) | <p>An anonymous function which returns a signed JWT token.</p> |
| interval | <code>Number</code> | <p>The number of milliseconds which must pass before a new JWT token is generated.</p> |


* * *

## Callbacks :id=callbacks
> <p>A meta namespace containing signatures of anonymous functions.</p>

**Kind**: global namespace  

* * *

### Callbacks.JwtTokenGenerator :id=callbacksjwttokengenerator
> <p>A function which returns a signed token.</p>

**Kind**: static typedef of [<code>Callbacks</code>](#Callbacks)  
**Returns**: <code>String</code> \| <code>Promise.&lt;String&gt;</code>  
**Access**: public  

* * *

