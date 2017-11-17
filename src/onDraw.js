import updateSubjectCount from './util/updateSubjectCount';
import { updateYDomain } from './util/updateYDomain'
export default function onDraw() {
  //Annotate sample and population counts.
    updateSubjectCount(this, this.config.id_col, '.annote');

  //Clear current multiples.
    this.wrap.select('.multiples').select('.wc-small-multiples').remove();

  //update the y domain using the custom controsl
  updateYDomain(this)

}
