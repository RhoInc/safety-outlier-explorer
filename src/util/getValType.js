import { set } from 'd3';

export function getValType(data, variable) {
    const values = set(data.map(m => m[variable])).values(),
        numbers = values.filter(f => +f || (+f === 0 && !/^\s*$/.test(f)));

    if (values.length === numbers.length) {
        return 'continuous';
    } else {
        return 'categorical';
    }
}
