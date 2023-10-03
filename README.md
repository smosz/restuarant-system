# test1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### import data to firestore
<!-- const importDataToFirestore = async () => {
  try {
        const response = await fetch('/category-list.json'); // Specify the correct path to your JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();

        for (const category of jsonData) {
          const docId = category.id; // Use the "id" as the document ID (UID)
          const categoryData = { ...category };
          await db.collection('categories').doc(docId).set(categoryData); // Replace with your Firestore collection name
        }
        console.log('Data imported into Firestore successfully.');
      } catch (error) {
        console.error('Error importing data into Firestore:', error);
      } -->
};