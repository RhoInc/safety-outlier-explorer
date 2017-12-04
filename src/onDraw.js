import updateSubjectCount from './util/updateSubjectCount';
import { updateYDomain } from './util/updateYDomain'

export default function onDraw() {
    //Annotate sample and population counts.
    updateSubjectCount(this, this.config.id_col, '.annote');

    //Clear current multiples.
    this.wrap
        .select('.multiples')
        .select('.wc-small-multiples')
        .remove();

    //hack to avoid domains with 0 extent
    if (this.y_dom[0] == this.y_dom[1]) {
        var jitter = this.y_dom[0] / 10;
        this.y_dom[0] = this.y_dom[0] - jitter;
        this.y_dom[1] = this.y_dom[1] + jitter;
    }

  //update the y domain using the custom controsl
  updateYDomain(this)
}
