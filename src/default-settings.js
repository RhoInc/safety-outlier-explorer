const settings = {
    //Addition settings for this template
    id_col: "USUBJID",
    time_col: "VISITN",
    measure_col: "TEST",
    value_col: "STRESN",
    unit_col: "STRESU",
    normal_col_low: "STNRLO",
    normal_col_high: "STNRHI",
    start_value: null,
    //Standard webcharts settings
    x:{
        column:"DY",
        type:"linear",
        // label:"Study Day"
    },
    y:{
        column:"STRESN",
        stat:"mean",
        type:"linear",
        label:"Value",
        behavior:"flex",
        format:"0.2f"
    },
    marks:[
        {
            type:"line",
            per:[
                "USUBJID",
                "TEST"
            ],
            attributes:{
                'stroke-width': .5, 
                'stroke-opacity': .5 ,
                "stroke":"#999"
            }
        },
        {
            type:"circle",
            per:[
                "USUBJID",
                "TEST",
                "DY"
            ],
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

export const controlInputs = [ 
    {label: "Lab Test", type: "subsetter", value_col: "TEST", start: null},
    {type: "dropdown", values: ["VISIT","VISITN","DY"], label: "Measure", option: "x.column"}
];

export const tableSettings = {
    cols: ["key","shiftx","shifty"],
    headers: ["ID","Start Value", "End Value"]
};

export default settings
