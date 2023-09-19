<template>
  <div v-if="categoryStore.availableCategories.length > 0 && productStore.products.length > 0" v-loading="loading" class="p-4 h-[53rem]">
    <div v-if=" !isReceiptModalVisible" class="text-center">
      <h2  class="text-2xl font-semibold ">Customer Order#</h2>
    <!-- Display the order receipt number -->
<p class="text-lg font-semibold mb-4">Order Receipt: #000{{ orderReceiptNumber }}</p>
    </div>


    <div v-if="cartItems.length === 0 && !isReceiptModalVisible" class="text-gray-600">
      Your cart is empty.
    </div>
    <div v-else-if="cartItems.length > 0 && !isReceiptModalVisible">
      <div class="mb-4">
        <label for="customerSelect" class="block text-lg font-semibold">
          Search Customer:
        </label>
        <div class="flex items-center w-[55%]">
          <!-- Customer (Autocomplete Input) -->
          <div>
            <input
              type="text"
              id="customer"
              placeholder="Look up Customer"
              v-model="customerLookup"
              class="border border-gray-300 px-2 pb-1 pt-[0.2rem]"
              @input="suggestCustomers"
            />
          </div>
          <div
            class="cursor-pointer bg-cyan-300 border border-gray-300"
            @click="toggleCustomerInput"
          >
            <Icon
              icon="majesticons:plus-line"
              :height="31"
              v-if="!showCustomerInput"
            />
            <Icon icon="codicon:dash" :height="31" v-else />
          </div>
        </div>
        <!-- Auto-suggested categories dropdown -->
        <ul
          v-if="showSuggestions"
          class="border w-[44.4%] border-gray-300 rounded-b-md"
        >
          <li
            v-for="suggestion in customerSuggestions"
            :key="suggestion"
            @click="selectSuggestion(suggestion)"
            class="cursor-pointer px-2 py-1 hover:bg-gray-200"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <!-- Add New Customer (if needed) -->
      <div v-if="showCustomerInput" class="mb-4">
        <label for="newCustomerName" class="block text-lg font-semibold">
          Add New Customer:
        </label>
        <div class="flex space-x-4">
          <input
            type="text"
            id="newCustomerName"
            v-model="newCustomerName"
            class="border border-gray-300 p-2 w-[45%]"
            placeholder="Customer Name"
          />
          <input
            type="text"
            id="newCustomerPhone"
            placeholder="07 XX XXX XXX"
            v-model="newCustomerPhone"
            class="border border-gray-300 p-2 w-[45%]"
          />
          
          <button @click="addCustomer" class="bg-cyan-500 text-white px-4 py-2">
            Add
          </button>
        </div>
      </div>
      <!-- Cart Items -->
      <div class="max-h-[437px] overflow-y-auto bg-black border rounded-lg p-2 mt-[41px]">
  <!-- Header Row -->
  <div class="flex items-center justify-between pb-2 font-semibold">
    <div class="grid grid-cols-5 gap-1 w-full items-center text-white">
      <!-- Column 2: Product Name -->
      <div class="col-span-2 pl-12">
        <span>Product</span>
      </div>

      <!-- Column 3: Quantity Controls -->
      <div class="col-span-1 justify-self-center">
        <span>Qty</span>
      </div>

      <!-- Column 4: Product Price -->
      <div class="col-span-1 justify-self-center">
        <span>Price</span>
      </div>

      <!-- Column 5: Amount -->
      <div class="col-span-1">
        <span>Amount</span>
      </div>
    </div>
  </div>
<div>
<!-- Cart Items -->
<div v-for="(cartItem, index) in cartItems" :key="index" class="mb-4">
    <div class="flex items-center justify-between px-2 pb-2 rounded-lg shadow-md bg-gradient-to-r from-blue-200 to-purple-200">
      <div class="grid grid-cols-5 gap-1 w-full items-center">
        <!-- Column 2: Product Name and Code -->
        <div class="col-span-2 flex items-center text-blue-800 mt-[10px]">
          <img
            :src="cartItem.product.productImage"
            alt="Product Image"
            class="w-12 h-12"
          />
          <div class="ml-2">
            <p class="text-base font-semibold">{{ cartItem.product.name }}</p>
            <p class="text-gray-600">{{ cartItem.product.sku }}</p>
          </div>
        </div>

        <!-- Column 3: Quantity Controls -->
        <div class="col-span-1 justify-self-center text-purple-800">
          <div class="flex items-center">
            <button
              :disabled="cartItem.quantity <= 1"
              @click="decrementQuantity(cartItem)"
              class="text-red-500"
            >
              -
            </button>
            <input
              type="number"
              :disabled="cartItem.quantity >= cartItem.product.stockQuantity || cartItem.quantity <= 1"
              v-model="cartItem.quantity"
              class="w-10 text-center mx-1 bg-white rounded-md"
            />
            <button
              :disabled="cartItem.quantity >= cartItem.product.stockQuantity"
              @click="incrementQuantity(cartItem)"
              class="text-green-500"
            >
              +
            </button>
          </div>
        </div>

        <!-- Column 4: Product Price -->
        <div class="col-span-1 justify-self-center text-orange-800">
          <p>{{ cartItem.product.price.toLocaleString() }}</p>
        </div>

        <!-- Column 5: Total Price per Product -->
        <div class="col-span-1 flex items-center text-red-800">
          <p class="w-16">{{ calculateTotalPrice(cartItem).toLocaleString() }}</p>
          <Icon
            icon="streamline-emojis:cross-mark"
            @click="productStore.removeFromCart(cartItem)"
            class="cursor-pointer ml-2"
          />
        </div>
      </div>
    </div>
  </div>

