//ui element
let buttonCart  = document.querySelectorAll('#submit');
let CartList = document.querySelector('#cart-list');

let ptag = document.querySelectorAll('#ptag');
let htag = document.querySelectorAll('#htag');



 for(let i = 0;i<buttonCart.length ;i++){
    buttonCart[i].addEventListener('click',() => {
        addCart(htag[i].textContent,ptag[i].textContent)
    })
}




// get data
class Data{
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
}
// creating UI
class UI{
        
        
        static addToCartList(data){
            let list = document.querySelector('#cart-list');
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.price}</td>
                <td><a href ="" class="btn btn-danger" id="delete">Remove</a></td>
            `
            list.appendChild(row)
        }

        static deleteFromCart(target){
            if(target.hasAttribute('href')){
                if (confirm('Are You sure to remove?')) {
                    let del =  target.parentElement.parentElement;
                    del.remove();
                    Store.deleteFromCartLS(target.parentElement.previousElementSibling.previousElementSibling.textContent.trim());
                    alert('Product is removed!!!');
                }
               
               
            }
        }
}

//accesing the localStorage
class Store{

    // get the cart item from localStorage
    static get_list(){
        let carts;
        if (localStorage.getItem('carts') === null) {
            carts = []
        }else{
            carts = JSON.parse(localStorage.getItem('carts'))
        }
        return carts
    }

    // new cart item to the localStorage.
    static addCart(list){
        let carts = Store.get_list();
        carts.push(list)

        localStorage.setItem('carts',JSON.stringify(carts))

    }
    // when DOMContetenLoaded display the item into cart
    static displayCart(){
        let carts = Store.get_list();
        carts.forEach( list => {
            UI.addToCartList(list)
        });
    }

    // deleting the item from LocalStorage
    static deleteFromCartLS(name){
        let carts = Store.get_list();
        carts.forEach((cart, index) => {
            if (cart.name === name) {
                carts.splice(index, 1)
            }
        })
        
        localStorage.setItem('carts',JSON.stringify(carts))
    }
}


//Add eventListener
CartList.addEventListener('click',removeCart);
document.addEventListener('DOMContentLoaded',Store.displayCart())

function addCart(htag,ptag){
        
    let data = new Data(htag,ptag)
    

    UI.addToCartList(data)
    Store.addCart(data)
    
}

function removeCart(e){

    
    UI.deleteFromCart(e.target)
    e.preventDefault()
}
