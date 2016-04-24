const settings = {
    //Addition settings for this template
    id_col: "USUBJID",
    time_cols: ["VISITN","VISIT","DY"],
    measure_col: "TEST",
    value_col: "STRESN",
    unit_col: "STRESU",
    normal_col_low: "STNRLO",
    normal_col_high: "STNRHI",
    start_value: null,

    //Standard webcharts settings
    x:{
        type:"linear",
        behavior:"flex",
        tickAttr: null
    },
    y:{
        stat:"mean",
        type:"linear",
        label:"Value",
        behavior:"flex",
        format:"0.2f"
    },
    marks:[
        {
            type:"line",
            attributes:{
                'stroke-width': .5, 
                'stroke-opacity': .5 ,
                "stroke":"#999"
            }
        },
        {
            type:"circle",
            radius:2,
            attributes:{
                'stroke-width': .5, 
                'stroke-opacity': .5,
                'fill-opacity':1
            }  
        }
    ],
    resizable:true,
    max_width: 600,
    margin:{right:20},
    aspect: 1.33
};

// Replicate settings in multiple places in the settings object
export function syncSettings(settings){
    settings.y.column = settings.value_col;
    settings.x.column = settings.time_cols[0];
    settings.marks[0].per = [settings.id_col, settings.measure_col];
    settings.marks[0].tooltip = `[${settings.id_col}]`;
    settings.marks[1].per = [
        settings.id_col, 
        settings.measure_col,
        settings.time_cols[0],
        settings.value_col
    ];
    settings.marks[1].tooltip = `[${settings.id_col}]:  [${settings.value_col}] [${settings.unit_col}] at ${settings.x.column} = [${settings.x.column}]`;
    return settings;
}

// Default Control objects
export const controlInputs = [ 
 	{label: "Lab Test", type: "subsetter", start: null},
    {type: "dropdown", label: "X axis", option: "x.column", require: true}
];

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings){
    controlInputs[0].value_col = settings.measure_col;
    controlInputs[1].values = settings.time_cols;

    return controlInputs
}

export default settings
