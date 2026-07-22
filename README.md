# Black Polar — Mainsite

Sitio estático principal de blackpolar.org. Next.js 15 + TypeScript + Tailwind.


| Sistema | Dominio | Repo |
|---|---|---|
| Mainsite | blackpolar.org | group-blackpolar/Mainsite-BP |
| API | api.blackpolar.org | group-blackpolar/CoreCrow-API |

## Rutas

```
app/
  page.tsx         → / (home)
  portfolios/      → /portfolios
  styles/          → main.css, portfolios.css
```

`/docs` y `/contact` (como rutas propias, hoy `/contact` es una sección
dentro de `/`) y otras views quedan pendientes de añadir sobre esta misma
base.

- El botón de inicio de sesión del header/footer redirige directo a
  `https://north.blackpolar.org` — este repo no maneja autenticación.
- El sitio consume `api.blackpolar.org` (CoreCrow-API) para lo que necesite
  datos reales (contacto, docs, etc.), vía `NEXT_PUBLIC_API_URL`.
