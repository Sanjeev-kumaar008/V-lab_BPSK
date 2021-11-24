class Block{
    constructor(x, y, w, h, name, onclick) {
        this.name = name;
        this.xo = x;
        this.yo = y;
        this.wo = w;
        this.ho = h;

        this.cx = x;
        this.cy = y;
        this.cw = w;
        this.ch = h;

        
        
        // this.update_pos()
    }
    // update_pos() {
    //     const width = windowWidth;
    //     const height = windowHeight;

    //     this.cx = this.xo * (width / 1920);
    //     this.cy = this.yo * (height / 1080);
    //     this.cw = this.wo * (width / 1920);
    //     this.ch = this.ho * (height / 1080);
    // }
    draw() {
        const cx = this.cx;
        const cy = this.cy;
        const cw = this.cw;
        const ch = this.ch;

        const font_size = 30 * Math.min(windowWidth / 1920, windowHeight / 1080);

        fill(10);
        rect(cx, cy, cw, ch, 20);
        textSize(font_size);
        textStyle('bold');
        textAlign(CENTER, CENTER);
        fill(255);
        text(this.name, cx + cw / 2, cy + ch / 2);
    }
    singleClickPolar() {
        let myModal = new bootstrap.Modal(document.getElementById('polar'), {});
        myModal.show();
    }
    singleClickCarrier() {
        let myModal = new bootstrap.Modal(document.getElementById('carrier'), {});
        myModal.show();
    }
    singleClickOutput() {
        let myModal = new bootstrap.Modal(document.getElementById('output'), {});
        myModal.show();
    }

    doubleClick() {
        

    }
    mod(){
        var mod = document.getElementById("exampleModal")
        mod.innerHTML = "aria-hidden = 'true'"
        console.log("hi")

    }
}
export class Polar extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, 'NRZ\npolar signal');
    }
}
export class Carrier extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, 'Carrier\nsignal');
    }
}
export class Output extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, 'Output\nsignal');
    }
}
