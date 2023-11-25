<template>
  <div class="p-4 bgColor">
    <div class="flex justify-between items-center no-print">
      <h2 class="text-2xl font-semibold mb-4">Order History</h2>
      <router-link to="/pos">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <div class="flex items-center">
            <Icon icon="majesticons:plus-line" />
            <span class="pl-2">Add Order</span>
          </div>
        </button>
      </router-link>
    </div>
    <div class="grid grid-cols-3">
      <div
        class="bg-white shadow-md rounded-lg overflow-hidden tab col-span-3 w-full"
      >
        <div class="overflow-x-auto px-6">
          <div
            class="mt-2 mb-4 flex items-center font-['monospace'] space-x-2 justify-between no-print"
          >
            <div class="flex items-center">
              <!-- Search input field -->
              <input
                type="text"
                v-model="searchQuery"
                @keyup.enter="searchOrders"
                class="search-input"
                placeholder="Search by customer or receipt..."
              />
              <Icon
                icon="mi:filter"
                class="mx-2 cursor-pointer"
                :height="30"
                @click="toggleFilter"
                v-if="filterclose"
              />
              <Icon
                icon="mdi:close-box"
                color="red"
                class="mx-2 cursor-pointer"
                :height="30"
                @click="toggleFilter"
                v-if="filterShow"
              />
              <Icon
                icon="mdi:discount"
                class="mx-2 cursor-pointer"
                :height="30"
                @click="toggleDiscount"
                v-if="showDiscounts"
              />
              <Icon
                icon="tabler:discount-2-off"
                color="red"
                class="mx-2 cursor-pointer"
                :height="30"
                @click="toggleDiscount"
                v-if="hideDiscounts"
              />
            </div>

            <div class="flex ml-auto">
              <Icon
                icon="vscode-icons:file-type-pdf2"
                @click="exportToPDF"
                class="mx-2 cursor-pointer"
                :height="30"
              />
              <Icon
                icon="vscode-icons:file-type-excel2"
                @click="exportToExcel"
                class="mx-2 cursor-pointer"
                :height="30"
              />
              <Icon
                icon="flat-color-icons:print"
                @click="printTable"
                class="mx-2 cursor-pointer"
                :height="30"
              />
            </div>
          </div>

          <table
            class="min-w-full border-collapse border border-gray-300"
            id="order-table"
          >
            <!-- Table header  -->
            <thead>
              <tr>
                <th
                  class="px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%] sm:w-[10%]"
                >
                  <div class="flex items-center justify-center">
                    <span>Date Time</span>
                  </div>
                </th>

                <th
                  class="px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]"
                >
                  <div class="flex items-center justify-center">
                    <span>Order Receipt #</span>
                  </div>
                </th>
                <th
                  class="px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[9%]"
                >
                  <div class="flex items-center justify-center">
                    <span>Customer </span>
                  </div>
                </th>

                <th
                  class="px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Cart Items</span>
                  </div>
                </th>
                <th
                  :class="{
                    'px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[6%]':
                      hideDiscounts,
                    'px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]':
                      showDiscounts,
                  }"
                >
                  <div class="flex items-center justify-center">
                    <span>Total Items</span>
                    <span class="ml-2 no-print">
                      <Icon
                        icon="fa6-solid:sort-up"
                        @click="sortColumn('totalItems', 'asc')"
                        class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      />
                      <Icon
                        icon="fa6-solid:sort-down"
                        @click="sortColumn('totalItems', 'desc')"
                        class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      />
                    </span>
                  </div>
                </th>
                <th
                  :class="{
                    'px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[6%]':
                      hideDiscounts,
                    'px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]':
                      showDiscounts,
                  }"
                >
                  <div class="flex items-center justify-center">
                    <span>Total Amount</span>
                    <span class="ml-2 no-print">
                      <Icon
                        icon="fa6-solid:sort-up"
                        @click="sortColumn('totalAmount', 'asc')"
                        class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      />
                      <Icon
                        icon="fa6-solid:sort-down"
                        @click="sortColumn('totalAmount', 'desc')"
                        class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      />
                    </span>
                  </div>
                </th>
                <th
                  v-if="hideDiscounts"
                  class="px-1 py-1 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[6%]"
                >
                  <div class="flex items-center justify-center">
                    <span>% Discount</span>
                  </div>
                </th>
                <th
                  v-if="hideDiscounts"
                  class="px-1 py-1 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]"
                >
                  <div class="flex items-center justify-center">
                    <span>Discount Amount</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(orderItem, index) in paginatedOrderItems"
                :key="index"
              >
                <td class="px-1 py-4 border border-gray-300 text-center">
                  <p>
                    {{ orderItem.date }}
                  </p>

                  <p>
                    {{ orderItem.time }}
                  </p>
                </td>
                <td class="px-1 py-4 border border-gray-300 text-center">
                  #000{{ orderItem.orderReceiptNumber }}
                </td>
                <td class="px-1 py-4 border border-gray-300 text-center">
                  <p>
                    {{ orderItem.customer.name }}
                  </p>

                  <p>
                    {{ orderItem.customer.number }}
                  </p>
                </td>

                <td class="px-1 py-4 border border-gray-300 text-center">
                  <table class="w-full">
                    <tr>
                      <th class="bg-gray-200 w-[10%]">SKU</th>
                      <th class="bg-gray-200 w-[20%]">orderItem</th>
                      <th class="bg-gray-200 w-[7%]">Qty</th>
                      <th class="bg-gray-200 w-[12%]">Price (UGX)</th>
                      <th class="bg-gray-200 w-[16%]">Amount (UGX)</th>
                    </tr>
                    <tr
                      v-for="(cartItem, cartIndex) in orderItem.cart"
                      :key="cartIndex"
                    >
                      <td class="border border-gray-300">
                        <span class="text-gray-700 font-bold">{{
                          cartItem.product.sku
                        }}</span>
                      </td>
                      <td class="border border-gray-300">
                        <span class="text-gray-700">{{
                          cartItem.product.name
                        }}</span>
                      </td>
                      <td class="border border-gray-300">
                        <span class="text-gray-700">{{
                          cartItem.quantity
                        }}</span>
                      </td>
                      <td class="border border-gray-300">
                        <span class="text-gray-700">{{
                          cartItem.product.price.toLocaleString()
                        }}</span>
                      </td>
                      <td class="border border-gray-300">
                        <span class="text-gray-700">{{
                          calculateTotalPrice(cartItem).toLocaleString()
                        }}</span>
                      </td>
                    </tr>
                  </table>
                </td>

                <td class="px-1 py-4 border border-gray-300 text-center">
                  {{ orderItem.totalItems }}
                </td>
                <td class="px-1 py-4 border border-gray-300 text-center">
                  {{ orderItem.totalAmount }}
                </td>
                <td
                  v-if="hideDiscounts"
                  class="px-1 py-4 border border-gray-300 text-center"
                >
                  {{ orderItem.discount }}
                </td>
                <td
                  v-if="hideDiscounts"
                  class="px-1 py-4 border border-gray-300 text-center"
                >
                  {{ discountAmountWithCommas[index] }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination controls -->
          <div class="mt-4 button-pagination no-print">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-[10px] mr-[25px] bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
            >
              Previous
            </button>
            <!-- Display page numbers -->
            <div class="flex justify-center space-x-2 no-print">
              <span v-for="pageNumber in totalPages" :key="pageNumber">
                <button
                  @click="goToPage(pageNumber)"
                  :class="{
                    'bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer':
                      currentPage === pageNumber,
                    'bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md cursor-pointer':
                      currentPage !== pageNumber,
                  }"
                  class="px-3 py-2 transition duration-300 ease-in-out"
                >
                  {{ pageNumber }}
                </button>
              </span>
            </div>

            <button
              @click="nextPage"
              :disabled="currentPage * itemsPerPage >= sortedOrders.length"
              class="no-print px-3 py-[10px] ml-[25px] bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
            >
              Next
            </button>
          </div>
          <div class="mt-2 text-center no-print">
            <div
              class="bg-gray-200 p-4 rounded-sm shadow-sm flex items-center text-[20px] justify-between"
            >
              <p class="font-semibold text-gray-700">
                Total Orders:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                  >{{ sortedOrders.length }}</span
                >
              </p>
              <p class="font-semibold text-gray-700">
                Total Discounted Orders:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                  >{{ totalDiscountedOrders }}</span
                >
              </p>
              <p class="font-semibold text-gray-700">
                Total Items Ordered:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                >
                  {{ totalItemsOrdered }}</span
                >
              </p>
              <p class="font-semibold text-black">
                Total Orders Price:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                  >UGX {{ totalOrdersPrice }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="filterShow && sortedOrders.length >= 5"
        class="demo-date-picker col-span-1 justify-center border-collapse border border-[aquamarine]"
      >
        <div class="container">
          <h1 class="text-2xl text-center bold">Filter By:</h1>
          <div class="block">
            <span class="demonstration">Date Range</span>
            <el-date-picker
              v-model="dateFilterRange"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="DD-M-YYYY"
              :size="size"
            />
          </div>
          <div class="block">
            <span class="demonstration">Week</span>
            <el-date-picker
              v-model="filterWeek"
              type="week"
              format="[Week] ww"
              placeholder="Pick a week"
            />
          </div>
          <div class="block">
            <span class="demonstration">Month</span>
            <el-date-picker
              v-model="filterMonth"
              type="month"
              placeholder="Pick a month"
              format="MM/YYYY"
            />
          </div>
        </div>
        <div class="container">
          <div class="block">
            <span class="demonstration">Year</span>
            <el-date-picker
              v-model="filterYear"
              type="year"
              placeholder="Pick a year"
            />
          </div>
        </div>
        <div class="container">
          <div class="block">
            <span class="demonstration">Total Items</span>
            <div class="flex justify-center">
              <input
                v-model="minItems"
                type="number"
                class="border-solid border-[1px] ml-2 border-black w-24 sm:w-[4.5rem]"
                placeholder="Min Items"
              />
              <h1 class="ml-2">-</h1>
              <input
                v-model="maxItems"
                type="number"
                class="border-solid border-[1px] ml-2 border-black w-24"
                placeholder="Max Items"
              />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="block">
            <span class="demonstration">Total Amount</span>
            <div class="flex justify-center">
              <input
                v-model="minAmount"
                type="number"
                class="border-solid border-[1px] ml-2 border-black w-24 sm:w-[4.5rem]"
                placeholder="Min Amount"
              />
              <h1 class="ml-2">-</h1>
              <input
                v-model="maxAmount"
                type="number"
                class="border-solid border-[1px] ml-2 border-black w-24 sm:w-[4.5rem]"
                placeholder="Max Amount"
              />
            </div>
          </div>
        </div>
        <el-button type="primary" plain @click="filterBtn">Filter</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from "../stores/orders.js";
import { onMounted, ref, computed, watch } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const dateFilterRange = ref("");
const filterWeek = ref("");
const filterMonth = ref("");
const filterYear = ref("");
const orderStore = useOrdersStore();
const orderItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = 20;
const sortColumnRef = ref(null);
const sortDirection = ref("asc");
const searchQuery = ref("");
const filterShow = ref(false);
const filterclose = ref(true);
const size = ref("default");
const minItems = ref(null);
const maxItems = ref(null);
const minAmount = ref(null);
const maxAmount = ref(null);
const showDiscounts = ref(false);
const hideDiscounts = ref(true);
const toggleFilter = () => {
  filterShow.value = !filterShow.value;
  filterclose.value = !filterclose.value;
  orderStore.fetchOrders();
  orderItems.value = orderStore.orders;
};
const toggleDiscount = () => {
  showDiscounts.value = !showDiscounts.value;
  hideDiscounts.value = !hideDiscounts.value;
  orderStore.fetchOrders();
  orderItems.value = orderStore.orders;
};
// Fetch orders and set the current order on component mount
onMounted(async () => {
  await orderStore.fetchOrders();
  orderItems.value = orderStore.orders;
});

const filterBtn = () => {
  if (dateFilterRange.value) {
    const startDate = dateFilterRange.value[0];
    const endDate = dateFilterRange.value[1];

    // Extract the day, month, year, and time components from startDate and endDate
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();

    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endYear = endDate.getFullYear();

    // Construct formatted start and end date strings
    const formattedStartDate = `${startDay}-${startMonth}-${startYear}`;
    const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;

    // Filter orders by date range
    const filteredOrders = orderStore.orders.filter((orderItem) => {
      const orderDate = new Date(orderItem.date);

      return orderDate >= formattedStartDate && orderDate <= formattedEndDate;
    });

    // Update the orderItems with the filtered data
    orderItems.value = filteredOrders;

    // Reset the current page to the first page when filtering
    currentPage.value = 1;
  } else if (filterWeek.value) {
    // Define a function to get the start and end dates of the selected week
    function getWeekDates(selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setDate(selectedDate.getDate() - selectedDate.getDay()); // Set to the start of the week (Sunday)

      const endDate = new Date(selectedDate);
      endDate.setDate(startDate.getDate() + 6); // Set to the end of the week (Saturday)

      const datesWithinWeek = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        // Format the current date as needed (dd-mm-yyyy)
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const formattedDate = `${currentDay}-${currentMonth}-${currentYear}`;

        datesWithinWeek.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Format the start and end dates
      const startDay = startDate.getDate();
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      const formattedStartDate = `${startDay}-${startMonth}-${startYear}`;

      const endDay = endDate.getDate();
      const endMonth = endDate.getMonth() + 1;
      const endYear = endDate.getFullYear();
      const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;

      return {
        start: formattedStartDate,
        end: formattedEndDate,
        dates: datesWithinWeek,
      };
    }

    // Usage example:
    const currentDates = filterWeek.value; // Use the selected week's value
    const weekDates = getWeekDates(currentDates);

    const filteredOrders = orderStore.orders.filter((orderItem) => {
      // Check if the formatted order date exists within weekDates.dates
      return weekDates.dates.includes(orderItem.date);
    });

    // Update the orderItems with the filtered data
    orderItems.value = filteredOrders;

    // Reset the current page to the first page when filtering
    currentPage.value = 1;
  } else if (filterMonth.value) {
    const month = filterMonth.value.getMonth() + 1;
    const year = filterMonth.value.getFullYear();
    const formattedDate = `${month}-${year}`;
    const filteredOrders = orderStore.orders.filter((orderItem) => {
      // Split the date string into day, month, and year components
      const dateComponents = orderItem.date.split("-"); // Assuming the date is in "dd-mm-yyyy" format

      if (dateComponents.length === 3) {
        const day = parseInt(dateComponents[0], 10);
        const month = parseInt(dateComponents[1], 10) - 1; // Subtract 1 because months are zero-indexed
        const year = parseInt(dateComponents[2], 10);

        // Check if the components are valid numbers
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          // Create a Date object from the components
          const orderDate = new Date(year, month, day);

          // Extract the month and year from the order date
          const orderMonth = orderDate.getMonth() + 1; // Add 1 because months are zero-indexed
          const orderYear = orderDate.getFullYear();

          // Format the order date as "MM-YYYY"
          const formattedOrderDate = `${orderMonth}-${orderYear}`;
          // Compare the formatted order date with the formatted date
          return formattedOrderDate === formattedDate;
        }
      }

      // Return false for invalid date strings or when parsing fails
      return false;
    });

    // Update the orderItems with the filtered data
    orderItems.value = filteredOrders;

    // Reset the current page to the first page when filtering
    currentPage.value = 1;
  } else if (filterYear.value) {
    const year = filterYear.value.getFullYear();
    const formattedDate = `${year}`;
    const filteredOrders = orderStore.orders.filter((orderItem) => {
      // Split the date string into day, month, and year components
      const dateComponents = orderItem.date.split("-"); // Assuming the date is in "dd-mm-yyyy" format

      if (dateComponents.length === 3) {
        const day = parseInt(dateComponents[0], 10);
        const month = parseInt(dateComponents[1], 10) - 1; // Subtract 1 because months are zero-indexed
        const year = parseInt(dateComponents[2], 10);

        // Check if the components are valid numbers
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          // Create a Date object from the components
          const orderDate = new Date(year, month, day);

          // Extract the month and year from the order date

          const orderYear = orderDate.getFullYear();

          // Format the order date as "MM-YYYY"
          const formattedOrderDate = `${orderYear}`;
          // Compare the formatted order date with the formatted date
          return formattedOrderDate === formattedDate;
        }
      }

      // Return false for invalid date strings or when parsing fails
      return false;
    });

    // Update the orderItems with the filtered data
    orderItems.value = filteredOrders;

    // Reset the current page to the first page when filtering
    currentPage.value = 1;
  } else if (
    minItems.value ||
    maxItems.value ||
    minAmount.value ||
    maxAmount.value
  ) {
    try {
      orderItems.value = orderStore.orders.filter((orderItem) => {
        const totalItems = orderItem.totalItems;
        // Convert totalAmount to a number by removing all commas and parsing as a float
        const totalAmount = parseFloat(orderItem.totalAmount.replace(/,/g, ""));

        const totalItemsFilter =
          (minItems.value === null || totalItems >= minItems.value) &&
          (maxItems.value === null || totalItems <= maxItems.value);

        const totalAmountFilter =
          (minAmount.value === null || totalAmount >= minAmount.value) &&
          (maxAmount.value === null || totalAmount <= maxAmount.value);

        return totalItemsFilter && totalAmountFilter;
      });
    } catch (error) {
      window.alert("Error during filtering");
    }
  }
};

