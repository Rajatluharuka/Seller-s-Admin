let price=document.getElementById("price");
let productName=document.getElementById("productName");
let container=document.getElementById("productContainer");
let productSum=document.getElementById("productSum");
let productList=document.createElement('ul');
productList.className = 'productList';
productList.id = 'list';
container.appendChild(productList);
const data = {};
let totalPrice=0;
document.getElementById("productForm").addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.forEach((value, key) => {
        data[key] = value;
    });

    axios.post("https://crudcrud.com/api/544e6a5d98fb48919b2092375681ad14/productData",data)
    .then((response) => {
        showProductData(response.data);
        addPrice(response.data);
    }).catch((err) => {
        console.log(err);
    });
});

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/544e6a5d98fb48919b2092375681ad14/productData")
    .then((response) => {
        for(let i=0;i<response.data.length;i++){
            showProductData(response.data[i]);
            addPrice(response.data[i]);
        }
    }).catch((err) => {
        console.log(err);
    });
})

document.getElementById("list").addEventListener('click',function(e) {
    if(e.target.classList.contains('delete')){
        let product=e.target.parentElement;
        let removeProduct = product.dataset.id;
        subPrice(product.childNodes[0].textContent);
        document.getElementById("list").removeChild(product);
        axios.delete(`https://crudcrud.com/api/544e6a5d98fb48919b2092375681ad14/productData/${removeProduct}`)
    .then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
    }
});

function showProductData(productData)
{
    let product=document.createElement('li');
    product.dataset.id =`${productData._id}`;
    product.appendChild(document.createTextNode(productData.price));
    product.appendChild(document.createTextNode(' - '));
    product.appendChild(document.createTextNode(productData.productName));

    let deleteBtn=document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('Delete product'));
    product.appendChild(deleteBtn);
    productList.appendChild(product);
}

function addPrice(productData)
{
    let sumPrice=parseInt(productData.price);
    totalPrice+=sumPrice;
    productSum.innerText=`${totalPrice}`;
}

function subPrice(price)
{
    let subtractPrice=parseInt(price);
    totalPrice-=subtractPrice;
    productSum.innerText=`${totalPrice}`;
}