d3.csv(
    //'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
    '../../viz-library/data/safetyData/ADBDS.csv', // use local data file for development because it's faster
    function(d,i) {
        if (d.VISIT === 'Visit 1' && d.STRESN !== '')
            d.STRESN = 25;
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
