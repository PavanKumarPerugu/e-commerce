import { computed, inject } from "@angular/core";
import { Product } from "./models/products";
import { signalStore, withState, withMethods, withComputed, patchState, signalMethod } from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { AddReviewParams, UserReview } from "./models/user-review";


export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
}

export const ECommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState<EcommerceState>({
        products: <Product[]>[
            {
                id: "1",
                name: "Wireless Bluetooth Headphones",
                description: "Noise-cancelling over-ear headphones with deep bass.",
                longDescription: "Experience immersive sound with these wireless Bluetooth headphones featuring active noise cancellation, deep bass, and long-lasting battery life.",
                price: 89.99,
                imageUrl: "/product_images/product_1.png",
                rating: 4.5,
                reviewCount: 120,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "1",
                        productId: "1",
                        userName: "Rahul Sharma",
                        userImageUrl: "/users/user1.png",
                        rating: 5,
                        title: "Amazing Sound Quality!",
                        comment: "The noise cancellation is excellent and bass is very deep. Totally worth the price.",
                        reviewDate: new Date("2025-05-10")
                    },
                    {
                        id: "2",
                        productId: "1",
                        userName: "Priya Verma",
                        userImageUrl: "/users/user2.png",
                        rating: 4,
                        title: "Very Comfortable",
                        comment: "I can wear these for hours without discomfort. Battery life is great too.",
                        reviewDate: new Date("2025-06-02")
                    }
                ]
            },
            {
                id: "2",
                name: "5G Android Smartphone",
                description: "High-performance smartphone with AMOLED display.",
                longDescription: "This 5G Android smartphone delivers blazing-fast performance with a stunning AMOLED display and powerful camera system.",
                price: 699.99,
                imageUrl: "/product_images/product_2.png",
                rating: 4.7,
                reviewCount: 340,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "3",
                        productId: "2",
                        userName: "Amit Patel",
                        userImageUrl: "/users/user3.png",
                        rating: 5,
                        title: "Super Fast Phone",
                        comment: "Performance is blazing fast and camera quality is stunning.",
                        reviewDate: new Date("2025-07-15")
                    },
                    {
                        id: "4",
                        productId: "2",
                        userName: "Sneha Reddy",
                        userImageUrl: "/users/user4.png",
                        rating: 4,
                        title: "Great Display",
                        comment: "AMOLED screen looks beautiful. Battery could be slightly better.",
                        reviewDate: new Date("2025-07-20")
                    }
                ]
            },
            {
                id: "3",
                name: "RGB Gaming Mouse",
                description: "High precision gaming mouse with RGB lighting.",
                longDescription: "Enhance your gaming experience with this high-precision RGB gaming mouse designed for speed and comfort.",
                price: 49.99,
                imageUrl: "/product_images/product_3.png",
                rating: 4.3,
                reviewCount: 89,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "5",
                        productId: "3",
                        userName: "Karan Mehta",
                        userImageUrl: "/users/user5.png",
                        rating: 4,
                        title: "Good for Gaming",
                        comment: "Very responsive and RGB looks awesome.",
                        reviewDate: new Date("2025-04-12")
                    },
                    {
                        id: "6",
                        productId: "3",
                        userName: "Neha Kapoor",
                        userImageUrl: "/users/user6.png",
                        rating: 3,
                        title: "Decent Mouse",
                        comment: "Works well but grip could be better.",
                        reviewDate: new Date("2025-04-18")
                    }
                ]
            },
            {
                id: "4",
                name: "Mechanical Gaming Keyboard",
                description: "Tactile keys with RGB backlighting.",
                longDescription: "Durable mechanical keyboard with tactile feedback and customizable RGB lighting for gaming and productivity.",
                price: 109.99,
                imageUrl: "/product_images/product_4.png",
                rating: 4.6,
                reviewCount: 210,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "7",
                        productId: "4",
                        userName: "Arjun Nair",
                        userImageUrl: "/users/user7.png",
                        rating: 5,
                        title: "Fantastic Keyboard",
                        comment: "Keys feel amazing and RGB lighting is beautiful.",
                        reviewDate: new Date("2025-03-10")
                    },
                    {
                        id: "8",
                        productId: "4",
                        userName: "Divya Singh",
                        userImageUrl: "/users/user8.png",
                        rating: 4,
                        title: "Great Build Quality",
                        comment: "Very sturdy keyboard, perfect for daily use.",
                        reviewDate: new Date("2025-03-18")
                    }
                ]
            },
            {
                id: "5",
                name: "Smart Fitness Watch",
                description: "Track health, steps, and notifications.",
                longDescription: "Monitor your fitness, heart rate, sleep, and notifications with this stylish and long-lasting smart watch.",
                price: 149.99,
                imageUrl: "/product_images/product_5.png",
                rating: 4.5,
                reviewCount: 310,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "9",
                        productId: "5",
                        userName: "Ravi Kumar",
                        userImageUrl: "/users/user9.png",
                        rating: 5,
                        title: "Great Fitness Tracker",
                        comment: "Tracks everything accurately and looks great.",
                        reviewDate: new Date("2025-06-01")
                    },
                    {
                        id: "10",
                        productId: "5",
                        userName: "Anjali Gupta",
                        userImageUrl: "/users/user10.png",
                        rating: 4,
                        title: "Very Useful",
                        comment: "Battery life is excellent and features are useful.",
                        reviewDate: new Date("2025-06-05")
                    }
                ]
            },
            {
                id: "6",
                name: "14-inch Ultrabook Laptop",
                description: "Lightweight laptop with long battery life.",
                longDescription: "A sleek ultrabook designed for portability and performance with long battery life and fast SSD storage.",
                price: 899.99,
                imageUrl: "/product_images/product_6.png",
                rating: 4.4,
                reviewCount: 180,
                inStock: false,
                category: "Electronics",
                reviews: [
                    {
                        id: "11",
                        productId: "6",
                        userName: "Manish Jain",
                        userImageUrl: "/users/user11.png",
                        rating: 5,
                        title: "Perfect for Work",
                        comment: "Lightweight and powerful, great for travel.",
                        reviewDate: new Date("2025-02-20")
                    },
                    {
                        id: "12",
                        productId: "6",
                        userName: "Pooja Shah",
                        userImageUrl: "/users/user12.png",
                        rating: 4,
                        title: "Solid Performance",
                        comment: "Battery lasts long and performance is smooth.",
                        reviewDate: new Date("2025-02-25")
                    }
                ]
            },
            {
                id: "7",
                name: "10-inch Android Tablet",
                description: "Portable tablet with HD display.",
                longDescription: "Enjoy media, browsing, and productivity on this lightweight Android tablet with HD display.",
                price: 299.99,
                imageUrl: "/product_images/product_7.png",
                rating: 4.2,
                reviewCount: 140,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "13",
                        productId: "7",
                        userName: "Vikas Rao",
                        userImageUrl: "/users/user13.png",
                        rating: 4,
                        title: "Good Tablet",
                        comment: "Nice screen and smooth performance.",
                        reviewDate: new Date("2025-01-10")
                    },
                    {
                        id: "14",
                        productId: "7",
                        userName: "Meena Iyer",
                        userImageUrl: "/users/user14.png",
                        rating: 3,
                        title: "Average",
                        comment: "Good but battery could be better.",
                        reviewDate: new Date("2025-01-18")
                    }
                ]
            },
            {
                id: "8",
                name: "Portable Bluetooth Speaker",
                description: "Deep bass speaker with long battery life.",
                longDescription: "Compact and powerful Bluetooth speaker with deep bass and waterproof design.",
                price: 59.99,
                imageUrl: "/product_images/product_8.png",
                rating: 4.6,
                reviewCount: 220,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "15",
                        productId: "8",
                        userName: "Rohit Das",
                        userImageUrl: "/users/user15.png",
                        rating: 5,
                        title: "Awesome Sound",
                        comment: "Bass is amazing for such a small speaker.",
                        reviewDate: new Date("2025-03-01")
                    },
                    {
                        id: "16",
                        productId: "8",
                        userName: "Simran Kaur",
                        userImageUrl: "/users/user16.png",
                        rating: 4,
                        title: "Very Portable",
                        comment: "Easy to carry and sounds great outdoors.",
                        reviewDate: new Date("2025-03-05")
                    }
                ]
            },
            {
                id: "9",
                name: "1TB External Hard Drive",
                description: "Portable storage with fast transfer speeds.",
                longDescription: "Reliable and compact external hard drive with fast data transfer for backups and storage.",
                price: 79.99,
                imageUrl: "/product_images/product_9.png",
                rating: 4.4,
                reviewCount: 160,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "17",
                        productId: "9",
                        userName: "Sanjay Verma",
                        userImageUrl: "/users/user17.png",
                        rating: 5,
                        title: "Very Reliable",
                        comment: "Great for backups and works flawlessly.",
                        reviewDate: new Date("2025-02-01")
                    },
                    {
                        id: "18",
                        productId: "9",
                        userName: "Nikita Arora",
                        userImageUrl: "/users/user18.png",
                        rating: 4,
                        title: "Good Value",
                        comment: "Fast transfer speed and compact size.",
                        reviewDate: new Date("2025-02-06")
                    }
                ]
            },
            {
                id: "10",
                name: "Full HD Webcam",
                description: "1080p webcam for streaming and meetings.",
                longDescription: "Crystal-clear 1080p webcam with built-in mic for meetings and streaming.",
                price: 39.99,
                imageUrl: "/product_images/product_10.png",
                rating: 4.1,
                reviewCount: 95,
                inStock: true,
                category: "Electronics",
                reviews: [
                    {
                        id: "19",
                        productId: "10",
                        userName: "Aakash Singh",
                        userImageUrl: "/users/user19.png",
                        rating: 4,
                        title: "Good Webcam",
                        comment: "Clear video quality for meetings.",
                        reviewDate: new Date("2025-01-12")
                    },
                    {
                        id: "20",
                        productId: "10",
                        userName: "Riya Sharma",
                        userImageUrl: "/users/user20.png",
                        rating: 3,
                        title: "Decent",
                        comment: "Works fine but mic could be better.",
                        reviewDate: new Date("2025-01-15")
                    }
                ]
            },

            // 👉 11–15 (Clothing)
            
            {
                id: "11",
                name: "Men's Cotton T-Shirt",
                description: "Soft and breathable everyday wear.",
                longDescription: "Comfortable cotton t-shirt designed for daily wear with breathable fabric and modern fit.",
                price: 19.99,
                imageUrl: "/product_images/product_11.png",
                rating: 4.2,
                reviewCount: 65,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "21",
                        productId: "11",
                        userName: "Vivek Sharma",
                        userImageUrl: "/users/user21.png",
                        rating: 4,
                        title: "Nice Fabric",
                        comment: "Soft and comfortable to wear all day.",
                        reviewDate: new Date("2025-03-01")
                    },
                    {
                        id: "22",
                        productId: "11",
                        userName: "Kunal Joshi",
                        userImageUrl: "/users/user22.png",
                        rating: 3,
                        title: "Average",
                        comment: "Good but shrinks slightly after wash.",
                        reviewDate: new Date("2025-03-05")
                    }
                ]
            },
            {
                id: "12",
                name: "Women's Denim Jacket",
                description: "Classic denim jacket for all seasons.",
                longDescription: "Stylish and durable denim jacket perfect for layering in any season.",
                price: 59.99,
                imageUrl: "/product_images/product_12.png",
                rating: 4.6,
                reviewCount: 150,
                inStock: false,
                category: "Clothing",
                reviews: [
                    {
                        id: "23",
                        productId: "12",
                        userName: "Neha Sharma",
                        userImageUrl: "/users/user23.png",
                        rating: 5,
                        title: "Love It!",
                        comment: "Perfect fit and stylish design.",
                        reviewDate: new Date("2025-04-01")
                    },
                    {
                        id: "24",
                        productId: "12",
                        userName: "Ritu Singh",
                        userImageUrl: "/users/user24.png",
                        rating: 4,
                        title: "Great Jacket",
                        comment: "Very comfortable and durable.",
                        reviewDate: new Date("2025-04-04")
                    }
                ]
            },
            {
                id: "13",
                name: "Running Sports Shoes",
                description: "Lightweight shoes with breathable mesh.",
                longDescription: "Designed for comfort and performance with breathable mesh and cushioned sole.",
                price: 79.99,
                imageUrl: "/product_images/product_13.png",
                rating: 4.4,
                reviewCount: 200,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "25",
                        productId: "13",
                        userName: "Ajay Kumar",
                        userImageUrl: "/users/user25.png",
                        rating: 5,
                        title: "Very Comfortable",
                        comment: "Perfect for running and workouts.",
                        reviewDate: new Date("2025-02-15")
                    },
                    {
                        id: "26",
                        productId: "13",
                        userName: "Suresh Reddy",
                        userImageUrl: "/users/user26.png",
                        rating: 4,
                        title: "Good Grip",
                        comment: "Nice grip and lightweight feel.",
                        reviewDate: new Date("2025-02-18")
                    }
                ]
            },
            {
                id: "14",
                name: "Fleece Hoodie",
                description: "Warm hoodie for winter comfort.",
                longDescription: "Soft fleece hoodie with cozy lining and adjustable hood for maximum comfort.",
                price: 39.99,
                imageUrl: "/product_images/product_14.png",
                rating: 4.5,
                reviewCount: 130,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "27",
                        productId: "14",
                        userName: "Rahul Das",
                        userImageUrl: "/users/user27.png",
                        rating: 5,
                        title: "Very Warm",
                        comment: "Perfect for winter, very cozy.",
                        reviewDate: new Date("2025-01-10")
                    },
                    {
                        id: "28",
                        productId: "14",
                        userName: "Kiran Patel",
                        userImageUrl: "/users/user28.png",
                        rating: 4,
                        title: "Good Hoodie",
                        comment: "Nice quality and comfortable.",
                        reviewDate: new Date("2025-01-12")
                    }
                ]
            },
            {
                id: "15",
                name: "Slim Fit Jeans",
                description: "Stylish denim jeans with stretch fit.",
                longDescription: "Modern slim-fit jeans with stretchable fabric for comfort and style.",
                price: 49.99,
                imageUrl: "/product_images/product_15.png",
                rating: 4.3,
                reviewCount: 170,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "29",
                        productId: "15",
                        userName: "Rakesh Verma",
                        userImageUrl: "/users/user29.png",
                        rating: 4,
                        title: "Nice Fit",
                        comment: "Fits perfectly and looks stylish.",
                        reviewDate: new Date("2025-02-01")
                    },
                    {
                        id: "30",
                        productId: "15",
                        userName: "Aman Gupta",
                        userImageUrl: "/users/user30.png",
                        rating: 3,
                        title: "Good",
                        comment: "Comfortable but color fades slightly.",
                        reviewDate: new Date("2025-02-05")
                    }
                ]
            },
            {
                id: "16",
                name: "Casual Sneakers",
                description: "Comfortable sneakers for daily wear.",
                longDescription: "Stylish and comfortable sneakers designed for everyday use with cushioned insoles and durable outsole.",
                price: 69.99,
                imageUrl: "/product_images/product_16.png",
                rating: 4.4,
                reviewCount: 190,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "31",
                        productId: "16",
                        userName: "Nikhil Sharma",
                        userImageUrl: "/users/user31.png",
                        rating: 5,
                        title: "Super Comfortable",
                        comment: "Perfect for daily use. Very comfortable.",
                        reviewDate: new Date("2025-03-12")
                    },
                    {
                        id: "32",
                        productId: "16",
                        userName: "Rohit Verma",
                        userImageUrl: "/users/user32.png",
                        rating: 4,
                        title: "Nice Design",
                        comment: "Looks good and feels great.",
                        reviewDate: new Date("2025-03-15")
                    }
                ]
            },
            {
                id: "17",
                name: "Formal Office Shirt",
                description: "Perfect shirt for professional wear.",
                longDescription: "Premium quality formal shirt designed for office and business meetings with a polished look.",
                price: 34.99,
                imageUrl: "/product_images/product_17.png",
                rating: 4.2,
                reviewCount: 85,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "33",
                        productId: "17",
                        userName: "Amit Singh",
                        userImageUrl: "/users/user33.png",
                        rating: 4,
                        title: "Professional Look",
                        comment: "Perfect for office wear.",
                        reviewDate: new Date("2025-02-20")
                    },
                    {
                        id: "34",
                        productId: "17",
                        userName: "Deepak Kumar",
                        userImageUrl: "/users/user34.png",
                        rating: 3,
                        title: "Good",
                        comment: "Fabric is decent but could be better.",
                        reviewDate: new Date("2025-02-22")
                    }
                ]
            },
            {
                id: "18",
                name: "Summer Shorts",
                description: "Lightweight shorts for hot weather.",
                longDescription: "Breathable and lightweight summer shorts designed for comfort in hot weather.",
                price: 24.99,
                imageUrl: "/product_images/product_18.png",
                rating: 4.1,
                reviewCount: 70,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "35",
                        productId: "18",
                        userName: "Sanjay Gupta",
                        userImageUrl: "/users/user35.png",
                        rating: 4,
                        title: "Very Light",
                        comment: "Perfect for summer.",
                        reviewDate: new Date("2025-04-01")
                    },
                    {
                        id: "36",
                        productId: "18",
                        userName: "Vikram Joshi",
                        userImageUrl: "/users/user36.png",
                        rating: 3,
                        title: "Average",
                        comment: "Good but stitching could improve.",
                        reviewDate: new Date("2025-04-03")
                    }
                ]
            },
            {
                id: "19",
                name: "Baseball Cap",
                description: "Adjustable cap with breathable fabric.",
                longDescription: "Classic baseball cap with adjustable strap and breathable fabric for all-day comfort.",
                price: 14.99,
                imageUrl: "/product_images/product_19.png",
                rating: 4.0,
                reviewCount: 55,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "37",
                        productId: "19",
                        userName: "Ravi Sharma",
                        userImageUrl: "/users/user37.png",
                        rating: 4,
                        title: "Nice Cap",
                        comment: "Comfortable and stylish.",
                        reviewDate: new Date("2025-01-10")
                    },
                    {
                        id: "38",
                        productId: "19",
                        userName: "Mohit Arora",
                        userImageUrl: "/users/user38.png",
                        rating: 3,
                        title: "Okay",
                        comment: "Quality is decent for price.",
                        reviewDate: new Date("2025-01-12")
                    }
                ]
            },
            {
                id: "20",
                name: "Cotton Socks Pack",
                description: "Pack of 5 soft cotton socks.",
                longDescription: "Soft and breathable cotton socks designed for all-day comfort and durability.",
                price: 12.99,
                imageUrl: "/product_images/product_20.png",
                rating: 4.3,
                reviewCount: 100,
                inStock: true,
                category: "Clothing",
                reviews: [
                    {
                        id: "39",
                        productId: "20",
                        userName: "Aman Verma",
                        userImageUrl: "/users/user39.png",
                        rating: 5,
                        title: "Very Comfortable",
                        comment: "Soft and durable socks.",
                        reviewDate: new Date("2025-02-10")
                    },
                    {
                        id: "40",
                        productId: "20",
                        userName: "Ritesh Singh",
                        userImageUrl: "/users/user40.png",
                        rating: 4,
                        title: "Good Pack",
                        comment: "Great value for money.",
                        reviewDate: new Date("2025-02-12")
                    }
                ]
            },
            // HOME (21–25)

            {
                id: "21",
                name: "Wooden Coffee Table",
                description: "Modern table for living room decor.",
                longDescription: "Elegant wooden coffee table with sturdy build and modern design for your living room.",
                price: 129.99,
                imageUrl: "/product_images/product_21.png",
                rating: 4.1,
                reviewCount: 45,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "41",
                        productId: "21",
                        userName: "Suresh Kumar",
                        userImageUrl: "/users/user41.png",
                        rating: 4,
                        title: "Nice Table",
                        comment: "Looks great in my living room.",
                        reviewDate: new Date("2025-03-01")
                    },
                    {
                        id: "42",
                        productId: "21",
                        userName: "Anita Sharma",
                        userImageUrl: "/users/user42.png",
                        rating: 3,
                        title: "Decent",
                        comment: "Good but a bit heavy.",
                        reviewDate: new Date("2025-03-04")
                    }
                ]
            },
            {
                id: "22",
                name: "LED Desk Lamp",
                description: "Adjustable brightness desk lamp.",
                longDescription: "Energy-efficient LED desk lamp with adjustable brightness and flexible design.",
                price: 29.99,
                imageUrl: "/product_images/product_22.png",
                rating: 4.5,
                reviewCount: 78,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "43",
                        productId: "22",
                        userName: "Ravi Patel",
                        userImageUrl: "/users/user43.png",
                        rating: 5,
                        title: "Bright and Useful",
                        comment: "Perfect for studying.",
                        reviewDate: new Date("2025-01-20")
                    },
                    {
                        id: "44",
                        productId: "22",
                        userName: "Meera Shah",
                        userImageUrl: "/users/user44.png",
                        rating: 4,
                        title: "Good Lamp",
                        comment: "Brightness control works well.",
                        reviewDate: new Date("2025-01-22")
                    }
                ]
            },
            {
                id: "23",
                name: "Kitchen Blender",
                description: "High-speed blender for smoothies.",
                longDescription: "Powerful blender for smoothies, juices, and food preparation with multiple speed settings.",
                price: 99.99,
                imageUrl: "/product_images/product_23.png",
                rating: 4.3,
                reviewCount: 110,
                inStock: false,
                category: "Home",
                reviews: [
                    {
                        id: "45",
                        productId: "23",
                        userName: "Kavita Sharma",
                        userImageUrl: "/users/user45.png",
                        rating: 5,
                        title: "Very Powerful",
                        comment: "Blends everything smoothly.",
                        reviewDate: new Date("2025-02-14")
                    },
                    {
                        id: "46",
                        productId: "23",
                        userName: "Pankaj Verma",
                        userImageUrl: "/users/user46.png",
                        rating: 4,
                        title: "Good Blender",
                        comment: "Works great for smoothies.",
                        reviewDate: new Date("2025-02-18")
                    }
                ]
            },
            {
                id: "24",
                name: "Minimal Wall Clock",
                description: "Elegant wall clock for home decor.",
                longDescription: "Stylish minimal wall clock with silent movement and modern design.",
                price: 19.99,
                imageUrl: "/product_images/product_24.png",
                rating: 4.2,
                reviewCount: 60,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "47",
                        productId: "24",
                        userName: "Rohini Iyer",
                        userImageUrl: "/users/user47.png",
                        rating: 4,
                        title: "Looks Great",
                        comment: "Matches perfectly with decor.",
                        reviewDate: new Date("2025-03-10")
                    },
                    {
                        id: "48",
                        productId: "24",
                        userName: "Ajit Singh",
                        userImageUrl: "/users/user48.png",
                        rating: 3,
                        title: "Good",
                        comment: "Simple and clean design.",
                        reviewDate: new Date("2025-03-12")
                    }
                ]
            },
            {
                id: "25",
                name: "Decorative Sofa Cushion",
                description: "Soft cushion with stylish design.",
                longDescription: "Comfortable and stylish cushion that enhances your living room decor.",
                price: 15.99,
                imageUrl: "/product_images/product_25.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "49",
                        productId: "25",
                        userName: "Neelam Gupta",
                        userImageUrl: "/users/user49.png",
                        rating: 5,
                        title: "Very Soft",
                        comment: "Adds comfort and style.",
                        reviewDate: new Date("2025-01-05")
                    },
                    {
                        id: "50",
                        productId: "25",
                        userName: "Ritu Verma",
                        userImageUrl: "/users/user50.png",
                        rating: 4,
                        title: "Nice Cushion",
                        comment: "Looks beautiful on sofa.",
                        reviewDate: new Date("2025-01-07")
                    }
                ]
            },
            {
                id: "26",
                name: "4-Tier Bookshelf",
                description: "Spacious wooden storage shelf.",
                longDescription: "Durable 4-tier bookshelf perfect for organizing books and decor items.",
                price: 149.99,
                imageUrl: "/product_images/product_26.png",
                rating: 4.3,
                reviewCount: 75,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "51",
                        productId: "26",
                        userName: "Rajesh Kumar",
                        userImageUrl: "/users/user51.png",
                        rating: 4,
                        title: "Good Storage",
                        comment: "Very spacious and sturdy.",
                        reviewDate: new Date("2025-02-11")
                    },
                    {
                        id: "52",
                        productId: "26",
                        userName: "Sonal Mehta",
                        userImageUrl: "/users/user52.png",
                        rating: 3,
                        title: "Average",
                        comment: "Assembly takes time.",
                        reviewDate: new Date("2025-02-14")
                    }
                ]
            },
            {
                id: "27",
                name: "King Size Bed Sheet",
                description: "Soft cotton bedsheet set.",
                longDescription: "Premium cotton bedsheet set for comfort and durability.",
                price: 39.99,
                imageUrl: "/product_images/product_27.png",
                rating: 4.5,
                reviewCount: 140,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "53",
                        productId: "27",
                        userName: "Meena Sharma",
                        userImageUrl: "/users/user53.png",
                        rating: 5,
                        title: "Very Soft",
                        comment: "Comfortable and good quality.",
                        reviewDate: new Date("2025-01-25")
                    },
                    {
                        id: "54",
                        productId: "27",
                        userName: "Karan Patel",
                        userImageUrl: "/users/user54.png",
                        rating: 4,
                        title: "Nice Fabric",
                        comment: "Feels great and fits well.",
                        reviewDate: new Date("2025-01-28")
                    }
                ]
            },
            {
                id: "28",
                name: "Blackout Curtains",
                description: "Light-blocking curtains for bedrooms.",
                longDescription: "High-quality blackout curtains that block sunlight and reduce noise.",
                price: 44.99,
                imageUrl: "/product_images/product_28.png",
                rating: 4.2,
                reviewCount: 85,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "55",
                        productId: "28",
                        userName: "Anil Verma",
                        userImageUrl: "/users/user55.png",
                        rating: 4,
                        title: "Works Well",
                        comment: "Blocks light effectively.",
                        reviewDate: new Date("2025-03-05")
                    },
                    {
                        id: "56",
                        productId: "28",
                        userName: "Ritu Sharma",
                        userImageUrl: "/users/user56.png",
                        rating: 3,
                        title: "Good",
                        comment: "Decent quality curtains.",
                        reviewDate: new Date("2025-03-08")
                    }
                ]
            },
            {
                id: "29",
                name: "Dining Table Set",
                description: "4-seater wooden dining set.",
                longDescription: "Elegant dining table set perfect for family meals and gatherings.",
                price: 399.99,
                imageUrl: "/product_images/product_29.png",
                rating: 4.4,
                reviewCount: 50,
                inStock: false,
                category: "Home",
                reviews: [
                    {
                        id: "57",
                        productId: "29",
                        userName: "Sunil Kumar",
                        userImageUrl: "/users/user57.png",
                        rating: 5,
                        title: "Beautiful Set",
                        comment: "Looks amazing and very sturdy.",
                        reviewDate: new Date("2025-04-01")
                    },
                    {
                        id: "58",
                        productId: "29",
                        userName: "Pooja Sharma",
                        userImageUrl: "/users/user58.png",
                        rating: 4,
                        title: "Great Quality",
                        comment: "Perfect for family dining.",
                        reviewDate: new Date("2025-04-03")
                    }
                ]
            },
            {
                id: "30",
                name: "Standing Floor Lamp",
                description: "Elegant lamp for living spaces.",
                longDescription: "Modern standing lamp that enhances lighting and decor of your living space.",
                price: 59.99,
                imageUrl: "/product_images/product_30.png",
                rating: 4.3,
                reviewCount: 95,
                inStock: true,
                category: "Home",
                reviews: [
                    {
                        id: "59",
                        productId: "30",
                        userName: "Deepa Nair",
                        userImageUrl: "/users/user59.png",
                        rating: 4,
                        title: "Nice Lighting",
                        comment: "Gives a cozy vibe.",
                        reviewDate: new Date("2025-02-10")
                    },
                    {
                        id: "60",
                        productId: "30",
                        userName: "Arun Gupta",
                        userImageUrl: "/users/user60.png",
                        rating: 3,
                        title: "Decent Lamp",
                        comment: "Good but assembly needed.",
                        reviewDate: new Date("2025-02-12")
                    }
                ]
            },
            {
                id: "31",
                name: "Mystery Thriller Novel",
                description: "Suspense-filled story with twists.",
                longDescription: "A gripping mystery thriller packed with suspense and unexpected twists.",
                price: 14.99,
                imageUrl: "/product_images/product_31.png",
                rating: 4.8,
                reviewCount: 210,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "61",
                        productId: "31",
                        userName: "Ankit Singh",
                        userImageUrl: "/users/user61.png",
                        rating: 5,
                        title: "Couldn’t put it down!",
                        comment: "Every chapter ends with a twist.",
                        reviewDate: new Date("2025-03-11")
                    },
                    {
                        id: "62",
                        productId: "31",
                        userName: "Divya Nair",
                        userImageUrl: "/users/user62.png",
                        rating: 4,
                        title: "Very engaging",
                        comment: "Loved the suspense.",
                        reviewDate: new Date("2025-03-15")
                    }
                ]
            },
            {
                id: "32",
                name: "Science Fiction Adventure",
                description: "Journey through futuristic worlds.",
                longDescription: "Explore futuristic worlds and thrilling adventures.",
                price: 18.99,
                imageUrl: "/product_images/product_32.png",
                rating: 4.6,
                reviewCount: 175,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "63",
                        productId: "32",
                        userName: "Ravi Kumar",
                        userImageUrl: "/users/user63.png",
                        rating: 5,
                        title: "Mind-blowing concepts",
                        comment: "Futuristic ideas are fascinating.",
                        reviewDate: new Date("2025-02-10")
                    },
                    {
                        id: "64",
                        productId: "32",
                        userName: "Megha Jain",
                        userImageUrl: "/users/user64.png",
                        rating: 4,
                        title: "Great imagination",
                        comment: "Story is engaging.",
                        reviewDate: new Date("2025-02-18")
                    }
                ]
            },
            {
                id: "33",
                name: "Self Improvement Guide",
                description: "Boost productivity and mindset.",
                longDescription: "Guide to improving productivity and personal growth.",
                price: 12.99,
                imageUrl: "/product_images/product_33.png",
                rating: 4.2,
                reviewCount: 95,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "65",
                        productId: "33",
                        userName: "Suresh Patel",
                        userImageUrl: "/users/user65.png",
                        rating: 4,
                        title: "Helpful tips",
                        comment: "Practical advice.",
                        reviewDate: new Date("2025-01-20")
                    },
                    {
                        id: "66",
                        productId: "33",
                        userName: "Ananya Das",
                        userImageUrl: "/users/user66.png",
                        rating: 3,
                        title: "Good but basic",
                        comment: "Useful but simple.",
                        reviewDate: new Date("2025-01-25")
                    }
                ]
            },
            {
                id: "34",
                name: "World Cuisine Cookbook",
                description: "Recipes from around the globe.",
                longDescription: "Discover global recipes with this cookbook.",
                price: 22.99,
                imageUrl: "/product_images/product_34.png",
                rating: 4.7,
                reviewCount: 125,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "67",
                        productId: "34",
                        userName: "Pooja Shah",
                        userImageUrl: "/users/user67.png",
                        rating: 5,
                        title: "Amazing recipes!",
                        comment: "Dishes turned out great.",
                        reviewDate: new Date("2025-04-01")
                    },
                    {
                        id: "68",
                        productId: "34",
                        userName: "Kiran Rao",
                        userImageUrl: "/users/user68.png",
                        rating: 4,
                        title: "Very useful",
                        comment: "Good variety.",
                        reviewDate: new Date("2025-04-05")
                    }
                ]
            },
            {
                id: "35",
                name: "History of Civilizations",
                description: "Explore ancient to modern history.",
                longDescription: "Dive into history from ancient to modern era.",
                price: 24.99,
                imageUrl: "/product_images/product_35.png",
                rating: 4.3,
                reviewCount: 80,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "69",
                        productId: "35",
                        userName: "Arjun Iyer",
                        userImageUrl: "/users/user69.png",
                        rating: 4,
                        title: "Informative",
                        comment: "Very detailed.",
                        reviewDate: new Date("2025-03-08")
                    },
                    {
                        id: "70",
                        productId: "35",
                        userName: "Neelam Gupta",
                        userImageUrl: "/users/user70.png",
                        rating: 4,
                        title: "Great read",
                        comment: "Perfect for history lovers.",
                        reviewDate: new Date("2025-03-12")
                    }
                ]
            },
             // FITNESS 36–45
            {
                id: "36",
                name: "Inspirational Biography",
                description: "Story of a remarkable life journey.",
                longDescription: "An inspiring biography that tells the story of determination, success, and overcoming challenges.",
                price: 19.99,
                imageUrl: "/product_images/product_36.png",
                rating: 4.5,
                reviewCount: 140,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "71",
                        productId: "36",
                        userName: "Manish Yadav",
                        userImageUrl: "/users/user71.png",
                        rating: 5,
                        title: "Very inspiring",
                        comment: "Motivated me a lot!",
                        reviewDate: new Date("2025-02-05")
                    },
                    {
                        id: "72",
                        productId: "36",
                        userName: "Shreya Kulkarni",
                        userImageUrl: "/users/user72.png",
                        rating: 4,
                        title: "Good read",
                        comment: "Great life lessons.",
                        reviewDate: new Date("2025-02-09")
                    }
                ]
            },
            {
                id: "37",
                name: "Fantasy Adventure Novel",
                description: "Magic, dragons, and epic quests.",
                longDescription: "An epic fantasy adventure filled with magic, mythical creatures, and heroic quests.",
                price: 17.99,
                imageUrl: "/product_images/product_37.png",
                rating: 4.6,
                reviewCount: 160,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "73",
                        productId: "37",
                        userName: "Rohit Sen",
                        userImageUrl: "/users/user73.png",
                        rating: 5,
                        title: "Epic story",
                        comment: "Loved the world-building.",
                        reviewDate: new Date("2025-03-14")
                    },
                    {
                        id: "74",
                        productId: "37",
                        userName: "Isha Kapoor",
                        userImageUrl: "/users/user74.png",
                        rating: 4,
                        title: "Great fantasy",
                        comment: "Very engaging storyline.",
                        reviewDate: new Date("2025-03-18")
                    }
                ]
            },
            {
                id: "38",
                name: "Web Development Guide",
                description: "Learn modern full-stack development.",
                longDescription: "A complete guide to modern web development covering frontend and backend technologies.",
                price: 29.99,
                imageUrl: "/product_images/product_38.png",
                rating: 4.7,
                reviewCount: 220,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "75",
                        productId: "38",
                        userName: "Dev Sharma",
                        userImageUrl: "/users/user75.png",
                        rating: 5,
                        title: "Very detailed",
                        comment: "Covers everything from basics to advanced.",
                        reviewDate: new Date("2025-04-10")
                    },
                    {
                        id: "76",
                        productId: "38",
                        userName: "Ayesha Khan",
                        userImageUrl: "/users/user76.png",
                        rating: 4,
                        title: "Good for beginners",
                        comment: "Easy explanations.",
                        reviewDate: new Date("2025-04-12")
                    }
                ]
            },
            {
                id: "39",
                name: "Poetry Collection",
                description: "A collection of modern poems.",
                longDescription: "A beautifully written collection of modern poetry exploring emotions and life.",
                price: 11.99,
                imageUrl: "/product_images/product_39.png",
                rating: 4.1,
                reviewCount: 60,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "77",
                        productId: "39",
                        userName: "Nidhi Verma",
                        userImageUrl: "/users/user77.png",
                        rating: 4,
                        title: "Emotional",
                        comment: "Loved the depth of poems.",
                        reviewDate: new Date("2025-01-11")
                    },
                    {
                        id: "78",
                        productId: "39",
                        userName: "Rakesh Gupta",
                        userImageUrl: "/users/user78.png",
                        rating: 3,
                        title: "Decent",
                        comment: "Some poems are really good.",
                        reviewDate: new Date("2025-01-15")
                    }
                ]
            },
            {
                id: "40",
                name: "Travel Explorer Guide",
                description: "Discover top travel destinations.",
                longDescription: "Explore the world's best travel destinations with tips and guides.",
                price: 21.99,
                imageUrl: "/product_images/product_40.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Books",
                reviews: [
                    {
                        id: "79",
                        productId: "40",
                        userName: "Varun Malhotra",
                        userImageUrl: "/users/user79.png",
                        rating: 5,
                        title: "Very useful",
                        comment: "Helped me plan my trip.",
                        reviewDate: new Date("2025-03-02")
                    },
                    {
                        id: "80",
                        productId: "40",
                        userName: "Simran Kaur",
                        userImageUrl: "/users/user80.png",
                        rating: 4,
                        title: "Nice guide",
                        comment: "Good travel tips.",
                        reviewDate: new Date("2025-03-06")
                    }
                ]
            },
            {
                id: "41",
                name: "Premium Yoga Mat",
                description: "Non-slip mat for yoga and workouts.",
                longDescription: "High-quality non-slip yoga mat for comfort and stability.",
                price: 24.99,
                imageUrl: "/product_images/product_41.png",
                rating: 4.5,
                reviewCount: 130,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "81",
                        productId: "41",
                        userName: "Anjali Mehta",
                        userImageUrl: "/users/user81.png",
                        rating: 5,
                        title: "Excellent grip",
                        comment: "Doesn’t slip at all.",
                        reviewDate: new Date("2025-02-14")
                    },
                    {
                        id: "82",
                        productId: "41",
                        userName: "Rohan Gupta",
                        userImageUrl: "/users/user82.png",
                        rating: 4,
                        title: "Good quality",
                        comment: "Comfortable and durable.",
                        reviewDate: new Date("2025-02-18")
                    }
                ]
            },
            {
                id: "42",
                name: "Adjustable Dumbbell Set",
                description: "Perfect for home strength training.",
                longDescription: "Adjustable dumbbell set for customizable workouts.",
                price: 59.99,
                imageUrl: "/product_images/product_42.png",
                rating: 4.7,
                reviewCount: 220,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "83",
                        productId: "42",
                        userName: "Vikram Singh",
                        userImageUrl: "/users/user83.png",
                        rating: 5,
                        title: "Very versatile",
                        comment: "Easy to adjust.",
                        reviewDate: new Date("2025-03-20")
                    },
                    {
                        id: "84",
                        productId: "42",
                        userName: "Sneha Joshi",
                        userImageUrl: "/users/user84.png",
                        rating: 4,
                        title: "Solid build",
                        comment: "Feels sturdy.",
                        reviewDate: new Date("2025-03-25")
                    }
                ]
            },
            {
                id: "43",
                name: "Foldable Treadmill",
                description: "Compact treadmill for home workouts.",
                longDescription: "Foldable treadmill with smooth performance.",
                price: 499.99,
                imageUrl: "/product_images/product_43.png",
                rating: 4.4,
                reviewCount: 80,
                inStock: false,
                category: "Fitness",
                reviews: [
                    {
                        id: "85",
                        productId: "43",
                        userName: "Kunal Verma",
                        userImageUrl: "/users/user85.png",
                        rating: 4,
                        title: "Great for home",
                        comment: "Compact design.",
                        reviewDate: new Date("2025-01-30")
                    },
                    {
                        id: "86",
                        productId: "43",
                        userName: "Priyanka Nair",
                        userImageUrl: "/users/user86.png",
                        rating: 5,
                        title: "Smooth performance",
                        comment: "Runs quietly.",
                        reviewDate: new Date("2025-02-02")
                    }
                ]
            },
            {
                id: "44",
                name: "Resistance Bands Kit",
                description: "Full-body workout bands set.",
                longDescription: "Complete resistance bands kit.",
                price: 19.99,
                imageUrl: "/product_images/product_44.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "87",
                        productId: "44",
                        userName: "Arjun Patel",
                        userImageUrl: "/users/user87.png",
                        rating: 5,
                        title: "Great value",
                        comment: "Multiple resistance levels.",
                        reviewDate: new Date("2025-03-05")
                    },
                    {
                        id: "88",
                        productId: "44",
                        userName: "Neha Singh",
                        userImageUrl: "/users/user88.png",
                        rating: 4,
                        title: "Good for workouts",
                        comment: "Effective training.",
                        reviewDate: new Date("2025-03-09")
                    }
                ]
            },
            {
                id: "45",
                name: "Indoor Exercise Bike",
                description: "Smooth and quiet cycling experience.",
                longDescription: "Indoor cycling with adjustable resistance.",
                price: 299.99,
                imageUrl: "/product_images/product_45.png",
                rating: 4.3,
                reviewCount: 110,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "89",
                        productId: "45",
                        userName: "Rahul Khanna",
                        userImageUrl: "/users/user89.png",
                        rating: 5,
                        title: "Very smooth",
                        comment: "Silent ride.",
                        reviewDate: new Date("2025-04-01")
                    },
                    {
                        id: "90",
                        productId: "45",
                        userName: "Pooja Verma",
                        userImageUrl: "/users/user90.png",
                        rating: 4,
                        title: "Good build",
                        comment: "Stable.",
                        reviewDate: new Date("2025-04-03")
                    }
                ]
            },
            {
                id: "46",
                name: "Skipping Rope",
                description: "Adjustable rope for cardio workouts.",
                longDescription: "Durable skipping rope with adjustable length, perfect for cardio workouts and improving endurance.",
                price: 9.99,
                imageUrl: "/product_images/product_46.png",
                rating: 4.2,
                reviewCount: 70,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "91",
                        productId: "46",
                        userName: "Manoj Kumar",
                        userImageUrl: "/users/user91.png",
                        rating: 4,
                        title: "Good for cardio",
                        comment: "Lightweight and easy to use.",
                        reviewDate: new Date("2025-02-11")
                    },
                    {
                        id: "92",
                        productId: "46",
                        userName: "Sanya Gupta",
                        userImageUrl: "/users/user92.png",
                        rating: 4,
                        title: "Nice quality",
                        comment: "Adjustable length is helpful.",
                        reviewDate: new Date("2025-02-13")
                    }
                ]
            },
            {
                id: "47",
                name: "Cast Iron Kettlebell",
                description: "Durable kettlebell for strength training.",
                longDescription: "Heavy-duty cast iron kettlebell designed for strength training, endurance, and functional workouts.",
                price: 34.99,
                imageUrl: "/product_images/product_47.png",
                rating: 4.5,
                reviewCount: 85,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "93",
                        productId: "47",
                        userName: "Deepak Yadav",
                        userImageUrl: "/users/user93.png",
                        rating: 5,
                        title: "Solid weight",
                        comment: "Perfect for strength training.",
                        reviewDate: new Date("2025-03-22")
                    },
                    {
                        id: "94",
                        productId: "47",
                        userName: "Nikita Sharma",
                        userImageUrl: "/users/user94.png",
                        rating: 4,
                        title: "Durable",
                        comment: "Good grip and finish.",
                        reviewDate: new Date("2025-03-25")
                    }
                ]
            },
            {
                id: "48",
                name: "Doorway Pull-up Bar",
                description: "Easy install bar for home workouts.",
                longDescription: "A sturdy pull-up bar that fits doorways easily, ideal for upper body workouts at home.",
                price: 39.99,
                imageUrl: "/product_images/product_48.png",
                rating: 4.3,
                reviewCount: 95,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "95",
                        productId: "48",
                        userName: "Rakesh Verma",
                        userImageUrl: "/users/user95.png",
                        rating: 4,
                        title: "Easy to install",
                        comment: "Took just minutes to set up.",
                        reviewDate: new Date("2025-01-10")
                    },
                    {
                        id: "96",
                        productId: "48",
                        userName: "Priya Singh",
                        userImageUrl: "/users/user96.png",
                        rating: 4,
                        title: "Good support",
                        comment: "Strong and stable.",
                        reviewDate: new Date("2025-01-12")
                    }
                ]
            },
            {
                id: "49",
                name: "Foam Roller",
                description: "Muscle recovery and massage tool.",
                longDescription: "Foam roller designed for muscle recovery, reducing soreness, and improving flexibility after workouts.",
                price: 21.99,
                imageUrl: "/product_images/product_49.png",
                rating: 4.4,
                reviewCount: 75,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "97",
                        productId: "49",
                        userName: "Amit Verma",
                        userImageUrl: "/users/user97.png",
                        rating: 5,
                        title: "Great recovery tool",
                        comment: "Helps reduce muscle soreness.",
                        reviewDate: new Date("2025-04-05")
                    },
                    {
                        id: "98",
                        productId: "49",
                        userName: "Meera Iyer",
                        userImageUrl: "/users/user98.png",
                        rating: 4,
                        title: "Effective",
                        comment: "Good for stretching and massage.",
                        reviewDate: new Date("2025-04-07")
                    }
                ]
            },
            {
                id: "50",
                name: "Workout Gym Gloves",
                description: "Protective gloves for lifting.",
                longDescription: "Comfortable gym gloves that provide grip and protect hands during weightlifting and workouts.",
                price: 14.99,
                imageUrl: "/product_images/product_50.png",
                rating: 4.2,
                reviewCount: 60,
                inStock: true,
                category: "Fitness",
                reviews: [
                    {
                        id: "99",
                        productId: "50",
                        userName: "Rohit Sharma",
                        userImageUrl: "/users/user99.png",
                        rating: 4,
                        title: "Good grip",
                        comment: "Prevents slipping during lifts.",
                        reviewDate: new Date("2025-02-21")
                    },
                    {
                        id: "100",
                        productId: "50",
                        userName: "Kavya Reddy",
                        userImageUrl: "/users/user100.png",
                        rating: 4,
                        title: "Comfortable",
                        comment: "Fits well and protects hands.",
                        reviewDate: new Date("2025-02-25")
                    }
                ]
            }
        ],
        category: "all",
        wishlistItems: <Product[]>[],
        cartItems: <CartItem[]>[],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false,
    }),
    withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
        filteredProducts: computed<Product[]>(() => {
            if (category() === 'all') return products();
            return products().filter(
                p => p.category.toLowerCase() === category().toLowerCase()
            );
        }),
        wishlistCount: computed(() => wishlistItems().length),
        cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
        selectedProduct: computed(() =>
            products().find(p => p.id === selectedProductId())
        ),
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });
        }),
        setProductId: signalMethod<string>((productId: string) => {
            patchState(store, { selectedProductId: productId });
        }),
        addToWishlist: (product: Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(), (draft: Product[]) => {
                if (!draft.find(p => p.id === product.id)) {
                    draft.push(product);
                }
            });

            patchState(store, { wishlistItems: updatedWishlistItems });
            toaster.success('Product added to Wishlist')
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)
            });
            toaster.success('Product removed from the Wishlist');
        },
        clearWishlist: () => {
            patchState(store, { wishlistItems: [] });
            toaster.success('Wishlist cleared');
        },
        clearCart: () => {
            patchState(store, { cartItems: [] });
            toaster.success('Cart cleared');
        },
        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(items => items.product.id === product.id);
            const updatedCartItems = produce(store.cartItems(), (draft: CartItem[]) => {
                if (existingItemIndex >= 0) {
                    draft[existingItemIndex].quantity += quantity;
                    return;
                } else {
                    draft.push({ product, quantity });
                }
            });
            patchState(store, { cartItems: updatedCartItems });
            toaster.success(existingItemIndex >= 0 ? 'Product quantity updated in Cart' : 'Product added to Cart');
        },
        setItemQuantity(params: { productId: string, quantity: number }) {
            const index = store.cartItems().findIndex(item => item.product.id === params.productId);
            const updated = produce(store.cartItems(), (draft: CartItem[]) => {
                draft[index].quantity = params.quantity;
            });
            patchState(store, { cartItems: updated });
            toaster.success('Cart item quantity updated');
        },
        addAllWishlistToCart: () => {
            const updatedCartItems = produce(store.cartItems(), (draft: CartItem[]) => {
                store.wishlistItems().forEach(p => {
                    if (!draft.find(item => item.product.id === p.id)) {
                        draft.push({ product: p, quantity: 1 });
                    }
                });
            });
            patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
            toaster.success('All wishlist items added to cart');
        },
        moveTowishlist: (product: Product) => {
            const updatedCartItems = store.cartItems().filter(item => item.product.id !== product.id);
            const updatedWishlistItems = produce(store.wishlistItems(), (draft: Product[]) => {
                if (!draft.find(p => p.id === product.id)) {
                    draft.push(product);
                }
            });
            patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
            toaster.success('Product moved to Wishlist');
        },
        removeFromCart: (product: Product) => {
            patchState(store, {
                cartItems: store.cartItems().filter(item => item.product.id !== product.id)
            });
            toaster.success('Product removed from Cart');
        },
        proceedToCheckout: () => {
            if (!store.user()) {
                matDialog.open(SignInDialog, {
                    disableClose: true,
                    data: {
                        checkout: true,
                    }
                });
            } else {
                router.navigate(['/checkout']);
            }
        },
        placeOrder: async () => {
            patchState(store, { loading: true });
            const user = store.user();
            if (!user) {
                toaster.error('User not authenticated');
                patchState(store, { loading: false });
                return;
            }
            const order: Order = {
                id: crypto.randomUUID(),
                userId: user?.id?.toString() || '',
                total: Math.round(store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 100),
                items: store.cartItems(),
                paymentStatus: 'success',
            };
            await new Promise(resolve => setTimeout(resolve, 1000));
            patchState(store, { cartItems: [], loading: false });
            toaster.success('Order placed successfully');
            router.navigate(['order-success']);
        },
        signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
            patchState(store, {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email,
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                }
            });
            toaster.success('Signed in successfully');

            matDialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        SignUp: ({ name, email, password, checkout, dialogId }: SignUpParams) => {
            patchState(store, {
                user: {
                    id: 1,
                    name,
                    email,
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                }
            });
            toaster.success('Account created and signed in successfully');
            matDialog.getDialogById(dialogId)?.close();
            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        signOut: () => {
            patchState(store, { user: undefined });
            toaster.success('Signed out successfully');
            router.navigate(['/']);
        },
        showWriteReview: () => {
            patchState(store, { writeReview: true });
        },
        hideWriteReview: () => {
            patchState(store, { writeReview: false });
        },
        addReview: async ({ title, comment, rating }: AddReviewParams) => {
            patchState(store, { loading: true });
            const product = store.products().find((p) => p.id === store.selectedProductId());
            if (!product) {
                patchState(store, { loading: false });
                return;
            };
            const review: UserReview = {
                id: crypto.randomUUID(),
                title,
                comment,
                rating,
                productId: product.id,
                userName: store.user()?.name || '',
                userImageUrl: store.user()?.imageUrl || '',
                reviewDate: new Date(),
            };
            const updatedProducts = produce(store.products(), (draft) => {
                const index = draft.findIndex((p) => p.id === product.id);
                draft[index].reviews.push(review);
                draft[index].rating =
                    Math.round(
                        (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                            draft[index].reviews.length) *
                        10,
                    ) / 10;
                draft[index].reviewCount = draft[index].reviews.length;
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));
            patchState(store, { loading: false, products: updatedProducts, writeReview: false });
        },
    })),
);

