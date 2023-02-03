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

---
## Formulários em React Router DOM
Entenda formulário como todos os inputs e submits de qualquer tipo de form.
  
> React Router emulates HTML Form navigation as the data mutation primitive, according to web development before the JavaScript cambrian explosion. It gives you the UX capabilities of client rendered apps with the simplicity of the "old school" web model.
- O que significa "data mutation primitive"?
- O que são as capacidades UX dos apps renderizados no client?
- O que é a simplicidade old school da web model?
  
### O que eu entendi:
- A forma como as mutações de dados primitivos eram feitas antigamente, enviavam um corpo de requisição ao servidor, causando uma mudança, ou reload da página, o que é algo ruim para o UX.
- Mudanças de estados feitas no client side, matinham a melhor UX possível, pois não dependem de latência de servidor algum, tudo é feito usando o processamento da máquina.
- React Router DOM uniu esses dois mundos adicionando um intermediário nessa relação, antes o corpo da requisição era enviada direto ao servidor, causando um reload da página, no React Router DOM, caso um submit de uma formulário seja feito usando a tag `<Form>` do React Router DOM, o corpo desse POST ou GET é enviado para esse intermediário em vez do servidor, impedindo a rendeiração da tela, e esse intermediário fica a par de buscar os dados do servidor e enviar para os componentes, tornando a UX similar á de mutações de dados feitas em client side 

- Links usando `<a>` causam uma navegação no navegador do usuário, e apenas enviam uma URL.
- Envios de formulários HTML clássico, também causam uma navegação no browser do usuário, porém, enviam também um corpo de requisição além da URL.