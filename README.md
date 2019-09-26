# append-files

Append CSS files and inline CSS in `head` tag whereas JS files and embed JS in `body` tag.

## Install

Via `npm`
```
npm install append-files
```

Via Yarn
```
yarn add append-files
```

## Usage

If like to add the styles and script files only without defining any other attributes then you can do this:


### Add Script Files:
```
import { appendScripts } from 'append-files';

var addScripts = [
  '/js/script.js',
  'http://example.com/test.js'
];

appendScripts(addScripts);
```

**NOTE:** In this way, you can only add the script files, not applicable for inline script. To add inline scripts or add attibutes on script tags, like id, async, nomodule etc pass them as an object as shown in the example below. 

### Add Script Files with its dependency:

If you need to append 2 or more script files and the second script is dependent on the first script then you can define add the dependent script like this: 
```
import { appendScripts } from 'append-files';

var addScripts = [{
  'id': 'test-forms',
  'url': 'http://example.com/test.js',
  'dependentScripts': [{
    'url': '/js/script.js',
    'async': true,
  }]
}];

appendScripts(addScripts);
```

**NOTE:** In this case, `id` attribute **MUST** be defined otherwise, dependent scripts not appended as it is suppose to be.

### Add Inline Script:

Pass the script to be added as inline:
```
import { appendScripts } from 'append-files';

var addScripts = [{
  'inline': 'alert(1);'
}];

appendScripts(addScripts);
```

### Add Stylesheets:
```
import { appendStylesheets } from 'append-files';

var addStyles = [
  'http://example.com/test.css',
  '/css/style.css'
];

appendStylesheets(addStyles);
```

**NOTE:** In this way, you can only add the stylesheet files, not applicable for inline styles. To add inline styles, pass them as an object as shown in the example below. 

### Add Stylesheets and Inline Style:

This is the example by which you can add inline CSS and/or stylesheet files.
```
import { appendStylesheets } from 'append-files';

var addStyles = [
  {
    'href': 'http://example.com/test.css'
  },
  {
    'href': '/css/style.css'
  },
  {
    'inline': 'h1 { color: red; }'
  }
];

appendStylesheets(addStyles);
```

## Supported Script Attributes

| Attributes | Type | Required | Description |
| ----------- | ----- | ----------- | ------------- |
| url | URL | Yes | URI of an script.<br><br> Either url or inline is required. |
| inline | String | Yes | script which is not loaded from the file, but embedded inside script tag. For example: <script>alert(1);</script>.<br><br> Either url or inline is required. |
| async | Boolean | No | Indicating that the browser should load the script asynchronously and then execute it as soon as it's downloaded. |
| referrerPolicy | String | No | Indicates which referrer to send when fetching the script, or resources fetched by the script. |
| id  | String | No | unique id for an Script Tag. Required when using  `dependentScripts` attribute. |
| nomodule | Boolean | No | Indicate that the script should not be executed in browsers that support ES2015 modules. |
| dependentScripts | Object | No | If you have 2 script Files and the first file has the dependency on the second file then you can use this attribute to define the dependent script.<br><br>In this case, `id` attribute is required with the dependency. For further information, refer to the [Add Script Files with its dependency:](#add-script-files-with-its-dependency) example. | 

## Supported Style Attributes

| Attributes | Type | Required | Description |
| ----------- | ----- | ----------- | ------------- |
| url | URL | Yes | URI of an stylesheet.<br><br> Either url or inline is required. |
| inline | String | Yes | style which is not loaded from the file, but embedded inside style tag. For example: <style>h1 { color: red; }</style>.<br><br> Either url or inline is required. |


## Tested

This package is tested with the React Application. 
