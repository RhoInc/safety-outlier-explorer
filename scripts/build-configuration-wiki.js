require('babel-register');
const fs = require('fs');
const pkg = require('../package');
const schema = require('../settings-schema');
const properties = schema.properties;
const settings = require('../src/configuration/rendererSettings.js').default;
const chartSettings = require('../src/configuration/chartSettings.js').default;
const listingSettings = require('../src/configuration/listingSettings.js').default;
const markdown = [];

function setDefault(setting) {
    let settingDefault = '**default:** ';

    if (setting.default === undefined && !setting.defaultObject) {
        settingDefault = settingDefault + 'none';
    } else if (setting.type === 'string') {
        settingDefault = settingDefault + '`"' + setting.default + '"`';
    } else if (['number', 'boolean'].indexOf(setting.type) > -1) {
        settingDefault = settingDefault + '`' + setting.default + '`';
    } else {
        settingDefault = settingDefault +
            '\n\`\`\`\n' +
            JSON.stringify(setting.defaultObject, null, 2) +
            `\n\`\`\``;
    }

    if (setting.type !== 'object')
        return settingDefault;
}

/*------------------------------------------------------------------------------------------------\
  Overview
\------------------------------------------------------------------------------------------------*/

    if (schema.overview)
        schema.overview
            .split('\n')
            .forEach(paragraph => {
                markdown.push(paragraph);
                markdown.push('');
            });

/*------------------------------------------------------------------------------------------------\
  Renderer-specific settings
\------------------------------------------------------------------------------------------------*/

    markdown.push(`# Renderer-specific settings`);
    markdown.push(`The sections below describe each ${pkg.name} setting as of version ${schema.version}.`);
    markdown.push(``);

    var keys = Object.keys(properties);
        keys.forEach((property,i) => {
                var setting = properties[property];

                markdown.push(`## settings.${property}`);
                markdown.push(`\`${setting.type}\``);
                markdown.push(``);
                markdown.push(`${setting.description || setting.title}`);

                if (setting.type !== 'object') {
                    markdown.push(``);
                    markdown.push(setDefault(setting));
                } else {
                    var subKeys = Object.keys(setting.properties);
                        subKeys.forEach((subProperty,i) => {
                            var subSetting = setting.properties[subProperty];
                            markdown.push(``);
                            markdown.push(`### settings.${property}.${subProperty}`);
                            markdown.push(`\`${subSetting.type}\``);
                            markdown.push(``);
                            markdown.push(`${subSetting.description || subSetting.title}`);
                            markdown.push(``);
                            markdown.push(setDefault(subSetting));
                        });
                }

                if (setting.type === 'array' && setting.items.type === 'object') {
                    var subKeys = Object.keys(setting.items.properties);
                        subKeys.forEach((subProperty,i) => {
                            var subSetting = setting.items.properties[subProperty];
                            markdown.push(``);
                            markdown.push(`### settings.${property}[].${subProperty}`);
                            markdown.push(`\`${subSetting.type}\``);
                            markdown.push(``);
                            markdown.push(`${subSetting.description || subSetting.title}`);
                            markdown.push(``);
                            markdown.push(setDefault(subSetting));
                        });
                }

                if (i < keys.length - 1) {
                    markdown.push(``);
                    markdown.push(``);
                    markdown.push(``);
                }
            });

/*------------------------------------------------------------------------------------------------\
  Webcharts settings
\------------------------------------------------------------------------------------------------*/

    markdown.push(``);
    markdown.push(`# Webcharts settings`);
    markdown.push(`The objects below contain Webcharts settings for each display as of version ${schema.version} of the ${pkg.name.split('-').map(str => str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase()).join(' ')}.`);

    [
        chartSettings,
        listingSettings,
    ].forEach(settingsFx => {
        const settings = JSON.stringify(settingsFx(), null, 4);
        const display = settingsFx.name.replace('Settings', '');

        markdown.push(``);
        markdown.push(`## ${display.substring(0,1).toUpperCase()}${display.substring(1)}`);
        markdown.push('```');
        markdown.push(settings);
        markdown.push('```');
    });

/*------------------------------------------------------------------------------------------------\
  Configuration markdown
\------------------------------------------------------------------------------------------------*/

    fs.writeFile(
        './scripts/configuration-wiki.md',
        markdown.join('\n'),
        (err) => {
            if (err)
                console.log(err);
            console.log('The configuration wiki markdown file was built!');
        });
