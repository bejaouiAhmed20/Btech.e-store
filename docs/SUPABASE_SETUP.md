# Configuration Supabase — BTech e-store

Ce document décrit les étapes **manuelles** à réaliser dans Supabase pour que le
système de commandes et de comptes fonctionne. Rien de tout cela n'est fait
automatiquement par le code du dépôt.

## 1. Créer / ouvrir le projet Supabase

Le projet utilisé pour le développement est déjà référencé dans `.env.local` :

```
VITE_SUPABASE_URL=https://wcbiqimndhvanvgxzbji.supabase.co
```

Si vous démarrez un nouveau projet, créez-le depuis https://supabase.com/dashboard
et récupérez son URL et sa clé publique (`anon`/`publishable`) dans
**Project Settings → API**.

## 2. Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez :

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

`.env.local` est ignoré par Git — ne jamais committer de clé secrète.

## 3. Exécuter les migrations

Avec la CLI Supabase (`npm install -g supabase` si nécessaire) :

```bash
supabase link --project-ref <votre-project-ref>
supabase db push
```

Les migrations sont exécutées **dans l'ordre du nom de fichier** :

1. `0001_order_status_enum.sql` — enum `order_status` + fonction `set_updated_at()`
2. `0002_profiles.sql` — table `profiles` + trigger de création automatique à l'inscription
3. `0003_orders.sql` — table `orders`, index, génération de référence
4. `0004_rls_policies.sql` — activation et politiques Row Level Security
5. `0005_claim_guest_orders.sql` — fonction `claim_my_guest_orders()`

## 4. Déployer l'Edge Function

```bash
supabase functions deploy create-order
```

## 5. Configurer les secrets de l'Edge Function

`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont fournis automatiquement par
l'environnement d'exécution des Edge Functions — aucune configuration
manuelle n'est nécessaire pour ces deux-là. Ne jamais placer la clé
service-role dans le frontend.

## 6. Configurer l'authentification par e-mail

Dans **Authentication → Providers**, vérifiez que le provider **Email** est activé.

Dans **Authentication → Email Templates**, personnalisez si besoin les modèles
de confirmation d'inscription et de réinitialisation de mot de passe.

## 7. Configurer le Site URL

Dans **Authentication → URL Configuration**, renseignez :

- **Site URL** : l'URL de production (ex. `https://btech-estore.netlify.app`)

## 8. Configurer les redirections locales et de production

Toujours dans **Authentication → URL Configuration → Redirect URLs**, ajoutez :

```
http://localhost:5173/reset-password
https://<votre-domaine-production>/reset-password
```

## 9. Vérifier les politiques RLS

Dans **Table Editor → profiles / orders**, confirmez que RLS est bien activé
(icône verrou) et que les politiques listées dans `0004_rls_policies.sql`
apparaissent.

## 10–16. Tests manuels

Voir la checklist complète dans le README (section « Tests manuels ») —
elle couvre : commande invité, création de compte, confirmation e-mail,
connexion, réinitialisation de mot de passe, rattachement des commandes
invité, et l'impossibilité pour un client d'accéder aux commandes d'un
autre utilisateur.

## Gestion des commandes par l'administrateur

Pour cette première version, les changements de statut de commande
(`pending → contacted → confirmed → in_progress → completed / cancelled`)
se font manuellement depuis **Table Editor → orders** dans le Supabase
Dashboard, en utilisant le rôle service-role du dashboard (qui contourne RLS).
