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
        <div class="flex justify-between">
          <label for="customerSelect" class="block text-lg font-semibold">
            Search Customer:
          </label>
          <label
            for="selectedCustomer"
            class="block text-lg font-semibold mr-[8%]"
          >
            Selected Customer:
          </label>
        </div>

        <div class="flex items-center w-[55%]">
          <!-- Customer (Autocomplete Input) -->
          <div>
            <input
              type="text"
              id="customer"
              placeholder="Look up Customer"
              v-model="searchCus"
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
          <!-- Field for selected customer -->
          <div v-if="selectedCustomer" class="ml-[12%]">
            <input
              type="text"
              id="selectedCustomer"
              v-model="customerLookup"
              class="border border-gray-300 px-2 pb-1 pt-[0.2rem]"
              :disabled="true"
            />
          </div>
        </div>
        <!-- Auto-suggested customers dropdown -->
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

      <!-- Add New Customer (if needed) -->
      <div v-if="showCustomerInput" class="mb-4">
        <label for="newCustomerName" class="block text-lg font-semibold">
          Add New Customer:
        </label>
        <div class="flex space-x-4">
          <input
            type="text"
            id="newCustomerName"
            v-model="v$.newCustomerName.$model"
            :class="
              v$.newCustomerName.$error
                ? 'cus-error'
                : 'border border-gray-300 p-2 w-[45%]'
            "
            placeholder="Customer Name"
          />
          <input
            type="text"
            id="newCustomerPhone"
            placeholder="07 XX XXX XXX"
            v-model="v$.newCustomerPhone.$model"
            :class="
              v$.newCustomerPhone.$error
                ? 'cus-error'
                : 'border border-gray-300 p-2 w-[45%]'
            "
          />

          <button
            v-if="!v$.newCustomerPhone.$error && !v$.newCustomerName.$error"
            @click="addCustomer"
            class="bg-cyan-500 text-white px-4 py-2"
          >
            <span v-if="loading"> Adding... </span><span v-else> Add </span>
          </button>
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
// import {
//   getDatabase,
//   ref as stRef,
//   get,
//   query,
//   set,
//   update,
//   orderByChild,
//   limitToLast,
// } from "firebase/database";
import "firebase/compat/firestore";
import orderDisplay from "./orderDisplay.vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  numeric,
  maxLength,
  alpha,
  helpers,
} from "@vuelidate/validators";
const error = ref(false);
const errorMsg = ref("");

const isReceiptModalVisible = ref(false);
import { useCategoryStore } from "../stores/categories.js";
const showReceiptModal = () => {
  isReceiptModalVisible.value = true;
};

const closeReceiptModal = () => {
  isReceiptModalVisible.value = false;
  location.reload();
};
// const clicks = ref(1);

  
//  const  product= {
//   sku: "FB001", // Customize the SKU as needed
//     name: "facebeat", // Set the name property
//     price: 30000,
//     stockQuantity: 100,
//   }
  
