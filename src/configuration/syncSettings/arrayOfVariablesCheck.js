export default function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
    const validSetting =
        userDefinedVariables instanceof Array && userDefinedVariables.length
            ? d3
                  .merge([
                      defaultVariables,
                      userDefinedVariables.filter(
                          item =>
                              !(
                                  item instanceof Object &&
                                  item.hasOwnProperty('value_col') === false
                              ) &&
                              defaultVariables
                                  .map(d => d.value_col)
                                  .indexOf(item.value_col || item) === -1
                      )
                  ])
                  .map(item => {
                      const itemObject = item instanceof Object ? Object.assign({}, item) : {};

                      itemObject.value_col = item instanceof Object ? item.value_col : item;
                      itemObject.label =
                          item instanceof Object
                              ? item.label || itemObject.value_col
                              : itemObject.value_col;

                      return itemObject;
                  })
            : defaultVariables;

    return validSetting;
}
