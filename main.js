//Switching Dark and Light Theme
var value0 = localStorage.getItem('data-theme');
console.log("At initial data theme = ",value0);
if (value0 == null) {
    const input= document.querySelector('.theme_switcher input');
    input.addEventListener('change',(e) => {
        if (e.target.checked) {
            console.log("NUll: input checked, setting dark theme")
            document.body.setAttribute('data-theme','dark')
            console.log("saving dark theme to session storage")
            localStorage.setItem('data-theme','dark')
    }
        else {
            console.log("NUll: input not checked, setting light theme ")
            document.body.setAttribute('data-theme','light')
            console.log("saving dark theme to session storage")
            localStorage.setItem('data-theme','light')
        }
    });
} 


if( value0 == "dark"){
    const input= document.querySelector('.theme_switcher input');
    if(localStorage !== "undefined") {
        localStorage.setItem('data-theme','dark');
    } else {
        localStorage.getItem('data-theme');   
    }
    localStorage.getItem('data-theme');
    document.body.setAttribute('data-theme','dark');
    localStorage.setItem('data-theme','dark');    
    input.addEventListener('change',(e) => {
        var isCheck = e.target.checked;
        if (e.target.checked) {
            console.log("DARK: input checked; setting to dark theme")
            document.body.setAttribute('data-theme','dark')
            console.log("saving dark theme to session storage")
            localStorage.setItem('data-theme','dark')
        } else{
            console.log("Dark: input not checked, setting to light theme")
            document.body.setAttribute('data-theme','light')
            if(localStorage !== "undefined") {
                localStorage.setItem('data-theme','light');
            } else {
                localStorage.getItem('data-theme');   
            }
            console.log("saving light theme to session storage")
            localStorage.setItem('data-theme','light')
            localStorage.getItem('data-theme')
        }
    });
}


if( value0 == "light"){
    const input= document.querySelector('.theme_switcher input');
    if(localStorage !== "undefined") {
        localStorage.setItem('data-theme','light');
    } else {
        localStorage.getItem('data-theme');   
    }
    localStorage.getItem('data-theme');
    document.body.setAttribute('data-theme','light');
    localStorage.setItem('data-theme','light');    
    input.addEventListener('change',(e) => {
        var isCheck = e.target.checked;
        if (e.target.checked) {
            console.log("Light: input checked; setting to dark theme")
            document.body.setAttribute('data-theme','dark')
            console.log("saving dark theme to session storage")
            localStorage.setItem('data-theme','dark')
        } else{
            console.log("Light: input not checked, setting to light theme")
            document.body.setAttribute('data-theme','light')
            if(localStorage) {
                // Store data
                localStorage.getItem('data-theme');
            } else {
                localStorage.setItem('data-theme','light');   
            }
            console.log("saving light theme to session storage")
            localStorage.setItem('data-theme','light')
            localStorage.getItem('data-theme')
        }
    });

}

/*
const input= document.querySelector('.theme_switcher input');
input.addEventListener('change',(e) => {
    if (e.target.checked) {
        document.body.setAttribute('data-theme','dark')
        localStorage.setItem('data-theme','dark')
    } else {
        document.body.setAttribute('data-theme','light')
        localStorage.setItem('data-theme','light')
    }
    localStorage.getItem('data-theme');
})

function getData() {
    
} */