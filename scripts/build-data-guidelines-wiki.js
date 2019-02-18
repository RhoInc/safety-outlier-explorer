require('babel-register');
const fs = require('fs');
const pkg = require('../package');
const schema = require('../settings-schema');

//Create markdown array, one item per line.
const markdown = [
    schema['data-guidelines'],
    '',
    '## Data structure',
    schema['data-structure'],
    '',
    '## Data specification',
    'required and optional variables:',
    '',
    '| Setting | Default | Data Type | Description | Required? |',
    '|:--------|:--------|:----------|:------------|:---------:|',
];

//Add variable table to markdown array.
const properties = schema.properties;
const settings = Object.keys(properties);
const variables = settings
    .filter(setting => properties[setting]['data-mapping'])
    .map(setting => {
        const property = properties[setting];
        property.setting = setting;

        return property;
    });
variables.forEach(variable => {
    if (['string', 'number'].indexOf(variable.type) > -1)
        markdown.push(
            `|\`${
                variable.setting}\`|${
                    variable.default ? `_${variable.default}_` : ''
                }|**${
                variable['data-type']}**|${
                variable.description.replace(/name of variable that (captures )?/, '')}|${
                variable.required ? '**Yes**' : ''
            }|`
        );
    else if (variable.type === 'array') {
        if (variable.defaults)
            variable.defaults.forEach((item,i) => {
                markdown.push(
                    `|\`${
                        variable.setting}[${i}]\`|_${
                        item}_|**${
                        variable['data-type']}**|${
                        variable.descriptions[item]}|${
                        variable.required ? '**Yes**' : ''
                    }|`
                )
            });
        else
            markdown.push(
                `|\`${
                    variable.setting}[]\`||**${
                    variable['data-type']}**|${
                    variable.description}|${
                    variable.required ? '**Yes**' : ''
                }|`
            );
    } else
        console.warn(`This wiki can't handle ${variable.type}s! Get outta here!`);
});

/*------------------------------------------------------------------------------------------------\
  Configuration markdown
\------------------------------------------------------------------------------------------------*/

    fs.writeFile(
        './scripts/data-guidelines-wiki.md',
        markdown.join('\n'),
        (err) => {
            if (err)
                console.log(err);
            console.log('The data guidelines wiki markdown file was built!');
        });
