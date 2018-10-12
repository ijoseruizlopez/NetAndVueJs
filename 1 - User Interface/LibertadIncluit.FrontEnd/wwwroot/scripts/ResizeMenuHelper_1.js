function CambiarAltura() {
    var bgHome = document.getElementById("bgHome");
    if (bgHome.className == "bgHome") {
        bgHome.className = 'bgHomeDesplegado';
    } else {
        bgHome.className = 'bgHome';    
    }
}