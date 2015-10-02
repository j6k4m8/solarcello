SPEED = 1;
ORBIT_SCALE = 1;
MODIFYING = false;


function preload() {
    music = loadSound('bensound-scifi.mp3');
}


function setup() {

    mic = new p5.SoundFile('bensound-scifi.mp3');

    fft = new p5.FFT();
    music.play();


    createCanvas(window.windowWidth, window.windowHeight);
    center = {x: window.windowWidth / 2,
            y: window.windowHeight / 2};
    centroid = center;

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

Planet.prototype.frame = function(i) {
    var startPosPolar = cartesianToPolar(this.position);
    var nextPos = {
        r: startPosPolar.r,
        theta: startPosPolar.theta + this.velocity * SPEED
    };
    this.position = polarToCartesian(nextPos);
    fill(this.fill);
    ellipse(
        (this.position.x * ORBIT_SCALE) + center.x,
        (this.position.y * ORBIT_SCALE) + center.y,
        this.radius*ORBIT_SCALE + slices[i]/70,
        this.radius*ORBIT_SCALE + slices[i]/70);
};

function mouseClicked() {
    MODIFYING = !MODIFYING;
}

sum = function(a, b) {
    return a + b;
};

function draw() {
    ORBIT_SCALE = (4 * mouseY / (windowHeight/2)) || 1;
    SPEED = (5 * mouseX / windowHeight) || 1;

    var spectrum = fft.analyze();
    slices = []
    var j = 0;
    for (var i = 0; j < 8; i += next) {
        next = pow(j+1, 2);
        slices[j++] = spectrum.slice(i, i+next).reduce(sum);
        i+= next;
    }

    background(slices[5] / 100 || 10, slices[6] / 200, 45);
    if (slices[7] > 8000) {
        strokeWeight(300);
        stroke(random(255), random(255), random(255));
        line(0, random(0, windowHeight), windowWidth, random(0, windowHeight));
    }
    // console.log(slices)

    noStroke();
    for (var i = planets.length - 1; i >= 0; i--) {
        planets[i].frame(i+1);
    }

    var vx = random(-1, 1), vy = random(-1, 1);
    if (abs((center.x + vx) < centroid.x + 100)) {
        center.x += vx;
    }
    if (abs((center.y + vy) < centroid.y + 100)) {
        center.y += vy;
    }

}


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44566813-1', 'auto');
ga('send', 'pageview');
