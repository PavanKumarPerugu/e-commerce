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


export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
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
                longDescription: "Experience immersive sound with these wireless Bluetooth headphones featuring active noise cancellation, deep bass, and crystal-clear audio. Designed with soft cushioned ear cups and an adjustable headband for all-day comfort. With up to 30 hours of battery life and fast charging support, they are perfect for travel, work, and entertainment.",
                price: 89.99,
                imageUrl: "/product_images/product_1.png",
                rating: 4.5,
                reviewCount: 120,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "2",
                name: "5G Android Smartphone",
                description: "High-performance smartphone with AMOLED display.",
                longDescription: "This 5G Android smartphone delivers blazing-fast performance with a powerful processor and stunning AMOLED display. Capture stunning photos with its advanced multi-camera system and enjoy smooth multitasking. With a long-lasting battery and fast charging, it’s built for modern users who demand speed and reliability.",
                price: 699.99,
                imageUrl: "/product_images/product_2.png",
                rating: 4.7,
                reviewCount: 340,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "3",
                name: "RGB Gaming Mouse",
                description: "High precision gaming mouse with RGB lighting.",
                longDescription: "Enhance your gaming experience with this high-precision RGB gaming mouse featuring adjustable DPI, customizable lighting effects, and ergonomic design. Built for speed and accuracy, it provides smooth tracking and comfortable grip during long gaming sessions.",
                price: 49.99,
                imageUrl: "/product_images/product_3.png",
                rating: 4.3,
                reviewCount: 89,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "4",
                name: "Mechanical Gaming Keyboard",
                description: "Tactile keys with RGB backlighting.",
                longDescription: "This mechanical gaming keyboard offers tactile feedback with durable switches and vibrant RGB lighting. Designed for gamers and professionals, it features anti-ghosting keys, customizable lighting modes, and a sturdy build for long-lasting performance.",
                price: 109.99,
                imageUrl: "/product_images/product_4.png",
                rating: 4.6,
                reviewCount: 210,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "5",
                name: "Smart Fitness Watch",
                description: "Track health, steps, and notifications.",
                longDescription: "Stay on top of your fitness goals with this smart fitness watch that tracks steps, heart rate, sleep, and more. Receive notifications, monitor workouts, and enjoy a sleek design with long battery life, making it perfect for everyday wear.",
                price: 149.99,
                imageUrl: "/product_images/product_5.png",
                rating: 4.5,
                reviewCount: 310,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "6",
                name: "14-inch Ultrabook Laptop",
                description: "Lightweight laptop with long battery life.",
                longDescription: "A sleek and lightweight ultrabook designed for productivity and portability. Featuring fast SSD storage, long battery life, and powerful performance, it is ideal for professionals, students, and travelers.",
                price: 899.99,
                imageUrl: "/product_images/product_6.png",
                rating: 4.4,
                reviewCount: 180,
                inStock: false,
                category: "Electronics",
            },
            {
                id: "7",
                name: "10-inch Android Tablet",
                description: "Portable tablet with HD display.",
                longDescription: "Enjoy entertainment and productivity on the go with this 10-inch Android tablet. Featuring an HD display, smooth performance, and lightweight design, it is perfect for streaming, browsing, and reading.",
                price: 299.99,
                imageUrl: "/product_images/product_7.png",
                rating: 4.2,
                reviewCount: 140,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "8",
                name: "Portable Bluetooth Speaker",
                description: "Deep bass speaker with long battery life.",
                longDescription: "Take your music anywhere with this portable Bluetooth speaker. It delivers powerful bass, clear sound, and long battery life. Its compact and waterproof design makes it perfect for outdoor adventures.",
                price: 59.99,
                imageUrl: "/product_images/product_8.png",
                rating: 4.6,
                reviewCount: 220,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "9",
                name: "1TB External Hard Drive",
                description: "Portable storage with fast transfer speeds.",
                longDescription: "Store your files securely with this 1TB external hard drive. It offers fast data transfer, reliable performance, and a compact design, making it perfect for backups and portability.",
                price: 79.99,
                imageUrl: "/product_images/product_9.png",
                rating: 4.4,
                reviewCount: 160,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "10",
                name: "Full HD Webcam",
                description: "1080p webcam for streaming and meetings.",
                longDescription: "Upgrade your video calls with this Full HD webcam. It provides clear 1080p video, built-in microphone, and easy plug-and-play setup for meetings, streaming, and online classes.",
                price: 39.99,
                imageUrl: "/product_images/product_10.png",
                rating: 4.1,
                reviewCount: 95,
                inStock: true,
                category: "Electronics",
            },
            {
                id: "11",
                name: "Men's Cotton T-Shirt",
                description: "Soft and breathable everyday wear.",
                longDescription: "This men's cotton t-shirt offers superior comfort with soft, breathable fabric. Designed with a modern fit, it’s perfect for casual outings, daily wear, and layering.",
                price: 19.99,
                imageUrl: "/product_images/product_11.png",
                rating: 4.2,
                reviewCount: 65,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "12",
                name: "Women's Denim Jacket",
                description: "Classic denim jacket for all seasons.",
                longDescription: "A stylish and durable denim jacket that complements any outfit. Perfect for layering in all seasons, it combines fashion with comfort and long-lasting quality.",
                price: 59.99,
                imageUrl: "/product_images/product_12.png",
                rating: 4.6,
                reviewCount: 150,
                inStock: false,
                category: "Clothing",
            },
            {
                id: "13",
                name: "Running Sports Shoes",
                description: "Lightweight shoes with breathable mesh.",
                longDescription: "Designed for performance and comfort, these running shoes feature breathable mesh fabric, cushioned soles, and excellent grip. Perfect for jogging, gym workouts, or everyday wear.",
                price: 79.99,
                imageUrl: "/product_images/product_13.png",
                rating: 4.4,
                reviewCount: 200,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "14",
                name: "Fleece Hoodie",
                description: "Warm hoodie for winter comfort.",
                longDescription: "Stay warm and comfortable with this fleece hoodie, featuring a soft inner lining, adjustable hood, and relaxed fit. Ideal for chilly weather and casual outings.",
                price: 39.99,
                imageUrl: "/product_images/product_14.png",
                rating: 4.5,
                reviewCount: 130,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "15",
                name: "Slim Fit Jeans",
                description: "Stylish denim jeans with stretch fit.",
                longDescription: "These slim fit jeans offer a modern look with stretchable fabric for added comfort. Durable and stylish, they are perfect for both casual and semi-formal wear.",
                price: 49.99,
                imageUrl: "/product_images/product_15.png",
                rating: 4.3,
                reviewCount: 170,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "16",
                name: "Casual Sneakers",
                description: "Comfortable sneakers for daily wear.",
                longDescription: "Casual sneakers designed for everyday comfort with cushioned insoles and durable outsole. Stylish design pairs well with a variety of outfits.",
                price: 69.99,
                imageUrl: "/product_images/product_16.png",
                rating: 4.4,
                reviewCount: 190,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "17",
                name: "Formal Office Shirt",
                description: "Perfect shirt for professional wear.",
                longDescription: "A crisp formal shirt crafted with premium fabric for a polished look. Ideal for office meetings, presentations, and formal occasions.",
                price: 34.99,
                imageUrl: "/product_images/product_17.png",
                rating: 4.2,
                reviewCount: 85,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "18",
                name: "Summer Shorts",
                description: "Lightweight shorts for hot weather.",
                longDescription: "Stay cool during hot days with these lightweight summer shorts made from breathable fabric. Perfect for casual wear and outdoor activities.",
                price: 24.99,
                imageUrl: "/product_images/product_18.png",
                rating: 4.1,
                reviewCount: 70,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "19",
                name: "Baseball Cap",
                description: "Adjustable cap with breathable fabric.",
                longDescription: "Classic baseball cap with adjustable strap and breathable material. Offers comfort and protection from the sun while adding a stylish touch.",
                price: 14.99,
                imageUrl: "/product_images/product_19.png",
                rating: 4.0,
                reviewCount: 55,
                inStock: true,
                category: "Clothing",
            },
            {
                id: "20",
                name: "Cotton Socks Pack",
                description: "Pack of 5 soft cotton socks.",
                longDescription: "A pack of soft and breathable cotton socks designed for all-day comfort. Durable and stretchable, suitable for daily use.",
                price: 12.99,
                imageUrl: "/product_images/product_20.png",
                rating: 4.3,
                reviewCount: 100,
                inStock: true,
                category: "Clothing",
            },

            // Home
            {
                id: "21",
                name: "Wooden Coffee Table",
                description: "Modern table for living room decor.",
                longDescription: "Enhance your living room with this modern wooden coffee table featuring a sturdy build and elegant design. Perfect for daily use and decoration.",
                price: 129.99,
                imageUrl: "/product_images/product_21.png",
                rating: 4.1,
                reviewCount: 45,
                inStock: true,
                category: "Home",
            },
            {
                id: "22",
                name: "LED Desk Lamp",
                description: "Adjustable brightness desk lamp.",
                longDescription: "Energy-efficient LED desk lamp with adjustable brightness levels and flexible neck design. Ideal for study, work, and reading.",
                price: 29.99,
                imageUrl: "/product_images/product_22.png",
                rating: 4.5,
                reviewCount: 78,
                inStock: true,
                category: "Home",
            },
            {
                id: "23",
                name: "Kitchen Blender",
                description: "High-speed blender for smoothies.",
                longDescription: "Powerful kitchen blender designed for smoothies, juices, and food preparation. Features durable blades and multiple speed settings.",
                price: 99.99,
                imageUrl: "/product_images/product_23.png",
                rating: 4.3,
                reviewCount: 110,
                inStock: false,
                category: "Home",
            },
            {
                id: "24",
                name: "Minimal Wall Clock",
                description: "Elegant wall clock for home decor.",
                longDescription: "A sleek and minimal wall clock that adds elegance to any room. Quiet movement ensures no ticking noise.",
                price: 19.99,
                imageUrl: "/product_images/product_24.png",
                rating: 4.2,
                reviewCount: 60,
                inStock: true,
                category: "Home",
            },
            {
                id: "25",
                name: "Decorative Sofa Cushion",
                description: "Soft cushion with stylish design.",
                longDescription: "Add comfort and style to your sofa with this decorative cushion. Made with soft fabric and modern design patterns.",
                price: 15.99,
                imageUrl: "/product_images/product_25.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Home",
            },
            {
                id: "26",
                name: "4-Tier Bookshelf",
                description: "Spacious wooden storage shelf.",
                longDescription: "A sturdy 4-tier bookshelf designed for organizing books and decor items. Space-saving and stylish addition to any room.",
                price: 149.99,
                imageUrl: "/product_images/product_26.png",
                rating: 4.3,
                reviewCount: 75,
                inStock: true,
                category: "Home",
            },
            {
                id: "27",
                name: "King Size Bed Sheet",
                description: "Soft cotton bedsheet set.",
                longDescription: "Premium cotton bedsheet set designed for comfort and durability. Soft texture ensures a good night's sleep.",
                price: 39.99,
                imageUrl: "/product_images/product_27.png",
                rating: 4.5,
                reviewCount: 140,
                inStock: true,
                category: "Home",
            },
            {
                id: "28",
                name: "Blackout Curtains",
                description: "Light-blocking curtains for bedrooms.",
                longDescription: "High-quality blackout curtains that block sunlight and reduce noise, providing better sleep and privacy.",
                price: 44.99,
                imageUrl: "/product_images/product_28.png",
                rating: 4.2,
                reviewCount: 85,
                inStock: true,
                category: "Home",
            },
            {
                id: "29",
                name: "Dining Table Set",
                description: "4-seater wooden dining set.",
                longDescription: "Elegant 4-seater dining table set made from durable wood. Perfect for family meals and gatherings.",
                price: 399.99,
                imageUrl: "/product_images/product_29.png",
                rating: 4.4,
                reviewCount: 50,
                inStock: false,
                category: "Home",
            },
            {
                id: "30",
                name: "Standing Floor Lamp",
                description: "Elegant lamp for living spaces.",
                longDescription: "Stylish floor lamp designed to enhance your living room ambiance. Provides soft lighting and modern aesthetics.",
                price: 59.99,
                imageUrl: "/product_images/product_30.png",
                rating: 4.3,
                reviewCount: 95,
                inStock: true,
                category: "Home",
            },

            // Books
            {
                id: "31",
                name: "Mystery Thriller Novel",
                description: "Suspense-filled story with twists.",
                longDescription: "A gripping mystery thriller packed with suspense, unexpected twists, and engaging storytelling that keeps you hooked till the end.",
                price: 14.99,
                imageUrl: "/product_images/product_31.png",
                rating: 4.8,
                reviewCount: 210,
                inStock: true,
                category: "Books",
            },
            {
                id: "32",
                name: "Science Fiction Adventure",
                description: "Journey through futuristic worlds.",
                longDescription: "Explore futuristic worlds and thrilling adventures in this science fiction novel filled with imagination and excitement.",
                price: 18.99,
                imageUrl: "/product_images/product_32.png",
                rating: 4.6,
                reviewCount: 175,
                inStock: true,
                category: "Books",
            },
            {
                id: "33",
                name: "Self Improvement Guide",
                description: "Boost productivity and mindset.",
                longDescription: "A practical guide to improving productivity, mindset, and personal growth through proven strategies and insights.",
                price: 12.99,
                imageUrl: "/product_images/product_33.png",
                rating: 4.2,
                reviewCount: 95,
                inStock: true,
                category: "Books",
            },
            {
                id: "34",
                name: "World Cuisine Cookbook",
                description: "Recipes from around the globe.",
                longDescription: "Discover delicious recipes from around the world with this comprehensive cookbook, perfect for beginners and experts alike.",
                price: 22.99,
                imageUrl: "/product_images/product_34.png",
                rating: 4.7,
                reviewCount: 125,
                inStock: true,
                category: "Books",
            },
            {
                id: "35",
                name: "History of Civilizations",
                description: "Explore ancient to modern history.",
                longDescription: "Dive into the rich history of civilizations from ancient times to modern era with detailed insights and illustrations.",
                price: 24.99,
                imageUrl: "/product_images/product_35.png",
                rating: 4.3,
                reviewCount: 80,
                inStock: true,
                category: "Books",
            },
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
            },
            {
                id: "37",
                name: "Fantasy Adventure Novel",
                description: "Magic, dragons, and epic quests.",
                longDescription: "An epic fantasy adventure filled with magic, mythical creatures, and heroic quests that transport you to another world.",
                price: 17.99,
                imageUrl: "/product_images/product_37.png",
                rating: 4.6,
                reviewCount: 160,
                inStock: true,
                category: "Books",
            },
            {
                id: "38",
                name: "Web Development Guide",
                description: "Learn modern full-stack development.",
                longDescription: "A complete guide to modern web development covering frontend and backend technologies with practical examples.",
                price: 29.99,
                imageUrl: "/product_images/product_38.png",
                rating: 4.7,
                reviewCount: 220,
                inStock: true,
                category: "Books",
            },
            {
                id: "39",
                name: "Poetry Collection",
                description: "A collection of modern poems.",
                longDescription: "A beautifully written collection of modern poetry exploring emotions, life, and creativity.",
                price: 11.99,
                imageUrl: "/product_images/product_39.png",
                rating: 4.1,
                reviewCount: 60,
                inStock: true,
                category: "Books",
            },
            {
                id: "40",
                name: "Travel Explorer Guide",
                description: "Discover top travel destinations.",
                longDescription: "Explore the world's best travel destinations with tips, guides, and stunning insights for your next adventure.",
                price: 21.99,
                imageUrl: "/product_images/product_40.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Books",
            },

            // Fitness
            {
                id: "41",
                name: "Premium Yoga Mat",
                description: "Non-slip mat for yoga and workouts.",
                longDescription: "A high-quality non-slip yoga mat designed for comfort and stability. Perfect for yoga, pilates, and workouts.",
                price: 24.99,
                imageUrl: "/product_images/product_41.png",
                rating: 4.5,
                reviewCount: 130,
                inStock: true,
                category: "Fitness",
            },
            {
                id: "42",
                name: "Adjustable Dumbbell Set",
                description: "Perfect for home strength training.",
                longDescription: "Adjustable dumbbell set that allows you to customize weight levels for effective home workouts and strength training.",
                price: 59.99,
                imageUrl: "/product_images/product_42.png",
                rating: 4.7,
                reviewCount: 220,
                inStock: true,
                category: "Fitness",
            },
            {
                id: "43",
                name: "Foldable Treadmill",
                description: "Compact treadmill for home workouts.",
                longDescription: "A foldable treadmill designed for home use with multiple speed settings, compact storage, and smooth performance.",
                price: 499.99,
                imageUrl: "/product_images/product_43.png",
                rating: 4.4,
                reviewCount: 80,
                inStock: false,
                category: "Fitness",
            },
            {
                id: "44",
                name: "Resistance Bands Kit",
                description: "Full-body workout bands set.",
                longDescription: "Complete resistance bands kit for full-body workouts. Suitable for beginners and advanced fitness enthusiasts.",
                price: 19.99,
                imageUrl: "/product_images/product_44.png",
                rating: 4.4,
                reviewCount: 90,
                inStock: true,
                category: "Fitness",
            },
            {
                id: "45",
                name: "Indoor Exercise Bike",
                description: "Smooth and quiet cycling experience.",
                longDescription: "Enjoy a smooth and quiet indoor cycling experience with adjustable resistance and ergonomic design.",
                price: 299.99,
                imageUrl: "/product_images/product_45.png",
                rating: 4.3,
                reviewCount: 110,
                inStock: true,
                category: "Fitness",
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
            }
        ],
        category: "all",
        wishlistItems: <Product[]>[],
        cartItems: <CartItem[]>[],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
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
        }
    })),
);

