const getserver = async (url) => {
    let res = await fetch(url);
    return await res.json();
};

class VideoCard {
    constructor({parent, name, description, images="https://images.unsplash.com/photo-1607550315608-257a07a8b132?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"}){
        this.parent = parent;
        this.name = name;
        this.description = description;
        this.images = images;
    }
    render(){
        this.parent.innerHTML += `
            <div class="card" style="max-width: 300px;">
                <img src=${this.images}>
                <div class="card-section">
                <h4>${this.name}</h4>
                <p>${this.description}</p>
                </div>
            </div>
        `
    }
};


getserver("http://localhost:3000/test").then(data => {
    return Array.prototype.reverse.apply(data)
}).then(data =>{
    data.forEach((el, num) => {
        new VideoCard({
            parent: document.querySelector(".blocks"),
            name: el.name,
            description: el.description,
            images: el.photo
        }).render()
    });
}).catch(()=>{
   let parent = document.querySelector(".blocks");
   parent.innerHTML = "сиденение с сервером отсутствует";
   parent.style.cssText = `color: red;`
});

const openModal = (buttonClick, modal) => {
    const modalSelector = document.querySelector(modal),
          buttonSelector = document.querySelector(buttonClick);

    function showModal(){
        modalSelector.classList.add("navigation-add-form_active");
    }

    function hideModal(){
        modalSelector.classList.remove("navigation-add-form_active");
    }

    buttonSelector.addEventListener("click", ()=>{
        if(modalSelector.classList.contains("navigation-add-form_active")){
            hideModal();
        }else{
            showModal();
        }
    })
}

openModal(".open-adds-modal", ".navigation-add-form");

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const formPost = () => {
    let form = document.querySelector(".navigation-add-form");
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        let formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
        postData("http://localhost:3000/test", json).then(()=>{
            form.querySelectorAll('input').forEach(el => {
                el.value = ""
            })
        }).finally(()=>{
            form.innerHTML += "<div style='color: red;'>Пост оправился перезагрузите страницу!</div>"
        })
    })
}

formPost();