d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADBDS.csv',
    //'../../viz-library/data/safetyData/ADBDS.csv', // use local data file for development because it's faster
    function(d,i) {
        //if (d.VISIT === 'Visit 1' && d.STRESN !== '')
        //    d.STRESN = 45;
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
        const ids = d3.set(data.filter(function(d) { return d.STRESN !== ''; }).map(function(d) { return d.USUBJID; })).values();
        instance.init(
            data
                //.filter(d => (
                //    d.STRESN !== ''
                //    && ids.slice(0,5).indexOf(d.USUBJID) > -1
                //    && ['Screening', 'Visit 1', 'Visit 2'].indexOf(d.VISIT) > -1
                //))
        );
    }
);
