import highlight from './addEventListeners/functions/highlight';

export default function maintainHighlight() {
    if (this.selected_id) highlight.call(this);
}
