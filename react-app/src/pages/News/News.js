import { useState, useEffect } from 'react';
import Feed from '../../components/Feed/Feed';
import PublicationInput from '../../components/PublicationInput/PublicationInput';
import Footer from '../../components/Footer/Footer';

function News() {

    const [commentState, setCommentState] = useState([]);
    /*
        fetch("http://localhost:3001/news/comments")
            .then(response => response.json())
    
            .then((allComments) => {
                if (commentState[0] === undefined) {
                    setCommentState(allComments)
                }
            })
        */

    // Test grand tableau

    

    const [isAdmin, setIsAdmin] = useState(false);


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));




    useEffect(() => {

        if (commentState[0] === undefined) {
        let tableau = [];
    // Test d'envoyer le token dans le header

    let cat = JSON.parse(localStorage.getItem('commandSignin'));

    let myHeaders = new Headers({ 'Authorization': cat[0].token });

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };



        fetch("http://localhost:3001/users/isadmin", {
            method: "GET",
            headers: { 'Authorization': getToken[0].token },
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .then((isAdmin) => { setIsAdmin(isAdmin.isAdmin) })

        // Fin de test 
        try {
            fetch("http://localhost:3001/news/comments", myInit)
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

                    fetch("http://localhost:3001/news/publications", myInit)
                        .then(response => response.json())
                        .then((allPublications) => {
                            fetch("http://localhost:3001/news/likes/getall", myInit)
                                .then(response => response.json())
                                .then((allLikes) => {


                                    fetch("http://localhost:3001/news/users", myInit)
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

                                            const tttest = nouveauTableau.sort(function compare(a, b) {
                                                if (a.createdAtNumber < b.createdAtNumber)
                                                    return 1;
                                                if (a.createdAtNumber > b.createdAtNumber)
                                                    return -1;
                                                return 0;
                                            });

                                            // J'ai rajouté une partie "createdAtNumber"
                                            // Ensuite, je dois utiliser "estCerise" pour trouver les publications correspondant aux commentaires.

                                            let newArray2 = [];

                                            for (let i = 0; i < tttest.length; i++) {


                                                // Remplacer les commentaires par les publications liées dans le tableau
                                                if (tttest[i].publications_idpublications) {
                                                    function findPublication(publicationTestttt) {
                                                        return publicationTestttt.id === tttest[i].publications_idpublications
                                                    }
                                                    newArray2.push(allPublications.find(findPublication))
                                                    // Je push les publications liées au commentaire à la place du commentaire pour n'avoir que des publications dans un nouveau tableau
                                                } else {
                                                    newArray2.push(tttest[i]) // Je push les publications aussi pour avoir toutes les publications
                                                }
                                            }

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
                                                        newArray2[i].comments.push(allCommentsReversed[o])
                                                    }
                                                }
                                            }

                                            for (let i = 0; i < newArray2.length; i++) {
                                                for (let o = 0; o < allLikes.length; o++) {
                                                    if (newArray2[i].id === allLikes[o].publications_idpublications && newArray2[i].likes === undefined) {
                                                        Object.defineProperty(newArray2[i], 'likes', {
                                                            value: [allLikes[o]],
                                                            configurable: true,
                                                            enumerable: true
                                                        });
                                                    } else if (newArray2[i].id === allLikes[o].publications_idpublications) {
                                                        newArray2[i].likes.push(allLikes[o])
                                                    }
                                                }
                                            }


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
                                                        Object.defineProperty(newArray2[i].comments[o], 'user', {
                                                            value: userForCommentFinded,
                                                            configurable: true,
                                                            enumerable: true
                                                        });
                                                    }
                                                }
                                                // }
                                            }

                                            if (commentState[0] === undefined) {
                                                setCommentState(newArray2)
                                                console.log(newArray2)
                                            }




                                            // Fin de test de faire différement







                                        })

                                })
                        })
                })
        }
        catch (err) { console.log(err) }
    }
    }, [commentState, getToken])

    // Fin test grand tableau


    return (
        <>
            <PublicationInput />
            <ol>{(commentState[0] !== undefined) &&
                commentState.map((commentState) => {
                    return <Feed isAdmin={isAdmin} commentState={commentState} key={commentState.id} />
                })
            }
            </ol>
            <Footer />
        </>
    );
}

export default News;