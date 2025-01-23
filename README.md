# Next.js 14 E-commerce

Ecommerce basada en "Teslo Shop", proyecto desarrollado en el curso de Next.js de Fernando Herrera.

<!-- ## Features extras

- Busqueda indexada de productos
- Notificaciones en proceso de compra
- Prisma caching 

-->
## Desarrollo

1. Clonar el repositorio.
2. Instalar dependencias.
3. Renombrar el archivo `.env.template` a `.env` y configurar las variables de entorno.
4. Ejecutar migraciones de prisma: `bunx prisma migrate dev`.
5. Ejecutar seed: `bunx prisma seed`.
6. Ejecutar el servidor: `bun run dev`.
7. Limpiar local storage.

### Detallitos

- En las rutas de admin se usa `products` y en las de usuarios normales `product`
