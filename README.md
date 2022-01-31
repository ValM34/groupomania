Pour utiliser la base de données :

Vous devez importer le fichier groupomania_development_dump.sql dans mysql. 
Ensuite il vous faudra aller dans ./backend/config/config.json. 
Dans la partie "development", changez le username en fonction de votre identifiant mysql, changez les mot de passe et changez le nom de la base de données si necéssaire.

Pour lancer le backend :

Allez dans le dossier backend et installez les dépendances en utilisant la commande npm install.
Ensuite écrivez nodemon server pour lancer le serveur.

Pour lancer le frontend :

Allez dans le dossier React-app et installez les dépendances en utilisant la commande npm install.
Ensuite écrivez npm start pour lancer le serveur.