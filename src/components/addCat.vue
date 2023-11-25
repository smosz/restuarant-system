<template>
  <div
    v-if="
      categoryStore.availableCategories.length > 0 &&
      productStore.products.length > 0
    "
    v-loading="loading"
    class="p-4 h-[100rem]"
  >
    <div v-if="!isReceiptModalVisible" class="text-center">
      <h2 class="text-2xl font-semibold">Customer Order#</h2>
      <!-- Display the order receipt number -->
      <p class="text-lg font-semibold mb-4">
        Order Receipt: #000{{ orderReceiptNumber }}
      </p>
    </div>

    <div
      v-if="cartItems.length === 0 && !isReceiptModalVisible"
      class="text-gray-600"
    >
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
          class="border w-[44.4%] border-gray-300 rounded-b-md overflow-y-auto"
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
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6

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
        <div class="flex justify-between">
          <span class="error-text" v-if="v$.newCustomerName.$error">
<<<<<<< HEAD
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.newCustomerName.$errors[0].$message }}</span
            >
            <span class="error-text mr-[20%]" v-if="v$.newCustomerPhone.$error && v$.newCustomerPhone.$errors[0].$message === 'Number required' && v$.newCustomerName.$error">
  <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
  {{ v$.newCustomerPhone.$errors[0].$message }}
</span>
<span class="error-text mr-[8%]" v-if="v$.newCustomerPhone.$error && v$.newCustomerPhone.$errors[0].$message === 'Number must be numeric' && v$.newCustomerName.$error">
  <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
  {{ v$.newCustomerPhone.$errors[0].$message }}
</span>
<span class="error-text mr-[25%]" v-if="v$.newCustomerPhone.$error && v$.newCustomerPhone.$errors[0].$message === 'Invalid Format' && v$.newCustomerName.$error">
  <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
  {{ v$.newCustomerPhone.$errors[0].$message }}
</span>
<span class="error-text mr-[-1%]" v-if="v$.newCustomerPhone.$error && v$.newCustomerPhone.$errors[0].$message === 'Number must be 10 digits long' && v$.newCustomerName.$error">
  <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
  {{ v$.newCustomerPhone.$errors[0].$message }}
</span>
            <span class="error-text ml-[47%]" v-if="v$.newCustomerPhone.$error && !v$.newCustomerName.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.newCustomerPhone.$errors[0].$message }}</span
            >
            