// // Method to add the "facebeat" product
// const addFaceBeatProduct = () => {
//   clicks.value++;
//   productStore.addToCart(product);
// };
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
const searchCus = ref("");
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
const formatPhoneNumber = () => {
  const Regex = /07[0-9]/;
  const num = newCustomerPhone.value;
  if (Regex.test(num)) {
    return true;
  } else {
    return false;
  }
};
const rules = computed(() => {
  return {
    newCustomerName: {
      required: helpers.withMessage("Name required", required),

      alpha: helpers.withMessage("Name contains only letters", alpha),
      $autoDirty: true,
    },
    newCustomerPhone: {
      required: helpers.withMessage("Number required", required),
      numeric: helpers.withMessage("Number must be numeric", numeric),
      maxLength: helpers.withMessage(
        "Number must be 10 digits long",
        maxLength(10)
      ),
      formatPhoneNumber: helpers.withMessage(
        "Invalid Format",
        formatPhoneNumber
      ),
      minLength: helpers.withMessage(
        "Number must be 10 digits long",
        minLength(10)
      ),
      $autoDirty: true,
    },
  };
});
const v$ = useVuelidate(rules, { newCustomerPhone, newCustomerName });
const addCustomer = async () => {
  const userData = await v$.value.$validate();
  if (userData && !v$.value.$error) {
    loading.value = true;
    try {
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
      customerStore.fetchCustomers();
      customerLookup.value =
        newCustomerName.value + " - " + newCustomerPhone.value;
      loading.value = false;
      newCustomerName.value = false;
      newCustomerPhone.value = false;
      // Hide the new customer input fields
      showCustomerInput.value = false;
    } catch (err) {
      loading.value = false;
      error.value = true;
      errorMsg.value = err.message;
    }
  } else {
    return;
  }
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

const updateCustomerData = async (
  customerDocId,
  totalItems,
  totalAmount,
  formattedDate,
  formattedTime
) => {
  const customerRef = db.collection("customers").doc(customerDocId);
  const customerSnapshot = await customerRef.get();
  if (customerSnapshot.exists) {
    const customerData = customerSnapshot.data();

    const newProductCount = (customerData.ProductCount || 0) + totalItems;
    const newAmountCount = (customerData.AmountCount || 0) + totalAmount;

    const updates = {
      ProductCount: newProductCount,
      AmountCount: newAmountCount,
      lastPurchaseDate: formattedDate,
      lastPurchaseTime: formattedTime,
      lastOrderReceipt: orderReceiptNumber.value,
    };

    if (!customerData.orderCount) {
      updates.orderCount = 1;
    } else {
      updates.orderCount = firebase.firestore.FieldValue.increment(1);
    }

    await customerRef.update(updates);
  }
};

const updateProductStock = async () => {
  for (const cartItem of cartItems.value) {
    if (cartItem.product.name === "FACEBEAT") {
      continue; // Skip the "FACEBEAT" product
    }else{
      const productId = cartItem.product.id;
    const productRef = db.collection("products").doc(productId);

    // const productsRef = stRef(dbs, "/products/" + productId);
    // const productsSnapshot = await get(productsRef);

    // const productsData = productsSnapshot.val();
    const productSnapshot = await productRef.get();
    const productData = productSnapshot.data();
    // const currentProductStock = productsData.stockQuantity;
    // const currentProductSold = productsData.sold;
    const currentStock = productData.stockQuantity;
    const currentSold = productData.sold;

    if (
      currentStock >= cartItem.quantity
      // ||
      // currentProductStock >= cartItem.quantity
    ) {
      const newStockQuantity = currentStock - cartItem.quantity;
      const newSold = productData.sold + cartItem.quantity;
      // const newProductStockQuantity = currentProductStock - cartItem.quantity;
      // const newProductSold = productsData.sold + cartItem.quantity;

      const previousSoldQty = currentSold;
      // const previousProductSoldQty = currentProductSold;
      // Calculate the customPrice based on your logic
      const newCustomPrice = customPriceToUpdate.value;

      // Update the Firestore document with the new customPrice
      await productRef.update({
        stockQuantity: newStockQuantity,
        amount: newStockQuantity * productData.price,
        pevSold: previousSoldQty,
        sold: newSold,
        customPrice: newCustomPrice, // Include the calculated customPrice
      });

      // await update(productsRef, {
      //   stockQuantity: newProductStockQuantity,
      //   amount: newProductStockQuantity * productsData.price,
      //   pevSold: previousProductSoldQty,
      //   sold: newProductSold,
      //   customPrice: newCustomPrice, // Include the calculated customPrice

      // });
    } else {
      window.alert(`Insufficient stock for product: ${productData.name}`);
      return;
    }
    }
    
  }
};

const updateProductRanking = async () => {
  // Update the ranking and initialRank fields for products
  const productsRef = db.collection("products");
  // const productsDataRef = stRef(dbs, "/products");
  // const prod = await get(productsDataRef);
  // const productSnapshot2 = Object.values(prod.val()).map((product) => ({
  //   ...product,
  // }));

  // productSnapshot2.sort((a, b) => b.sold - a.sold);

  let rank = 1;
  const updates = [];

  // for (const product of productSnapshot2) {
  //   const productId = product.id;
  //   const initialRank = product.ranking || null;
  //   await update(stRef(dbs, "/products/" + productId), {
  //     ranking: rank,
  //     initialRank: initialRank,
  //   });
  //   rank++;
  // }

  const productsSnapshot = await productsRef.orderBy("sold", "desc").get();
  productsSnapshot.forEach((doc) => {
    const productData = doc.data();
    const productId = doc.id;
    const initialRank = productData.ranking || null;
    updates.push({
      id: productId,
      ranking: rank,
      initialRank: initialRank,
    });
    rank++;
  });

  const batch = db.batch();
  updates.forEach((update) => {
    const productRef = productsRef.doc(update.id);
    batch.update(productRef, update);
  });

  await batch.commit();
};

const checkout = async () => {
  if (cartItems.value.length === 0) {
    window.alert("Cart is empty. Cannot proceed with checkout.");
    return;
  }

  if (change.value === null) {
    window.alert("Insufficient cash provided for checkout.");
    return;
  }

  const totalAmount = calculateOrderTotal();
  const customerObject = {
    id: customerorderid.value,
    name: customerLookup.value ? customerLookup.value.split(" - ")[0] : "",
    number: customerLookup.value ? customerLookup.value.split(" - ")[1] : "",
  };

  try {
    isCheckoutLoading.value = true;
    loading.value = true;

    if (customerObject.number) {
      const matchingCustomer = customerStore.customers.find(
        (customer) => customer.number === customerObject.number
      );

      if (matchingCustomer) {
        const customerDocId = matchingCustomer.id;
        await updateCustomerData(
          customerDocId,
          totalItems.value,
          totalAmount,
          formattedDate,
          formattedTime
        );
      } else {
        window.alert("Selected customer not found in the customers ");
        return;
      }
    }

    await updateProductStock();
    await updateProductRanking();
    const discountPercentage = discount.value || 0;
    // Create an order object containing all the information
    const order = ref({
      orderReceiptNumber: orderReceiptNumber.value,
      customer: customerObject,
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
      totalAmount: totalAmount,
      discount: discountPercentage,
      discountAmount: discountedTotal.value,
      cashGiven: moneyGiven.value,
      change: change.value,
      date: formattedDate,
      time: formattedTime,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await db
      .collection("orders")
      .doc(order.orderReceiptNumber)
      .set(order.value);
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
