
let getCategory = () => {
    let index = document.querySelector("select").selectedIndex;
    return document.querySelector("select").options[index].value
}

let clearBody = () => {
    document.querySelector(".bigImg").firstChild.remove();
    let allImg = document.querySelectorAll(".container img");
    allImg.forEach(element => {
        element.remove();
    });
}

let category = document.querySelector("select");
category.addEventListener('change', () => {
    clearBody();
    getImgUrl()
});


const getImgUrl = async () => {
    let url = `https://pixabay.com/api/?key=22967991-d71f2b2444671a6e35da0e817&image_type=photo&page=2&orientation=horizontal&per_page=8&category=${getCategory()}`;
    let res = await fetch(url);
    let data = await res.json();
    let bigImg = await data.hits.map(el =>  {
        return `<img src=${el.largeImageURL} alt="${el.tags}">`});
    
    await setBigImg(bigImg[0]);
    await setImg(bigImg);
    await arrows();
    let allImg = document.querySelectorAll(".container img");
    allImg.forEach(element => {
        element.addEventListener('click', (el) => {
        let img = document.querySelector(".bigImg img");
        img.src = el.target.src;
        img.alt = el.target.alt;
        });
    });
}

const setImg =  async (img) => {
    let container = document.querySelector(".container");
     img.forEach(el => {
        container.insertAdjacentHTML('beforeend', el);
   });
};

const setBigImg = async (img) => {
    let bigImg = document.querySelector(".bigImg");
    bigImg.insertAdjacentHTML('afterbegin', img);
}

const arrows = async () => {
    let left = document.querySelector(".left");
    let right = document.querySelector(".right");
    left.addEventListener('click', () => { clickArrow("left") });
    right.addEventListener('click', () => { clickArrow("right") });
}

const getPosition = () => {
    let allImg = document.querySelectorAll(".container img");
    let bigImg = document.querySelector(".bigImg").firstChild;
    for (let i = 0; i < allImg.length; i++) {
        if (allImg[i].src == bigImg.src) 
        return i;
    }
}

const clickArrow = (arrow) => {
    let allImg = document.querySelectorAll(".container img");
    let bigImg = document.querySelector(".bigImg").firstChild;
    let pos = getPosition();

    if (arrow == "left") {
        pos == 0 ? pos=8 : null;
        bigImg.src = allImg[pos - 1].src;
        bigImg.alt = allImg[pos - 1].alt;
    }
    if (arrow == "right") {
        pos == 7 ? pos = -1 : null;
        bigImg.src = allImg[pos + 1].src;
        bigImg.alt = allImg[pos + 1].alt;
    }
    
}

getImgUrl();

