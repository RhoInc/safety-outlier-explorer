import { set } from 'd3';

export function getValType(data, variable) {
    let var_vals = set(data.map(m => m[variable])).values();
    let vals_numbers = var_vals.filter(f => +f || +f === 0);

    if (var_vals.length === vals_numbers.length) {
        return 'continuous';
    } else {
        return 'categorical';
    }
}
