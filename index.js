let fetchedData = getApi('https://rickandmortyapi.com/api/character?page=1');
let currentPage = 1;
let pageType = '/character';

const myButtons = document.querySelectorAll('.wToGo');
for(let i = 0; i < myButtons.length; i++) {
    myButtons[i].addEventListener('click', function () {
       getApi(myButtons[i].value);
       pageType=myButtons[i].id;
       currentPage = 1;
    })
}

function getApi(data) {
    fetch(data)
    .then(response => response.json())
    .then((data) => fetchedData = data)
    .then(() => tellMeAll())
    .then(() => getAll(data))
}

let allData = [];

function getAll(ip) {
    allData = [];
    let data = ip.split('?')
    for(let i = 1; i < fetchedData.info.pages; i++) {
        fetch(data[0] +'?page=' + i)
        .then(response => response.json())
        .then((data) => allData.push(data.results))
    }
}

function tellMeAll() {
    let mySpace = document.getElementById('freeSpace');
    mySpace.innerHTML = '';
    console.log(fetchedData)
    if(pageType == '/character') {
        for(let i = 0; i < fetchedData.results.length; i++) {
            mySpace.innerHTML += '<div id="' + i + '" class="box">Name: ' + fetchedData.results[i].name + '<br>'
            + 'Status: ' + fetchedData.results[i].status + '<br>'
            + '<img src="' + fetchedData.results[i].image + '"></div>'
        }
    }
    if(pageType == '/location') {
        for(let i = 0; i < fetchedData.results.length; i++) {
            mySpace.innerHTML += '<div id="' + i + '" class="box">Name: ' + fetchedData.results[i].name + '<br>'
            + 'Type: ' + fetchedData.results[i].type + '<br>'
            + 'Dimension: ' + fetchedData.results[i].dimension +'</div>'
        }
    }
    if(pageType == '/episode') {
        for(let i = 0; i < fetchedData.results.length; i++) {
            mySpace.innerHTML += '<div id="' + i + '" class="box">Name: ' + fetchedData.results[i].name + '<br>'
            + 'Air date: ' + fetchedData.results[i].air_date + '<br>'
            + 'Episode: ' + fetchedData.results[i].episode +'</div>'
        }
    }
    const test = document.querySelectorAll('.box');
    for(let i = 0; i < test.length; i++) {
        test[i].addEventListener('click', function () {
            tellMeMore(test[i].id, currentPage - 1)
        })
    }
}

document.getElementById("search").addEventListener("submit", function (event) {
    event.preventDefault()
    let wanted = document.getElementById('search');
    //console.log(wanted.id.value); 
    lookingFor(wanted.id.value);
});

document.getElementById('next').addEventListener('click', function (event) {
    event.preventDefault()
    if(fetchedData.info.next == null) {
        alert('This is last page')
        return;
    }
    fetchedData = getApi(fetchedData.info.next)
    currentPage++;
})

document.getElementById('prev').addEventListener('click', function (event) {
    event.preventDefault()
    if(fetchedData.info.prev == null) {
        alert('This is first page')
        return;
    }
    fetchedData = getApi(fetchedData.info.prev)
    currentPage--;
})



function lookingFor(wanted) {
    let howMany = 1;
    let regex = new RegExp(wanted.toLowerCase())
    if(wanted == '') {
        alert('There is nothing here!')
    } 
    else {
        for(let j = 0; j < allData.length; j++) {
            for(let i = 0; i < allData[j].length; i++) {
                if(regex.test(allData[j][i].name.toLowerCase())) {
                    console.log('found him')
                    //console.log(j, i)
                    tellMeSome(i, howMany, j)
                        howMany++;
                }
            }
            if(j+1 == allData.length && howMany == 1) {
                alert('Character not found!');
                return;
            }
        }
    }
}

function tellMeMore(wIndex, arrIndex) {
    let mySpace = document.getElementById('freeSpace');
    
    if(pageType == '/character') {
        mySpace.innerHTML = '<div id="spec">Id: ' + allData[arrIndex][wIndex].id 
        + '<img id="imgSpec" src="'+allData[arrIndex][wIndex].image+'"><br>'
        + 'Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Status: ' + allData[arrIndex][wIndex].status + '<br>' 
        + 'Species: ' + allData[arrIndex][wIndex].species + '<br>'
        + 'Gender: ' +  allData[arrIndex][wIndex].gender + '<br>'
        + 'Origin: ' + allData[arrIndex][wIndex].origin.name + '<br>'
        + 'Location: ' + allData[arrIndex][wIndex].location.name + '<br><br>'
        + '<input type="button" id="return" class="return" value="Return"><br>'
        + '</div>'
    }

    if(pageType == '/location') {
        mySpace.innerHTML = '<div id="spec">Id: ' + allData[arrIndex][wIndex].id 
        +'<input type="button" id="return" class="return2" value="Return"><br>'
        + 'Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Type: ' + allData[arrIndex][wIndex].type + '<br>' 
        + 'Dimension: ' + allData[arrIndex][wIndex].dimension + '<br>'
        + '</div>'
    }

    if(pageType == '/episode') {
        mySpace.innerHTML = '<div id="spec">Id: ' + allData[arrIndex][wIndex].id 
        +'<input type="button" id="return" class="return2" value="Return"><br>'
        + 'Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Air date: ' + allData[arrIndex][wIndex].air_date + '<br>' 
        + 'Episode: ' + allData[arrIndex][wIndex].episode + '<br>'
        + '</div>'
    }

    document.getElementById("return").addEventListener("click", function (event) {
        event.preventDefault()
        tellMeAll()
    });
}

function tellMeSome(wIndex, wT, arrIndex) {
    let mySpace = document.getElementById('freeSpace');

    if(wT == 1) {
        mySpace.innerHTML = '<input type="button" id="return" class="returnSome" value="Return">'
    }

    if(pageType == '/character') {
        mySpace.innerHTML += 
        '<div id="' + wIndex +'.'+ arrIndex + '" class="box">Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Status: ' + allData[arrIndex][wIndex].status + '<br>'
        + '<img src="'+allData[arrIndex][wIndex].image+'"></div>'
    }

    if(pageType == '/location') {
        mySpace.innerHTML += 
        '<div id="' + wIndex +'.'+ arrIndex + '" class="box">Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Type: ' + allData[arrIndex][wIndex].type + '<br>'
        + '</div>'
    }    
    if(pageType == '/episode') {
        mySpace.innerHTML += 
        '<div id="' + wIndex +'.'+ arrIndex + '" class="box">Name: ' + allData[arrIndex][wIndex].name + '<br>'
        + 'Episode: ' + allData[arrIndex][wIndex].episode + '<br>'
        + '</div>'
    }

    document.getElementById("return").addEventListener("click", function (event) {
        event.preventDefault()
        tellMeAll()
    });
    
    const myQuery = document.querySelectorAll('.box');
    for(let i = 0; i < myQuery.length; i++) {
        myQuery[i].addEventListener('click', function () {
            let ip = myQuery[i].id.split('.')
            tellMeMore(ip[0], ip[1])
        })
    }
}