// Computed property to calculate total prices for all orders
const totalOrdersPrice = computed(() => {
  return orderItems.value
    .reduce((total, orderItem) => {
      // Check if the discounted amount is greater than zero
      if (orderItem.discountAmount > 0) {
        // If greater than zero, use the discounted amount
        return total + orderItem.discountAmount;
      } else {
        // If not greater than zero, use the total price for this order
        return (
          total +
          orderItem.cart.reduce((cartTotal, cartItem) => {
            return cartTotal + calculateTotalPrice(cartItem);
          }, 0)
        );
      }
    }, 0)
    .toLocaleString();
});

// Computed property to calculate total items ordered
const totalItemsOrdered = computed(() => {
  return orderItems.value.reduce((total, orderItem) => {
    return total + orderItem.totalItems;
  }, 0);
});
// Computed property to calculate total items ordered
const totalDiscountedOrders = computed(() => {
  return orderItems.value.reduce((count, orderItem) => {
    // Assuming you have a property like "discount" in each order object
    if (orderItem.discountAmount > 0) {
      count++;
    }
    return count;
  }, 0);
});
// Calculate the total number of pages based on itemsPerPage and orderItems
const totalPages = computed(() => {
  return Math.ceil(orderItems.value.length / itemsPerPage);
});

// Filter the orders to show only the ones for the current page
const paginatedOrderItems = computed(() => {
  sortOrders();
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return orderItems.value.slice(startIndex, endIndex);
});
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const searchOrders = () => {
  let query = searchQuery.value.toLowerCase().trim();
  // Remove the first four characters if the query starts with '#000'
  if (query.startsWith("#000")) {
    query = query.substring(4);
  }
  if (query === "") {
    // Reset the orderItem list if the search query is empty
    orderStore.fetchOrders();
    orderItems.value = orderStore.orders;
  } else {
    orderItems.value = sortedOrders.value.filter((orderItem) => {
      const customerName = orderItem.customer.name.toLowerCase();
      const customerNumber = orderItem.customer.number.toString();
      const orderReceipt = `000${orderItem.orderReceiptNumber}`.slice(-4);
      return (
        customerName.includes(query) ||
        customerNumber.includes(query) ||
        orderReceipt.includes(query)
      );
    });
  }
};

