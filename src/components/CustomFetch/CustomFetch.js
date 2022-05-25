const products = [
{
    id: '1',
    name:'zapatillas nike',
    price: 500,
    category: 'zapatillas',
    img:'https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw18379172/products/NI_AQ7492-004/NI_AQ7492-004-1.JPG',
    stock:10,
    description:'Lucí con estilo en tus entrenamientos o en tu día a día gracias a las Zapatillas Nike Air Max Bella Tr 2'
},{
    id: '2',
    name:'zapatillas puma',
    price: 800,
    category: 'zapatillas',
    img:'https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw70fe9a4a/products/PU_376694-01/PU_376694-01-1.JPG',
    stock:20,
    description:'Las Zapatillas Puma Softride Enzo Nxt son livianas como plumas y equipadas como roble'
},{
    id: '3',
    name:'zapatillas rebook',
    price: 300,
    category: 'zapatillas',
    img:'https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw7314a566/products/RE_GZ8250/RE_GZ8250-1.JPG',
    stock:5,
    description:'Entrena empujando tus límites con las Zapatillas Reebok Advanced Trainer'
},
];

export const getProducts = () =>{
    return new Promise((resolve)=>{
        setTimeout(()=> {
            resolve(products)
        },2000)
    })
}