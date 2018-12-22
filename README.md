# jmc_resizer jQuery Plugin v0.1.0

Copyright &copy; 2010 Joel Courtney. Licensed under the MIT license.
 
## Overview

A jQuery plugin that makes element resizing to a window a breeze.

## Usage

Create the jmc_resizr instance (settings must be an object)

```$('img').jmc_resizr(settings);```

## Settings

```
cropType : 'full' | 'height' | 'width' | 'fill_outer' | 'fit'    
binding {    
  vertical : 'top', 'center', 'bottom'    
  horizontal : 'left', 'center', 'right'    
},    
followBrowserSize :  true | false,    
parentElement :  $('#yourElement') — *Default is $('body')*
```

## TODO

* IE Support Check

## Mentions

* https://www.sitepoint.com/10-jquery-extensions/
