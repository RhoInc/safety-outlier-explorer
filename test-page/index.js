d3.csv(
    //'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    '../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        if (!(i%100))
            d.STRESN = Math.random().toString(36).substring(7);
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
                }
            ],
            tooltip_cols: [
                {
                    label: 'Date',
                    value_col: 'DT'
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
