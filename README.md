## Anotações / estudo

### O que faz o createBrowserRouter() ?
### O que faz o loader?
1. Como se fosse o useEffect, para hidratar o componente com dados
2. O loader ele é uma função autoexecutável do componente que expõe dados para seu componente, os quais podem ser acessados usando o useLoaderData
3. O que o loader retornar ele lança como argumento dentro do componente


### Para que serve os elementos do createBrowserRouter:
- path => define o caminho
- element => é o componente renderizado caso o client acesse o path acima
- loader:
- children: [array of routes]

```jsx
element: <Root />,
    children: [
      {
        path: '/contacts/:contactID',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: '/contacts/:contactID/edit',
        element: <EditContact />,
        loader: contactLoader,
      },
    ],
```

Os elements de cada objeto dentro do array de children, serão renderizados no lugar do Outlet dentro do elemento Root
