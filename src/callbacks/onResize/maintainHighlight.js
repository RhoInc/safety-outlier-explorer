import highlightSelected from './addEventListeners/functions/highlightSelected';

export default function maintainHighlight() {
    if (this.selected_id) highlightSelected.call(this);
}
