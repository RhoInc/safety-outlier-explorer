import clearHovered from './functions/clearHovered';
import clearSelected from './functions/clearSelected';

export default function addOverlayEventListener() {
    this.overlay
        .on('mouseover', () => {
            clearHovered.call(this);
        })
        .on('click', () => {
            clearHovered.call(this);
            clearSelected.call(this);
        });
}
