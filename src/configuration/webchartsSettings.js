export default function chartSettings() {
    return {
        x: {
            column: null, //set in syncSettings()
            type: null, //set in syncSettings()
            behavior: 'raw'
        },
        y: {
            column: null, //set in syncSettings()
            stat: 'mean',
            type: 'linear',
            label: 'Value',
            behavior: 'raw',
            format: '0.2f'
        },
        marks: [
            {
                per: null, //set in syncSettings()
                type: 'line',
                attributes: {
                    'clip-path': 'url(#1)'
                },
                tooltip: null //set in syncSettings()
            },
            {
                per: null, //set in syncSettings()
                type: 'circle',
                attributes: {
                    'clip-path': 'url(#1)'
                },
                tooltip: null //set in syncSettings()
            }
        ],
        resizable: true,
        margin: { top: 5, bottom: 5, right: 20 }, //create space for box plot
        aspect: 3
    };
}
