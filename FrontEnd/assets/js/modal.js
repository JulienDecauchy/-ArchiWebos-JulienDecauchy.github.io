/************************************* */
/************************************ */

/*Création de la modal */
const createModal = function() {

	const modalDiv = document.createElement("div");

	modalDiv.setAttribute("id", "modal1");
	modalDiv.classList.add("modal", "d-none");
	modalDiv.setAttribute("aria-hidden", "true");
	modalDiv.setAttribute("role", "dialogue");

	const modalDiv_DOM = document.querySelector("main");
	modalDiv_DOM.appendChild(modalDiv);

	return modalDiv;
};

createModal();

/*Première page de la modal */

/*Création du contenu de la modal */
function createModalContent() {
	
	const modalDiv_content = document.createElement("div");
	modalDiv_content.classList.add("modal-content");

	const modalDiv_wrapper = document.createElement("div");
	modalDiv_wrapper.classList.add("modal-wrapper");

	const modal_closeX = document.createElement("span");
	modal_closeX.className = "close";
	modal_closeX.innerText = "x";

	const modal_TitleDiv = document.createElement("div");
	modal_TitleDiv.classList.add("modal-CenterDiv");
	const modalTitle = document.createElement("h3");
	modalTitle.innerText = "Galerie Photo";

	const modal_divider = document.createElement("hr");
	modal_divider.className = "divider";

	const modal_addPhotoBtn = document.createElement("div");
	modal_addPhotoBtn.innerText = "Ajouter une photo";
	modal_addPhotoBtn.classList.add("modalAddbtn");

	const modal_deleteGalleryDiv = document.createElement("div");
	modal_deleteGalleryDiv.classList.add("modal-CenterDiv");
	const modal_deleteGalleryLink = document.createElement("a");
	modal_deleteGalleryLink.innerText = "Supprimer la galerie";
	modal_deleteGalleryLink.setAttribute("id", "modal_deleteAll");

	modal_TitleDiv.appendChild(modalTitle);
	modal_deleteGalleryDiv.appendChild(modal_deleteGalleryLink);

	modalDiv_wrapper.appendChild(modal_TitleDiv);
	modalDiv_wrapper.appendChild(modal_closeX)
	modalDiv_wrapper.appendChild(modal_divider);
	modalDiv_wrapper.appendChild(modal_addPhotoBtn);
	modalDiv_wrapper.appendChild(modal_deleteGalleryDiv);

	modalDiv_content.appendChild(modalDiv_wrapper);

	const modalDiv_insert = document.getElementById("modal1");
	modalDiv_insert.appendChild(modalDiv_content);

	RenderModalFigure();
}

createModalContent();

