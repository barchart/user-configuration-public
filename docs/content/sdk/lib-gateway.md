## UserConfigurationGateway :id=userconfigurationgateway
> <p>The <strong>central component of the SDK</strong>. It is responsible for connecting to Barchart's
> User Preference Service.</p>

**Kind**: global class  
**Extends**: <code>Disposable</code>  
**Access**: public  

* [UserConfigurationGateway](#UserConfigurationGateway) ⇐ <code>Disposable</code>
    * _instance_
        * [.environment](#UserConfigurationGatewayenvironment) ⇒ <code>String</code>
        * [.connect(jwtProvider)](#UserConfigurationGatewayconnect) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
        * [.readConfiguration()](#UserConfigurationGatewayreadConfiguration) ⇒ [<code>Promise.&lt;Schema.UserConfiguration&gt;</code>](/content/sdk/lib-data?id=schemauserconfiguration)
        * [.writeConfiguration(data)](#UserConfigurationGatewaywriteConfiguration) ⇒ [<code>Promise.&lt;Schema.UserConfiguration&gt;</code>](/content/sdk/lib-data?id=schemauserconfiguration)
    * _static_
        * [.forTest(jwtProvider)](#UserConfigurationGatewayforTest) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
        * [.forDevelopment(jwtProvider)](#UserConfigurationGatewayforDevelopment) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
        * [.forStaging(jwtProvider)](#UserConfigurationGatewayforStaging) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
        * [.forDemo(jwtProvider)](#UserConfigurationGatewayforDemo) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
        * [.forProduction(jwtProvider)](#UserConfigurationGatewayforProduction) ⇒ [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)
    * _constructor_
        * [new UserConfigurationGateway(protocol, host, port, environment)](#new_UserConfigurationGateway_new)


* * *

### userConfigurationGateway.environment :id=userconfigurationgatewayenvironment
> <p>A description of the environment (e.g. development, production, etc).</p>

**Kind**: instance property of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: <code>String</code>  
**Access**: public  

* * *

### userConfigurationGateway.connect(jwtProvider) :id=userconfigurationgatewayconnect
> <p>Attempts to establish a connection to the backend. This function should be invoked
> immediately following instantiation. Once the resulting promise resolves, a
> connection has been established and other instance methods can be used.</p>

**Kind**: instance method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### userConfigurationGateway.readConfiguration() :id=userconfigurationgatewayreadconfiguration
> <p>Retrieves user preferences from the remote service (for the current user).</p>

**Kind**: instance method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;Schema.UserConfiguration&gt;</code>](/content/sdk/lib-data?id=schemauserconfiguration)  
**Access**: public  

* * *

### userConfigurationGateway.writeConfiguration(data) :id=userconfigurationgatewaywriteconfiguration
> <p>Saves user preferences data to the remote service  (for the current user).</p>

**Kind**: instance method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;Schema.UserConfiguration&gt;</code>](/content/sdk/lib-data?id=schemauserconfiguration)  
**Access**: public  

| Param | Type |
| --- | --- |
| data | [<code>Schema.UserConfiguration</code>](/content/sdk/lib-data?id=schemauserconfiguration) | 


* * *

### UserConfigurationGateway.forTest(jwtProvider) :id=userconfigurationgatewayfortest
> <p>Creates and starts a new [UserConfigurationGateway](/content/sdk/lib-gateway?id=userconfigurationgateway) for use in the public test environment.</p>

**Kind**: static method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### UserConfigurationGateway.forDevelopment(jwtProvider) :id=userconfigurationgatewayfordevelopment
> <p>Creates and starts a new [UserConfigurationGateway](/content/sdk/lib-gateway?id=userconfigurationgateway) for use in the private development environment.</p>

**Kind**: static method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### UserConfigurationGateway.forStaging(jwtProvider) :id=userconfigurationgatewayforstaging
> <p>Creates and starts a new [UserConfigurationGateway](/content/sdk/lib-gateway?id=userconfigurationgateway) for use in the private staging environment.</p>

**Kind**: static method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### UserConfigurationGateway.forDemo(jwtProvider) :id=userconfigurationgatewayfordemo
> <p>Creates and starts a new [UserConfigurationGateway](/content/sdk/lib-gateway?id=userconfigurationgateway) for use in the private demo environment.</p>

**Kind**: static method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### UserConfigurationGateway.forProduction(jwtProvider) :id=userconfigurationgatewayforproduction
> <p>Creates and starts a new [UserConfigurationGateway](/content/sdk/lib-gateway?id=userconfigurationgateway) for use in the public production environment.</p>

**Kind**: static method of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  
**Returns**: [<code>Promise.&lt;UserConfigurationGateway&gt;</code>](#UserConfigurationGateway)  
**Access**: public  

| Param | Type |
| --- | --- |
| jwtProvider | [<code>JwtProvider</code>](/content/sdk/lib-security?id=jwtprovider) | 


* * *

### new UserConfigurationGateway(protocol, host, port, environment) :id=new_userconfigurationgateway_new
**Kind**: constructor of [<code>UserConfigurationGateway</code>](#UserConfigurationGateway)  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>String</code> | <p>The protocol of the of the User Preference web service (either HTTP or HTTPS).</p> |
| host | <code>String</code> | <p>The hostname of the User Preference web service.</p> |
| port | <code>Number</code> | <p>The TCP port number of the User Preference web service.</p> |
| environment | <code>String</code> | <p>A description of the environment we're connecting to.</p> |


* * *

