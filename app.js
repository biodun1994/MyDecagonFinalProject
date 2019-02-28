
//the very beginning of jQuery initiation 
$(document).ready(() =>{

    let ALL_POSTS;
    let output = '';
    let parentDiv;
    //FETCHING POST FROM DB IMPLEMENTATION STARTS
    $.getJSON("http://localhost:3000/posts")
    .done( (data) =>{
        ALL_POSTS = data;
        // console.log(ALL_POSTS);
        // console.log("ALL POSTS" + ALL_POSTS);
        // console.log(data);
        let reversedData = data.reverse();
        // console.log(reversedData);

        $(reversedData).each((index)=>{
            // console.log(data[index]);
            // console.log(createPost(data[index]));
            output += createPost(data[index]);
            // console.log(output);
        });

        parentDiv = document.getElementById("posts-wrapper").innerHTML  = output;

        })
    .fail((data)=>{
        
    });

    //read more on all blog posts implemented
    //using event delegation
    document.querySelector('#posts-wrapper').addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.classList.contains('see-more')){
            $.getJSON(`http://localhost:3000/posts/?title=${e.target.parentElement.children[1].textContent}`)
            .done( (data) =>{
                let wantToReadPost = data[0];// this is an object of a single post
                // console.log(JSON.stringify(wantToReadPost))

                // navigate to the page for full read
                window.location.href="readPosts.html";


                //persist wantToReadPost to local storage
                localStorage.setItem('wantToReadPost', JSON.stringify(wantToReadPost));

            });
         }
    });

    //delete blogpost implementation using event delegation
    document.querySelector('#posts-wrapper').addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.classList.contains('fa-trash-alt')){
            console.log("i clicked trash");

            $.getJSON(`http://localhost:3000/posts/?title=${e.target.parentElement.parentElement.children[1].textContent}`)
            .done( (data) =>{
                console.log(data[0]);

                $.ajax({
                    type: "DELETE",
                    url: `http://localhost:3000/posts/${data[0].id}`,
                    success : ()=>{
                        console.log("deleted");
                    }
                       
                });

            });
           
        }
    });


    //create a method to display post

    function createPost(post){
        const newPost =         `
        <div class="blogPost">
            <img src="${post.images}" alt="logo">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="#"  class="see-more" id="see-more-link">see more ></a>
            <div class="post-details">
                    <i class="far fa-clock"></i> <span class="daysOld">0 day ago</span><i class="fas fa-pen">
                    </i><i class="fas fa-trash-alt"></i>    
            </div>
        </div>
        `;

        return newPost;
    }
    //FETCHING POST FROM DB IMPLEMENTATION ENDS


    //MODAL POP UP implementation ends here...

    //get variables
    const MODAL = document.getElementById('modal');
    const CLOSE_MODAL_BUTTON = document.getElementsByClassName('close-modal-button')[0];
    const COMPOSE_BUTTON = document.getElementById('compose');

    // console.log(MODAL, CLOSE_MODAL_BUTTON, COMPOSE_BUTTON);

    COMPOSE_BUTTON.addEventListener("click", ()=>{
        MODAL.style.display = 'block';
    });

    CLOSE_MODAL_BUTTON.addEventListener("click", ()=>{
        MODAL.style.display = 'none';
    });

    //to close modal by clicking outside the modal content
    window.addEventListener("click", (e)=>{
        if(e.target === MODAL){
        MODAL.style.display = 'none';
        };
    });


    
    //adding a post to the database starts here
    $("#submit-post").on("click", (e)=>{

        //prevent default
        e.preventDefault();
        
        if($("#title").val() === '' || 
            $("#description").val() === '' ||
            $("#image-link").val() === '' ||
            $("#details").val() === ''
        ){
        console.log("all fieldsrequired");
            Swal.fire({
                title: 'Caution!',
                text: 'All felds is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });

        }else{
            //all fields are filled

            const post = {
                    title : $("#title").val(),
                    description : $("#description").val(),
                    images: $("#image-link").val(),
                    details: $("#details").val()
            }

            // console.log(post);

        //making AJAx POST call
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/posts",
            data: post,
            dataType: "json",
            encode: true
        })
        .done(() =>{
            // console.log("Data posted successfully");
            Swal.fire({
                title: 'Successful!',
                text: 'Post Published',
                type: 'success',
                confirmButtonText: 'Cool',
                timer:5000
              });

            //take user to login page
            window.location.href="index.html";
        })
        .fail(() =>{
            // console.log("Error postion data");
            Swal.fire({
                title: 'Error!',
                text: 'Sorry, an error occurred',
                type: 'error',
                confirmButtonText: 'Try again',
                timer:3000
              })
        });

        $("#signup-form").trigger("reset");
        }
    });
    //adding a post to the database starts here



});