var Square1 = function(){
    Square.call(this);//Square1继承Square的this属性
    this.rotates = [
        [
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
        ],
        [
            [0,0,0,0],
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
        ], [
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
        ],
        [
            [0,0,0,0],
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
        ]
    ]
};
Square1.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square1的原型链

var Square2 = function(){
    Square.call(this);//Square2继承Square的this属性
    this.rotates = [
        [
            [0,2,0,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ], [
            [2,2,2,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,0,0,0],
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0],
        ]
    ]
};
Square2.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square2的原型链
var Square3 = function(){
    Square.call(this);//Square3继承Square的this属性
    this.rotates = [
        [
            [2,2,2,0],
            [0,0,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [0,2,0,0],
            [0,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
        ], [
            [2,0,0,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ]
    ]
};
Square3.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square3的原型链
var Square4 = function(){
    Square.call(this);//Square4继承Square的this属性
    this.rotates = [
        [
            [2,2,2,0],
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,0,0,0],
        ], [
            [0,0,2,0],
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,0,0,0],
            [2,0,0,0],
            [2,2,0,0],
            [0,0,0,0],
        ]
    ]
};
Square4.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square4的原型
var Square5 = function(){
    Square.call(this);//Square5继承Square的this属性
    this.rotates = [
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ], [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
    ]
};
Square5.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square5的原型
var Square6 = function(){
    Square.call(this);//Square6继承Square的this属性
    this.rotates = [
        [
            [0,2,2,0],
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [0,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,0,0,0],
            [2,2,0,0],
            [0,2,0,0],
            [0,0,0,0],
        ],
    ]
};
Square6.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square6的原型
var Square7 = function(){
    Square.call(this);//Square7继承Square的this属性
    this.rotates = [
        [
            [2,2,0,0],
            [0,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ],
        [
            [2,2,0,0],
            [0,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
        ],
        [
            [0,2,0,0],
            [2,2,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ],
    ]
};
Square7.prototype = Square.prototype;//将Square原型链上的原型方法赋值到Square7的原型
var SquareFactory = function(){}
//index:方块类型，dir:旋转方向
SquareFactory.prototype.make = function(index,dir){
    var s;
    index = index + 1;
    switch (index){
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s = new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default:
            break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
}