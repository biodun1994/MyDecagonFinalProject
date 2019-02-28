$(document).ready(()=>{

    //get posts from local storage

    const post = JSON.parse(localStorage.getItem('wantToReadPost'));
    // console.log(post);

    document.querySelector('#login-container').innerHTML = formatPost(post);


    function formatPost(post){

        const generated = `
        <div class="wrapper" id="board" >

            <h2 id="title">${post.title}</h2>
            <h4 id="description">${post.description}</h4>
            <img src="${post.images}" alt="blog post image" id="images">
            <p id="details">${post.details}</p>

        </div>
        ` 
        return generated;
    }

    // console.log(formatPost(post));
    // url: `http://localhost:3000/posts/?title=${e.target.parentElement.children[1].textContent}`

        // //delete blogpost implementation using event delegation
        // document.querySelector('#posts-wrapper').addEventListener('click', (e)=>{
        //     e.preventDefault();
        //     if(e.target.classList.contains('fa-trash-alt')){
        //         // console.log("i clicked trash");
        //         $.ajax({
        //             type: "DELETE",
        //             url: `http://localhost:3000/posts/?title=${e.target.parentElement.children[1].textContent}`,
        //             success: () => {
        //               $(this).remove();
        //               const Toast = Swal.mixin({
        //                 toast: true,
        //                 position: "top-end",
        //                 showConfirmButton: false,
        //                 timer: 3000
        //               });
        //     }
        // });
});