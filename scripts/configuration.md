The most straightforward way to customize the Safety Outlier Explorer is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the Safety Outlier Explorer is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/safety-outlier-explorer/blob/master/src/defaultSettings.js) as [described below](#Webcharts-Settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the Safety Outlier Explorer to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each safety-outlier-explorer setting as of version 2.2.0.

## settings.id_col
`string`

unique identifier variable name

**default:** `"USUBJID"`



## settings.time_cols
`array`

visit metadata

**default:** none

### settings.time_cols[].value_col
`string`

Visit variable name

### settings.time_cols[].label
`string`

Visit variable label

### settings.time_cols[].order_col
`string`

Visit ordering variable name

### settings.time_cols[].order
`array`

Visit order

### settings.time_cols[].rotate_tick_labels
`boolean`

Rotate tick labels 45 degrees?

### settings.time_cols[].vertical_space
`number`

Rotated tick label spacing



## settings.measure_col
`string`

measure variable name

**default:** `"TEST"`



## settings.unit_col
`string`

measure unit variable name

**default:** `"STRESU"`



## settings.value_col
`string`

result variable name

**default:** `"STRESN"`



## settings.normal_col_low
`string`

LLN variable name

**default:** `"STNRLO"`



## settings.normal_col_high
`string`

ULN variable name

**default:** `"STNRHI"`



## settings.start_value
`string`

value of measure to display initially

**default:** none



## settings.filters
`array`

an array of filter variables and associated metadata

**default:** none

### settings.filters[].value_col
`string`

Variable name

### settings.filters[].label
`string`

Variable label



## settings.details
`array`

an array of ID-level variables and associated metadata

**default:** none

### settings.details[].value_col
`string`

Variable name

### settings.details[].label
`string`

Variable label



## settings.multiples_sizing
`object`

width and height of small multiples

## settings.multiples_sizing.width
`number`

Width

**default:** `"300"`

## settings.multiples_sizing.height
`number`

Height

**default:** `"100"`



## settings.visits_without_data
`boolean`

controls display of visits without data for the current measure

**default:** none



## settings.unscheduled_visits
`boolean`

controls display of unscheduled visits

**default:** none



## settings.unscheduled_visit_pattern
`string`

a regular expression that identifies unscheduled visits

**default:** `"/unscheduled|early termination/i"`



## settings.unscheduled_visits_values
`array`

an array of strings that identify unscheduled visits; overrides unscheduled_visit_pattern

**default:** none

# Webcharts-specific settings
The object below contains each Webcharts setting as of version 2.2.0.

```
{    x: {        column: null, //set in syncSettings()        type: null, //set in syncSettings()        behavior: 'flex'    },    y: {        column: null, //set in syncSettings()        stat: 'mean',        type: 'linear',        label: 'Value',        behavior: 'flex',        format: '0.2f'    },    marks: [        {            per: null, //set in syncSettings()            type: 'line',            attributes: {                'stroke-width': 0.5,                'stroke-opacity': 0.5,                stroke: '#999',                'clip-path': 'url(#1)'            },            tooltip: null //set in syncSettings()        },        {            per: null, //set in syncSettings()            type: 'circle',            radius: 2,            attributes: {                'stroke-width': 0.5,                'stroke-opacity': 0.5,                'fill-opacity': 1,                'clip-path': 'url(#1)'            },            tooltip: null //set in syncSettings()        }    ],    resizable: true,    margin: { right: 20 }, //create space for box plot    aspect: 3}
```