class Draggable {
    constructor(el) {
        this.el = el
        this.shiftX = null
        this.shiftY = null
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.addEventHandlers()
    }

    addEventHandlers() {
        this.el.addEventListener('mousedown', this.onMouseDown)
        this.el.addEventListener('dragstart', e => e.preventDefault())
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseDown(e) {
        this.getDragPointer(e.clientX, e.clientY)
        this.prepareElement()
        this.moveElementTo(e.pageX, e.pageY)
        document.addEventListener('mousemove', this.onMouseMove)
    }

    getDragPointer(x, y) {
        const elRect = this.el.getBoundingClientRect()
        this.shiftX = x - elRect.left
        this.shiftY = y - elRect.top
    }

    prepareElement() {
        this.el.style.position = 'absolute'
        this.el.style.zIndex = 999
    }

    moveElementTo(x, y) {
        const leftPosition = (x - this.shiftX < 0 ? 0 : x - this.shiftX);
        const topPosition = (y - this.shiftY < 0 ? 0 : y - this.shiftY) -300;
        this.el.style.left = `${leftPosition}px`
        this.el.style.top = `${topPosition}px`
    }

    onMouseMove(e) {
        this.moveElementTo(e.pageX, e.pageY)
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove)
    }

}
class Window extends Draggable{
    constructor(options){
        let window = document.createElement("div");
        window.style.width = options.width + "px";
        window.style.height = options.height + "px";
        window.style.marginLeft = options.posX + "px";
        window.style.marginTop = options.posY + "px";
        window.className = "window draggable";
        document.body.appendChild(window);
        super(window);
    }
    setTitle(string,n){
        let window = document.getElementsByClassName("window")[n];
        let titulo = document.createElement("h3");
        titulo.appendChild(document.createTextNode(string));
        window.appendChild(titulo);
    }
    setContent(HTMLElement,n){
        let window = document.getElementsByClassName("window")[n];
        window.appendChild(HTMLElement);
    }
}
const opciones= {width:250,height:250,posY:300,posX:100};
let myPostit;
cont = 0;
let datos = "Post-it " + cont;
pushit.addEventListener("click", () => {
    let content = document.createElement("textarea");
    content.className = "contenido";
    myPostit = new Window(opciones);
    myPostit.setTitle("Nota " + (cont+1),cont);
    myPostit.setContent(content,cont);
    cont++;
});
let datosPostIt = document.getElementsByClassName("contenido");
let postits = {};
guardar.addEventListener("click", () => {
    for(let i = 0; i < datosPostIt.length;i++){
        let dPI = datosPostIt[i];
        postits[i] = dPI.value;
        console.log(postits);
        
    }
    localStorage.setItem("postits",JSON.stringify(postits));
    console.log(localStorage.getItem("postits"));
});

document.body.onload = () => {
    let guardado = JSON.parse(localStorage.getItem("postits"));
    console.log(guardado);
    for(let i = 0; i < Object.keys(guardado).length; i++){
        let content = document.createElement("textarea");
        content.className = "contenido";
        myPostit = new Window(opciones);
        myPostit.setTitle("Nota " + (cont+1),cont);
        myPostit.setContent(content,cont);
        cont++;
        datosPostIt[i].value = guardado[i];
    }
};