</div>
<div class="flex justify-end mt-6">
        <!-- Clear Cart Button -->
       <button
         @click="productStore.clearCart"
         class="bg-red-500 hover:bg-black text-white hover:text-white border border-red-500 hover:border-white px-4 py-2 rounded-md"
       >
         Clear Cart
       </button>
      </div>

</div>

      <!-- Cart Summary -->
      <div class="mt-4 flex justify-between space-x-2 items-center">
  <div class="text-blue-800">
    <p class="text-lg font-semibold">Cart Summary</p>
    <p class="text-gray-600">Total Items: <span class="text-red-500 font-bold text-lg">{{ totalItems }}</span></p>
    <p class="text-gray-600">Total Amount: <span class="text-green-800 font-bold text-lg">UGX {{ totalPrice }}</span> </p>
  </div>

  <!-- Money Input and Change Calculation -->
  <div class="text-purple-800">
    <label for="moneyGiven" class="block text-lg font-semibold">Cash:</label>
    <input
      type="number"
      id="moneyGiven"
      v-model="moneyGiven"
      class="border border-gray-300 p-2 text-black"
    />
    <p v-if="change !== null" class="text-gray-600 mt-2">Change: <span class="text-green-800 font-bold text-lg">UGX {{ change }}</span> </p>
  </div>
</div>

      <!-- Checkout Button -->
<div class=" w-full">
  <button
    @click="checkout"
    :disabled="isCheckoutLoading"
    class="bg-green-500 text-white px-4 py-2 w-full mt-10"
  >
  <span v-if="isCheckoutLoading">Checking out...</span>
  <span v-else>Checkout - UGX {{ totalPrice }}</span>
  </button>
</div>
    </div>
     <!-- Display receipt modal when needed -->
     <orderDisplay v-if="isReceiptModalVisible" @close="closeReceiptModal" />
  </div>
</template>
  
  <script setup>
import { useProductStore } from "../stores/products.js";
import { useCustomerStore } from "../stores/customers.js";
import { computed, ref, watch, onMounted } from "vue";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import orderDisplay from "./orderDisplay.vue"
const isReceiptModalVisible = ref(false);
import { useCategoryStore } from "../stores/categories.js";
const showReceiptModal = () => {
  isReceiptModalVisible.value = true;
};

const closeReceiptModal = () => {
  isReceiptModalVisible.value = false;
  location.reload()
};
const loading = ref(false)
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const customerStore = useCustomerStore();
const moneyGiven = ref(null);
const cartItems = computed(() => productStore.cart);
const showCustomerInput = ref(false);
const newCustomerName = ref("");
const newCustomerPhone = ref("");
const selectedCustomer = ref([]);
// Handle input and category suggestions
const customerLookup = ref("");
const customerSuggestions = ref([]);
const showSuggestions = ref(false);
const orderReceiptNumber = ref(null);
const isCheckoutLoading = ref(false);
const defaultCustomer = {
  name: "Customer",
  number: "N/A",
};
const toggleCustomerInput = () => {
  showCustomerInput.value = !showCustomerInput.value;
};
const generateRandomReceiptNumber = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

const addCustomer = async () => {
   const db = firebase.firestore();
   const customerId = db.collection('customers').doc().id;
    // Add logic to add a new customer to your store
    const customer = {
      id:customerId,
      name: newCustomerName.value,
      number: newCustomerPhone.value,
    };
   
    // Add the new customer to the store
    customerStore.addCustomer(customer);
    // Save the new customer data to Firestore
    await db.collection("customers").add(customer);
    // Optionally, select the newly added customer in the dropdown
    customerLookup.value = `${customer.name} - ${customer.number}`;

    // Clear the new customer input fields
    newCustomerName.value = "";
    newCustomerPhone.value = "";

    // Hide the new customer input fields
    showCustomerInput.value = false;
  };

