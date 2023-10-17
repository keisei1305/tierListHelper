const createContextMenu = ()=>{
    let wrapper = document.createElement("div")
    wrapper.setAttribute('class','cmWrapper')
    let list = document.createElement("ul")
    list.setAttribute('class','menu')
    wrapper.appendChild(list);
    document.getElementsByTagName("body").item(0).appendChild(wrapper)
}

const addImageToListRow = (rowNode, character) => {
    character.parentElement.removeChild(character)
    rowNode.appendChild(character)
}

const appendCarousel = () =>{
    let itemList = document.createElement("li")
    let itemSpan = document.createElement("span")
    itemList.setAttribute('class','item')
    itemSpan.innerText = "Не выбрано";
    itemList.addEventListener('click', ()=>{
        if (currentCharacters.size!==0){
            for(let item of currentCharacters){
                addImageToListRow(carousel,item);
            }
        }
        else addImageToListRow(carousel,lastChild);
    })
    itemList.appendChild(itemSpan);
    list.appendChild(itemList);
}

const updateContextMenu = () =>{
    list.innerHTML = ""
    let rows = document.getElementsByClassName("tier-row")
    for(let i=0; i<rows.length; i++){
        let itemList = document.createElement("li")
        let itemSpan = document.createElement("span")

        itemList.setAttribute('class','item')
        itemSpan.innerText = rows.item(i).children.item(0).children.item(0).innerText;

        itemList.addEventListener('click', ()=>{
            if (currentCharacters.size!==0){
                for(let item of currentCharacters){
                    addImageToListRow(rows.item(i).children.item(1),item);
                }
            }
            else addImageToListRow(rows.item(i).children.item(1),lastChild);
        })

        itemList.appendChild(itemSpan)
        list.appendChild(itemList)
    }
    appendCarousel();
}

const bodyGetStyles = ()=>{
    const style = document.createElement('style')
    style.textContent = `
    .cmWrapper{
    position: absolute;
    background: #000;
    border-radius: 10px;
    width:300px;
    visibility: hidden;
}

.cmWrapper .menu{
    padding: 10px 12px;
}

.cmWrapper .item{
    list-style: none;
    font-size: 22px;
    color: #f2f2f2;
    height:50px;
    display: flex;
    cursor: pointer;
    padding:0 5px 0 10px;
    align-items: center;
    border-radius:5px;
    margin-bottom: 2px;
}

.cmWrapper .item:hover{
    background: #333333;
}

.cmWrapper .item span{
    margin-left:8px;
    font-size:19px;
}
    `
    document.querySelector('body').appendChild(style)
}


bodyGetStyles()
createContextMenu()
const contextMenu = document.querySelector(".cmWrapper")
const list = contextMenu.children.item(0)
const carousel = document.getElementById("create-image-carousel")
const currentCharacters = new Set();
let shiftIsPressed = false;

let characters = document.getElementsByClassName("character");
let currentCharacter;
let lastChild;
updateContextMenu()

for(let i=0; i<characters.length; i++){
    characters.item(i).addEventListener("contextmenu", event=>{
        event.preventDefault();
        lastChild = event.target;
        let x = event.pageX, y = event.pageY,
            winWidth = window.innerWidth,
            cmWidth = contextMenu.offsetWidth,
            winHeight = window.innerHeight,
            cmHeight = contextMenu.offsetHeight;

        x = x>winWidth-cmWidth?winWidth-cmWidth:x;

        contextMenu.style.left =`${x}px`;
        contextMenu.style.top =`${y + document.body.scrollTop}px`;
        contextMenu.style.visibility = "visible";
    });
    characters.item(i).addEventListener('mousedown', event=>{
        switch (event.button){
            case 0:
                if (shiftIsPressed === false) return;
                currentCharacter = event.target;
                if (currentCharacters.has(currentCharacter)){
                    currentCharacters.delete(currentCharacter);
                    currentCharacter.style.opacity = "1";
                }
                else{
                    currentCharacters.add(currentCharacter);
                    currentCharacter.style.opacity = "0.6";
                }
                break;
        }
    })
}

document.addEventListener("click", ()=>{
    contextMenu.style.visibility="hidden";
    if (shiftIsPressed === false){
        for (let item of currentCharacters){
            item.style.opacity ="1";
        }
        currentCharacters.clear();
    }
})

document.addEventListener('click',event =>{
    if (event.target.id==="delete-row"
        || event.target.parentElement.classList.contains("move-buttons")
        || event.target.id==="add-row-up"
        ||event.target.id==="add-row-below") {
        console.log(event.target)
        updateContextMenu();
    }
})
document.addEventListener('keydown', event =>{
    if (event.keyCode === 16){
        shiftIsPressed = true;
        event.preventDefault();
    }
})
document.addEventListener('keyup', event =>{
    if (event.keyCode === 16){
        shiftIsPressed = false;
        event.preventDefault();
    }
})