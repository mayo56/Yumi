# Documentation /auth

## Register
```
/auth/register
```
Permet de s'inscire sur la base de donnée.

### Body
```json
{
    "username": "...",
    "password": "..."
}
```

### Status de réponse (error)
| HTTP Error | Error Code | Message | Resolve |
| :--: | :--------: | :----- | :----- |
| `409` | `1001` | **JSON Body Not Complete** | Ne contient pas toutes les informations necessaire. |
| `409` | `1002` | **Username Already Exists** | Le nom d'utilisateur choisit existe déjà. Trouvez-en un autre. |
| `409` | `1003` | **Password Not Secure** | Le mot de passe n'est pas assez sécurisé. (1) |
| `500` | `500` | **Internal Server Error** | Problème interne au serveur, aucune solution possible hors interventions. |

# Status de réponse (correct)
**HTTP Response** `201`
```json
{
    "error": null,
    "token": "token"
}
```


**(1) Contenue d'un mot de passe:**
- Lettres `a-z` `A-Z`
- Caractères spéciaux (e.g `!@=`)
- Chiffres `0-9`
- Au moins 8 caractères



# Login
```
/auth/login
```
Permet de se connecter aux service (authentification).

## Body
```json
{
    "username": "...",
    "password": "..."
}
```

## Status de réponse (error)
| HTTP Error |  Error Code | Message | Resolve |
| :---: | :--------: | :----- | :----- |
| `409` |`1101` | **JSON Body Not Complete** | Ne contient pas toutes les informations necessaire. |
| `401` | `1102` | **Incorrect Inputs** | Les informations transmit sont incorrects. Nom d'utilisateur ou mot de passe incorrect |
| `500` | `500` | **Internal Server Error** | Problème interne au serveur, aucune solution possible hors interventions. |

# Status de réponse (correct)
**HTTP Response** `200`
```json
{
    "error": null,
    "token": "token"
}
```

# Change Password
```
/auth/changePassword
```
> Require un token utilisateur

Permet de changer le mot de passe de son compte.

## Body
```json
{
    "oldPassword": "...",
    "newPassword": "..."
}
```

## Status de réponse (error)

| HTTP Error |  Error Code | Message | Resolve |
| :---: | :--------: | :----- | :----- |
| `401` |`901` | **No Token Detected** | Ne contient pas le token utilisateur. |
| `401` | `902` | **Invalid User Token** | Le token utilisateur n'est pas valide. |
| `409` | `1201` | **JSON Body Not Complete** | Ne contient pas toutes les informations necessaire. |
| `409` | `1202` | **Password Not Secure** | Le mot de passe n'est pas assez sécurisé. |
| `409` | `1203` | **New Password Can't Be The Same As Old Password** | Le nouveau mot de passe est le même que le nouveau, il faut en trouver un autre. |
| `500` | `500` | **Internal Server Error** | Problème interne au serveur, aucune solution possible hors interventions. |