export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "9",
        name: "The Tunic red",
        price: 1599,
        description: "Ignite your presence with the fire of creation and destruction. 100% cotton loop knit terry fabric, Weight- 240 GSM, Oversized fit, Ribbed crew neck collar.",
        images: [
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117512/2_zayvry.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117513/Photo_from_Mubashir_Iqbal_mhdqxe.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117514/3_efbmox.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117513/Photo_from_Mubashir_Iqbal_h68o4b.jpg",
        ],
    },
    {
        id: "1",
        name: "Midnight Silk Choli",
        price: 4599,
        description: "Ignite your presence with the fire of creation and destruction. 100% cotton loop knit terry fabric, Weight- 240 GSM, Oversized fit, Ribbed crew neck collar.",
        images: [
            "https://images.unsplash.com/photo-1741847639057-b51a25d42892?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1741847639057-b51a25d42892?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1741847639057-b51a25d42892?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1741847639057-b51a25d42892?q=80&w=687&auto=format&fit=crop",
        ],
    },
    {
        id: "2",
        name: "Urban Nomad Kurta",
        price: 3250,
        description: "A contemporary take on the classic kurta, designed for the modern wanderer. Breathable linen blend.",
        images: [
            "https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop",
        ],
    },
    {
        id: "3",
        name: "Ivory Linen Ensemble",
        price: 6800,
        description: "Pure elegance in ivory. Hand-spun linen crafted for summer luxury.",
        images: [
            "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop",
        ],
    },
    {
        id: "4",
        name: "Royal Heritage Sherwani",
        price: 15400,
        description: "Regal attire for special occasions. Intricate embroidery on premium fabric.",
        images: [
            "https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=765&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=765&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=765&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=765&auto=format&fit=crop",
        ],
    },
    {
        id: "5",
        name: "Sunset Velvet Lehenga",
        price: 18999,
        description: "Capturing the hues of a setting sun. Luxurious velvet with gold thread work.",
        images: [
            "https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop",
        ],
    },
    {
        id: "6",
        name: "Digital Print Fusion",
        price: 5450,
        description: "Modern art meets traditional silhouette. High-quality digital print on silk.",
        images: [
            "https://images.unsplash.com/photo-1669199583373-b9636f3f14c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1669199583373-b9636f3f14c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1669199583373-b9636f3f14c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1669199583373-b9636f3f14c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        id: "7",
        name: "Artisan Block Print",
        price: 2800,
        description: "Hand-crafted beauty using traditional block printing techniques.",
        images: [
            "https://images.unsplash.com/photo-1617628537450-0a063350df8c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617628537450-0a063350df8c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617628537450-0a063350df8c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617628537450-0a063350df8c?q=80&w=687&auto=format&fit=crop",
        ],
    },
    {
        id: "8",
        name: "Crimson Festive Saree",
        price: 11200,
        description: "Vibrant crimson saree with gold border, perfect for weddings and festivals.",
        images: [
            "https://images.unsplash.com/photo-1743229995584-f27de5c549d3?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1743229995584-f27de5c549d3?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1743229995584-f27de5c549d3?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1743229995584-f27de5c549d3?q=80&w=687&auto=format&fit=crop",
        ],
    },


];
