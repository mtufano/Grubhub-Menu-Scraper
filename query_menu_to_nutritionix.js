const fs = require('fs');

const nutritionix = require("nutritionix-api");
const YOUR_APP_ID   = '5d0b7d81'; // 
const YOUR_API_KEY  = 'c72684aac2854815e4cce3ecd1a99d54'; // Your KEY
nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);


// fs.readFile('newyork/mcdonald_s/mcdonald_s.json', 'utf8', async (err, data) => {
//     if (err) {
//         console.log(`Error reading file from disk: ${err}`);
//     } else {
//         const restaurant = JSON.parse(data);
//         const menuItems = restaurant.menu_items;
//         const restaurantName = restaurant.name;
//         for (let item of menuItems) {
//             let query = `${restaurant.name} ${item.food_name}`;
//             let result = await nutritionix.natural.search(query);
//             console.log(result);
//         }
//     }
// });



// fs.readFile('newyork/mcdonald_s/mcdonald_s.json', 'utf8', async (err, data) => {
//     if (err) {
//         console.log(`Error reading file from disk: ${err}`);
//     } else {
//         const restaurant = JSON.parse(data);
//         const menuItems = restaurant.menu_items;
//         for (let item of menuItems) {
//             let query = `${restaurant.name} ${item.food_name}`;
//             let result = await nutritionix.natural.search(query);
            
//             if(result.foods[0].nix_brand_name === null){
//                 console.log('Brand name is null for food item: ' + item.food_name);
//             } else {
//                 console.log(result);
//             }
//         }
//     }
// });

fs.readFile('newyork/mcdonald_s/mcdonald_s.json', 'utf8', async (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const restaurant = JSON.parse(data);
        const menuItems = restaurant.menu_items;

        for (let item of menuItems) {
            // Assuming item object has a brand_name property.
            // Adjust this line to match your data structure.
            if (item.brand_name === null) {
                console.log('Brand name is null for food item: ' + item.food_name);
                continue; // Skip this iteration and go to the next food item.
            }
            
            let query = `${restaurant.name} ${item.food_name}`;
            
            try {
                let result = await nutritionix.natural.search(query);

                if (result.foods && result.foods[0] && result.foods[0].nix_brand_name === null) {
                    console.log('No brand name found for the food item on Nutritionix: ' + item.food_name);
                } else {
                    console.log(result);
                }
            } catch(error) {
                console.log('Error occurred during nutritionix.natural.search:', error);
            }
        }
    }
});
