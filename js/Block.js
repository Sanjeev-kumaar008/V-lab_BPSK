class Block {
    constructor(x, y, w, h, name = null, onclick = null) {
        this.name = name;
        this.xo = x;
        this.yo = y;
        this.wo = w;
        this.ho = h;

        this.cx = x;
        this.cy = y;
        this.cw = w;
        this.ch = h;

        this.onclick = onclick
        this.update_pos();
    }

    populate_modal() {}

    update_pos() {
        const width = windowWidth;
        const height = windowHeight;

        this.cx = this.xo * (width / 1920);
        this.cy = this.yo * (height / 1080);
        this.cw = this.wo * (width / 1920);
        this.ch = this.ho * (height / 1080);
    }

    clicked(x, y) {
        return x >= this.cx && x <= this.cx + this.cw &&
               y >= this.cy && y <= this.cy + this.ch;
    }

    draw() {
        const cx = this.cx;
        const cy = this.cy;
        const cw = this.cw;
        const ch = this.ch;

        const font_size = 25 * Math.min(windowWidth / 1920, windowHeight / 1080);

        fill(10);
        rect(cx, cy, cw, ch, 20);
        if (this.name) {
            textSize(font_size);
            textStyle('bold');
            textAlign(CENTER, CENTER);
            fill(255);
            text(this.name, cx + cw / 2, cy + ch / 2);
        }
    }
}

function createSlider(min, max, value) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.value = String(value);
    slider.classList.add("slider");
    slider.style = "width: 200px";
    return slider;
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

export class Integerator extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, 'Integerator');
    }
}

export class Decision extends Block {
    constructor(x, y, w, h) {
        super(x, y, w, h, 'Decision\ndevice');
    }
}
