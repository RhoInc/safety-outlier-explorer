import { createTable } from 'webcharts';
import { tableSettings } from './default-settings';

export default function onLayout(){
    //custom filter behavior           
    var xColSelect = this.controls.wrap.selectAll(".control-group")
        .filter(f => f.option === "x.column")
        .select("select")
        
    xColSelect.on("change", d => {
            var value = xColSelect.property('value');

            this.config.x.column = value;
            this.config.marks[1].per[2] = value;

            //DY is a hardcoded variable...
            this.config.x.type = value == "DY" ? "linear" : "ordinal";
            this.draw();
        });

    //add wrapper for small multiples
    this.wrap.append('div').attr('class', 'multiples');
}