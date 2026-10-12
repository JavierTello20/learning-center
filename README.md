# Open Source — Quick Reference Parcial

> Úsalo solo si el examen permite apuntes/archivos de apoyo.

## 1. Crear proyecto

```bash
ng new NOMBRE --routing --style=css --standalone --ssr=false
cd NOMBRE

ng add @angular/material
npm install @ngx-translate/core @ngx-translate/http-loader
npm install --save-dev json-server@0.17.4

ng generate environments
```

## 2. Ejecutar

```bash
npx json-server --watch server/db.json --port 3000
ng serve
```

## 3. Generar componentes

```bash
ng g c CONTEXTO/presentation/views/home --skip-tests
ng g c CONTEXTO/presentation/views/nueva-vista --skip-tests
ng g c CONTEXTO/presentation/components/nuevo-componente --skip-tests

ng g c shared/presentation/components/toolbar --skip-tests
ng g c shared/presentation/components/language-switcher --skip-tests
ng g c shared/presentation/views/page-not-found --skip-tests
```

## 4. Estructura

```text
src/app/
├── shared/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
│       ├── components/
│       └── views/
│
├── CONTEXTO-1/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
│
└── CONTEXTO-2/
    ├── domain/
    ├── application/
    ├── infrastructure/
    └── presentation/
```

```text
views      = tienen ruta
components = se usan dentro de otras vistas
```

## 5. Flujo que debes recordar

```text
db.json / API externa
        ↓
Resource / Response
        ↓
Assembler
        ↓
Entity
        ↓
ApiEndpoint
        ↓
Api
        ↓
Store (Signals)
        ↓
View / Component
```

POST:

```text
Form
 ↓
Entity
 ↓
Assembler
 ↓
Resource
 ↓
POST
 ↓
Backend
 ↓
Home
 ↓
GET actualizado
```

## 6. BaseEntity

```ts
export interface BaseEntity {
  id: number;
}
```

## 7. BaseResponse / BaseResource

```ts
export interface BaseResponse {}

export interface BaseResource {
  id: number;
}
```

## 8. BaseAssembler

```ts
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse
> {
  toEntityFromResource(resource: TResource): TEntity;
  toResourceFromEntity(entity: TEntity): TResource;
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
```

## 9. Assembler típico

```ts
export class ItemAssembler implements BaseAssembler<
  Item,
  ItemResource,
  ItemsResponse
> {
  toEntityFromResource(resource: ItemResource): Item {
    return new Item({
      id: resource.id,
      name: resource.name
    });
  }

  toResourceFromEntity(entity: Item): ItemResource {
    return {
      id: entity.id,
      name: entity.name
    };
  }

  toEntitiesFromResponse(response: ItemsResponse): Item[] {
    return response.items.map(
      resource => this.toEntityFromResource(resource)
    );
  }
}
```

## 10. Endpoint concreto

```ts
export class ItemsApiEndpoint extends BaseApiEndpoint<
  Item,
  ItemResource,
  ItemsResponse,
  ItemAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.itemsEndpointPath}`,
      new ItemAssembler()
    );
  }
}
```

## 11. Api

```ts
@Injectable({
  providedIn: 'root'
})
export class ItemsApi extends BaseApi {

  readonly #itemsEndpoint =
    new ItemsApiEndpoint(this.http);

  getItems(): Observable<Item[]> {
    return this.#itemsEndpoint.getAll();
  }

  createItem(item: Item): Observable<Item> {
    return this.#itemsEndpoint.create(item);
  }
}
```

## 12. Store con Signals

```ts
@Injectable({
  providedIn: 'root'
})
export class ItemsStore {

  readonly #api = inject(ItemsApi);

  readonly #itemsSignal =
    signal<Item[]>([]);

  readonly items =
    this.#itemsSignal.asReadonly();

  loadItems(): void {
    this.#api.getItems().subscribe({
      next: items =>
        this.#itemsSignal.set(items)
    });
  }
}
```

## 13. GET al entrar a Home

```ts
export class Home implements OnInit {

  protected readonly store =
    inject(ItemsStore);

