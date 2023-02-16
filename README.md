## Anotações / estudo

### O que faz o createBrowserRouter() ?
### O que faz o loader?
1. Como se fosse o useEffect, para hidratar o componente com dados
2. O loader ele é uma função autoexecutável do componente que expõe dados para seu componente, os quais podem ser acessados usando o useLoaderData
~~3. O que o loader retornar ele lança como argumento dentro do componente~~


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
- React Router DOM uniu esses dois mundos adicionando um intermediário nessa relação, antes o corpo da requisição era enviada direto ao servidor, causando um reload da página, no React Router DOM, caso um submit de uma formulário seja feito usando a tag `<Form>` do React Router DOM, o corpo desse POST ou GET é enviado para esse intermediário em vez do servidor, impedindo a rendeiração da tela, e esse intermediário fica a par de buscar os dados do servidor e enviar para os componentes, tornando a UX similar á de mutações de dados feitas em client side\

### Similariedades entre tag `<a>` tag `<form>`
- Links usando `<a>` causam uma navegação no navegador do usuário, e apenas enviam uma URL.
- Envios de formulários HTML clássico, também causam uma navegação no browser do usuário, porém, enviam também um corpo de requisição além da URL.

---
> The extra revalidation code doesn't exist without client side routing, so it doesn't need to exist with client side routing either!

O que isso significa?

### Atenção na hora de adicionar um novo item
O exemplo que o tutorial do React Router DOM deu, quando você clica para adicioanar outro item, ele redireciona você para a rota de edição, e no caminho (URL) já tem o ID./
O que ele está fazendo então é criar um usuário com ID, sem dados, e jogar você para o formulário de edição desse usuário vazio.


### Navlink
O navlink funciona de forma similar ao Link, porém a propriedade classname, recebe uma função com dois argumentos, sendo eles `isActive` e `isPending`, os quais retornam um boolean com base na checagem se o caminho expressado na propriedade `to` é a mesma que a URL que o usuário se encontra

### Deletar: action="destroy"
Colocando "destroy" como action do form, ele usa o caminho atual que o usuário se encontra (URL) e coloca "/destroy" no final.

### Modificar a UI com base no status da navegação
Para ter acesso ao informações sobre a navegação e usar isso para criar os elementos, usa-se o hook **`useNavigation()` que é diferente do** `useNavigate()`.
Ele retorna um objeto parecido com isso:
```javascript
{
    "state": "loading",
    "location": {
        "pathname": "/",
        "search": "?q=Vitor",
        "hash": "",
        "state": null,
        "key": "vm9te3ie"
    },
    "formMethod": "get",
    "formAction": "/",
    "formEncType": "application/x-www-form-urlencoded",
    "formData": {}
}
```

### Lidando com erros na página
**=> Lidando com erros que comuns**
O hook `useRouteError()` retorna um objeto com informações do erro para ser trabalhado na página

**=> Lidando com erros de formulário**
Caso o formulário encontre algum erro na hora de submeter, ele pode ser pego no catch e retornar esse erro em vez de dar `throw` no console.
Então o hook `useActionData()` acessa o retorno da função de action do formulário/componente tentou submeter, provendo dados do erro para o componente lidar da forma que ele quiser.

### Mostrando a página antes dela ser totalmente carregada
Para isso existe a função `defer()`, que lança um objeto com elementos que demoram para ser carregados para dentro do componente.
- Para sinalizar qual elemento deve ser postergado, ele deve ser colocado dentro de um componente `<Suspense>` e dentro de um componente `<Await>`.
- O componente `<Fallback>` possui a propriedade `fallback`.
  - `fallback` *(React.ReactNode)*: recebe um componente que é exibido enquanto a promise não é resolvida.
- O componente `<Await>` possui a propriedade `resolve` e `errorElement`.
  - `resolve`: recebe qual promessa está esperando ser resolvida
  - `errorElement` *(React.ReactNode)*: recebe elemento de erro caso a promessa não seja resolvida
- Dentro do componente `<Await>`, ele recebe o a promessa resolvida e pode ser capturada como argumento de uma função, i.g:
```jsx
<Await resolve={loaderData.posts}>
  {loadedPosts => <Posts posts={loadedPosts}/>}
</Await>
```