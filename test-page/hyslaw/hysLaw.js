const settings = {};

d3.csv('https://rhoinc.github.io/data-library/data/clinical-trials/renderer-specific/hy.csv', function(data) {
    safetyOutlierExplorer('#safety-outlier-explorer .content', settings)
        .init(data);
});
