// function renderPosts (posts) {
//     const postsList = document.querySelector("#posts_list");

//     for (let i = 0; i < posts.length; i++) {
//         let post = posts[i];

//         let postUserId = post.user;

//         for (let j = 0; j < users.length; j++) {
//             let user = users[j];

//             if (user.id == postUserId) {

//                 let postHTML = `
//                 <li class="post" id="${post.id_post}">
//                     <div class="profile">
//                         <img src="${user.img}" alt="Imagem do Usuário" class="profile__image">
//                         <div class="profile__info">
//                             <span class="profile__info--name">${user.user}</span>
//                             <span class="profile__info--job">${user.stack}</span>
//                         </div>
//                     </div>
//                     <h2>${post.title}</h2>
//                     <p>${post.text}</p>
//                     <div class="post__options">
//                         <button type="button" data-control-modal="${post.id_post}">Abrir post</button>
//                         <div>
//                             <i class="fa-solid fa-heart fa--activated"></i>
//                             <span>25</span>
//                         </div>
//                     </div>
//                 </li>
                
//                 `

//                 postsList.insertAdjacentHTML("beforeend", postHTML)

//                 prepareOpenButtonModal();

//             }
//         }
//     }
// }

function renderPosts (posts) {
    const postsList = document.querySelector("#posts_list");

    postsList.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        let postUserId = post.user;

        let postHTML = createPost(post.id_post, postUserId);

        postsList.insertAdjacentHTML("beforeend", postHTML)
    }

    prepareOpenButtonModal();
}

function createPost (postId, postUserId) {

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        if (postId == post.id_post) {

            for (let j = 0; j < users.length; j++) {
                let user = users[j];

                if (user.id == postUserId) {

                    let postHTML = `
                    <li class="post" id="${post.id_post}">
                        <div class="profile">
                            <img src="${user.img}" alt="Imagem do Usuário" class="profile__image">
                            <div class="profile__info">
                                <span class="profile__info--name">${user.user}</span>
                                <span class="profile__info--job">${user.stack}</span>
                            </div>
                        </div>
                        <h2>${post.title}</h2>
                        <p>${post.text}</p>
                        <div class="post__options">
                            <button type="button" data-control-modal="${post.id_post}">Abrir post</button>
                            <div>
                                <i class="fa-solid fa-heart fa--activated"></i>
                                <span>25</span>
                            </div>
                        </div>
                    </li>
                    `
                    return postHTML;
                }
            }
        }
    }
}

function prepareOpenButtonModal () {
    const modalOpenButtons = document.querySelectorAll("[data-control-modal]");

    for (let i = 0; i < modalOpenButtons.length; i++) {
        let modalButton = modalOpenButtons[i];
        modalButton.addEventListener("click", () => {
            createModal(modalButton.getAttribute("data-control-modal"));
        })
    }
}

function renderSuggestions (sugestUsers) {
    const sugestList = document.querySelector(".profile__list")

    for (let i = 0; i < sugestUsers.length; i++) {
        let userId = sugestUsers[i];
        
        for (let j = 0; j < users.length; j++) {
            let user = users[j];

            if (userId == user.id) {
                sugestList.insertAdjacentHTML("beforeend", `
                <li class="profile">
                    <div>
                        <img src="${user.img}" alt="Imagem do Usuário" class="profile__image">
                        <div class="profile__info">
                            <span class="profile__info--name">${user.user}</span>
                            <span class="profile__info--job">${user.stack}</span>
                        </div>
                    </div>
                    <span class="profile__follow">Seguir</span>
                </li>                
                `)
                
                if (user.following) {
                    let followButton = document.querySelector(".profile__follow")
                    followButton.innerText = "Seguindo"
                    followButton.classList.add("following")
                }
            }
        }
    }
}

function prepareCloseButtonModal () {
    const modalCloseButtons = document.querySelectorAll("[data-control-modal]");
    const modal = document.querySelector("#modal");

    for (let i = 0; i < modalCloseButtons.length; i++) {
        let modalButton = modalCloseButtons[i];
        modalButton.addEventListener("click", ()=>{
            modal.remove();
        })
    }
}

function createModal (postId) {
    const main = document.querySelector("main");

    for (let i = 0; i < posts.length; i++) {

        let post = posts[i];

        if (post.id_post == postId) {

            let postUserId = post.user;

            for (let j = 0; j < users.length; j++) {
                let user = users[j];
                if (user.id == postUserId) {

                    main.insertAdjacentHTML("afterend", `
                    <dialog id="modal">
                    <div class="dialog__container">
                        <div class="profile">
                            <img src="${user.img}" alt="Imagem do Usuário" class="profile__image">
                            <div class="profile__info">
                                <span class="profile__info--name">${user.user}</span>
                                <span class="profile__info--job">${user.stack}</span>
                            </div>
                        </div>
                        <span class="btn__close" data-control-modal="close-modal">X</span>
                        <div class="post">
                            <h2>${post.title}</h2>
                            <p>${post.text}</p>
                        </div>
                    </div>
                  </dialog>
                    `)

                    prepareCloseButtonModal ();
                    showModal ();
                }
            }

        }
    }
}

function showModal () {
    const modal = document.querySelector("#modal");
    modal.showModal();
}

function prepareButtonNewPost () {
    const button = document.querySelector("#button_post");
    const postTitle = document.querySelector("#post__title--create");
    const postText = document.querySelector("#post__text--create");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        let newPostId = posts.length + 1;
        let postObj = {
            id_post: newPostId,
            user: 1,
            title: `${postTitle.value}`,
            text: `${postText.value}`
        }
        posts.unshift(postObj);
        renderPosts (posts);
    })
}

function detectPostWritting () {
    const button = document.querySelector("#button_post");
    const postTitle = document.querySelector("#post__title--create");
    const postText = document.querySelector("#post__text--create");

    postTitle.addEventListener("keyup", () => {
        if (postTitle.value != "") {
            button.classList.add("button__post--active");
        }
    })

    postText.addEventListener("keyup", () => {
        if (postText.value != "") {
            button.classList.add("button__post--active");
        }
    })
}

function start () {
    renderPosts (posts);
    renderSuggestions (sugestUsers);
    prepareButtonNewPost ();
    detectPostWritting ();
}

start ();