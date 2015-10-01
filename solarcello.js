SPEED = 1;
ORBIT_SCALE = 1;
MODIFYING = false;

var mic;

function setup() {

    mic = new p5.AudioIn();
    mic.start();

    createCanvas(window.windowWidth, window.windowHeight);
    center = {x: window.windowWidth / 2,
            y: window.windowHeight / 2};

    Sun = new Planet({
        fill: color(250, 225, 0),
        radius: 50,
        orbit: 0,
        velocity: 0
    });
    mercury = new Planet({
        orbit: 38.7,
        velocity: 0.016,
        fill: color("red")
    });
    venus = new Planet({
        orbit: 72.3,
        velocity: 0.0117,
        fill: color("orange")
    });
    earth = new Planet({
        orbit: 100,
        fill: color('steelblue')
    });
    mars = new Planet({
        orbit: 152.4,
        velocity: 0.008,
        fill: color('crimson')
    });

    jupiter = new Planet({
        orbit: 520.3,
        velocity: 0.00434,
        fill: color('blue')
    });
    saturn = new Planet({
        orbit: 953.9,
        velocity: 0.00323,
        fill: color('beige')
    });
    uranus = new Planet({
        orbit: 1918.0,
        velocity: 0.00228,
        fill: color('cyan')
    });
    neptune = new Planet({
        orbit: 3006.0,
        velocity: 0.00182,
        fill: color('aqua')
    });
    pluto = new Planet({
        orbit: 3952.0,
        velocity: 0.00159,
        fill: color('antiquewhite')
    });


    planets = [Sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

}


function polarToCartesian(polar) {
    return {
        x: polar.r * cos(polar.theta),
        y: polar.r * sin(polar.theta)
    }
}

function cartesianToPolar(cartesian) {
    return {
        r: sqrt(pow(cartesian.x,2) + pow(cartesian.y,2)),
        theta: atan2(cartesian.y,cartesian.x)
    }
}


Planet = function(opts) {
    this.radius = opts.radius || 10;
    this.orbit = opts.orbit;
    this.fill = opts.fill || color(200, 200, 200);
    this.velocity = opts.velocity || .01;
    this.position = polarToCartesian({
        r: this.orbit,
        theta: random(0, 100)
    });
}

Planet.prototype.frame = function() {
    var startPosPolar = cartesianToPolar(this.position);
    var nextPos = {
        r: startPosPolar.r,
        theta: startPosPolar.theta + this.velocity * SPEED
    };
    this.position = polarToCartesian(nextPos);
    fill(this.fill);
    ellipse((this.position.x * ORBIT_SCALE) + center.x, (this.position.y * ORBIT_SCALE) + center.y, this.radius*ORBIT_SCALE, this.radius*ORBIT_SCALE);
};

function mouseClicked() {
    MODIFYING = !MODIFYING;
}



function draw() {
    if (MODIFYING) {
        ORBIT_SCALE = (2 * mouseY / windowHeight) || 1;
        SPEED = (5 * mouseX / windowHeight) || 1;
    } else {
        ORBIT_SCALE = 100*mic.getLevel();
    }
    noStroke();
    background(10, 10, 10, 75);
    for (var i = 0; i < planets.length; i++) {
        planets[i].frame();
    }

    micLevel = mic.getLevel();
    console.log(micLevel)
}
