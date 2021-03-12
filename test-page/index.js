d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    //'../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        const settings = {
            filters: [
                {
                    value_col: 'ARM',
                    label: 'Treatment Group'
                }
            ],
            //groups: [
            //    {
            //        value_col: 'ARM',
            //        label: 'Treatment Group'
            //    }
            //],
            tooltip_cols: [
                {
                    label: 'Date',
                    value_col: 'DT'
                }
            ],
            //color_by: 'ARM',
            normal_range_method: null,
            //line_attributes: {
            //    'stroke': 'black',
            //    'stroke-width': 3,
            //    'stroke-opacity': .25,
            //},
            //custom_marks: [
            //    {
            //        per: ['USUBJID', 'VISIT', 'TEST', 'STRESN'],
            //        type: 'circle',
            //        attributes: {
            //            fill: 'red',
            //            'fill-opacity': 1,
            //            stroke: 'black',
            //            'stroke-opacity': 1,
            //        },
            //        radius: 4,
            //        tooltip: '[USUBJID] is right on schedule at [VISIT] (Study day [DY]).',
            //        values: {
            //            DY: ['56', '112', '168', '224', '280', '336']
            //        },
            //    }
            //],
        };
        var instance = safetyOutlierExplorer(
            '#container',
            settings
        );
        instance.init(data);

        //quick test of participantSelected event
        instance.wrap.on('participantsSelected',function(){
          console.log('Participant Selected Event:')
          console.log(d3.event.data)
        })
    }
);
