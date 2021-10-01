import { Polar, Carrier ,Output} from './Block.js';
import { Adder } from './Adder.js';
import {Line} from './Line.js'

let myblocks = new Map();

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // myblocks.forEach((block) => {
    //     block.update_pos();
    // });
}

export function setup() {
    createCanvas(windowWidth, windowHeight);

    myblocks.set('Polar', new Polar(284, 87.6, 200, 100));
    myblocks.set('Carrier', new Carrier(664, 287.6, 220, 100));
    myblocks.set('Output', new Output(1000, 87.6, 220, 100));


    /* FIXME: Find a new way to make the elements responsive to resize */
    myblocks.set('adder1', new Adder(20, (val) => {
        const polar = myblocks.get('Polar');
        const Carrier = myblocks.get('Carrier');
        val.cx = Carrier.cx + Carrier.cw / 2;
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
        val.x2 = adder.cx-adder.cx/45;
        val.y2 = val.y1
    }, 0, 'NRZ  '));

    myblocks.set('line2', new Line((val) => {
        const carrier = myblocks.get('Carrier');
        const adder = myblocks.get('adder1');
        const polar = myblocks.get('Polar')

        val.x1 = carrier.cx + 0.5 * carrier.cw;
        val.y1 = carrier.cy + 0.1*carrier.ch ;
        val.x2 = val.x1
        val.y2 = polar.cy + 1.35 * polar.ch / 2;
    }, 90, '                 CARRIER'));
    
    myblocks.set('line3', new Line((val) => {
        const adder = myblocks.get('adder1');
        const out = myblocks.get('Output');
        val.x1 = adder.cx +18
        val.y1 = out.cy + out.cy / 1.8
        val.y2 = val.y1
        val.x2 = out.cx

    }, 0, '   Output'));

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

function doubleClicked() {
}

function mousePressed() {
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.doubleClicked = doubleClicked;
window.windowResized = windowResized;
