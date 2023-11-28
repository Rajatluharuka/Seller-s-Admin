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
document.getElementById("productForm").addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await axios.post("https://crudcrud.com/api/a0394bf0e45646e2a702bed0fa69d1d4/productData", data);
        showProductData(response.data);
        addPrice(response.data);
    } catch (err) {
        console.log(err);
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/a0394bf0e45646e2a702bed0fa69d1d4/productData");
        
        for (let i = 0; i < response.data.length; i++) {
            showProductData(response.data[i]);
            addPrice(response.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
});

document.getElementById("list").addEventListener('click',async function(e) {
    if(e.target.classList.contains('delete')){
        let product=e.target.parentElement;
        let removeProduct = product.dataset.id;
        subPrice(product.childNodes[0].textContent);
        document.getElementById("list").removeChild(product);
        try {
            const response = await axios.delete(`https://crudcrud.com/api/a0394bf0e45646e2a702bed0fa69d1d4/productData/${removeProduct}`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
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