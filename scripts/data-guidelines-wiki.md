The Safety Outlier Explorer accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical medical signs data with **one row per participant per visit per medical sign** plus the required variables specified below.

## Data structure
one record per participant per visit per medical sign

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`id_col`|_USUBJID_|**character**|participant identifier|**Yes**|
|`visit_col`|VISIT|**character**|visit|**Yes**|
|`visit_order_col`|VISITNUM|**numeric**|visit order||
|`study_day_col`|DY|**numeric**|study day||
|`measure_col`|_TEST_|**character**|measure|**Yes**|
|`measure_order_col`|_TESTN_|**numeric**|measure order||
|`unit_col`|_STRESU_|**character**|units of measurement||
|`value_col`|_STRESN_|**numeric**|result|**Yes**|
|`normal_col_low`|_STNRLO_|**numeric**|lower limit of normal||
|`normal_col_high`|_STNRHI_|**numeric**|upper limit of normal||
|`filters[]`||**either**|an array of filter variables and associated metadata||
|`groups[]`||**either**|an array of grouping variables and associated metadata||
|`details[]`||**either**|an array of participant-level variables and associated metadata||
|`tooltip_cols[]`||**either**|an array of tooltip variables and associated metadata||