# Sport-1000

Suivi d'entraînement quotidien, pensé pour le téléphone. Le site affiche uniquement la colonne du jour de mon programme, avec une case à cocher par exercice. Les cases se remettent à zéro chaque jour à minuit.

## Pages

- `index.html` — l'entraînement du jour.
- `edit.html` — modification des 7 jours (type, technique, force, endurance, renforcement, note).

Les modifications et les cases cochées sont enregistrées dans le navigateur (`localStorage`), pas sur GitHub.

## Lancer en local

Les modules JavaScript demandent un petit serveur HTTP :

```sh
python -m http.server 8000
# ou
npx serve .
```

Puis ouvrir http://localhost:8000.

## Tests

```sh
npm test
```

## Déploiement

GitHub Pages, branche `main`, racine du dépôt :
https://calurion-dev.github.io/Sport-1000/
