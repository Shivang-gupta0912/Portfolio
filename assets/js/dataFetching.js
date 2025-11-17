// we use camelCase for dom manipulations
// we use _Case for data fetch 


document.addEventListener("DOMContentLoaded", ()=> {
    fetch("assets/data/data.json")
    .then(response=>response.json())
    .then(data=>{
        loadHome(data.social_links, data.name, data.title, data.aboutMe_brief);
        loadAbout(data.aboutMe_detail, data.achievements, data.resume);
        loadSkills(data.skills.technical_skills, data.skills.soft_skills);
        loadQualification(data.education, data.work);
        loadCertifications(data.certificates);
        loadContact(data.contact);
        loadfooter(data.social_links);
    })
    .catch(error => console.error("Error loading profile data:", error));
})


// Functions TO LOAD DATA 
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

function loadQualification(educationData, workData){
    const qualificationEduInfo = document.querySelectorAll("#education .qualification__datainfo");

    qualificationEduInfo.forEach((container, index) => {
        const data = educationData[index];

        if (!data) return;   // Skip if extra HTML blocks exist

        const title = container.querySelector(".qualification__title");
        const subtitle = container.querySelector(".qualification__subtitle");
        const calendar = container.querySelector(".qualification__calendar");

        title.textContent = data.title;
        subtitle.textContent = data.institute;
        calendar.innerHTML = `<i class="uil uil-calendar-alt"></i> ${data.year}`;
    });

    const qualificationWorkInfo = document.querySelectorAll("#work .qualification__datainfo");

    qualificationWorkInfo.forEach((container, index) =>{
        const data = workData[index];

        if(!data) return ;

        const title = container.querySelector(".qualification__title");
        title.textContent = data.title;
    });
}

function loadCertifications(certificates){
    const certificationsContainer = document.querySelector(".certifications__container");
    certificationsContainer.innerHTML = "";

    certificates.forEach(item => {
        const certificationsContent = `
            <div class="certifications__content">
                <div class="certifications__img">
                    <img src="${item.image_link}" alt="">
                </div>

                <div class="certifications__data">
                    <span>Issued on ${item.issued_on}</span>
                    <a href="${item.link}" target="_blank"
                        class="certifications__button">
                        See Credentials
                        <i class="uil uil-arrow-right button__icon"></i>
                    </a>
                </div>
            </div>        
        `;

        certificationsContainer.innerHTML += certificationsContent;
    });
}

function loadContact(contact){
    const contactContainer = document.querySelector(".contact__container div");
    contactContainer.innerHTML = "";

    contact.forEach(item => {
        const info = `
            <div class="contact__information">
                <i class="uil uil-phone contact__icon"></i>

                <div>
                    <h3 class="contact__title">${item.contact_title}</h3>
                    <span class="contact__subtitle">${item.contact_subtitle}</span>
                </div>
            </div>
        `;

        contactContainer.innerHTML += info;
    });
}

function loadfooter(socialLinks){
    const {linked_in, gitHub, twitter} = socialLinks;

    const footerSocial = document.querySelectorAll(".footer__social");
    footerSocial.forEach(icon => {
        if(icon.querySelector(".uil-linkedin-alt")){
            icon.href = linked_in;
        }else if(icon.querySelector(".uil-github-alt")){
            icon.href = gitHub;
        }else if(icon.querySelector(".uil-twitter-alt")){
            icon.href = twitter;
        }
    });
}