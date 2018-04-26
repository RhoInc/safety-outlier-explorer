library(jsonlite)

ADBDS <- read.csv(
    'ADBDS.csv',
    na.strings = ' ',
    colClasses = 'character'
)

write(
    toJSON(
        ADBDS,
        auto_unbox = TRUE,
        pretty = TRUE
    ),
    'ADBDS.json'
)