import './styles/styles.css';
import dessertInfo from '../data.json';
console.log("🚀 ~ dessertInfo:", dessertInfo)

type dessertItem = {
  name: string;
  price: number;
  count: number;
}

type dessertInfo = dessertItem & { category: string}

type dessertType = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  },
  name: string;
  category: string;
  price: number;
}

const addedItems: dessertItem[] = [];

const selected = document.createElement('div');
selected.setAttribute('id', 'selected-container');

const addToCardBtns = document.getElementsByClassName('add-cart');

if (addToCardBtns) {

addToCardBtns.forEach(btn => btn.addEventListener('click', (event) => alert(event.target)));
}
const renderStaticDessertCard = () => {
    const desserts = document.querySelector('#desserts')

    if (desserts) {
      dessertInfo.forEach((dessert: dessertType) => {
            const dessertItem = document.createElement('div');
            dessertItem.classList.add('card');
  
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
  
            const picture = document.createElement('picture');
  
            const mobileImg = document.createElement('source');
            mobileImg.setAttribute('width', '100%');
            mobileImg.setAttribute('media', '(max-width:767px)');
            mobileImg.setAttribute('srcset', dessert.image.mobile);
            picture.appendChild(mobileImg);
  
            const desktopImg = document.createElement('source');
            desktopImg.setAttribute('media', '(min-width:1024px)');
            desktopImg.setAttribute('srcset', dessert.image.desktop);
  
            const defaultImg = document.createElement('img');
            defaultImg.setAttribute('src', dessert.image.tablet);
            defaultImg.style.width = "auto";
            defaultImg.style.maxWidth = "100%";
  
            picture.appendChild(mobileImg);
            picture.appendChild(desktopImg);
            picture.appendChild(defaultImg);
  
            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('add-cart');
            addToCartBtn.textContent = 'Add to Cart';
  
            thumbnail.appendChild(picture);
            thumbnail.appendChild(addToCartBtn);
  
            const itemCategory = document.createElement('h3');
            itemCategory.textContent = dessert.category;
  
            const itemName = document.createElement('h4');
            itemName.textContent = dessert.name;
  
            const itemPrice = document.createElement('h5');
            itemPrice.textContent = '$' + dessert.price.toFixed(2);
  
            dessertItem.appendChild(thumbnail);
            dessertItem.appendChild(itemCategory);
            dessertItem.appendChild(itemName);
            dessertItem.appendChild(itemPrice);

            desserts.appendChild(dessertItem);
      })
    }
}

function addToCart(dessert: dessertType) {
    const existingItem = addedItems.find(item => item.name === dessert.category)

    if (existingItem) {
        existingItem.count++;
    } else {
        const dessertItem = {
            name: dessert.category,
            price: dessert.price,
            count: 1,
        }
        addedItems.push(dessertItem);
    }

    renderCart();
}

function renderCart() {
    const cart = document.getElementById('cart-info');
    const yourCart = document.getElementById('your-cart');
    
    const cartQty = addedItems.reduce((sum, item) => {
        return sum + item.count;
    }, 0);

    if (cart && yourCart) {
      if (cartQty === 0) {
          const message = document.createElement('p');
          message.id = "empty-message";
          message.textContent = 'Your added items will appear here.';
          cart.appendChild(message);
      } else {
          const emptyMsg = document.getElementById('empty-message');
          
          if (emptyMsg) {
              emptyMsg.remove();
          }
  
          yourCart.textContent = `Your Cart (${cartQty})`;
          addedItems.map(item => renderSelectedItem(item));
          cart.appendChild(selected);
      }
    }
}

function renderSelectedItem(item: dessertItem) {
    const existingSelected = document.getElementById(item.name);
    console.log("🚀 ~ renderSelectedItem ~ existingSelected:", existingSelected)

    if (existingSelected) {
        const existingSelectedCount = existingSelected.querySelector('.count');
        const existingSelectedTotalPrice = existingSelected.querySelector('.total-price');
        if (existingSelectedCount && existingSelectedTotalPrice) {
          existingSelectedCount.textContent = `${item.count}x`;
          const total = item.count * item.price;
          existingSelectedTotalPrice.textContent = `$${total.toFixed(2)}`
        } 


    } else {
        const dessert = document.createElement('div');
        dessert.setAttribute('id', item.name)

        const name = document.createElement('p')
        name.textContent = item.name;

        const count = document.createElement('p')
        count.classList.add('count')
        count.textContent = `${item.count}x`;

        const unitPrice = document.createElement('p');
        unitPrice.classList.add('unit-price');
        unitPrice.textContent = `@ ${item.price.toFixed(2)}`;

        const totalPrice = document.createElement('p');
        totalPrice.classList.add('total-price');
        const price = item.count * item.price;
        totalPrice.textContent = `$ ${price.toFixed(2)}`

        dessert.appendChild(name);
        dessert.appendChild(count);
        dessert.appendChild(unitPrice);
        dessert.appendChild(totalPrice);

        console.log('createdDessert', dessert);

        selected.appendChild(dessert);
    }
}

window.onload = () => {
    renderStaticDessertCard();
    renderCart();
}