=======
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerName.$errors[0].$message }}</span
          >
          <span
            class="error-text mr-[20%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message === 'Number required' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[8%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message ===
                'Number must be numeric' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[25%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message === 'Invalid Format' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[-1%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message ===
                'Number must be 10 digits long' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text ml-[47%]"
            v-if="v$.newCustomerPhone.$error && !v$.newCustomerName.$error"
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}</span
          >
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
        </div>
        <div class="flex justify-between">
          <span class="error-text" v-if="v$.newCustomerName.$error">
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerName.$errors[0].$message }}</span
          >
          <span
            class="error-text mr-[20%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message === 'Number required' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[8%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message ===
                'Number must be numeric' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[25%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message === 'Invalid Format' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text mr-[-1%]"
            v-if="
              v$.newCustomerPhone.$error &&
              v$.newCustomerPhone.$errors[0].$message ===
                'Number must be 10 digits long' &&
              v$.newCustomerName.$error
            "
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}
          </span>
          <span
            class="error-text ml-[47%]"
            v-if="v$.newCustomerPhone.$error && !v$.newCustomerName.$error"
          >
            <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
            {{ v$.newCustomerPhone.$errors[0].$message }}</span
          >
        </div>
      </div>
      <!-- Cart Items -->
      <div
        class="max-h-[437px] overflow-y-auto bg-black border rounded-lg p-2 mt-[41px]"
      >
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
            <div
              class="flex items-center justify-between px-2 pb-2 rounded-lg shadow-md bg-gradient-to-r from-blue-200 to-purple-200"
            >
              <div class="grid grid-cols-5 gap-1 w-full items-center">
                <!-- Column 2: Product Name and Code -->
                <div
                  class="col-span-2 flex items-center text-blue-800 mt-[10px]"
                >
                  <img
                    :src="cartItem.product.productImage"
                    alt="Product Image"
                    class="w-12 h-12"
                  />
                  <div class="ml-2">
                    <p class="text-base font-semibold">
                      {{ cartItem.product.name }}
                    </p>
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
                      :disabled="
                        cartItem.quantity >= cartItem.product.stockQuantity ||
                        cartItem.quantity <= 1
                      "
                      v-model="cartItem.quantity"
                      class="w-10 text-center mx-1 bg-white rounded-md"
                    />
                    <button
                      :disabled="
                        cartItem.quantity >= cartItem.product.stockQuantity
                      "
                      @click="incrementQuantity(cartItem)"
                      class="text-green-500"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Column 4: Product Price -->
                <div class="col-span-1 justify-self-center text-orange-800">
                  <p v-if="!cartItem.product.customPrice">
                    {{ cartItem.product.price.toLocaleString() }}
                  </p>
                  <!-- Allow input for custom price if needed -->
                  <input
                    type="number"
                    v-model="cartItem.product.customPrice"
                    class="w-16"
                  />
                </div>

                <!-- Column 5: Total Price per Product -->
                <div class="col-span-1 flex items-center text-red-800">
                  <p class="w-16">
                    {{ calculateTotalPrice(cartItem).toLocaleString() }}
                  </p>
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
      <!-- <div>
        <button
          @click="addFaceBeatProduct"
          class="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Add Face Beat
        </button>
      </div> -->
      <!-- Cart Summary -->
      <div class="mt-4 flex justify-between space-x-3 items-center">
        <div class="text-blue-800">
          <p class="text-lg font-semibold">Cart Summary</p>
          <p class="text-gray-600">
            Total Items:
            <span class="text-red-500 font-bold text-lg">{{ totalItems }}</span>
          </p>
          <p class="text-gray-600">
            Total Amount:
            <span class="text-green-800 font-bold text-lg"
              >UGX {{ totalPrice }}</span
            >
          </p>
          <!-- Display discounted total amount (conditionally displayed) -->
          <p v-if="showDiscountInput && discount > 0" class="text-gray-600">
            Discount Amount:
            <span class="text-green-800 font-bold text-lg"
              >UGX {{ discountedTotal.toLocaleString() }}</span
            >
          </p>
          <!-- Button to toggle discount input -->
          <button
            @click="toggleDiscountInput"
            class="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            {{ showDiscountInput ? "Cancel Discount" : "Apply Discount" }}
          </button>
        </div>

        <!-- Money Input and Change Calculation -->
        <div class="text-purple-800">
          <!-- Discount Input (conditionally displayed) -->
          <div v-if="showDiscountInput" class="mt-4">
            <label for="discount" class="block text-lg font-semibold"
              >Discount (%):</label
            >
            <input
              type="number"
              id="discount"
              v-model="discount"
              class="border border-gray-300 p-2 text-black"
            />
          </div>
          <label for="moneyGiven" class="block text-lg font-semibold"
            >Cash:</label
          >
          <input
            type="number"
            id="moneyGiven"
            v-model="moneyGiven"
            class="border border-gray-300 p-2 text-black"
          />
          <p v-if="change !== null" class="text-gray-600 mt-2">
            Change:
            <span class="text-green-800 font-bold text-lg"
              >UGX {{ change }}</span
            >
          </p>
        </div>
        <!-- Checkout Button -->
      </div>

      <div class="w-full">
        <button
          @click="checkout"
          :disabled="isCheckoutLoading"
          class="bg-green-500 text-white px-4 py-2 w-full mt-10"
        >
          <span v-if="isCheckoutLoading">Checking out...</span>
          <span v-else>
            Checkout - UGX
            {{ discount && discount > 0 ? discountedTotal : totalPrice }}
          </span>
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
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import orderDisplay from "./orderDisplay.vue";
const isReceiptModalVisible = ref(false);
import { useCategoryStore } from "../stores/categories.js";
const showReceiptModal = () => {
  isReceiptModalVisible.value = true;
};

const closeReceiptModal = () => {
  isReceiptModalVisible.value = false;
  location.reload();
};
const loading = ref(false);
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

