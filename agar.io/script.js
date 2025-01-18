"use strict"


/*
ФОРМАТИРОВАНИЕ 
1) нормальные названия фу-ям и аргументам (чтобы было понятно по названию, что это и для чего)
2) строки 80, 81 укоротить - сделать локальную переменную общую на класс 
3) лишние брэйки в кейсе
4) укоротить условия в кейсе
*/

class Circle {
//    const Type = {PLAYER: 'player', SIMPLECIRCLE: 'simplecircle'}; //player and simple circle
    type = '';
    r = 0;
    x = 0;
    y = 0;
    cl = '';
    points = 0;
    
    constructor(type) {
        this.type = type;
        this.create();
    }

    merge() {
        
    }
    
    create() {
        switch (this.type) {
            case 'player':
                this.r = 20;
                this.x = Math.floor(Math.random() * (window.innerWidth - 0 + 1) + 0);
                this.y = Math.floor(Math.random() * (window.innerHeight - 0 + 1) + 0);
            break;
            case 'simplecircle':
                this.r = 5;
                this.x = Math.floor(Math.random() * (window.innerWidth - 0 + 1) + 0);
                this.y = Math.floor(Math.random() * (window.innerHeight - 0 + 1) + 0);
            break;
        }
    }
}

//class Player extends Circle {
//    speed = 0;
//    
//    absorption() {
//        
//    }
//}
//
//class SimpleCircle extends Circle {
//    
//}

class Field {
    NUMBERCIRCLE = 300;
    arraySC = [];  //шарики
    player = 0;

    constructor() {}
    
    createPlayer() {
        this.player = new Circle('player');
        document.getElementById("field").innerHTML += '<div id="player"></div>';
        let docP = document.getElementById("player");
        let r = Math.floor(Math.random() * (255 - 0) + 0);
        let g = Math.floor(Math.random() * (255 - 0) + 0);
        let b = Math.floor(Math.random() * (255 - 0) + 0);
        docP.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        docP.style.borderColor = 'rgb(' + (r - 20) + ',' + (g - 20) + ',' + (b - 20) + ')';
        docP.style.left = this.player.x - this.player.r + 'px';
        docP.style.top = this.player.y - this.player.r + 'px';
        docP.style.height = this.player.r * 2 + 'px';
        docP.style.width = this.player.r * 2 + 'px';
    }

    absorb() {
        for (var i = 0; i < this.NUMBERCIRCLE; i++) {
            if (this.testAbsorb(i)) {
                //document.getElementById('player').style.backgroundColor = 'rgba(150, 0, 0, 0.2)';
                document.getElementById('player').style.backgroundColor = this.arraySC[i].cl;  //разберись, почему я так сделал и как работает
                document.getElementById('player').style.height = this.player.r + 'px';
                document.getElementById('player').style.width = this.player.r + 'px';
                this.player.r += 0.1;
                //нужно удалять шарик
                document.getElementById('field').childNodes[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }
        }
        //console.log(document.getElementById('field').childNodes)
        //console.log(document.getElementById('field').childNodes[1].getBoundingClientRect())
    }

    testAbsorb(sc) {
        //заменить на simlecircle
        //sc = document.getElementById('field').childNodes[sc].getBoundingClientRect(); //не нужно: ты перепутал часть модели с представлением:
                //тебе не нужно получать координаты из html у тебя есть массив кружков (arraySC) в ячейках которого хранятся экземпляры кружков, т.е. вся инфа о каждом кружке
        //let player = document.getElementById('player').getBoundingClientRect();  //не нужно
        //return sc.top + sc.height > player.top && sc.left + sc.width > player.left && sc.bottom - sc.height < player.bottom && sc.right - sc.width < player.right;
        //условие неправильное
        //sc.top + sc.height = sc.bottom
        //console.log(this.arraySC[sc].x - this.player.x)
        //console.log(this.arraySC[sc].y - this.player.y)
        return (Math.abs(this.arraySC[sc].x - this.player.x) < this.player.r) && (Math.abs(this.arraySC[sc].y - this.player.y) < this.player.r);
    }

    testMove(l, t) {
        if (l < 0 || t < 0) {
            return false;
        }
        if (l > window.innerWidth || t > window.innerHeight) {
            return false;
        }
        return true;
    }
    
    move() {
        //console.log(this.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top))
        let self = this;  //обработчики событий являются закапсулированными структурами, поэтому из них не доступен метод this
//        document.getElementById("player").addEventListener(onkeydown, function(){
        window.onkeypress = function(){
            //console.log(self.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top))
            //ЗДЕСЬ НУЖНО МЕНЯТЬ КООРДИНАТЫ ЭКЗЕМПЛЯРА ИГРОКА
            switch (String.fromCharCode(event.keyCode)) {
                case "a":
                    if (self.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top)){
                        document.getElementById('player').style.left = document.getElementById('player').style.left.slice(0, -2) - 5 + 'px';
                        self.absorb();
                        self.player.x -= 5;
                        break;
                    }
                    break;
                case "d":
                    if (self.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top)){
                        document.getElementById('player').style.left = Number(document.getElementById('player').style.left.slice(0, -2)) + 5 + 'px';               
                        self.player.x += 5;
                        self.absorb();
                    }
                    break;
                case "w":
                    if (self.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top)){
                        document.getElementById('player').style.top = document.getElementById('player').style.top.slice(0, -2) - 5 + 'px';
                        self.player.y -= 5;
                        self.absorb();
                        break;
                    }
                    break;
                case "s":
                    if (self.testMove(document.getElementById('player').style.left, document.getElementById('player').style.top)){
                        document.getElementById('player').style.top = Number(document.getElementById('player').style.top.slice(0, -2)) + 5 + 'px';
                        self.player.y += 5;
                        self.absorb();
                        console.log(self.player.y - self.player.r, document.getElementById('player').style.top)
                        break;
                    }
                    break;
            }
        };
    }

    createSimpleCircle() {
        let docSC = document.getElementById("field");
        let str = '';
        for (let i = 0; i < this.NUMBERCIRCLE; ++i) {
            this.arraySC[i] = new Circle('simplecircle');
            str += '<div class="SimpleCircle"></div>'
        }
        //console.log(this.arraySC)
        document.getElementById("field").innerHTML = str;
        for (let i = 0; i < this.NUMBERCIRCLE; ++i) {
            let r = Math.floor(Math.random() * (255 - 0) + 0);
            let g = Math.floor(Math.random() * (255 - 0) + 0);
            let b = Math.floor(Math.random() * (255 - 0) + 0);
            docSC.childNodes[i].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
            this.arraySC[i].cl = 'rgb(' + r + ',' + g + ',' + b + ')';//разберись, почему я так сделал и как работает (где используется)
            docSC.childNodes[i].style.left = this.arraySC[i].x - this.arraySC[i].r + 'px';
            docSC.childNodes[i].style.top = this.arraySC[i].y - this.arraySC[i].r + 'px';
            docSC.childNodes[i].style.width = this.arraySC[i].r * 2 + 'px';
            docSC.childNodes[i].style.height = this.arraySC[i].r * 2 + 'px';
        }
    }
}

class Main {
    constructor() {}
    
    game() {
        let field = new Field();
        field.createSimpleCircle();
        field.createPlayer();  
        field.move();
    }
}

let Agario = new Main();
Agario.game();