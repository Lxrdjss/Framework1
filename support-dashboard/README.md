# Support Dashboard

Interface Angular de suivi des tickets support.

## Prerequis

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Lancer l'API mock (port 3000)

```bash
npm run api
```

## Lancer l'application (port 4200)

```bash
npm start
```

L'API doit tourner avant l'application. Ouvrir http://localhost:4200.

## Routes

| Route               | Description           |
| ------------------- | --------------------- |
| `/tickets`          | Liste des tickets     |
| `/tickets/new`      | Creation              |
| `/tickets/:id`      | Detail                |
| `/tickets/:id/edit` | Edition               |
| `/stats`            | Statistiques agregees |
