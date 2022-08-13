import bcrypt from 'bcrypt'

const data = {
    users:[
        {
    name:"Roshan",
    email:"admin@gmail.com",
    password:bcrypt.hashSync("1234",8),
    isAdmin:true,
    }, 
    {
    name:"Vishal",
    email:"user@gmail.com",
    password:bcrypt.hashSync("1234",8),
    isAdmin:false,
    },
],

    products:[
        {
           
            name: "Apple iPhone 13 Pro Max (128GB) - Sierra Blue",
            category:"Apple ios",
            image:"/images/Iphone13promax.jpg",
            price: `1,30,900`,
            countInStock:18,
            brand:"Apple",
            rating:5.0,
            numReviews:10,
            description:"The iPhone 13 Pro Max is Apple's biggest phone in the lineup with a massive, '6.7' screen that for the first time in an iPhone comes with 120Hz ProMotion display that ensures super smooth scrolling"
        },
        {
           
            name: "Huawei P50 Pro 4G (Cocoa Gold, 8GB RAM, 256GB Storage)",
            category:"Smartphones",
            image:"/images/HuaweiP50Pro4G.jpg",
            price: `90,000`,
            countInStock:9,
            brand:"Huawei",
            rating:4.0,
            numReviews:17,
            description: "Equipped with impressive features and decent specifications, the Huawei P50 Pro is a perfect choice that is available at a starting price of Rs 68,890. The phone offers a slip-free grip as it is light in weight and is easy to carry"
        },
        {
          
            name: "OnePlus 10 Pro 5G (Volcanic Black, 12GB RAM, 256GB Storage)",
            category:"Smartphones",
            image:"/images/onePlus10Pro5G.jpg",
            price: `71,999`,
            countInStock:25,
            brand:"OnePlus",
            rating:4.5,
            numReviews:15,
            description:  "OnePlus 10 Pro is one of the most popular smartphones that support the 5G network. This smartphone from OnePlus comes with a different design in comparison to other OnePlus devices. In addition to this, the phone's dimensions measure 163mm x 73.9 mm x 8.6 mm (height x width x thickness) and it weighs approximately 200.5 grams",
        },
        {
           
            name: "Samsung Galaxy S22 Plus 5G (Phantom White, 8GB, 256GB Storage)",
            category:"Smartphones",
            image:"/images/samsungGalaxyS22+.jpg",
            price: `88,999`,
            countInStock:14,
            brand:"Samsung",
            rating:3.5,
            numReviews:12,
            description:  "Samsung Galaxy S22+ is amongst the newly launched dual SIM smartphones that have a sleek design, striking features, and decent specifications. You can buy this lightweight mobile in Green, Phantom Black, and Phantom White color variants. ",
        },
        {
         
            name: "MOTOROLA e32s (Misty Silver, 4GB RAM 64GB Storage)",
            category:"Google Android",
            image:"/images/motorolaE32s.jpg",
            price: `10,700`,
            countInStock:0,
            brand:"Motorola",
            rating:4.0,
            numReviews:8,
            description:  "Motorola Moto E32s is powered by a 1.8GHz octa-core MediaTek Helio G37 processor that features 4 cores clocked at 1.8GHz and 4 cores clocked at 2.3GHz. It comes with 3GB, 4GB of RAM. The Motorola Moto E32s runs Android 12 and is powered by a 5000mAh battery.",
        },
        {
          
            name: "Oppo Reno5 Pro 5G (Astral Blue, 8GB RAM, 128GB Storage)",
            category:"Smartphones",
            image:"/images/opporeno5pro5g.jpg",
            price: `35,990`,
            countInStock:31,
            brand:"Oppo",
            rating:3.0,
            numReviews:21,
            description:  "Oppo Reno 5 Pro 5G is the new entrant in the family of Oppo smartphones that was launched on January 18, 2021. This is a dual SIM smartphone that Weighs approximately 173 grams and its dimensions are 159.7 mm x 73.2 mm x 7.6 mm (height x width x thickness). Priced at Rs 35,990, you can buy the Reno5 Pro 5G in Astral Blue and Starry Black colors.",
        },
        {
            
            name: "Apple iPhone 12 (128GB) - Blue Apple Care +  ",
            category:"Apple ios",
            image:"/images/iphone12.jpg",
            price: `60,900`,
            countInStock:12,
            brand:"Apple",
            rating:4.5,
            numReviews:25,
            description:  "iPhone 12, the new one in the iPhone 12 series was launched on October 13, 2020. The smartphone features an immersive 6.10-inch touchscreen display that has a resolution of 1170x2532 pixels at a pixel density of 460 pixels per inch (ppi). The dimensions of the mobile are 146.70 mm x 71.50 mm x 7.40 mm (height x width x thickness) and weighs around 164 grams. Further, the iPhone 12 features an IP68 rating for dust and water resistance. You can buy the phone in Black, Green, Red, Blue, and White colors at a starting price of Rs. 79,900. ",
        },
        {
            
            name: "Xiaomi 12 Pro | 5G (Opera Mauve, 12GB RAM, 256GB Storage)",
            category:"Smartphones",
            image:"/images/xiaomi12pro5g.jpg",
            price: `66,999`,
            countInStock:4,
            brand:"Xiaomi",
            rating:3.5,
            numReviews:32,
            description:  "Xiaomi Mi 12 Pro 5G is the new mobile from Xiaomi that was launched in India on April 27, 2022 (Official). This mobile is available at a starting price of Rs 62,999 in different color options. The mobile from Xiaomi comes with a 6.73 inches (17.09 cm) display that has a resolution of 3200 x 1440 Pixels.",
        },
    ]
}
export default data;    