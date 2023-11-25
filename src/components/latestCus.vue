<template>
  <div class="flex justify-between">
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <h5
          class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          Latest Customers
        </h5>
        <router-link
          :to="{ name: 'Customers' }"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >View All</router-link
        >
      </div>
      <div >
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
  <li class="py-3 sm:py-4" v-for="order in orders" :key="order.id">
    <div class="flex flex-col sm:flex-row items-center sm:space-x-4 justify-between">
      <div class="flex-shrink-0 text-gray-600 font-semibold">
        <p>
          {{ order.date }}
        </p>
        <p>
          {{ order.time }}
        </p>
      </div>
      <div class="min-w-0 mt-2 sm:mt-0">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          {{ order.customer.name }}
        </p>
        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
          {{ order.customer.number }}
        </p>
      </div>
      <div class="mt-2 sm:mt-0">
        <p class="text-base font-semibold text-gray-900 dark:text-white">
          {{ order.totalItems }}
        </p>
      </div>
      <div class="mt-2 sm:mt-0">
        <p class="text-base font-semibold text-gray-900 dark:text-white">
          {{
            order.discountAmount > 0
              ? "UGX " + order.discountAmount.toLocaleString()
              : "UGX " + order.totalAmount
          }}
        </p>
      </div>
    </div>
  </li>
</ul>

      </div>
    </div>
    <el-tabs class="w-full max-w-md h-max" v-model="activeName">
      <el-tab-pane label="Today" name="first" class="px-2">
        <div
          class="w-full max-w-md p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Sales
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ todayOrders.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ calculateTotalSalesToday }}
            </h5>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
               Products Sold
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ totalItemsOrdered }}
            </div>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
               Expenses
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ expenses.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ calculateTodayExpenses }}
            </h5>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Weekly" name="second" class="px-2">
        <div
          class="w-full mb-3 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Sales
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ weeklysalesFiltered.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ weeklySales }}
            </h5>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 bg-white border mb-3 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Products Sold
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ totalItemsOrderedWeekly }}
            </div>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 bg-white border  border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Expenses
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ weeklyExpensesFiltered.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ calculateWeeklyExpenses }}
            </h5>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Monthly" name="third" class="px-2">
        <div
          class="w-full max-w-md p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
              Sales
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ monthlysalesFiltered.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ monthlySales }}
            </h5>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
             Products Sold
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ totalItemsOrderedMonthly }}
            </div>
          </div>
        </div>
        <div
          class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max"
        >
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
             Expenses
            </h1>
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{ monthlyExpensesFiltered.length }}
            </div>
          </div>
          <div class="flow-root">
            <h5 class="text-xl font-bold leading-none text-[fuchsia]">
              UGX {{ calculateMonthlyExpenses }}
            </h5>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <h5
          class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          Latest Sales
        </h5>
        <router-link
          :to="{ name: 'Orders' }"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >View All</router-link
        >
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
  <li class="py-3 sm:py-4" v-for="order in orders" :key="order.id">
    <div class="flex flex-col sm:flex-row items-center sm:space-x-4 justify-between">
      <div class="flex-shrink-0 text-gray-600 font-semibold">
        <p>
          {{ order.date }}
        </p>
        <p>
          {{ order.time }}
        </p>
      </div>
      <div class="min-w-0 mt-2 sm:mt-0">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          #000{{ order.orderReceiptNumber }}
        </p>
        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
          {{ order.customer.name }}
        </p>
      </div>
      <div class="mt-2 sm:mt-0">
        <p class="text-base font-semibold text-gray-900 dark:text-white">
          {{ order.totalItems }}
        </p>
      </div>
      <div class="mt-2 sm:mt-0">
        <p class="text-base font-semibold text-gray-900 dark:text-white">
          {{
            order.discountAmount > 0
              ? "UGX " + order.discountAmount.toLocaleString()
              : "UGX " + order.totalAmount
          }}
        </p>
      </div>
    </div>
  </li>
