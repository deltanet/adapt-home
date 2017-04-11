# adapt-home

**Home** is an *extension* for the the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension displays a button in the top navigation bar that can link to a specific page in a course.

## Installation

This extension must be manually installed.  

If **Home** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

**Home** is configured at course level: course (*course.json*).  

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-home/blob/master/example.json).

### Attributes

The Home attribute group contains values for **_isEnabled**, **_icon**, **_link**, and **_hide**.

>**_isEnabled** (boolean):  Turns on and off the **Home** extension. Can be set to disable **Home** when not required.

>**_icon** (string):  Defines the css class for the icon on the button.  

>**_link** (string):  Defines the location for the destination of the button. This can be the ID of an element or a page number.  

>**_hide** (array):  This `_hide` array group stores the properties for multiple pages to hide the button on. It contains values for **_id**.  

>>**_id** (string):  Defines the id for the page that the button should be hidden on.  

### Accessibility
Several elements of **Home** have been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **achievements**. These labels are not visible elements. They are utilized by assistive technology such as screen readers. Should the label texts need to be customised, they can be found within the **globals** object in [*properties.schema*](https://github.com/deltanet/adapt-achievements/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div> 

## Limitations
 
No known limitations. 

----------------------------
**Version number:**  2.1.0   
**Framework versions supported:**  2.0.6    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-home/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes     
**Authoring tool support:** no