const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

const nextPage = () => {
  const totalPages = Math.ceil(orderItems.value.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
const discountAmountWithCommas = computed(() => {
  return orderItems.value.map((orderItem) => {
    // Check if the discount amount is greater than zero
    if (orderItem.discountAmount > 0) {
      // Format the discount amount with commas
      return orderItem.discountAmount.toLocaleString();
    } else {
      // If discount amount is zero or negative, return an empty string
      return 0;
    }
  });
});

const sortOrders = () => {
  if (sortColumnRef.value && sortDirection.value) {
    orderItems.value.sort((a, b) => {
      let aValue = a[sortColumnRef.value];
      let bValue = b[sortColumnRef.value];

      // Convert values to numbers for sorting the "Total Items" column
      if (sortColumnRef.value === "totalItems") {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }
      // Convert values to numbers for sorting the "Total Items" and "Total Amount" columns
      if (sortColumnRef.value === "totalAmount") {
        aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
        bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));
      }
      if (sortDirection.value === "asc") {
        return aValue - bValue; // Sort in ascending order
      } else {
        return bValue - aValue; // Sort in descending order
      }
    });
  }
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};
const exportToExcel = () => {
  // Check if 'orderItems' is an array
  if (!Array.isArray(orderItems.value)) {
    window.alert("orderItems is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Format the "Cart Items" data as a string for Excel
  const formattedData = orderItems.value.map((orderItem) => ({
    "Date Time": `${orderItem.date}\n${orderItem.time}`,
    "Order Receipt #": `#000${orderItem.orderReceiptNumber}`,
    Customer: `${orderItem.customer.name}\n${orderItem.customer.number}`,
    "Cart Items": orderItem.cart
      .map(
        (cartItem) =>
          `${cartItem.product.sku}  ${cartItem.product.name}\n Qty: ${
            cartItem.quantity
          }\n Price:  UGX${cartItem.product.price.toLocaleString()}\n Amount:  UGX${calculateTotalPrice(
            cartItem
          ).toLocaleString()}`
      )
      .join("\n"), // Format as a multiline string
    "Total Items": orderItem.totalItems,
    "Total Amount": orderItem.totalAmount,
  }));

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "orders List");
  const workbookOutput = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([workbookOutput], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "order-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};

const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = [
    "Date Time",
    "Order Receipt #",
    "Customer",
    "Cart Items",
    "Total Items",
    "Total Amount",
  ];

  // Define the rows of the table by mapping over your orderItem data
  const rows = orderItems.value.map((orderItem) => {
    // Combine date and time with a line break
    const dateTime = `${orderItem.date}\n${orderItem.time}`;
    const customer = `${orderItem.customer.name}\n${orderItem.customer.number}`;
    // Flatten the cart items into a single string
    const cartItems = orderItem.cart
      .map((cartItem) => {
        return `${cartItem.product.sku}  ${cartItem.product.name}\n Qty: ${
          cartItem.quantity
        }\n Price:  UGX${cartItem.product.price.toLocaleString()}\n Amount:  UGX${calculateTotalPrice(
          cartItem
        ).toLocaleString()}`;
      })
      .join("\n"); // Use newline to separate cart items

    return [
      dateTime,
      "#000" + orderItem.orderReceiptNumber,
      customer,
      cartItems,
      orderItem.totalItems,
      orderItem.totalAmount,
    ];
  });

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("order List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("order-list.pdf");
};
const sortedOrders = computed(() => {
  sortOrders();
  // return orderItems.value;
  // Clone the original orderItems array to avoid sorting the original data
  const clonedOrders = [...orderItems.value];
  sortOrders(clonedOrders); // Apply sorting to the cloned array
  return clonedOrders;
});

const sortColumn = (column, direction) => {
  sortColumnRef.value = column;
  sortDirection.value = direction;
};
const calculateTotalPrice = (cartItem) => {
  return cartItem.product.price * cartItem.quantity;
};

// Watch for changes to searchQuery
watch(
  [
    searchQuery,
    dateFilterRange,
    filterMonth,
    filterWeek,
    filterYear,
    minAmount,
    minItems,
    maxAmount,
    maxItems,
  ],
  () => {
    if (
      searchQuery.value === "" ||
      dateFilterRange.value === "" ||
      filterMonth.value === "" ||
      filterWeek.value === "" ||
      filterYear.value === "" ||
      maxItems.value === "" ||
      maxAmount.value === "" ||
      minItems.value === "" ||
      minAmount.value === ""
    ) {
      orderStore.fetchOrders();
      orderItems.value = orderStore.orders;
    }
  }
);
</script>