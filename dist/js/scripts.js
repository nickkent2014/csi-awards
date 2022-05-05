/*!
* Start Bootstrap - Small Business v5.0.4 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your projecta


// let vote_button = document.querySelectorAll(".vote-btn");
// let voting_panel = document.getElementById("voting-panel");
// let voting_panel_close_btn = document.getElementById("voting-panel-close-btn");
// let voting_panel_img = document.getElementById("voting-panel-img");
// let nominee_name = "";
// let award_name = "";
// let voting_panel_heading = document.getElementById("voting-panel-heading");
// let nominee_name_form = document.getElementById("votee_name_form");

// vote_button.forEach(function(vote_btn, index){
//     vote_btn.addEventListener("click", () => {
//         voting_panel.classList.toggle("active");

//         if (index < 3) {                                                                                                                        // Make more efficient
//             voting_panel_img.style.background = "url(https://i.ibb.co/xLjfT7b/Helpinghands.png) center center/cover no-repeat"
//             award_name = "Helping Hands";
//         }
//         if (index >= 3 && index < 6) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/gZZjktC/mademyday.png) center center/cover no-repeat"
//             award_name = "Makes My Day";
//         }
//         if (index >= 6 && index < 9) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/M7YRNRv/Rolemodel.png) center center/cover no-repeat"
//             award_name = "Role Model";
//         }
//         if (index >= 9 && index < 12) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/Twyw7Yn/newaddition.png) center center/cover no-repeat"
//             award_name = "Amazing New Addition";
//         }
//         if (index >= 12 && index < 15) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/1z1w4py/google.png) center center/cover no-repeat"
//             award_name = "Google";
//         }
//         if (index >= 15 && index < 18) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/mFN744L/ductape.png) center center/cover no-repeat"
//             award_name = "Duct Tape";
//         }
//         if (index >= 18 && index < 21) {
//             voting_panel_img.style.background = "url(https://i.ibb.co/KN5rbfq/hero.png) center center/cover no-repeat"
//             award_name = "Customer Hero";
//         }



//         switch (index) {
//             case 0:
//                 nominee_name = "Nick";
//                 break;
//             case 1:
//                 nominee_name = "Damon";
//                 break;
//             case 2:
//                 nominee_name = "Emma";
//                 break;
//             case 3:
//                 nominee_name = "Dan";
//                 break;
//             case 4:
//                 nominee_name = "Kay";
//                 break;
//             case 5:
//                 nominee_name = "Jenni";
//                 break;
//             case 6:
//                 nominee_name = "Danny";
//                 break;
//             case 7:
//                 nominee_name = "Chris";
//                 break;
//             case 8:
//                 nominee_name = "Jane";
//                 break;
//             case 9:
//                 nominee_name = "Dom";
//                 break;
//             case 10:
//                 nominee_name = "Joanne";
//                 break;
//             case 11:
//                 nominee_name = "Mavis";
//                 break;
//             case 12:
//                 nominee_name = "Dennis";
//                 break;
//             case 13:
//                 nominee_name = "Junior";
//                 break;
//             case 14:
//                 nominee_name = "Irina";
//                 break;
//             case 15:
//                 nominee_name = "Jack";
//                 break;
//             case 16:
//                 nominee_name = "John";
//                 break;
//             case 17:
//                 nominee_name = "Alex";
//                 break;
//             case 18:
//                 nominee_name = "Kaiden";
//                 break;
//             case 19:
//                 nominee_name = "Jade";
//                 break;
//             case 20:
//                 nominee_name = "Steven";
//                 break;
//         }

//         voting_panel_heading.textContent = `Would you like to vote for ${nominee_name} for the ${award_name} award?`;
//         document.getElementById("nominee_name_form").value = nominee_name;


//     })
// });

// voting_panel_close_btn.addEventListener("click", () => {
//     voting_panel.classList.toggle("active");
// });


// Navbar

navbar_button = document.querySelector(".navbar-toggler");
navbar = document.querySelectorAll(".nav-item");
navbar_button.addEventListener("click", () => {
    for (var i = 0; i < navbar.length; i++) {
        navbar[i].classList.toggle("active");
    }
});