const toggleCustomerInput = () => {
  showCustomerInput.value = !showCustomerInput.value;
};
const db = firebase.firestore();
// const dbs = getDatabase()
const discount = ref(null);
const showDiscountInput = ref(false);
const toggleDiscountInput = () => {
  showDiscountInput.value = !showDiscountInput.value;
  if (!showDiscountInput.value) {
    // If the user is canceling the discount, reset the discount to null
    discount.value = null;
  }
};
const generateRandomReceiptNumber = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const addCustomer = async () => {
  const db = firebase.firestore();
  const customerId = db.collection("customers").doc().id;
  // Add logic to add a new customer to your store
  const customer = {
    id: customerId,
    name: newCustomerName.value,
    number: newCustomerPhone.value,
  };

  // Add the new customer data to Firestore with the generated ID
  await db.collection("customers").doc(customerId).set(customer);
  customerStore.fetchCustomers()
  customerLookup.value = newCustomerName.value + " - " + newCustomerPhone.value;
  
  // Hide the new customer input fields
  showCustomerInput.value = false;
};

const suggestCustomers = () => {
  if (searchCus.value) {
    // Filter available customers for suggestions and format them
    customerSuggestions.value = customerStore.customers
      .filter((customer) =>
        customer.name.toLowerCase().includes(searchCus.value.toLowerCase())
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

const customPriceToUpdate = ref(null);
const defaultCustomer = computed(() => customerStore.customerWithNa);
onMounted(async () => {
  try {
    await customerStore.fetchCustomers();

    customerLookup.value =
      defaultCustomer.value[0].name + " - " + defaultCustomer.value[0].number;
      console.log(customerLookup.value)
      // Access the computed property correctly
    orderReceiptNumber.value = generateRandomReceiptNumber();
  } catch (error) {
    window.alert("Error fetching customers");
    console.error(error)
  }
});
// Calculate total items and total price in the cart
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
  const totalPriceWithoutCommas = cartItems.value.reduce(
    (total, cartItem) => total + calculateTotalPrice(cartItem),
    0
  );
  return totalPriceWithoutCommas.toLocaleString(); // Format with commas
});

const calculateTotalPrice = (cartItem) => {
  customPriceToUpdate.value = cartItem.product.customPrice;
  if (cartItem.product.customPrice > 0) {
    return cartItem.product.customPrice * cartItem.quantity;
  } else {
    return cartItem.product.price * cartItem.quantity;
  }
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

const customerorderid = computed(() => {
  const nuber = customerLookup.value.split(" - ")[1];
  const customer = customerStore.customers.find(
    (customer) => customer.number === nuber
  );

  if (customer) {
    return customer.id;
  }

  // Return a default value or handle the case when no customer is found
  return null; // Change this to an appropriate default value or error handling
});

const discountedTotal = computed(() => {
  const totalPriceWithoutCommas = parseFloat(
    totalPrice.value.replace(/,/g, "")
  );
  const discountPercentage = discount.value || 0;
  if (discount.value === null || discount.value === 0) {
    return 0;
  } else {
    const discountAmount = totalPriceWithoutCommas * (discountPercentage / 100);
    return totalPriceWithoutCommas - discountAmount;
  }
});

const change = computed(() => {
  const changeValue =
    moneyGiven.value - parseFloat(totalPrice.value.replace(/,/g, ""));
  const changeDiscount = moneyGiven.value - discountedTotal.value;

  if (moneyGiven.value === null) {
    return null; // Invalid input: moneyGiven is null
  } else if (discountedTotal.value > 0) {
    if (changeDiscount >= 0) {
      return changeDiscount.toLocaleString(); // Format change value with commas
    } else {
      return null; // Insufficient money for the discounted total
    }
  } else if (changeValue >= 0) {
    return changeValue.toLocaleString(); // Format change value with commas
  } else {
    return null; // Insufficient money for the total price
  }
});

const calculateOrderTotal = () => {
  // Calculate the total price of items in the cart, considering custom prices
  let total = 0;
  for (const cartItem of cartItems.value) {
    const priceToUse =
      cartItem.product.customPrice > 0
        ? cartItem.product.customPrice
        : cartItem.product.price;
    total += cartItem.quantity * priceToUse;
  }
  return total;
};

// Get the current date and time
const currentDateTime = new Date();

// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${
  currentDateTime.getMonth() + 1
}-${currentDateTime.getFullYear()}`;

  // Format the time in 12-hour clock format
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  // Create an order object containing all the information
  const order = ref({
  orderReceiptNumber: orderReceiptNumber.value,
  customer: selectedCustomerObject,
  // Create a modified cart that excludes the 'productImage' property
  cart: cartItems.value.map((cartItem) => {
    // Deep clone the cart item, excluding 'productImage'
    const itemWithoutImage = JSON.parse(JSON.stringify(cartItem));
    if (itemWithoutImage.product) {
      delete itemWithoutImage.product.productImage;
    }
    return itemWithoutImage;
  }),
  totalItems: totalItems.value,
  totalAmount: totalPrice.value,
  discount: discountPercentage,
  discountAmount: discountedTotal.value,
  cashGiven: moneyGiven.value,
  change: change.value,
  date: formattedDate,
  time: formattedTime,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
});


  try {
    isCheckoutLoading.value = true;
    loading.value = true;
    const db = firebase.firestore();
    // Store the order in the Firebase collection with the order receipt number as the document ID
    await db
      .collection("orders")
      .doc(order.orderReceiptNumber)
      .set(order.value);
    // Check if there is a selected customer
    if (selectedCustomerObject.number) {
      // Find the customer in the customers array whose number matches the selected customer's number
      const matchingCustomer = customerStore.customers.find((customer) => {
        return customer.number === selectedCustomerObject.number;
      });

      if (matchingCustomer) {
        // The customer exists in the customers array
        // Continue with the rest of the checkout process
        const customerDocId = matchingCustomer.id;
        // Create a reference to the customer's Firestore document
        const customerRef = db.collection("customers").doc(customerDocId);

        // Use the get() method to check if the customer document exists
        const customerSnapshot = await customerRef.get();

        if (customerSnapshot.exists) {
          // The customer document exists
          const customerData = customerSnapshot.data();

          // Calculate the new values for ProductCount and AmountCount
          let newProductCount;
          let newAmountCount;

          if (discountedTotal.value) {
            newProductCount =
              (customerData.ProductCount || 0) + totalItems.value;
            newAmountCount =
              (customerData.AmountCount || 0) + discountedTotal.value;
          } else {
            newProductCount =
              (customerData.ProductCount || 0) + totalItems.value;
            newAmountCount = 
              (customerData.AmountCount || 0) + parseFloat(totalPrice.value.replace(/,/g, ""));
          }

          // Update the customer document with the new values
          const updates = {
            ProductCount: newProductCount,
            AmountCount: newAmountCount,
          };

          if (!customerData.orderCount) {
            updates.orderCount = 1;
          } else {
            updates.orderCount = firebase.firestore.FieldValue.increment(1);
          }

          await customerRef.update(updates);

        } else {
          // The customer does not exist in the customers array
          // Handle the case where the selected customer's number does not match any customer
          window.alert("Selected customer not found in the customers array.");
          return;
        }
      } else {
        // The customer does not exist in the customers array
        // Handle the case where the selected customer's number does not match any customer
        window.alert("Selected customer not found in the customers array.");
        return;
      }
    }
    // Iterate through cart items and reduce stock in the database
    for (const cartItem of cartItems.value) {
      const productId = cartItem.product.id;
      const productRef = db.collection("products").doc(productId);
      const productSnapshot = await productRef.get();
      const productData = productSnapshot.data();
      const currentStock = productData.stockQuantity;
console.log(productData);
      if (currentStock >= cartItem.quantity) {
        // Reduce stock by the quantity in the carts
        await productRef.update({
          stockQuantity: currentStock - cartItem.quantity,
          amount: (currentStock - cartItem.quantity) * productData.price,
        });

 
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
    loading.value = false;
    showReceiptModal();
  } catch (error) {
    console.log(error);
    loading.value = false;
    isCheckoutLoading.value = false;
  }
};

// Watch for changes in the customerLookup field
watch(customerLookup, (newValue) => {
  // If the input becomes empty or contains only whitespace, set it to the default customer after a delay
  if (!newValue.trim()) {
    // If the input becomes empty or contains only whitespace, set it to the default customer after a delay
    setTimeout(() => {
      customerLookup.value =
        defaultCustomer.value[0].name + " - " + defaultCustomer.value[0].number;
    }, 5000); // Adjust the delay time (in milliseconds) as needed
  }
});
</script>
