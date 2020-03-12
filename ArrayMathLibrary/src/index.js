//Number Math
function exponent(a, b) {
    let c = 0; let b2 = a;
    do {
        b2 = b2 * a;
        c++;
    } while (c != b - 1);
    return b2;
}
function add(...a) {
    let ans = a[0];
    for (let i = 1; i != a.length; i++) {
        ans = ans + a[i];
    }
    return ans;
}
function sub(...a) {
    let ans = a[0];
    for (let i = 1; i != a.length; i++) {
        ans = ans - a[i];
    }
    return ans;
}
function multi(...a) {
    let ans = a[0];
    for (let i = 1; i != a.length; i++) {
        ans = ans * a[i];
    }
    return ans;
}
function div(...a) {
    let ans = a[0];
    for (let i = 1; i != a.length; i++) {
        ans = ans / a[i];
    }
    return ans;
}
function sqr(root) {
    var avg = (a, b) => (a + b) / 2, c = 5, b;
    for (let i = 0; i < 20; i++) {
        b = root / c;
        c = avg(b, c);
    }
    return c;
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Array Manipulation
function reverse(arr) {
    return arr.reverse();
}
function combine(arr, ...a) {
    let c = arr;
    for (let i = 0; i != a.length; i++) {
        let cArr = a[i];
        for (let b = 0; b != cArr.length; b++) {
            c.push(cArr[b]);
        }
    }
    return c;
}
function find(arr, item) {
    let found = false;
    for (let i = 0; i != arr.length; i++) {
        if (arr[i] == item) {
            found = true;
            break;
        } else {
            found = false;
        }
    }
    return found;
}
function findIndex(arr, item) {
    let found = false;
    let index = 0;
    for (let i = 0; i != arr.length; i++) {
        if (arr[i] == item) {
            found = true;
            index = i;
            break;
        } else {
            //Not found at current index.
        }
    }
    index = (found == false) ? -1 : index;
    return { found: found, index: index };
}
function replace(arr, val1, repl, retPos) {
    let found = false;
    let pos = 0;

    for(let i = 0; i != arr.length; i++) {
        if(arr[i] == val1) {
            arr[i] = repl;
            pos = i;
            found = true;
            break;
        }
    }

    if(retPos) {
        return {found: found, pos: pos, arr: arr};
    } else {
        return found;
    }

}
function replaceAll(arr, val1, repl, retPos) {
    let pos = [];

    for(let i = 0; i != arr.length; i++) {
        if(arr[i] == val1) {
            arr[i] = repl;
            pos.push(i);
        }
    }

    if(retPos) {
        return ((pos.length > 0) ? {found: true, pos: pos, arr: arr} : false);
    } else {
        return ((pos.length > 0) ? true : false);
    }

}

function rndText(length) {
   var result = '';
   var characters =         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function randomNumberArray(length=1, range1=1, range2=5) {
    let tmpArr = [];
    for(let i = 0; i != length; i++ ) {
        let randNum = rnd(range1, range2);
        tmpArr.push(randNum);
    }
    return tmpArr;
}
function randomTextArray(length=1, range1=1, range2=5) {
    let tmpArr = [];
    for(let i = 0; i != length; i++) {
        let randText = rndText(rnd(range1, range2));
        tmpArr.push(randText);
    }
    return tmpArr;
}