  protected readonly items =
    this.store.items;

  ngOnInit(): void {
    this.store.loadItems();
  }
}
```

## 14. Home

```html
@if (items().length === 0) {

  <p>Empty</p>

} @else {

  @for (item of items(); track item.id) {

    <app-item-card
      [item]="item"
    />

  }

}
```

## 15. Reactive Form

```ts
protected readonly form =
  this.formBuilder.group({
    field1: [
      null,
      Validators.required
    ],

    field2: [
      null,
      Validators.required
    ]
  });
```

```ts
if (this.form.invalid) {
  this.form.markAllAsTouched();
  return;
}
```

## 16. Buscar relación

```ts
const related =
  this.store.items()
    .find(item =>
      item.someField === selectedValue
    );

if (!related) {
  return;
}
```

Ejemplo de foreign key:

```text
Category.id
→ Product.categoryId

Event.id
→ Registration.eventId
```

## 17. Fecha actual

```ts
registeredAt:
  new Date().toISOString()
```

## 18. POST y volver a Home

```ts
this.store
  .addItem(item)
  .subscribe({
    next: () => {
      this.router.navigate(['/home']);
    }
  });
```

## 19. Routing

```ts
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./.../home')
        .then(m => m.Home)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '**',
    loadComponent: () =>
      import('./.../page-not-found')
        .then(m => m.PageNotFound)
  }
];
```

## 20. Environment

```ts
export const environment = {
  production: false,

  apiBaseUrl:
    'http://localhost:3000',

  itemsEndpointPath:
    '/items',

  externalApiBaseUrl:
    'https://api.example.com',

  externalEndpointPath:
    '/users'
};
```

## 21. i18n

`public/i18n/en.json`

```json
{
  "home": {
    "title": "Home"
  }
}
```

HTML:

```html
{{ 'home.title' | translate }}
```

Cambio idioma:

```ts
this.translate.use('en');
this.translate.use('es');
```

## 22. Angular Material mínimo

```text
MatToolbar
MatButton
MatCard
MatFormField
MatSelect
MatOption
MatError
```

## 23. CSS mínimo

```css
main {
  padding: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
}

.grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 16px;
}
```

## 24. Logo.dev

```html
<img
  [src]="logoUrl"
  alt="Organization logo"
  width="40"
  height="40"
/>
```

```ts
protected readonly logoUrl =
  `${environment.logoDevBaseUrl}/${environment.organizationDomain}` +
  `?token=${environment.logoDevToken}&size=64`;
```

## 25. LO QUE DEBES CAMBIAR EN EL EXAMEN DE HOY

NO copies ciegamente los nombres del ejercicio anterior.

Busca y reemplaza:

```text
Entities
Bounded Contexts
colecciones de db.json
endpoint paths
API externa
estructura Response
campos anidados
Assembler mappings
campos del formulario
campos automáticos
validaciones
relaciones / foreign keys
rutas
textos
campos de cards
dominio del logo
```

## 26. Primeros 5 minutos del examen

Completa esto ANTES de programar:

```text
Bounded Contexts:
Entities:
db.json collections:
External API:
Response shape:
Home muestra:
Form pide:
Campos automáticos:
Validaciones:
Relaciones:
POST a:
Rutas:
Idiomas:
Card header:
Card content:
Card footer:
```

## 27. Prioridad si falta tiempo

```text
1. Compila
2. json-server
3. Routing
4. GET
5. Home
6. Form
7. POST
8. Validaciones
9. API externa
10. i18n
11. Logo / CSS
```

## 28. Checklist final

```text
[ ] ng serve sin errores
[ ] json-server activo
[ ] / redirige a Home
[ ] GET funciona
[ ] Empty funciona
[ ] Cards correctas
[ ] Form required
[ ] API externa carga
[ ] POST aparece en db.json
[ ] Create vuelve a Home
[ ] Nuevo registro se ve
[ ] Cancel vuelve a Home
[ ] 404 funciona
[ ] EN / ES funciona
[ ] ARIA
[ ] TSDoc
[ ] URLs en environment
[ ] README / ZIP final
```
