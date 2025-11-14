// we use camelCase for dom manipulations
// we use _Case for data fetch 


document.addEventListener("DOMContentLoaded", ()=> {
    fetch("assets/data/data.json")
    .then(response=>response.json())
    .then(data=>{
        loadHome(data.social_links, data.name, data.title, data.aboutMe_brief);
        loadAbout(data.aboutMe_detail, data.achievements, data.resume);
        loadSkills(data.skills.technical_skills, data.skills.soft_skills);
    })
    .catch(error => console.error("Error loading profile data:", error));
})


// Function TO LOAD DATA 
function loadHome(socialLinks, name, title, description){
    const {linked_in, gitHub, twitter} = socialLinks;

    const homeSocialLinks = document.querySelectorAll(".home__social-icon");
    const homeTitle = document.querySelector(".home__title");
    const homeSubTitle = document.querySelector(".home__subtitle");
    const homeDescription = document.querySelector(".home__description");

    homeSocialLinks.forEach(icon => {
        if(icon.querySelector(".uil-linkedin-alt")){
            icon.href = linked_in;
        }else if(icon.querySelector(".uil-github-alt")){
            icon.href = gitHub;
        }else if(icon.querySelector(".uil-twitter-alt")){
            icon.href = twitter;
        }
    });

    homeTitle.textContent = `Hi, I'am ${name}`;
    homeSubTitle.textContent = title;
    homeDescription.textContent = description;
}

function loadAbout(description, achievements, resumeLink){
    const aboutDescription = document.querySelector(".about__description");
    const aboutInfo = document.querySelector(".about__info");
    const aboutButtonResume = document.querySelector(".about__buttons a");

    aboutDescription.textContent = description;
    
    aboutInfo.innerHTML = "";
    achievements.forEach(item => {
        const card = `
            <div>
                <span class="about__info-title">${item.count}+</span>
                <span class="about__info-name">${item.title}</span>
            </div>
        `;
        aboutInfo.innerHTML += card;
    });

    aboutButtonResume.href = resumeLink;
}

function loadSkills(technicalSkills, softSkills){
    const techGallery = document.querySelector(".tech__gallery");
    const softGallery = document.querySelector(".soft__gallery");

    techGallery.innerHTML = "";
    softGallery.innerHTML = "";

    technicalSkills.forEach(item => {
        const skill = `
            <div class="skills__logos">
                <div class="skills__imgbox">
                    <img src="${item[1]}" alt="">
                </div>
                <span class="skills__imgtext">${item[0]}</span>
            </div>
        `;

        techGallery.innerHTML += skill;
    });

    softSkills.forEach(item => {
        const skill = `
            <div class="skills__logos">
                <div class="skills__imgbox">
                    <img src="${item[1]}" alt="">
                </div>
                <span class="skills__imgtext">${item[0]}</span>
            </div>
        `;

        softGallery.innerHTML += skill;
    });
}