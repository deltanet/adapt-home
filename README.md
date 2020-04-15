# adapt-home

**Home** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension displays a button in the top navigation bar that links to the page's parent page (menu).  

## Installation

This extension must be manually installed.  

If **Home** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

**Home** is configured at course level: course (*course.json*).  

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-home/blob/master/example.json).

### Attributes

The Home attribute group contains values for **_isEnabled**, **_icon**, **ariaLabel**, **_subIcon**, and **subAriaLabel**.

>**_isEnabled** (boolean):  Turns on and off the **Home** extension. Can be set to disable **Home** when not required.

>**_icon** (string):  Defines the css class for the button icon.  

>**ariaLabel** (string): This text becomes the button aria label and is read by assistive technologies.  

>**_subIcon** (string):  Defines the css class for the button icon within sub menu pages.  

>**subAriaLabel** (string): This text becomes the button aria label for sub menu pages and is read by assistive technologies.  

----------------------------
**Version number:**  3.1.0   
**Framework versions supported:**  2+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-home/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes     
**Authoring tool support:** Yes
