var rulesBtn = document.querySelector('#rules-btn');
var closeBtn = document.querySelector('#close-btn');
var rules = document.querySelector('.show_rule');
var begin1 = document.querySelector('#begin-btn');
var magic = document.querySelector('#magic-btn');
var texts = ["BUG", "压力", "焦虑", "亚健康", "停滞"]
//打开规则
rulesBtn.addEventListener('click', function () {
    rules.classList.add('show');
});
//关闭规则
closeBtn.addEventListener('click', function () {
    rules.classList.remove('show');
});

//游戏开始
begin1.addEventListener('click', function () {
    ball['xspeed'] = 3;
    ball['yspeed'] = -3;
    ball['speed'] = 3;
    console.log(ball);
});

//???
magic.addEventListener('click', function () {
    paddle['w'] = 600;
});

//取得画布,定义画布上下文
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
const brickRowCount = 9;
const brickColumnCount = 7;
const delay = 500;



//定义一个对象小球
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    xspeed: 0,
    yspeed: 0,
    speed: 0,
    visible: true
};

//创建一个板子对象
var paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
};

//定义一个砖块对象
var brick = {
    w: 70,
    h: 20,
    padding: 10,
    offsetx: 45,
    offsety: 60,
    visible: true,
    text: "BUG"
};

//创造砖头
var bricks = [];
for (var i = 0;i < brickRowCount;i++) {
    bricks[i] = [];
    for (var j = 0;j < brickColumnCount;j++) {
        var x = i * (brick.w + brick.padding) + brick.offsetx;
        var y = j * (brick.h + brick.padding) + brick.offsety;

        var randomIndex = Math.floor(Math.random() * texts.length); // 随机选择一个文字
        bricks[i][j] = { x, y, ...brick, text: texts[randomIndex] }; // 存储到属性中
        // var y = j * (brick.h + brick.padding) + brick.offsety;
        // bricks[i][j] = {x,y,...brick,text: "BUG" + i + "-"+ j};


    }
}

//画一个球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}

//画一个板子
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}

//画砖墙
function drawBricks() {
    //forEach() 方法对数组的每个元素执行一次提供的函数
    bricks.forEach(col => {
        col.forEach(b => {
            console.log();
            ctx.beginPath();
            ctx.rect(b.x, b.y, b.w, b.h);
            ctx.fillStyle = b.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();


            //绘制文字
            if (b.text !== null) {
                ctx.font = "12px Arial";
                ctx.fillStyle = "#000000";
                ctx.fillText(b.text, b.x + 10, b.y + 15); // 根据需要调整文字位置
            }

        });
    });
}

//画一个得分栏
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`年薪: ${score}000000`, canvas.width - 4156, 30);
}

//板子的运动
function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}



//球的运动
function moveBall() {
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;


    //墙体碰撞
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0)
        ball.xspeed = -ball.xspeed;
    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0)
        ball.yspeed = -ball.yspeed;

    //球板碰撞
    if (
        ball.x - ball.r >= paddle.x - paddle.w &&
        ball.x + ball.r <= paddle.x + paddle.w &&
        ball.y + ball.r >= paddle.y
    ) {
        ball.yspeed = -ball.speed;
    }

    //砖块碰撞
    bricks.forEach(col => {
        col.forEach(b => {
            if (b.visible) {
                if (
                    ball.x - ball.r > b.x &&
                    ball.x + ball.r < b.x + b.w &&
                    ball.y + ball.r > b.y &&
                    ball.y - ball.r < b.y + b.h
                ) {
                    ball.yspeed = -ball.yspeed;
                    b.visible = false;  //碰撞到就返回弹,并且把vis标记为false,令砖块消失
                    b.text = null;  //文字消失
                    increaseScore();
                }
            }
        });
    });

    //撞击到地面,得分清空,并且砖块全部重置
    if (ball.y + ball.r > canvas.height) {
        showAllBricks();
        score = 0;
        location.reload()

    }
}
var score = 0;

function increaseScore() {
    score++;

    if (score % (brickRowCount * brickColumnCount) === 0) {

        ball.visible = false;
        paddle.visible = false;

        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;

            if (score = 63) {
                window.location.href = '周末愉快!.html';
            }


        }, delay)
    }
}


function showAllBricks() {
    bricks.forEach(col => {
        col.forEach(b => {
            b.visible = true;


        });
    });
}

function draw() {
    //魔法橡皮擦掉上一帧内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
}

//启动总函数

function update() {
    moveBall();
    movePaddle();
    draw();

    // begin1();
    // difficulty();


    requestAnimationFrame(update);
    //递归调用,重置动画

}

update();

//键盘事件
document.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
})

document.addEventListener('keyup', function (e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft')
        paddle.dx = 0;
})