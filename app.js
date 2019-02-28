
//the very beginning of jQuery initiation 
$(document).ready(() =>{

    let output = '';
    let parentDiv;

    $.getJSON("http://localhost:3000/posts")
    .done( (data) =>{
        console.log(data);
        $(data).each((index)=>{
            // console.log(data[index]);
            // console.log(createPost(data[index]));
            output += createPost(data[index]);
            // console.log(output);
        });

        parentDiv = document.getElementById("posts-wrapper").innerHTML  = output;

        })
    .fail((data)=>{
        
    });


    //create a method to display post

    function createPost(post){
        const newPost =         `
        <div class="blogPost">
            <img src="${post.images}" alt="logo">
            
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="#">see more ></a>
            <div class="post-details">
                    <i class="far fa-clock"></i> <span class="daysOld">0 day ago</span><i class="fas fa-pen">
                    </i>
            </div>
        </div>
        `;

        return newPost;
    }










    //sign-up implementation begins here...
    $("#signup-form").on("submit", (e) =>{

        //prevents default behaviour
        e.preventDefault();

        //input validations
        if($("#reg-email").val() === ''){
            // console.log("email is required");
            Swal.fire({
                title: 'Caution!',
                text: 'Email is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else if($("#reg-password").val() === '' || $("#cfm-password").val() === ''){
            Swal.fire({
                title: 'Caution!',
                text: 'Password is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else if($("#reg-password").val() !== $("#cfm-password").val()){
            // console.log($("#reg-password").val(), $("#cfm-password").val());
            // console.log("passwords do not match");
            Swal.fire({
                title: 'Caution!',
                text: "Password Fields didn't match!",
                type: 'error',
                confirmButtonText: 'Try Again!',
                timer:3000
              });
        }else{
            //if inputs are valid, then make object of newuser
            //from data received 
            const newUser = {
                email: $("#reg-email").val(),
                password: $("#reg-password").val(),
                role:"guest"
            }
            
        //making AJAx POST call
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            data: newUser,
            dataType: "json",
            encode: true
        })
        .done(() =>{
            // console.log("Data posted successfully");
            Swal.fire({
                title: 'Successful!',
                text: 'You can procede to login',
                type: 'success',
                confirmButtonText: 'Cool',
                timer:5000
              });

            //take user to login page
            window.location.href="login.html";
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
    //sign-up implementation ends here...

    //login implementation begins here...
    $("#login-form").on("submit", (e) =>{

        // prevent deafult behaviour
        e.preventDefault();

        //input validations
        if($("#email").val() === "" || $("#password").val() === ""){
            // console.log("button working");
            Swal.fire({
                title: 'Caution!',
                text: 'All felds is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else{
            const user = {
                email:$("#email").val(),
                password: $("#password").val()
            }
            $.getJSON("http://localhost:3000/users", user)
            .done( (data) =>{
                // console.log(data);
                if(data.length === 0){
                    Swal.fire({
                        title: 'Error!',
                        text: 'wrong password or email',
                        type: 'error',
                        confirmButtonText: 'Try Again',
                        timer:3000
                      });
                }else{
                    Swal.fire({
                        title: 'Login Successful!',
                        type: 'success',
                        text: user.email,
                        confirmButtonText: 'Ok',
                        timer:10000
                      });  

                      //implement login such that
                      //if(admin){
                            //allow create, edit and delete post
                      //}else{
                            //allow only comment on post
                      //}
                      //take user to blog page
                      window.location.href="index.html";

                      
                }
            })
            .fail(()=>{
                Swal.fire({
                    title: 'Error making request!',
                    type: 'error',
                    confirmButtonText: 'Try Again',
                    timer:3000
                  });
            });
        }
    });
    //login implementation ends here...

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