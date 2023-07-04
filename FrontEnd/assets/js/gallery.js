async function getFigure() {
    let url = 'http://localhost:5678/api/works';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getFigureCategory() {
    let url = 'http://localhost:5678/api/categories';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function RenderFigure() {
    let figure = await getFigure();
    figure.forEach(figure => {

        const figureElement = document.createElement("figure");
        figureElement.setAttribute("class", "figureElementTag");
        figureElement.setAttribute("id", `list-${figure.id}`);
        figureElement.dataset.categoryid=figure.categoryId;

        const img = document.createElement("img");
        img.setAttribute("src", figure.imageUrl);
        figureElement.appendChild(img);

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = figure.title;
        figureElement.appendChild(figcaption);

        document.querySelector(".gallery").appendChild(figureElement);
        
    });
}

RenderFigure();

async function RenderFilterDiv() {

    const filter_all = document.createElement("div");
    filter_all.setAttribute("tabIndex", "0");
    filter_all.setAttribute("class", "filterTag");
    filter_all.innerText = "Tous";
    document.querySelector(".filter").appendChild(filter_all);

    let filter_btn = await getFigureCategory();
    filter_btn.forEach(element => {
        const filterTag = document.createElement("div");
        filterTag.setAttribute("tabIndex", element.id);
        filterTag.setAttribute("class", "filterTag");
        filterTag.innerText = element.name;
        document.querySelector(".filter").appendChild(filterTag);
    })
    Array.from(document.querySelectorAll(".filterTag")).forEach(element => {
        element.addEventListener("click", function(event) {
            Array.from(document.querySelectorAll(".figureElementTag")).forEach(element => {
                if(parseInt(event.target.getAttribute("tabindex")) === 0) {
                    element.style.display="block"
                }
                else {
                    if(element.dataset.categoryid === event.target.getAttribute("tabindex")) {
                        element.style.display="block"
                    }
                    else {
                        element.style.display="none"
                    }
                }
            

            })

        })
    })
    
}

RenderFilterDiv();
