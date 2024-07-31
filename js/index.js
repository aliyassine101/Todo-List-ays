document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    
let btnscr = document.getElementById('btnscrl');
let btnAdd = document.getElementById('btn');
let input = document.getElementById('todo-input');
let list = document.getElementById('todo-list');
let dropdown = document.getElementById('priority-select');
let high = document.getElementById('high');
let low = document.getElementById('low');
let medium = document.getElementById('medium');
let notfilter = document.getElementById('toutlist');
let searchh = document.getElementById('search');
let storegee = [];
var array = [];

btnAdd.onclick = addlist;
btnAdd.classList.add('addlist');

//lal scroll
window.onscroll = function () {
    scrol();
}

//refresh
window.onload = function () {
    refresh();
};

//button el filter
high.addEventListener('click', function () {
    filter('high')
});
low.addEventListener('click', function () {
    filter('low')
});
medium.addEventListener('click', function () {
    filter('medium')
});
notfilter.addEventListener('click', function () {
    refresh();
});


//function el search 
searchh.onkeydown = function () {
    if(searchh.value){
    filter(searchh.value)}
    
};

//creat element to list
function printlist(array) {
    
    array.forEach(function (item, index) {
       
        console.log(`mawjud sar  :`,array);
        let deletee = document.createElement('button');
        deletee.setAttribute('class', 'delete');
        deletee.textContent = 'delete';
        let update = document.createElement('button');
        update.setAttribute('class', 'update');
        update.textContent = 'update';
        let li = document.createElement('li');
        li.setAttribute('class', 'lii');

    console.log("item:"+array.item);
        li.innerText = item.name + "-" + item.importance;

        let check = document.createElement('input');
        check.type = 'checkbox';
        check.setAttribute('class', 'checkbox');

        li.appendChild(check);
        li.appendChild(deletee);
        li.appendChild(update);

        console.log('new:' + li.innerHTML)
        list.appendChild(li);
        console.log(item, index);
        check.onclick = function () {

            if (check.checked == true) {
                li.style.textDecoration = 'line-through';
            }
            else {

                li.style.textDecoration = 'none';
            }
        }
        update.addEventListener('click', function () {
            if (update.textContent == 'update') {
                let up = li.firstChild.textContent.split('-');;
                input.value = up[0];
                update.textContent = 'save';
            }
            else {

                if (input.value != "") {
                    console.log('li:' + li.firstChild.textContent)
                    // let d = li.innerText.split('de');
                    // i = array.indexOf(d[0]);


                    array[index] = { name: input.value, importance: dropdown.value };
                    li.firstChild.textContent = input.value + '-' + dropdown.value;
                    localStorage.clear();
                    localStorage.setItem('todo-list', JSON.stringify(array));
                    input.value = '';
                    update.textContent = 'update';
                    input.focus();
                }
            }

        });

        deletee.addEventListener('click', function () {
        let ind;
        let str=li.firstChild.textContent;
        str=str.split('-');
        str=str[0];
            console.log('first:'+str);
           for(let i=0;i<array.length;i++){
            if(array[i].name==str){
                ind=i;
            }
           }
                li.remove();
                li.innerHTML = "";
                console.log("the value deleted is: " + array[ind].name);
                // i = array.indexOf(array.name);
                console.log('index:' + ind);
                localStorage.removeItem(array[ind]);
               
                array.splice(ind, 1);
                console.log("sar:" ,array);
                d = JSON.stringify(array);
                localStorage.removeItem(array[ind]);
                localStorage.clear();
               localStorage.setItem('todo-list', d);
        });
    }) 
}
//localstorage
function refresh() {
    if (localStorage.length >= 1) {
        input.value = localStorage.getItem('todo-list');// la 7afez 3alayha bs swe reload
        if (input.value != "") {
            storegee = JSON.parse(input.value)
            savelist(storegee);
            localStorage.setItem('todo-list', JSON.stringify(storegee));
        }
        console.log('howe:' ,storegee);
    }
}

//savelist 
function savelist(array) {
    let i;
    if (input.value != "") {
        list.innerHTML = "";
        printlist(array);
        input.value = "";
        input.focus()
    }
    localStorage.setItem('todo-list', JSON.stringify(array));
}

////add to list
function addlist() {
    let i;
    if (input.value != "") {
        // array.length=0;
        console.log("fee:",storegee)
        list.innerHTML = "";
        array = storegee;
        array.push({ name: input.value, importance: dropdown.value });
        printlist(array);//function add to list
        input.value = "";
        input.focus();
        localStorage.clear();
        localStorage.setItem('todo-list', JSON.stringify(array));
       
    }
   
};

//filter 
function filter(namess) {
    let disp = [];
    let exist = 0;
    for (let i = 0; i < storegee.length; i++) {
        console.log("fi:"+storegee[0].importance.includes(namess));
        if (storegee[i].importance.includes(namess) || storegee[i].name.includes(namess)) {
            console.log('eeeeeeeee');
            disp.push({ name: storegee[i].name, importance: storegee[i].importance });
            console.log('dsp howe:' + disp);
            exist++;
        }
    }
    if (exist != 0) {
        console.log('disp:',disp);
        filterlist(disp);
    }
}

//lal filter
function filterlist(disp) {
    list.innerHTML = "";
   
    console.log('array is:',disp)
    
    printlist(disp);
    localStorage.setItem('todo-list', JSON.stringify(storegee));
}

//scroll
function scrol() {
    if (scrollY >= 400) {
        btnscr.style.display = 'block';

    }
    else {
        btnscr.style.display = 'none';
    }
}

btnscr.onclick = function () {
    scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
    })
}
});