/*Appel de l'API */
async function getFigure() {
    let url = 'http://localhost:5678/api/works';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

/*Fonction pour gestion des images de la modal */
async function RenderModalFigure() {

	/*Div pour insertion des images dans la modal */
	const modalFigureDiv = document.createElement("div");
	modalFigureDiv.className = "miniGallery";

	const divider = document.querySelector(".divider");
	divider.insertAdjacentElement("beforeBegin", modalFigureDiv);

	/*Affichage des images */
	let figure = await getFigure();
	figure.forEach(figure => {

		const figureElement = document.createElement("figure");
		figureElement.setAttribute("id", `edit-${figure.id}`);

		const figureDelete = document.createElement("i");
		figureDelete.classList.add("fa-regular", "fa-trash-can");
		figureElement.appendChild(figureDelete);

		const img = document.createElement("img");
		img.setAttribute("src", figure.imageUrl);
		figureElement.appendChild(img);

		const figcaption = document.createElement('figcaption');
        figcaption.innerText = "éditer";
        figureElement.appendChild(figcaption);

		modalFigureDiv.appendChild(figureElement);

		/*Suppression des images du DOM */
		figureDelete.addEventListener("click", function () {
			const id = figure.id;
			deleteWorks(id);
		});

		const deleteWorks = async function (id) {
			const response = await fetch(
				"http://localhost:5678/api/works/" + id,
				{
					method: "DELETE",
					headers: {
						"content-type": "application/json",
						Authorization: "Bearer " + window.localStorage.getItem("token"),
					},
				}
			);
			if (response.ok) {
				document.getElementById(`list-${id}`).remove();
				document.getElementById(`edit-${id}`).remove();
			  } else {
				console.error("Error deleting work");
				alert("Echec lors de la suppression d'image(s)");
			  }
		};

		/*Supression de toutes les images du DOM */
		const figureDeleteAll = document.getElementById("modal_deleteAll");
		figureDeleteAll.addEventListener("click", function() {
			const id_all = figure.id;
			deleteAllWorks(id_all);
		});

		const deleteAllWorks = async function (id) {
			const response = await fetch(
				"http://localhost:5678/api/works/" + id,
				{
					method: "DELETE",
					headers: {
						"content-type": "application/json",
						Authorization: "Bearer " + window.localStorage.getItem("token"),
					},
				}
			);
			if (response.ok) {
				while(id >= 0) {
					document.getElementById(`list-${id}`).remove();
					document.getElementById(`edit-${id}`).remove();
				}
			  } else {
				console.error("Error deleting work");
				alert("Echec lors de la suppression d'image(s)");
			  }
		}

	});
}

/********************************************** */
/********************************************* */

/** Deuxième page de la modal **/

function createModalAddContent() {
	const modalAdd_insert = document.querySelector(".modal-content");

	const modalAdd_content = document.createElement("div");
	modalAdd_content.classList.add("modal-ajouter-wrapper", "d-none");

	const modalAdd_closeX = document.createElement("span");
	modalAdd_closeX.className = "close";
	modalAdd_closeX.innerText = "x";
	modalAdd_content.appendChild(modalAdd_closeX);

	const modalAdd_returnArrow = document.createElement("i");
	modalAdd_returnArrow.classList.add("return-arrow", "fa-solid", "fa-arrow-left-long");
	modalAdd_content.appendChild(modalAdd_returnArrow);

	const modalAdd_TitleDiv = document.createElement("div");
	modalAdd_TitleDiv.classList.add("modal-CenterDiv");
	const modalAdd_Title = document.createElement("h3");
	modalAdd_Title.innerText = "Ajout Photo";
	modalAdd_TitleDiv.appendChild(modalAdd_Title);
	modalAdd_content.appendChild(modalAdd_TitleDiv);

	/**Form**/
	const modalAdd_PictureForm = document.createElement("form");
	modalAdd_PictureForm.setAttribute("enctype", "multipart/form-data");
	modalAdd_PictureForm.setAttribute("method", "post");
	modalAdd_PictureForm.setAttribute("name", "ajouterPhotoForm");
	modalAdd_PictureForm.setAttribute("id", "ajouterPhotoForm");
	modalAdd_content.appendChild(modalAdd_PictureForm);

	const modalAdd_insertPictureDiv = document.createElement("div");
	modalAdd_insertPictureDiv.setAttribute("id", "ajouter-photo");
	const modalAdd_PictureDiv = document.createElement("div");
	modalAdd_PictureDiv.classList.add("ajouter-photo-img-div", "modalAdd_wrapperDiv");
	const modalAdd_PictureIcon = document.createElement("i");
	modalAdd_PictureIcon.classList.add("fa-regular", "fa-image", "image-placeholder");

	const modalAdd_PictureBtn = document.createElement("input");
	modalAdd_PictureBtn.setAttribute("name", "image")
	modalAdd_PictureBtn.setAttribute("id", "image")
	modalAdd_PictureBtn.classList.add("d-none");
	modalAdd_PictureBtn.setAttribute("type", "file");

	const modalAdd_PictureLabel = document.createElement("label")
	modalAdd_PictureLabel.setAttribute("for", "image")
	modalAdd_PictureLabel.setAttribute("class", "ajouter-btn")
	modalAdd_PictureLabel.innerText = "+ Ajouter Photo"

	const modalAdd_PictureFormats = document.createElement("p");
	modalAdd_PictureFormats.classList.add("list-formats")
	modalAdd_PictureFormats.innerText = "jpg, png : 4mo max";

	//**Div Preview Image**//
	const modalAdd_previewDiv = document.createElement("div");
	modalAdd_previewDiv.setAttribute("id", "image-preview-div");
	modalAdd_previewDiv.classList.add("d-none");
	modalAdd_PictureForm.appendChild(modalAdd_previewDiv);

	modalAdd_PictureLabel.appendChild(modalAdd_PictureBtn);
	modalAdd_PictureDiv.appendChild(modalAdd_PictureIcon);
	modalAdd_PictureDiv.appendChild(modalAdd_PictureLabel)
	modalAdd_PictureDiv.appendChild(modalAdd_PictureFormats);

	modalAdd_insertPictureDiv.appendChild(modalAdd_PictureDiv);
	modalAdd_PictureForm.appendChild(modalAdd_insertPictureDiv);

	//**Titre de l'image */
	const modalAdd_PictureLabelTitle = document.createElement("label");
	modalAdd_PictureLabelTitle.setAttribute("for", "title");
	modalAdd_PictureLabelTitle.innerText = "Titre";
	modalAdd_PictureLabelTitle.classList.add("titre", "titre-margin-top");
	modalAdd_content.appendChild(modalAdd_PictureLabelTitle);

	modalAdd_PictureForm.appendChild(modalAdd_PictureLabelTitle);

	const modalAdd_PictureInputTitle = document.createElement("input");
	modalAdd_PictureInputTitle.setAttribute("type", "text");
	modalAdd_PictureInputTitle.required = true;
	modalAdd_PictureInputTitle.setAttribute("name", "title")
	modalAdd_PictureInputTitle.setAttribute("id", "title")
	modalAdd_PictureInputTitle.classList.add("titre");

	modalAdd_PictureForm.appendChild(modalAdd_PictureInputTitle);

	//**Catégories de l'image */
	const modalAdd_PictureLabelCategory = document.createElement("label");
	modalAdd_PictureLabelCategory.setAttribute("for", "category");
	modalAdd_PictureLabelCategory.innerText = "Catégorie";
	modalAdd_PictureLabelCategory.classList.add("titre", "titre-margin-top");
	modalAdd_PictureForm.appendChild(modalAdd_PictureLabelCategory);

	const modalAdd_SelectCategory = document.createElement("select");
	modalAdd_SelectCategory.className = "select-category";
	modalAdd_SelectCategory.setAttribute("id", "select-category");
	modalAdd_SelectCategory.setAttribute("name", "category")
	modalAdd_PictureForm.appendChild(modalAdd_SelectCategory)

	//** Choix des categories liées à l'API **//
	fetch("http://localhost:5678/api/categories")
		.then((response) => response.json())

		.then((categories) => {
			const SelectCategory = document.getElementById("select-category");
			categories.forEach((category) => {
				const Category_Option = document.createElement("option");
				Category_Option.innerText = category.name;
				Category_Option.setAttribute("value", category.id);
				SelectCategory.appendChild(Category_Option);
			});
		});
	//**************************************//

	const modalAdd_divider = document.createElement("hr");
	modalAdd_divider.classList.add("divider");
	modalAdd_PictureForm.appendChild(modalAdd_divider);

	//**Bouton Valider **/
	const modalAdd_PictureValidateBtn_Div = document.createElement("div");
	modalAdd_PictureValidateBtn_Div.classList.add("modal-CenterDiv");

	const modalAdd_PictureValidateBtn = document.createElement("input");
	modalAdd_PictureValidateBtn.setAttribute("type", "submit");
	modalAdd_PictureValidateBtn.setAttribute("value", "Valider");
	modalAdd_PictureValidateBtn.classList.add("titre-margin-top", "valider-btn", "valider-btn_grey");

	modalAdd_PictureValidateBtn_Div.appendChild(modalAdd_PictureValidateBtn);
	modalAdd_PictureForm.appendChild(modalAdd_PictureValidateBtn_Div);

	//**Insertion dans le DOM **/
	const modalAdd_DOM = document.getElementById("modal1");
	
	modalAdd_insert.appendChild(modalAdd_content);
	modalAdd_DOM.appendChild(modalAdd_insert);

	//** Conditions pour changement de couleur du bouton Valider **//

	 /*Condition Titre d'Image*/
	modalAdd_PictureInputTitle.addEventListener("input", function () {
		if (modalAdd_PictureInputTitle.value.trim() !== "" && modalAdd_PictureBtn.files.length > 0) {
			modalAdd_PictureValidateBtn.classList.add("valider-btn_green");
			modalAdd_PictureValidateBtn.classList.remove("valider-btn_grey");
		} else {
			modalAdd_PictureValidateBtn.classList.remove("valider-btn_green");
			modalAdd_PictureValidateBtn.classList.add("valider-btn_grey");
		}
	});

	/*Condition Preview d'Image*/
	modalAdd_PictureBtn.addEventListener("change", function(e) {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			const modalAdd_PicturePreviewDiv = document.createElement("div");
			modalAdd_PicturePreviewDiv.classList.add("modalAdd_wrapperDiv");

			const modalAdd_PicturePreview = document.createElement("img");
			modalAdd_PicturePreview.setAttribute("id", "image-preview");
			modalAdd_PicturePreview.src = event.target.result;

			const PreviewDiv = document.getElementById("image-preview-div");
			PreviewDiv.innerHTML = "";
			PreviewDiv.classList.remove("d-none")
			const PictureInputDiv = document.getElementById("ajouter-photo");
			PictureInputDiv.classList.add("d-none")

			modalAdd_PicturePreviewDiv.appendChild(modalAdd_PicturePreview);
			PreviewDiv.appendChild(modalAdd_PicturePreviewDiv);
			
			if (modalAdd_PictureInputTitle.value.trim() !== "" && modalAdd_PictureBtn.files.length > 0) {
				modalAdd_PictureValidateBtn.classList.add("valider-btn_green");
				modalAdd_PictureValidateBtn.classList.remove("valider-btn_grey");
			} else {
				modalAdd_PictureValidateBtn.classList.remove("valider-btn_green");
				modalAdd_PictureValidateBtn.classList.add("valider-btn_grey");
		  	}
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	});
	//****************************************************************************************/

	modalAdd_PictureForm.addEventListener("submit", function(e) {
		e.preventDefault();
		if (modalAdd_PictureValidateBtn.classList.contains("valider-btn_green")) {
			//*Ajout d'image*//
			uploadWork();

			//*retour 1er page Modale*//
			const modalPrev_Hide = document.querySelector(".modal-ajouter-wrapper");
			modalPrev_Hide.classList.add('d-none');
			const modalPrev_Show = document.querySelector(".modal-wrapper");
			modalPrev_Show.classList.remove('d-none');

			e.preventDefault();

			//*Reset form*//
			const form = document.querySelector("form");
			form.reset();

			//*clear titre + image*//
			const modalAdd_formTitleinput = document.getElementById("title");
			if (modalAdd_formTitleinput.value !="") {
				modalAdd_formTitleinput.value = "";
			}

			const modalAdd_formPreview = document.getElementById("image-preview-div");
			modalAdd_formPreview.classList.add("d-none");
			const modalAdd_formPictureDiv = document.getElementById("ajouter-photo");
			modalAdd_formPictureDiv.classList.remove("d-none");
		}
	});
}

createModalAddContent();

//**Fonction d'ajout d'image dans le DOM *//
function uploadWork() {
	const modalAdd_PictureForm = document.getElementById("ajouterPhotoForm")
	const formData = new FormData(modalAdd_PictureForm);

	fetch("http://localhost:5678/api/works/", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + window.localStorage.getItem("token"),
		},
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			/**Ajout d'image dans les galleries**/
			const gallery = document.querySelector('.gallery');
			const figureGallery = document.createElement('figure');
			const miniGallery = document.querySelector('.miniGallery');
			const title = document.createElement('figcaption');
			const img = document.createElement('img');
			img.src = data.imageUrl;
			title.innerText = data.title;

			figureGallery.appendChild(img);
			figureGallery.appendChild(title);
			gallery.appendChild(figureGallery);

			const figureGalleryClone = figureGallery.cloneNode(true);
			miniGallery.appendChild(figureGalleryClone);

			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
			alert("Echec lors de l'ajout d'image");
		});
}

