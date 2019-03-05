The most straightforward way to customize the Safety Outlier Explorer is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the Safety Outlier Explorer is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/safety-outlier-explorer/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the Safety Outlier Explorer to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each safety-outlier-explorer setting as of version 2.5.0.

## settings.id_col
`string`

variable: participant identifier

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

Visit variable data type

**default:** `"ordinal"`

### settings.time_cols[].value_col
`string`

Visit variable name

**default:** `"VISIT"`

### settings.time_cols[].label
`string`

Visit variable label

**default:** `"Visit"`

### settings.time_cols[].order_col
`string`

Visit ordering variable name

**default:** `"VISITNUM"`

### settings.time_cols[].order
`array`

Visit order

**default:** none

### settings.time_cols[].rotate_tick_labels
`boolean`

Rotate tick labels 45 degrees?

**default:** `true`

### settings.time_cols[].vertical_space
`number`

Rotated tick label spacing

**default:** `100`



## settings.measure_col
`string`

variable: measure

**default:** `"TEST"`



## settings.unit_col
`string`

variable: units of measurement

**default:** `"STRESU"`



## settings.value_col
`string`

variable: result

**default:** `"STRESN"`



## settings.normal_col_low
`string`

variable: lower limit of normal

**default:** `"STNRLO"`



## settings.normal_col_high
`string`

variable: upper limit of normal

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

**default:** none

### settings.filters[].label
`string`

Variable label

**default:** none



## settings.details
`array`

an array of participant-level variables and associated metadata

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

Variable name

**default:** `"AGE"`

### settings.details[].label
`string`

Variable label

**default:** `"Age"`



## settings.multiples_sizing
`object`

width and height of small multiples

### settings.multiples_sizing.width
`number`

Width

**default:** `300`

### settings.multiples_sizing.height
`number`

Height

**default:** `100`



## settings.normal_range_method
`string`

method for identifying the normal range

**default:** `"LLN-ULN"`



## settings.normal_range_sd
`number`

the number of standard deviations from the mean with which to define the normal range

**default:** `1.96`



## settings.normal_range_quantile_low
`number`

this quantile defines the lower bound of the normal range

**default:** `0.05`



## settings.normal_range_quantile_high
`number`

this quantile defines the upper bound of the normal range

**default:** `0.95`



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



## settings.unscheduled_visit_values
`array`

an array of strings that identify unscheduled visits; overrides unscheduled_visit_pattern

**default:** none



## settings.line_attributes
`object`

an object that defines the line color, thickness, and opacity

### settings.line_attributes.stroke
`string`

the color of the line

**default:** `"black"`

### settings.line_attributes.stroke-width
`number`

the thickness of the line

**default:** `0.5`

### settings.line_attributes.stroke-opacity
`number`

the opacity of the line

**default:** `0.75`



## settings.point_attributes
`object`

an object that defines the point color, radius, and opacity and its outline color, thickness, and opacity

### settings.point_attributes.stroke
`string`

the color of the outline of the point

**default:** `"#1f78b4"`

### settings.point_attributes.stroke-width
`number`

the thickness of the outline of the point

**default:** `0.5`

### settings.point_attributes.stroke-opacity
`number`

the opacity of the outline of the point

**default:** `1`

### settings.point_attributes.fill
`string`

the color of the point

**default:** `"#1f78b4"`

### settings.point_attributes.radius
`number`

the radius of the point

**default:** `3`

### settings.point_attributes.fill-opacity
`number`

the opacity of the point

**default:** `0.2`



## settings.custom_marks
`array`

an array of Webcharts mark definitions

**default:** none



## settings.tooltip_cols
`array`

an array of tooltip variables and associated metadata

**default:** none

### settings.tooltip_cols[].value_col
`string`

Variable name

**default:** none

### settings.tooltip_cols[].label
`string`

Variable label

**default:** none

# Webcharts settings
The object below contains Webcharts settings as of version 2.5.0 of the Safety Outlier Explorer.

```
{
    "x": {
        "column": null,
        "type": null,
        "behavior": "raw"
    },
    "y": {
        "column": null,
        "stat": "mean",
        "type": "linear",
        "label": "Value",
        "behavior": "raw"
    },
    "marks": [
        {
            "per": null,
            "type": "line",
            "attributes": {
                "clip-path": null
            },
            "tooltip": null,
            "default": true
        },
        {
            "per": null,
            "type": "circle",
            "attributes": {
                "clip-path": null
            },
            "tooltip": null,
            "default": true
        }
    ],
    "resizable": true,
    "margin": {
        "right": 30,
        "left": 60
    },
    "gridlines": "y",
    "aspect": 3
}
```