const createContextMenu = ()=>{
    console.log("ContextMenuCreating...");
    let wrapper = document.createElement("div")
    wrapper.setAttribute('class','cmWrapper')
    let list = document.createElement("ul")
    list.setAttribute('class','menu')

    let rows = document.getElementsByClassName("tier-row")
    for(let i=0; i<rows.length; i++){
        let itemList = document.createElement("li")
        let itemSpan = document.createElement("span")

        itemList.setAttribute('class','item')
        itemSpan.innerText = rows.item(i).children.item(0).children.item(0).innerText;

        itemList.appendChild(itemSpan)
        list.appendChild(itemList)
    }

    wrapper.appendChild(list)
    document.getElementsByTagName("body").item(0).appendChild(wrapper)
    console.log("ContextMenuCreated")
}

const updateContextMenu = () =>{
    list.innerHTML = ""
    let rows = document.getElementsByClassName("tier-row")
    for(let i=0; i<rows.length; i++){
        let itemList = document.createElement("li")
        let itemSpan = document.createElement("span")

        itemList.setAttribute('class','item')
        itemSpan.innerText = rows.item(i).children.item(0).children.item(0).innerText;

        itemList.appendChild(itemSpan)
        list.appendChild(itemList)
    }
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
let characters = document.getElementsByClassName("character")

for(let i=0; i<characters.length; i++){
    characters.item(i).addEventListener("contextmenu", event=>{
        event.preventDefault();
        let x = event.pageX, y = event.pageY,
            winWidth = window.innerWidth,
            cmWidth = contextMenu.offsetWidth,
            winHeight = window.innerHeight,
            cmHeight = contextMenu.offsetHeight;

        x = x>winWidth-cmWidth?winWidth-cmWidth:x;

        contextMenu.style.left =`${x}px`;
        contextMenu.style.top =`${y + document.body.scrollTop}px`;
        contextMenu.style.visibility = "visible";
    })
}

document.addEventListener("click", ()=>contextMenu.style.visibility="hidden")