//********************************************/
//*******************************************/

/*Ouverture de la modal */
function openModal() {
	const modalDiv_open = document.querySelectorAll(".edit-div");
	modalDiv_open.forEach(function (elem) {
		elem.addEventListener("click", function(e) {
			e.preventDefault()
			const modal_display = document.getElementById('modal1');
			modal_display.classList.remove("d-none");
		});
	});
}

/*Fermeture de la modal */
function closeModal() {
	const modalDiv_close = document.querySelectorAll(".close");
	const modalOverlay = document.getElementById("modal1");
	modalDiv_close.forEach(function (elem) {
		elem.addEventListener("click", function() {
			const modal_hidden = document.getElementById('modal1');
			modal_hidden.classList.add("d-none");
		});
		window.addEventListener("click", function(event) {
			if (event.target == modalOverlay) {
				const modal_hidden = document.getElementById('modal1');
				modal_hidden.classList.add("d-none");
			}
		});
	});
}

/*Page suivante de la modal */
function nextPageModal() {
	const modal_addPhotoBtn = document.querySelector('.modalAddbtn');
	modal_addPhotoBtn.addEventListener("click", function() {
		const modalNext_Hide = document.querySelector('.modal-wrapper');
		modalNext_Hide.classList.add("d-none");
		const modalNext_Show = document.querySelector('.modal-ajouter-wrapper');
		modalNext_Show.classList.remove("d-none");
	});

}

/*Page précédente de la modal */
function previousPageModal() {
	const modalAdd_returnArrowBtn = document.querySelector('.return-arrow');
	modalAdd_returnArrowBtn.addEventListener("click", function() {
		const modalPrev_Hide = document.querySelector(".modal-ajouter-wrapper");
		modalPrev_Hide.classList.add('d-none');
		const modalPrev_Show = document.querySelector(".modal-wrapper");
		modalPrev_Show.classList.remove('d-none');
	});
}

openModal();
closeModal();
nextPageModal();
previousPageModal();