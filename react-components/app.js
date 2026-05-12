function ProjectCard(props) {
    return (
        <div className="project-card">
            <h3>{props.titre}</h3>
            <p>{props.description}</p>

            <div className="techs">
                {props.technologies.map(function(tech, index) {
                    return <span key={index} className="tech-tag">{tech}</span>;
                })}
            </div>

            {props.lien && (
                <a href={props.lien} target="_blank">
                    Voir le projet →
                </a>
            )}
        </div>
    );
}


function ProjectsList() {

    var projets = [
        {
            titre: "Site Web — Découverte du Maroc",
            description: "Site web réalisé en groupe dans le cadre du module \"Programmation Web 1\" durant le semestre 3. Le site propose un guide touristique sur le Maroc avec une interface simple et responsive.",
            technologies: ["HTML", "CSS", "JavaScript"],
            lien: "https://onaim3341-cpu.github.io/Decouvert_Maroc/"
        },
        {
            titre: "Jeu en C++ — Last Chance",
            description: "Jeu développé en binôme dans le cadre du module \"Programmation objet avec C++\" durant le semestre 4. Le projet met en pratique les concepts de la programmation orientée objet et la logique de jeu.",
            technologies: ["C++", "POO"],
            lien: "https://github.com/rania1289/Jeu-Last-Chance.git"
        }
    ];

    return (
        <div className="projects-grid">
            {projets.map(function(projet, index) {
                return (
                    <ProjectCard
                        key={index}
                        titre={projet.titre}
                        description={projet.description}
                        technologies={projet.technologies}
                        lien={projet.lien}
                    />
                );
            })}
        </div>
    );
}


function ContactForm() {

    function validerFormulaire() {
        var nom = document.getElementById('nom').value.trim();
        var email = document.getElementById('email').value.trim();
        var message = document.getElementById('message').value.trim();
        var erreur = document.getElementById('erreur');
        var succes = document.getElementById('succes');

        if (nom === '' || email === '' || message === '') {
            erreur.textContent = 'Veuillez remplir tous les champs.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        var positionArobase = email.indexOf('@');
        var positionPoint = email.lastIndexOf('.');

        if (positionArobase === -1 || positionPoint === -1) {
            erreur.textContent = 'Email invalide, il doit contenir @ et un point.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        if (positionArobase === 0) {
            erreur.textContent = 'Email invalide, il faut quelque chose avant le @.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        if (positionPoint < positionArobase) {
            erreur.textContent = 'Email invalide, le point doit etre apres le @.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        if (positionPoint === positionArobase + 1) {
            erreur.textContent = 'Email invalide, il faut quelque chose entre @ et le point.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        
        var partieEntreArobaseEtPoint = email.substring(positionArobase + 1, positionPoint);
        if (partieEntreArobaseEtPoint.length < 2) {
            erreur.textContent = 'Email invalide, le format doit etre : exemple@gmail.com';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        var apresPoint = email.substring(positionPoint + 1);
        if (apresPoint.length < 2) {
            erreur.textContent = 'Email invalide, il faut au moins 2 lettres apres le point (ex: .com .fr .ma).';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        if (email.indexOf(' ') !== -1) {
            erreur.textContent = 'Email invalide, il ne doit pas contenir des espaces.';
            erreur.style.display = 'block';
            succes.style.display = 'none';
            return;
        }

        erreur.style.display = 'none';
        succes.style.display = 'block';
        succes.textContent = 'Message envoyé avec succès !';

        document.getElementById('nom').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }

    return (
        <div className="contact-form">
            <input type="text" id="nom" placeholder="Votre nom" />
            <input type="text" id="email" placeholder="Votre email (ex: nom@gmail.com)" />
            <textarea id="message" placeholder="Votre message"></textarea>
            <span id="erreur" className="error-msg" style={{display: 'none'}}></span>
            <span id="succes" className="success-msg" style={{display: 'none'}}></span>
            <button onClick={validerFormulaire}>Envoyer</button>
        </div>
    );
}


var rootProjects = ReactDOM.createRoot(document.getElementById('react-projects'));
rootProjects.render(<ProjectsList />);

var rootContact = ReactDOM.createRoot(document.getElementById('react-contact'));
rootContact.render(<ContactForm />);