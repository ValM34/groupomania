import PublicationInput from '../../components/PublicationInput/PublicationInput';
import NewsCss from './News.css';

import { useRef, useEffect } from 'react';


function News() {

    const ref = useRef();

    console.log(ref)

    useEffect(() => {
        console.log(ref)


        // Fin de test 

        let tableau = [];
        function fetchComments() {
            try {
                fetch("http://localhost:3001/news/comments")
                    .then(response => response.json())

                    .then((allComments) => {

                        console.log(allComments)

                        let y = false;
                        for (let i = 0; i < allComments.length; i++) {
                            if (tableau.length === 0) {
                                tableau.push(allComments[i]);
                                i++;
                            }
                            for (let o = 0; o < tableau.length; o++) {
                                if (allComments[i].publications_idpublications === tableau[o].publications_idpublications) {
                                    y = true;
                                    break;
                                } else {
                                    y = false;
                                }
                            }
                            if (y !== true) {
                                tableau.push(allComments[i]);
                                y = false;
                            }
                        }
                        console.log(tableau)

                        fetch("http://localhost:3001/news/publications")
                            .then(response => response.json())
                            .then((allPublications) => {



                                fetch("http://localhost:3001/news/users")
                                    .then(response => response.json())
                                    .then((allUsers) => {

                                        let nouveauTableau = [];
                                        let t = false;

                                        for (let i = 0; i < allPublications.length; i++) {
                                            for (let o = 0; o < tableau.length; o++) {
                                                if (allPublications[i].id === tableau[o].publications_idpublications) {
                                                    nouveauTableau.push(tableau[o]);
                                                    t = true;
                                                    break;
                                                } else {
                                                    t = false;
                                                }

                                            }
                                            if (t !== true) {
                                                nouveauTableau.push(allPublications[i]);
                                                t = false;
                                            }

                                        }

                                        console.log(nouveauTableau)


                                        for (let i = 0; i < nouveauTableau.length; i++) {
                                            nouveauTableau[i].createdAtNumber = nouveauTableau[i].createdAt.replace(/\D/g, '');
                                        }

                                        const tttest = nouveauTableau.sort(function compare(a, b) {
                                            if (a.createdAtNumber < b.createdAtNumber)
                                                return 1;
                                            if (a.createdAtNumber > b.createdAtNumber)
                                                return -1;
                                            return 0;
                                        });

                                        console.log(tttest) // J'ai rajouté une partie "createdAtNumber"
                                        // Ensuite, je dois utiliser "estCerise" pour trouver les publications correspondant aux commentaires.

                                        let newArray2 = [];

                                        for (let i = 0; i < tttest.length; i++) {


                                            // Remplacer les commentaires par les publications liées dans le tableau
                                            if (tttest[i].publications_idpublications) {
                                                function findPublication(publicationTestttt) {
                                                    return publicationTestttt.id === tttest[i].publications_idpublications
                                                }
                                                console.log(allPublications.find(findPublication))
                                                newArray2.push(allPublications.find(findPublication))
                                                // Je push les publications liées au commentaire à la place du commentaire pour n'avoir que des publications dans un nouveau tableau
                                            } else {
                                                newArray2.push(tttest[i]) // Je push les publications aussi pour avoir toutes les publications
                                            }
                                        }
                                        console.log(newArray2)

                                        const allCommentsReversed = allComments.reverse();

                                        for (let i = 0; i < newArray2.length; i++) {
                                            for (let o = 0; o < allCommentsReversed.length; o++) {
                                                if (newArray2[i].id === allCommentsReversed[o].publications_idpublications && newArray2[i].comments === undefined) {
                                                    Object.defineProperty(newArray2[i], 'comments', {
                                                        value: [allCommentsReversed[o]],
                                                        configurable: true,
                                                        enumerable: true
                                                    });

                                                } else if (newArray2[i].id === allCommentsReversed[o].publications_idpublications) {
                                                    console.log(newArray2[i].comments)
                                                    newArray2[i].comments.push(allCommentsReversed[o])
                                                }
                                            }
                                        }
                                        console.log(newArray2)

                                        // Je passe sur toutes les publications pour leur ajouter le prénom et le nom du user
                                        for (let i = 0; i < newArray2.length; i++) {


                                            // Remplacer les commentaires par les publications liées dans le tableau
                                            function findUser(userTestttt) {
                                                return userTestttt.id === newArray2[i].users_idusers
                                            }
                                            let userFinded = allUsers.find(findUser);
                                            // for (let o = 0; o < newArray2.length; o++) { Je crois que cette boucle ne sert à rien
                                            Object.defineProperty(newArray2[i], 'user', {
                                                value: userFinded,
                                                configurable: true,
                                                enumerable: true
                                            });

                                            if (newArray2[i].comments) {
                                                for (let o = 0; o < newArray2[i].comments.length; o++) {
                                                    function findUserForComment(userTesttttForComment) {
                                                        return userTesttttForComment.id === newArray2[i].comments[o].users_idusers
                                                    }
                                                    let userForCommentFinded = allUsers.find(findUserForComment)
                                                    console.log(allUsers.find(findUserForComment))
                                                    Object.defineProperty(newArray2[i].comments[o], 'user', {
                                                        value: userForCommentFinded,
                                                        configurable: true,
                                                        enumerable: true
                                                    });
                                                }
                                            }
                                            // }
                                        }
                                        console.log(newArray2)







                                        // Fin de test de faire différement


                                        for (let i = 0; i < tttest.length; i++) {


                                            if (tttest[i].publications_idpublications) {
                                                function estCerises(fruit) {
                                                    return fruit.id === tttest[i].publications_idpublications;
                                                }
                                                let createContainerPublication = document.createElement("div");
                                                let selectDiv = document.querySelector("div.divTest");
                                                selectDiv.appendChild(createContainerPublication);
                                                let selectNewDiv = document.querySelector(`div.divTest > div:nth-child(${i + 2})`);
                                                selectNewDiv.classList.add("containerDiv");
                                                let selectContent = allPublications.find(estCerises);
                                                // selectNewDiv.textContent = `${selectContent.content}`;
                                                console.log(selectContent.content)
                                                console.log(allPublications.find(estCerises).users_idusers)
                                                for (let u = 0; u < allUsers.length; u++) {
                                                    if (allUsers[u].id === allPublications.find(estCerises).users_idusers) {
                                                        selectNewDiv.innerHTML = `<div class="containerDivPublication"><div>${allUsers[u].name}</div><div>${selectContent.content}</div></div>`;
                                                        break
                                                    }
                                                }



                                            } else {
                                                let createContainerPublication = document.createElement("div");
                                                let selectDiv = document.querySelector("div.divTest");
                                                selectDiv.appendChild(createContainerPublication);
                                                let selectNewDiv = document.querySelector(`div.divTest > div:nth-child(${i + 2})`);
                                                selectNewDiv.classList.add("containerDiv");
                                                // selectNewDiv.textContent = `${allUsers[u].name}${tttest[i].content}`;

                                                for (let u = 0; u < allUsers.length; u++) {
                                                    if (allUsers[u].id === tttest[i].users_idusers) {
                                                        selectNewDiv.innerHTML = `<div class="containerDivPublication"><div>${allUsers[u].name}</div><div>${tttest[i].content}</div></div>`;
                                                        break
                                                    }
                                                }

                                            }


                                            function estCerises2(monCommentaire) {
                                                if (nouveauTableau[i].publications_idpublications) {
                                                    return monCommentaire.publications_idpublications === nouveauTableau[i].publications_idpublications;
                                                } else {
                                                    return monCommentaire.publications_idpublications === nouveauTableau[i].id;
                                                }
                                            }



                                            let tableauDeCommentaires = allComments.filter(estCerises2);
                                            let tableauDeCommentairesReversed = tableauDeCommentaires.reverse();
                                            for (let o = 0; o < tableauDeCommentairesReversed.length; o++) {
                                                let createContainerPublication2 = document.createElement("div");
                                                let selectNewDiv2 = document.querySelector(`div.divTest > div:nth-child(${i + 2})`);
                                                selectNewDiv2.appendChild(createContainerPublication2);
                                                let selectNewNewDiv2 = document.querySelector(`div.divTest > div:nth-child(${i + 2}) > div:nth-child(${o + 2})`);
                                                selectNewNewDiv2.classList.add("containerDiv2");
                                                // let tableauDeCommentaires = allComments.filter(estCerises2);


                                                // Boucle faite pour afficher le prénom devant le commentaire + le commentaire
                                                for (let u = 0; u < allUsers.length; u++) {
                                                    if (allUsers[u].id === tableauDeCommentairesReversed[o].users_idusers) {
                                                        selectNewNewDiv2.innerHTML = `<div><div>${allUsers[u].name}</div><div>${tableauDeCommentairesReversed[o].content}${tableauDeCommentairesReversed[o].users_idusers}</div></div>`;
                                                        break
                                                    }
                                                }
                                                // ${allUsers[tableauDeCommentairesReversed[o].users_idusers-1].name}
                                                // selectNewNewDiv2.textContent = `${tableauDeCommentairesReversed[o].content}${tableauDeCommentairesReversed[o].users_idusers}`;
                                                // JE DOIS TROUVER L ID USER CORRESPONDANT AU PRENOM DU USER POUR L AFFICHER

                                            }

                                        }

                                        let selectPublication = document.querySelectorAll("div.containerDiv");
                                        for (let i = 0; i < selectPublication.length; i++) {
                                            let createContentDiv = document.createElement("textarea");
                                            createContentDiv.classList.add(`testAddClass`);
                                            selectPublication[i].appendChild(createContentDiv);
                                        }







                                    })

                            })

                    })
            }
            catch (err) { console.log(err) }

        }

        fetchComments();
    }, [])

    return (
        <div>
            <PublicationInput />
            <div className="divTest" ref={ref}>
                <h1 className="h1News">Dernières publications</h1>
            </div>
        </div>
    );
}

export default News;