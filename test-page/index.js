d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    //'../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
            tooltip_cols: [
                {
                    label:'Date',
                    value_col:'DT'
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
