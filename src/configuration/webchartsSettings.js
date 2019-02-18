export default function webchartsSettings() {
    return {
        x: {
            column: null, // set in ./syncSettings
            type: null, // set in ./syncSettings
            behavior: 'raw'
        },
        y: {
            column: null, // set in ./syncSettings
            stat: 'mean',
            type: 'linear',
            label: 'Value',
            behavior: 'raw',
        },
        marks: [
            {
                per: null, // set in ./syncSettings
                type: 'line',
                attributes: {
                    'clip-path': 'url(#1)'
                },
                tooltip: null // set in ./syncSettings
            },
            {
                per: null, // set in ./syncSettings
                type: 'circle',
                attributes: {
                    'clip-path': 'url(#1)'
                },
                tooltip: null // set in ./syncSettings
            }
        ],
        resizable: true,
        margin: {
            right: 30, // create space for box plot
            left: 60,
        },
        gridlines: 'y',
        aspect: 3
    };
}
