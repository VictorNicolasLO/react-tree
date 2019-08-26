# RSSX

## Herramientas

### Router

---

Se encarga de enrutar la aplicacion y recibe un arreglo de objetos.
EJ

```javascript
export const Router = createRouter(
  [
    {
      path: '/',
      guard: notAuth,
      component: Main,
    },
    {
      path: '/playground',
      component: Playground,
    },
    {
      path: '/auth',
      guard: isAuth,
      component: Auth,
    },
    {
      path: '/registro',
      // guard: isAuth,
      component: Registro,
    },
  ],
  {},
);
```

- **path** nombre de la ruta absolute en la pagina web
- **Component** componente que se va a renderizar
- **redirect** Cuando este en esa ruta, redirigira a otra
- **wip** propiedad booleana que indica si esa ruta esta en desarrollo y en su lugar mostrara un componente por default el cual esta en defaults.rssx
- **guard** Funcion que se ejecutara cada vez que se renderize el componente y redireccionara a una ruta que retorne si esta retorna algo, aqui se puede hacer uso de servicios para retornar donde ser redireccionara o no en caso de que se cumpla una condicion. Ej. el router principal

```javascript
function isAuth() {
  const authService: AuthService = injectService(AuthService);
  if (authService.ready && authService.isAuth) {
    return '/otra-pagina';
  }
}

export const Router = createRouter(
  [
    {
      path: '/auth',
      guard: isAuth,
      component: Auth,
    },
  ],
  {},
);
```

### Servicios

Los servicios son clases modificables con propiedades y metodos que se pueden usar en cualquier componente los cuales pueden hacer alteraciones y estas se veran reflejadas en todos los componentes que usen sus propiedades.
Las modificaciones que se hagan mediante los metodos se hacen editandolo directamente y automaticamente se veran reflejadas.

- **Observables** Los observables son las propiedades delos servicios que se ven alteradas y se reflejan en los componentes que se esten utilizando
- **Actions** Los actions son metodos que modifican los observables.
- **funcion init** la funcion init es el proceso que se ejecutara una vez un componente lo utilize, el primero que lo utilize va a ser quien lo iniciara
- **propiedad ready** La funcion init es asincrona y se suele utilizar para hacer los primeros fetch que cargaran el modulo, para ello existe una propiedad booleana que cambiara a true cuando la funcion init se haya terminado, de esta manera el componente que necesite de este servicio puede mostrarse cuando el servicio se hay cargado para ello vease `wait for`

Los servicios se utilizan en los componentes envueltos por el HOC `component` y este observe los cambios de las propiedades del servicio que se este utilizando ademas de otros propiedades.
El uso de los servicios se hace mediante un hook llamado

```js
useService(Nombre del servicio,{
attach : true // Si quieres destruir el servicio una vez el componente donde se esta utilizando se haya desmontado
})
```

### Componentes

Existe un HOC que permite que los componenetes se refresquen en base a los servicios ademas de otras propiedades.

- **wait for** Se utiliza para esperar a que un servicio se termine de inicializar o si tiene propiedades como loadings se hayan concluido.
  Estas esperan una funcion que retornara un booleano para decidir si se pone un loading que se registra en los rssx.defaults en lugar del componente. Ej

```javascript
export default component <
  Props >
  (Main,
  {
    wait: {
      for: () => useService(AuthService).ready,
      template: 'ed', // Pueden usarse templates que que hayan registrado en los rssx.defaults
    },
  });
```

## Workflow

El workflow consiste en enrutar con la psoibilidad de enrutar anidadamente, cada ruta consite en un modulo con una estructura de carpetas basado en

- **containers** Los containers son basicamente las secciones de la ruta y contienen los componentes que estan en bits y los containers si pueden tener estados mediante `hooks`
  - **hooks** Se utilizan para la gestion de datos locales ej. Funcionalidad de un select, calendarios etc. Estos tambien pueden mandar a llamar servicios
- **services** En la carpeta de servicios se declaran los estados a gran escala ademas de hacer las peticiones y mutaciones
- **routes** (Opcional) contiene rutas si es una ruta anidada