const suggestCustomers = () => {
  if (customerLookup.value) {
    // Filter available customers for suggestions and format them
    customerSuggestions.value = customerStore.customers
      .filter((customer) =>
        customer.name.toLowerCase().includes(customerLookup.value.toLowerCase())
      )
      .map((customer) => `${customer.name} - ${customer.number}`); // Format as "name - number"
    showSuggestions.value = true;
  } else {
    customerSuggestions.value = [];
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion) => {
  // Add the selected suggestion to selectedCategories
  customerLookup.value = suggestion;
  customerSuggestions.value = []; // Clear suggestions
  showSuggestions.value = false; // Hide suggestions
};
onMounted(async () => {
  try {
    await customerStore.fetchCustomers();
   orderReceiptNumber.value = generateRandomReceiptNumber();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
});
// Calculate total items and total price in the cart
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
  const totalPriceWithoutCommas = cartItems.value.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return totalPriceWithoutCommas.toLocaleString(); // Format with commas
});
const calculateTotalPrice = (cartItem) => {
    return cartItem.product.price * cartItem.quantity;
  };
const incrementQuantity = (cartItem) => {
  // Increase the quantity of the specified cart item
  cartItem.quantity += 1;
};

const decrementQuantity = (cartItem) => {
  // Decrease the quantity of the specified cart item, but not below 1
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }
};

const change = computed(() => {
  if (
    moneyGiven.value === null ||
    moneyGiven.value < parseFloat(totalPrice.value.replace(/,/g, ""))
  ) {
    return null; // Invalid input or insufficient money
  } else {
    const changeValue =
      moneyGiven.value - parseFloat(totalPrice.value.replace(/,/g, ""));
      if (changeValue !== null || changeValue !== 0){
        return changeValue.toLocaleString(); // Format change value with commas
      }else
      return  changeValue
      
    
  }
});

const checkout = async () => {
  isCheckoutLoading.value = true;
  // Check if the cart is empty
  if (cartItems.value.length === 0) {
    // Display a message or take appropriate action for an empty cart
    window.alert("Cart is empty. Cannot proceed with checkout.");
    return;
  }

  // Check if enough cash has been provided
  if (moneyGiven.value === null || moneyGiven.value < parseFloat(totalPrice.value.replace(/,/g, ""))) {
    // Display a message or take appropriate action for insufficient cash
    window.alert("Insufficient cash provided for checkout.");
    return;
  }
  // Determine the customer to be included in the order
  const selectedCustomerObject = customerLookup.value
    ? customerStore.customers.find((customer) => {
        const fullName = `${customer.name} - ${customer.number}`;
        return fullName === customerLookup.value;
      })
    : defaultCustomer;

    // Get the current date and time
  const currentDateTime = new Date();

// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getFullYear()}`;

// Format the time in 12-hour clock format
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const amOrPm = hours >= 12 ? "PM" : "AM";
const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  // Create an order object containing all the information
  const order = ref ({
    orderReceiptNumber: orderReceiptNumber.value,
    customer: selectedCustomerObject,
    cart: cartItems.value,
    totalItems: totalItems.value,
    totalAmount: totalPrice.value,
    cashGiven: moneyGiven.value,
    change: parseFloat(change.value),
    date: formattedDate,
    time: formattedTime,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });


  try {
    loading.value = true
    const db = firebase.firestore();
// Iterate through cart items and reduce stock in the database
for (const cartItem of cartItems.value) {
      const productId = cartItem.product.sku;
      const productRef = db.collection("products").doc(productId);
      const productSnapshot = await productRef.get();
      const productData = productSnapshot.data();
      const currentStock = productData.stockQuantity;

      if (currentStock >= cartItem.quantity) {
        // Reduce stock by the quantity in the carts
        await productRef.update({
          stockQuantity: currentStock - cartItem.quantity,
          amount: (currentStock - cartItem.quantity) * productData.price
        });
        // Store the order in the Firebase collection with the order receipt number as the document ID
    await db.collection("orders").doc(order.orderReceiptNumber).set(order.value);
    // Optionally, display a success message or navigate to a success page
    console.log("Order stored successfully:", order.value);
         // Log the stock reduction
         console.log(`Reduced stock for product: ${productData.name} by ${cartItem.quantity}`);
      } else {
        // Handle the case where there isn't enough stock to fulfill the order
        window.alert(`Insufficient stock for product: ${productData.name}`);
        return;
      }
    }
        // Clear the cart and money input
    productStore.clearCart();
    moneyGiven.value = null;
    isCheckoutLoading.value = false;
    loading.value = false
    showReceiptModal()
  } catch (error) {
    console.error("Error storing the order:", error);
    loading.value = false
    isCheckoutLoading.value = false;
    // Handle the error appropriately (e.g., display an error message)
  }
};

// Watch for changes in moneyGiven and update the computed change property
watch(moneyGiven, () => {
});
</script>
  
  