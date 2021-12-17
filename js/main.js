import { Polar, Carrier ,Output,Integerator,Decision} from './Block.js';
import { Adder } from './Adder.js';
import {Line} from './Line.js'

let myblocks = new Map();

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    myblocks.forEach((block) => {
        block.update_pos();
    });
}

export function setup() {
    createCanvas(windowWidth, windowHeight);

    myblocks.set('Polar', new Polar(284, 87.6, 200, 100));
    myblocks.set('Carrier', new Carrier(664, 287.6, 220, 100));
    myblocks.set('Output', new Output(1000, 87.6, 220, 100));
    myblocks.set('Integerator', new Integerator(1270, 587.6, 220, 100));
    myblocks.set('Device', new Decision(1650, 587.6, 220, 100));
    myblocks.set('Carrier1', new Carrier(1000, 787.6, 220, 100));


    /* FIXME: Find a new way to make the elements responsive to resize */
    myblocks.set('adder2', new Adder(20, (val) => {
        const int = myblocks.get('Integerator');
        const Carrier1 = myblocks.get('Carrier1');
        val.cx = Carrier1.cx + Carrier1.cw / 2;
        val.cy = int.cy + int.ch / 2;
    }));

    myblocks.set('adder1', new Adder(20, (val) => {
        const polar = myblocks.get('Polar');
        const Carrier = myblocks.get('Carrier');
        val.cx = Carrier.cx + Carrier.cw /2;
        val.cy = polar.cy + polar.ch / 2;
    }));

  
    // myblocks.set('adder2', new Adder(15, (val) => {
    //     const quantizer = myblocks.get('quantizer');
    //     const encoder = myblocks.get('encoder');
    //     const filter = myblocks.get('prediction filter');
    //     val.cx = quantizer.cx + 0.75 * (encoder.cx - quantizer.cx);
    //     val.cy = quantizer.cy + 0.7 * (filter.cy - quantizer.cy);
    // }));

    myblocks.set('line1', new Line((val) => {
        const polar = myblocks.get('Polar');
        const adder = myblocks.get('adder1');

        val.x1 = polar.cx + polar.cw;
        val.y1 = polar.cy + polar.ch / 2;
        val.x2 = adder.cx-adder.cx/31;
        val.y2 = val.y1
    }, 0, 'NRZ  '));

    myblocks.set('line2', new Line((val) => {
        const carrier = myblocks.get('Carrier');
        const adder = myblocks.get('adder1');
        const polar = myblocks.get('Polar')

        val.x1 = carrier.cx + 0.5 * carrier.cw;
        val.y1 = carrier.cy + 0.8*carrier.ch ;
        val.x2 = val.x1
        val.y2 = polar.cy + 1.5 * polar.ch / 2;
    }, 90, '                   CARRIER'));
    
    myblocks.set('line3', new Line((val) => {
        const adder = myblocks.get('adder1');
        const out = myblocks.get('Output');
        val.x1 = adder.cx +25
        val.y1 = out.cy + out.cy / 1.8
        val.y2 = val.y1
        val.x2 = out.cx

    }, 0, '   Output'));

    myblocks.set('line4', new Line((val) => {
        const Int = myblocks.get('Integerator');
        const Dec = myblocks.get('Device');

        val.x1 = Int.cx +Int.cw;
        val.y1 = Int.cy+0.5*Int.ch ;
        val.x2 = Dec.cx
        val.y2 = Dec.cy+0.5 * Dec.ch;
    }, 0, '    X(t)'));

    myblocks.set('line5', new Line((val) => {
        const out = myblocks.get('Output');
        const add = myblocks.get('adder2');

        val.x1 = out.cx+(out.cw*0.5);
        val.y1 = out.cy+(out.ch*0.5);
        val.x2 = add.cx
        val.y2 = add.cy-25;
    }, 270, '                               Modulated Signal'));

    myblocks.set('line6', new Line((val) => {
        const add = myblocks.get('adder2');
        const Car = myblocks.get('Carrier1');

        val.x1 = Car.cx+(Car.cw*0.5);
        val.y1 = Car.cy;
        val.x2 = add.cx
        val.y2 = add.cy+25;
    }, 90, '                   CARRIER'));

    myblocks.set('line7', new Line((val) => {
        const add = myblocks.get('adder2');
        const Int = myblocks.get('Integerator');

        val.x1 = add.cx+25;
        val.y1 = add.cy;
        val.x2 = Int.cx
        val.y2 = Int.cy+(Int.ch*0.5);
    }, 0, '       Signal'));

    // myblocks.set('line2', new Line((val) => {
    //     const sampler = myblocks.get('sampler');
    //     const quantizer = myblocks.get('quantizer');
    //     const adder = myblocks.get('adder1');

    //     val.x1 = adder.cx + adder.cr;
    //     val.y1 = sampler.cy + sampler.ch / 2;
    //     val.x2 = quantizer.cx;
    //     val.y2 = quantizer.cy + quantizer.ch / 2;
    // }, 0, 'e(nTs)'));

    // myblocks.set('line3', new Line((val) => {
    //     const sampler = myblocks.get('sampler');
    //     const quantizer = myblocks.get('quantizer');
    //     const filter = myblocks.get('prediction filter');

    //     val.x1 = sampler.cx + 0.65 * (quantizer.cx - sampler.cx);
    //     val.y1 = filter.cy + filter.ch / 2;
    //     val.x2 = val.x1;
    //     val.y2 = quantizer.cy + quantizer.ch / 2 + myblocks.get('adder1').cr;
    // }, 90));

    // myblocks.set('line4', new Line((val) => {
    //     const filter = myblocks.get('prediction filter');
    //     const adder = myblocks.get('adder1');

    //     val.x1 = filter.cx;
    //     val.x2 = adder.cx;
    //     val.y1 = filter.cy + filter.ch / 2;
    //     val.y2 = val.y1;
    // }, null, 'xq((n - 1)Ts)'));

    // myblocks.set('line5', new Line((val) => {
    //     const sampler = myblocks.get('sampler');
    //     const quantizer = myblocks.get('quantizer');
    //     const encoder = myblocks.get('encoder');

    //     val.x1 = quantizer.cx + quantizer.cw;
    //     val.y1 = sampler.cy + sampler.ch / 2;
    //     val.x2 = encoder.cx;
    //     val.y2 = quantizer.cy + quantizer.ch / 2;
    // }, 0, 'eq(nts)'));

    // myblocks.set('line6', new Line((val) => {
    //     const quantizer = myblocks.get('quantizer');
    //     const adder = myblocks.get('adder2');

    //     val.x1 = adder.cx;
    //     val.y1 = quantizer.cy + quantizer.ch / 2;
    //     val.x2 = adder.cx;
    //     val.y2 = adder.cy - adder.cr;
    // }, 270));

    // myblocks.set('line7', new Line((val) => {
    //     const filter = myblocks.get('prediction filter');
    //     const adder = myblocks.get('adder2');

    //     val.x1 = adder.cx;
    //     val.y1 = adder.cy + adder.cr;
    //     val.x2 = adder.cx;
    //     val.y2 = filter.cy + filter.ch / 2;
    // }));

    // myblocks.set('line8', new Line((val) => {
    //     const filter = myblocks.get('prediction filter');
    //     const adder = myblocks.get('adder2');

    //     val.x1 = adder.cx;
    //     val.y1 = filter.cy + filter.ch / 2;
    //     val.x2 = filter.cx + filter.cw;
    //     val.y2 = filter.cy + filter.ch / 2;
    // }, 180, 'xq(nTs)'));

    // myblocks.set('line9', new Line((val) => {
    //     const adder1 = myblocks.get('adder1');
    //     const adder2 = myblocks.get('adder2');

    //     val.x1 = adder1.cx;
    //     val.y1 = adder2.cy;
    //     val.x2 = adder2.cx - adder2.cr;
    //     val.y2 = adder2.cy;
    // }, 0));
}

export function draw() {
    clear();

    myblocks.forEach((val) => {
        val.draw();
    });
}
function singleClicked(){
    // myblocks.forEach((val) => {
    //     val.singleClick();
    // });
}

// function doubleClicked() {
//     // myblocks.forEach((val) => {
//     //     // let name = val.get('Polar')
//     //     console.log(val.name)
//     //     if(val.name == 'Polar'){
//     //         val.singleClickPolar()
//     //     }else if(val.name == 'Carrier'){
//     //         val.singleClickCarrier()
//     //     }else{
//     //         val.singleClickOutput()
//     //     }
        
//     // });
    
//     console.log(myblocks.keys().next().value)
//     if(myblocks.keys().next().value == 'Polar'){
//         myblocks.get('Polar').singleClickPolar()
        
//     }else if(myblocks.keys().next().value == 'Output'){
//         myblocks.get('Output').singleClickOutput()
//     }else{
//         myblocks.get('Carrier').singleClickCarrier()
//     }

// }


function mousePressed() {
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
// window.doubleClicked = doubleClicked;
window.singleClicked = singleClicked;
window.windowResized = windowResized;