</ul>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const totalAmounts = ref([]);
const orders = ref([]);
const npe = ref([]);
const weekly = ref([]);
const expenses = ref([]);
const weeklyExpenses = ref([]);
const weeklyExpensesFiltered = ref([]);
const monthlyExpenses = ref([]);
const monthlyExpensesFiltered = ref([]);
const activeName = "first";
const weeklySales = ref(0);
const weeklysales = ref([]);
const weeklysalesFiltered = ref([]);
const weeklyTotalAmounts = ref([]);
const todayOrders = ref([]);
const monthlysales = ref([]);
const monthlysalesFiltered = ref([]);
const monthlySales=ref(0)
const monthlyTotalAmounts = ref([]);
const monthly=ref([])
const db = firebase.firestore();
// Get the current date and time
const currentDateTime = new Date();
const dayOfWeek = currentDateTime.getDay();
// Adjust the start date to the beginning of the day (midnight)
const startOfWeek = new Date(currentDateTime);
startOfWeek.setDate(
  currentDateTime.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
);
currentDateTime.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);

const startDate = `${startOfWeek.getFullYear()}-${
  startOfWeek.getMonth() + 1
}-${startOfWeek.getDate()}`;
const endDate = `${endOfWeek.getFullYear()}-${
  endOfWeek.getMonth() + 1
}-${endOfWeek.getDate()}`;
const specifiedStartDate = new Date(startDate);
const specifiedEndDate = new Date(endDate);
const startOfMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 1);
    const endOfMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth() + 1, 0);
// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${
  currentDateTime.getMonth() + 1
}-${currentDateTime.getFullYear()}`;
// Function to fetch and populate the latest 5 orders
const fetchLatestOrders = async () => {
  try {
    const latestOrdersSnapshot = await db
      .collection("orders")
      .orderBy("timestamp", "desc")
      .limit(5)
      .get();

    orders.value = latestOrdersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const todayOrdersSnapshot = await db
      .collection("orders")
      .where("date", "==", formattedDate) // Filter orders with a matching date
      .get();

    todayOrders.value = todayOrdersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    npe.value = todayOrdersSnapshot.docs.map((doc) => {
      const orderData = doc.data();
      return orderData.discountAmount > 0
        ? orderData.discountAmount
        : orderData.totalAmount;
    });

    totalAmounts.value = npe.value.map((item) => {
      if (typeof item === "string") {
        // Remove any commas and convert to a number
        return parseFloat(item.replace(/,/g, ""));
      } else if (typeof item === "number") {
        // If it's already a number, no need to convert
        return item;
      } else {
        // Handle other data types or invalid data here
        return null; // or some default value
      }
    });

    const weeklyOrdersSnapshot = await db.collection("orders").get();
    const monthlyOrdersSnapshot = await db.collection("orders").get();
    weeklysales.value = weeklyOrdersSnapshot.docs.map((doc) => doc.data());
    monthlysales.value = monthlyOrdersSnapshot.docs.map((doc) => doc.data());
    
    // Filter orders with a date greater than the target date
    weeklysalesFiltered.value = weeklysales.value.filter((order) => {
      const parts = order.date.split("-");
      const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return dateObject >= specifiedStartDate && dateObject <= specifiedEndDate;
    });
    monthlysalesFiltered.value = monthlysales.value.filter((order) => {
      const parts = order.date.split("-");
      const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return  dateObject >= startOfMonth && dateObject <= endOfMonth
    });
    
    monthly.value = monthlysalesFiltered.value.map((order) => {
      if (order.discountAmount > 0) {
        return order.discountAmount; // Use discountAmount for orders with a discount
      } else {
        return order.totalAmount; // Use totalAmount for orders without a discount
      }
    });
    
    monthlyTotalAmounts.value = monthly.value.map((item) => {
      if (typeof item === "string") {
        // Remove any commas and convert to a number
        return parseFloat(item.replace(/,/g, ""));
      } else if (typeof item === "number") {
        // If it's already a number, no need to convert
        return item;
      } else {
        // Handle other data types or invalid data here
        return null; // or some default value
      }
    });
     const monthlyTotalAmount = monthlyTotalAmounts.value.reduce(
      (total, amount) => {
        return total + amount;
      },
      0
    );
    monthlySales.value = monthlyTotalAmount.toLocaleString();
    weekly.value = weeklysalesFiltered.value.map((order) => {
      if (order.discountAmount > 0) {
        return order.discountAmount; // Use discountAmount for orders with a discount
      } else {
        return order.totalAmount; // Use totalAmount for orders without a discount
      }
    });

    weeklyTotalAmounts.value = weekly.value.map((item) => {
      if (typeof item === "string") {
        // Remove any commas and convert to a number
        return parseFloat(item.replace(/,/g, ""));
      } else if (typeof item === "number") {
        // If it's already a number, no need to convert
        return item;
      } else {
        // Handle other data types or invalid data here
        return null; // or some default value
      }
    });
    // Calculate the weekly total amount of the filtered dates
    const weeklyTotalAmount = weeklyTotalAmounts.value.reduce(
      (total, amount) => {
        return total + amount;
      },
      0
    );
    weeklySales.value = weeklyTotalAmount.toLocaleString();
  } catch (error) {
    window.alert("Error fetching the latest orders");
  }
};

const calculateTotalSalesToday = computed(() => {
  const total = totalAmounts.value.reduce((total, amount) => total + amount, 0);

  if (total > 0) {
    return total.toLocaleString();
  } else {
    return " 0";
  }
});

const totalItemsOrdered = computed(() => {
  return todayOrders.value.reduce(
    (total, todayOrder) => total + todayOrder.totalItems,
    0
  );
});
const totalItemsOrderedWeekly = computed(() => {
  return weeklysalesFiltered.value.reduce(
    (total, todayOrder) => total + todayOrder.totalItems,
    0
  );
});
const totalItemsOrderedMonthly = computed(() => {
  return monthlysalesFiltered.value.reduce(
    (total, todayOrder) => total + todayOrder.totalItems,
    0
  );
});
// Function to fetch and populate the expenses list
const fetchExpenses = async () => {
  try {
    const expensesSnapshot = await db
      .collection("expenses")
      .where("date", "==", formattedDate)
      .get();
    expenses.value = expensesSnapshot.docs.map((doc) => doc.data());
    const expensesWeeklySnapshot = await db.collection("expenses").get();
    weeklyExpenses.value = expensesWeeklySnapshot.docs.map((doc) => doc.data());
    const expensesMonthlySnapshot = await db.collection("expenses").get();
    monthlyExpenses.value = expensesMonthlySnapshot.docs.map((doc) => doc.data());
    weeklyExpensesFiltered.value = weeklyExpenses.value.filter(
      (weeklyExpense) => {
        const parts = weeklyExpense.date.split("-");
        const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        return (
          dateObject >= specifiedStartDate && dateObject <= specifiedEndDate
        );
      }
    );
    monthlyExpensesFiltered.value = monthlyExpenses.value.filter(
      (monthlyExpense) => {
        const parts = monthlyExpense.date.split("-");
        const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        return (
          dateObject >= startOfMonth && dateObject <= endOfMonth
        );
      }
    );
  } catch (error) {
    window.alert("Error fetching expenses");
  }
};
const calculateTodayExpenses = computed(() => {
  const total = expenses.value.reduce(
    (total, expense) => total + expense.totalAmount,
    0
  );

  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
const calculateWeeklyExpenses = computed(() => {
  const total = weeklyExpensesFiltered.value.reduce(
    (total, weeklyExpense) => total + weeklyExpense.totalAmount,
    0
  );

  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
const calculateMonthlyExpenses = computed(() => {
  const total = monthlyExpensesFiltered.value.reduce(
    (total, monthlyExpense) => total + monthlyExpense.totalAmount,
    0
  );

  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
// Fetch the latest 5 orders when the component is mounted
onMounted(() => {
  fetchLatestOrders();
  fetchExpenses();
});
</script>
