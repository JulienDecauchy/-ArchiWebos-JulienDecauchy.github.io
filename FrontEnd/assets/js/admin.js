if (localStorage.getItem('token')) {

  //Bouton Logout//
  const logoutBtn = document.querySelector(".login");
  logoutBtn.innerText = "logout";
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('token')
  })

  //Barre Noir Admin//
  const adminBar = document.createElement('div');
  adminBar.innerHTML = '<i></i> <p>Mode Edition</p> <button> publier les changements </button>';
  adminBar.className = 'admin-bar';
  adminBar.firstChild.classList.add('fa-sharp', 'fa-solid', 'fa-pen-to-square');
  const navheader = document.querySelector('header');
  navheader.insertAdjacentElement('afterbegin', adminBar);

  const HeaderBar = document.querySelector('header')
  HeaderBar.classList.add('adminHeader')

  //Supprimer Filtre + Mes Projets//
  const remove_filter = document.getElementById('portfolio').querySelector('.filter');
  remove_filter.classList.add("d-none");

  const remove_projectTitle = document.getElementById('portfolio').querySelector('h2');
  remove_projectTitle.remove();

  //Bouton Modifier//

  const modalLink = createEditLink('portfolio_edit-div', 'modifier');
  const portfolio_section = document.getElementById('portfolio');
  portfolio_section.insertAdjacentElement('afterbegin', modalLink);

  const under_mainPic = document.getElementById('introduction').querySelector('figure');
  const modalLink2 = createEditLink('main-pic_edit-div', 'modifier');
  under_mainPic.insertAdjacentElement('beforeend', modalLink2);

  const h2Title = document.createElement('h2');
  h2Title.innerText = 'Mes projets';
  modalLink.prepend(h2Title);

  function createEditLink (editClass, editText) {
    //Modifier Div
    const edit_div = document.createElement('div');
    edit_div.classList.add('edit-div', 'js-modal');

    //Modifier Icone
    const edit_icon = document.createElement('i');
    edit_icon.classList.add('fa-sharp', 'fa-solid', 'fa-pen-to-square');

    // Modifier - Class
    const edit_divClass = document.createElement('div');
    edit_divClass.className = editClass;
    edit_divClass.appendChild(edit_div);
    
    //Modifier - Text
    const edit_p = document.createElement('p');
    edit_p.innerHTML = editText;
  
    edit_div.appendChild(edit_icon);
    edit_div.appendChild(edit_p);

    return edit_divClass;
  }
}
