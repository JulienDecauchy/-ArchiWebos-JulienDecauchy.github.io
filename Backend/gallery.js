async function getFigure() {
    let url = 'http://localhost:5678/api/works';
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

        const img = document.createElement("img");
        img.setAttribute("src", figure.imageUrl);
        figureElement.appendChild(img);

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = figure.title;
        figureElement.appendChild(figcaption);

        document.querySelector(".gallery").appendChild(figureElement);
        
    });
}

RenderFigure ();
