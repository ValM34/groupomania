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



                                    for (let i = 0; i < nouveauTableau.length; i++) {
                                        nouveauTableau[i].createdAtNumber = nouveauTableau[i].createdAt.replace(/\D/g, '');
                                    }
                                    const tableauTrie = nouveauTableau.sort();

                                    const tttest = nouveauTableau.sort(function compare(a, b) {
                                        if (a.createdAtNumber < b.createdAtNumber)
                                            return 1;
                                        if (a.createdAtNumber > b.createdAtNumber)
                                            return -1;
                                        return 0;
                                    });





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