# API de Gestion des Utilisateurs

Ce projet est une API REST implémentée avec NestJS pour gérer une base d'utilisateurs selon une architecture hexagonale (Clean Architecture).

## Architecture

Cette application suit une architecture hexagonale (aussi appelée Clean Architecture ou Ports & Adapters) avec :

1. **Couche Domain** : Contient les entités métier et les règles fondamentales.
2. **Couche Application** : Contient les cas d'utilisation (Use Cases) qui orchestrent les flux d'application.
3. **Couche Infrastructure** : Contient les implémentations concrètes (repositories, contrôleurs).

Chaque fonctionnalité est implémentée via un cas d'utilisation (Use Case) dédié, suivant le principe de responsabilité unique (SRP) de SOLID.

## Modèle de données

L'API gère un modèle d'utilisateur avec les champs suivants :

```typescript
User {
  id: string;           // UUID généré automatiquement
  login: string;        // Obligatoire, unique
  password: string;     // Obligatoire, hashé
  lastName: string;     // Obligatoire (Nom)
  firstName?: string;   // Facultatif (Prénom)
  email: string;        // Obligatoire, unique
  phone?: string;       // Facultatif (Téléphone)
  address: string;      // Obligatoire
  postalCode: string;   // Obligatoire
  city: string;         // Obligatoire
  country: string;      // Obligatoire
  createdAt: Date;      // Généré automatiquement
  updatedAt: Date;      // Mis à jour automatiquement
}
```

## Prérequis

- Node.js (v16 ou supérieur)
- pnpm (v7 ou supérieur)
- Docker et Docker Compose (pour la base de données PostgreSQL)

## Installation

1. Cloner le repository

```bash
git clone git@github.com:Anse-dev/user-management-api.git
cd user-management-api
```

2. Installer les dépendances

```bash
pnpm install
```

3. Configurer les variables d'environnement

Le fichier `.env` est déjà configuré avec des valeurs par défaut pour le développement local. Pour la production, assurez-vous de modifier ces valeurs.

## Démarrage de l'application

démarrer l'application :

```bash
# Lancer Docker Compose
docker-compose up -d



# Générer les migrations Prisma et appliquer
npx prisma migrate dev --name init

# Générer le client Prisma

npx prisma generate

# Démarrer l'application en mode développement

pnpm start:dev
```

L'application sera accessible à l'adresse : http://localhost:3000

## Tests

```bash
# Tests unitaires
pnpm test

# Tests end-to-end
pnpm test:e2e

# Couverture de tests
pnpm test:cov
```

## Documentation API

La documentation de l'API est disponible via Swagger UI à l'adresse :

http://localhost:3000/api

Cette documentation interactive vous permet de visualiser tous les endpoints disponibles et de les tester directement depuis votre navigateur.
