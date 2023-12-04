// start for control coading
var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("input");
//1. +AddEmployee Button Fuctioning
var addBtn = document.getElementById("add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");

addBtn.onclick = function(){
    modal.classList.add("active");
}

closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
    profile_pic.src = "images/avatar.png";
    var i;
    for(i=0; i<allInput.length;i++){
        allInput[i].value = "";
    }
})

//start all global variable

var userData = [];

var uploadPic = document.querySelector("#upload-field");
var profile_pic = document.querySelector("#profile-pic");

var idEl = document.getElementById("id");
var nameEl = document.getElementById("name");
var l_nameEl = document.getElementById("l-name");
var emailEl = document.getElementById("email");
var officeEl = document.getElementById("office-code");
var jobTitleEl = document.getElementById("j-title");

var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");


var imgUrl;


//end all global variable


//start register coding
    registerBtn.onclick = function(e){
    e.preventDefault();//for preventing page to reload
    registrationData();
    getDataFromLocal(); //instant data added in table
    registerForm.reset('');
    closeBtn.click();//close register page after details entered
}


//for reloding the page when the data is beingn deleted (converting to obj and pushed in array)

//if data(key) is empty
if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData(){
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        officeCode : officeEl.value,
        jobTitle : jobTitleEl.value,
        profilePic : imgUrl == undefined ? "images/avatar.png" : imgUrl
    });

    var userString = JSON.stringify(userData); //string format data conversion
    localStorage.setItem("userData",userString);
    swal("Good job!", "Registration Successful!", "success");
}

//start returning data on page from local Storage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
        tableData.innerHTML += `
        <tr index='${index}'>
                <td>${index + 1}</td>
                <td><img src="${data.profilePic}" width="40"></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>
                <td>
                <button class="edit-btn" ><i class="fa fa-pencil"></i></button>
                <button class="del-btn" style="background-color: rgb(233, 64, 34);">
                <i class="fa fa-trash"></i>
                </button>
                </td>
            </tr>

            `;
    }); 
    
//starting code for delation
var i;
var allDelBtn = document.querySelectorAll(".del-btn")
// console.log(allDelBtn);
for(i=0; i<allDelBtn.length;i++){
    allDelBtn[i].onclick = function(){
        var tr = this.parentElement.parentElement;
        var id = tr.getAttribute("index");

//sweetAlert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
            if (willDelete) {
           //deleting user data
            userData.splice(id,1);//del data
        localStorage.setItem("userData",JSON.stringify(userData));//upadte at backend
        tr.remove(); //toremove from forntend
        
//toUpdate the index in data
        var tableRows = document.querySelectorAll("#table-data tr");
                tableRows.forEach((row, index) => {
                    row.setAttribute("index", index); // Update index attribute
                    row.getElementsByTagName("td")[0].textContent = index + 1; // Update serial number
                });


            swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
            });
            } else{
            swal("Your imaginary file is safe!");
            }
            });

            //sweet alert ended

        

    }
}

//start update coading

var allEdit = document.querySelectorAll(".edit-btn");
for(i=0; i<allEdit.length; i++){
    allEdit[i].onclick=function(){
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("td");
        var index = tr.getAttribute("index");
        var imgTag = td[1].getElementsByTagName("img");
        var profilePic = imgTag[0].src;
        
        var id= td[2].innerHTML;
        var name= td[3].innerHTML;
        var l_name= td[4].innerHTML;
        var email= td[5].innerHTML;
        var officeCode= td[6].innerHTML;
        var jobTitle= td[7].innerHTML;

        addBtn.click();
        registerBtn.disabled = true;
        updateBtn.disabled = false;

        idEl.value = id;
        nameEl.value = name;
        l_nameEl.value = l_name;
        emailEl.value = email;
        officeEl.value = officeCode;
        jobTitleEl.value = jobTitle; 
        profile_pic.src = profilePic;

        updateBtn.onclick = function(e){
            userData[index] = {
                id : idEl.value,
                name : nameEl.value,
                l_name : l_nameEl.value,
                email : emailEl.value,
                officeCode : officeEl.value,
                jobTitle : jobTitleEl.value,
                profilePic : uploadPic.value == "" ? profilePic : imgUrl
            }
            localStorage.setItem("userData",JSON.stringify(userData));
        }
    }
}



}

getDataFromLocal(); //data added in table with reloding

//image processing



uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    }
    else{
        alert("File size is too long !");
    }
}

//start search coading
var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    searchFun();
}

function searchFun(){
    var tr = tableData.querySelectorAll("tr");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i=0;i<tr.length; i++){
        var id = tr[i].getElementsByTagName("td")[2].innerHTML;
        var name = tr[i].getElementsByTagName("td")[3].innerHTML;
        var l_name = tr[i].getElementsByTagName("td")[4].innerHTML;
        var email = tr[i].getElementsByTagName("td")[5].innerHTML;
        var officeCode = tr[i].getElementsByTagName("td")[6].innerHTML;
        var jobTitle = tr[i].getElementsByTagName("td")[7].innerHTML;
        
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else if(name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else if(l_name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else if(email.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else if(officeCode.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else if(jobTitle.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";

        }
        else{
            tr[i].style.display = "none";
        }
    }
}

//start clear all data

var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',() => {
   if(allDelBox.checked == true){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem("userData");
            window.location = location.href;
        swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
        });
        } else{
        swal("Your imaginary file is safe!");
        }
        });
   }
   else{
         swal("Check the box first !", "To delete the data", "warning");
   }

})