function ongrid(){
    var b = document.getElementById('panel');
    b.style.display = "none";
    var a = document.getElementById('panel2');
    a.style.display = "flex";
    console.log("Here");

}
function online(){
    var a = document.getElementById('panel2');
    var b = document.getElementById('panel');
    a.style.display = "none";
    b.style.display = "flex";
}
function list_on(){
    var d = document.getElementById('hidden-span');
    d.classList.toggle('toggle-list');
    console.log("123");
}
function list_on2(){
    var d = document.getElementById('hidden-span2');
    d.classList.toggle('toggle-list');
    console.log("123");
}