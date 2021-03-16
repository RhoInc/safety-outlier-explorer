d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    //'../../data-library/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        const measures = [...new Set(data.map(d => d.TEST)).values()]
            .sort(webCharts.dataOps.naturalSorter)
            .reverse();
        data.forEach(d => {
            d.TESTN = measures.findIndex(measure => measure === d.TEST);
        });

        const settings = {
            filters: [
                {
                    value_col: 'ARM',
                    label: 'Treatment Group'
                }
            ],
            groups: [
                {
                    value_col: 'ARM',
                    label: 'Treatment Group'
                },
                {
                    value_col: 'SEX',
                    label: 'Sex'
                }
            ],
            tooltip_cols: [
                {
                    label: 'Date',
                    value_col: 'DT'
                }
            ],
            start_value: 'IgE',
            //color_by: 'ARM',
            normal_range_method: null,
            //line_attributes: {
            //    'stroke': 'black',
            //    'stroke-width': 3,
            //    'stroke-opacity': .5,
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
        const instance = safetyOutlierExplorer(
            '#container',
            settings
        );
        instance.init(data);

        // quick test of participantSelected event
        instance.wrap.on('participantsSelected', function() {
            console.log('Participant Selected Event:');
            console.log(d3.event.data);
        });
    }
);
