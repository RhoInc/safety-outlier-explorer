d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
    function(d,i) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
          tooltip_cols: [{label:"Date",value_col:"DT"}],
        };
        var instance = safetyOutlierExplorer(
            '#container',
            settings
        );
        instance.init(data);
    }
);
