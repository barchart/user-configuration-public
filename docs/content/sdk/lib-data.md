## Schema :id=schema
> <p>A meta namespace containing structural contracts of anonymous objects.</p>

**Kind**: global namespace  

* [Schema](#Schema) : <code>object</code>
    * _static_
        * [.UserConfiguration](#SchemaUserConfiguration) : <code>Object</code>
        * [.UserConfigurationServiceMetadata](#SchemaUserConfigurationServiceMetadata) : <code>Object</code>


* * *

### Schema.UserConfiguration :id=schemauserconfiguration
> <p>An object describing ad hoc preferences for a user.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | <p>The user identifier for the watchlist's owner. Omit when creating a new watchlist — the backend will assign.</p> |
| context | <code>String</code> | <p>The context identifier for the watchlist's owner. Omit when creating a new watchlist — the backend will assign.</p> |


* * *

### Schema.UserConfigurationServiceMetadata :id=schemauserconfigurationservicemetadata
> <p>An object describing the connection to the remote service.</p>

**Kind**: static typedef of [<code>Schema</code>](#Schema)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| server.semver | <code>String</code> | <p>The remote service's software version number.</p> |
| server.environment | <code>String</code> | <p>The remote service's environment name (e.g. production, test, staging, etc).</p> |
| user.id | <code>String</code> | <p>The current user's identifier.</p> |
| user.permissions | <code>String</code> | <p>The current user's permission level.</p> |
| context.id | <code>String</code> | <p>The current user's context (i.e. Barchart customer identifier).</p> |


* * *

