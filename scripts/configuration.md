The most straightforward way to customize the Safety Outlier Explorer is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the Safety Outlier Explorer is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/safety-outlier-explorer/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

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

**default:** 
```
[
  {
    "type": "ordinal",
    "value_col": "VISIT",
    "label": "Visit",
    "order_col": "VISITNUM",
    "order": null,
    "rotate_tick_labels": true,
    "vertical_space": 100
  },
  {
    "type": "linear",
    "value_col": "DY",
    "label": "Study Day",
    "order_col": "DY",
    "order": null,
    "rotate_tick_labels": false,
    "vertical_space": 0
  }
]
```

### settings.time_cols[].type
`string`

undefined

**default:** `"ordinal"`

### settings.time_cols[].value_col
`string`

undefined

**default:** `"VISIT"`

### settings.time_cols[].label
`string`

undefined

**default:** `"Visit"`

### settings.time_cols[].order_col
`string`

undefined

**default:** `"VISITNUM"`

### settings.time_cols[].order
`array`

undefined

**default:** none

### settings.time_cols[].rotate_tick_labels
`boolean`

undefined

**default:** `true`

### settings.time_cols[].vertical_space
`number`

undefined

**default:** `100`



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

undefined

**default:** none

### settings.filters[].label
`string`

undefined

**default:** none



## settings.details
`array`

an array of ID-level variables and associated metadata

**default:** 
```
[
  {
    "value_col": "AGE",
    "label": "Age"
  },
  {
    "value_col": "SEX",
    "label": "Sex"
  },
  {
    "value_col": "RACE",
    "label": "Race"
  }
]
```

### settings.details[].value_col
`string`

undefined

**default:** `"AGE"`

### settings.details[].label
`string`

undefined

**default:** `"Age"`



## settings.multiples_sizing
`object`

width and height of small multiples

### settings.multiples_sizing.width
`number`

undefined

**default:** `300`

### settings.multiples_sizing.height
`number`

undefined

**default:** `100`



## settings.visits_without_data
`boolean`

controls display of visits without data for the current measure

**default:** `false`



## settings.unscheduled_visits
`boolean`

controls display of unscheduled visits

**default:** `false`



## settings.unscheduled_visit_pattern
`string`

a regular expression that identifies unscheduled visits

**default:** `"/unscheduled|early termination/i"`



## settings.unscheduled_visits_values
`array`

an array of strings that identify unscheduled visits; overrides unscheduled_visit_pattern

**default:** none

# Webcharts settings
The object below contains each Webcharts setting as of version 2.2.0.

```
{    x: {        column: null, //set in syncSettings()        type: null, //set in syncSettings()        behavior: 'raw'    },    y: {        column: null, //set in syncSettings()        stat: 'mean',        type: 'linear',        label: 'Value',        behavior: 'raw',        format: '0.2f'    },    marks: [        {            per: null, //set in syncSettings()            type: 'line',            attributes: {                'stroke-width': 0.5,                'stroke-opacity': 0.5,                stroke: '#999',                'clip-path': 'url(#1)'            },            tooltip: null //set in syncSettings()        },        {            per: null, //set in syncSettings()            type: 'circle',            radius: 2,            attributes: {                'stroke-width': 0.5,                'stroke-opacity': 0.5,                'fill-opacity': 1,                'clip-path': 'url(#1)'            },            tooltip: null //set in syncSettings()        }    ],    resizable: true,    margin: { right: 20 }, //create space for box plot    aspect: 3}
```