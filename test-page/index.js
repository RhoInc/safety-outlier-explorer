d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    //'../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        d.outlier = +d.STRESN < +d.STNRLO || +d.STNRHI < +d.STRESN;
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
            filters: [
                {
                    label: 'Treatment Group',
                    value_col: 'ARM'
                },
            ],
            tooltip_cols: [
                {
                    label: 'Date',
                    value_col: 'DT'
                }
            ],
            custom_marks: [
                {
                    per: ['USUBJID', 'VISIT', 'TEST', 'STRESN'],
                    type: 'circle',
                    attributes: {
                        fill: 'red',
                        'fill-opacity': 1,
                        stroke: 'black',
                        'stroke-opacity': 1,
                    },
                    radius: 4,
                    values: {
                        outlier: [true]
                    },
                }
            ],
        };
        var instance = safetyOutlierExplorer(
            '#container',
            settings
        );
        instance.init(data);
    }
);
