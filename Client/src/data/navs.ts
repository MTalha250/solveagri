export const navLinks = [
    {
      id: "home",
      title: "Home",
      href: "/",
    },
    {
      id: "about",
      title: "About Us",
      href: "/aboutus",
    },
    {
      id: "services",
      title: "Services",
      href: "/advisory-services",
      children: [
        {
          id: "advisory-services",
          title: "Advisory Services",
          href: "/advisory-services",
        },
        {
          id: "community-development",
          title: "Community Development",
          href: "/community-development",
        },
        {
          id: "solve-agri-and-dairy-institute",
          title: "Solve Agri & Dairy Institute",
          href: "/solve-agri-and-dairy-institute",
        },
        {
          id: "agri-business",
          title: "Agri Business",
          href: "/agri-business",
        },
      ],
    },
    {
      id: "all-products",
      title: "All Products",
      href: "/product",
      children: [
        {
          id: "animal-nutrition",
          title: "Animal Nutrition",
          href: "/products?category=animal-nutrition",
          children: [
            {
              id: "cattle feed",
              title: "Cattle Feed",
              href: "/products?category=animal-nutrition&sub-category=cattle-feed",
            },
            {
              id: "mineral-mixtures",
              title: "Mineral Mixtures",
              href: "/products?category=animal-nutrition&sub-category=mineral-mixtures",
            },
            {
              id: "feed Blocks",
              title: "Feed Blocks",
              href: "/products?category=animal-nutrition&sub-category=feed-blocks",
            },
          ]
        },
        {
          id: "calf-rearing",
          title: "Calf Rearing",
          href: "/products?category=calf-rearing",
          children:[
            {
              id: "milk-replacers",
              title: "Milk Replacers",
              href: "/products?category=calf-rearing&sub-category=milk-replacers",
            },
            {
              id: "calf-starters",
              title: "Calf Starters",
              href: "/products?category=calf-rearing&sub-category=calf-starters",
            },
            {
              id: "feeding-buckets",
              title: "Feeding Buckets",
              href: "/products?category=calf-rearing&sub-category=feeding-buckets",
            },
            {
              id: "calf-health-products",
              title: "Calf Health Products",
              href: "/products?category=calf-rearing&sub-category=calf-health-products",
            },
            {
              id: "calf-floors",
              title: "Calf Floors",
              href: "/products?category=calf-rearing&sub-category=calf-floors",
            }
          ]
        },
        {
          id: "equipment-and-machinery",
          title: "Equipment & Machinery",
          href: "/products?category=equipment-and-machinery",
          children:[
            {
              id: "feeding-equipment",
              title: "Feeding Equipment",
              href: "/products?category=equipment-and-machinery&sub-category=feeding-equipment",
            },
            {
              id: "milking-equipment",
              title: "Milking Equipment",
              href: "/products?category=equipment-and-machinery&sub-category=milking-equipment",
            },
            {
              id: "milk-testing-equipment",
              title: "Milk Testing Equipment",
              href: "/products?category=equipment-and-machinery&sub-category=milk-testing-equipment",
            },
            {
              id: "spare-parts",
              title: "Spare Parts",
              href: "/products?category=equipment-and-machinery&sub-category=spare-parts",
            },
          ]
        },
        {
          id: "genetics",
          title: "Genetics",
          href: "/products?category=genetics",
          children:[
            {
              id: "Bovine Semen",
              title: "Bovine Semen",
              href: "/products?category=genetics&sub-category=bovine-semen",
            },
            {
              id: "AI accessories",
              title: "AI accessories",
              href: "/products?category=genetics&sub-category=ai-accessories",
            },
          ]
        },
        {
          id: "hygiene",
          title: "Hygiene",
          href: "/products?category=hygiene",
          children:[
            {
              id: "dairy-hygiene",
              title: "Dairy Hygiene",
              href: "/products?category=hygiene&sub-category=dairy-hygiene",
            },
          ]
        },
      ],
    },
    {
      id: "projects",
      title: "Projects",
      href: "/projects",
    },
    {
      id: "contact",
      title: "Contact Us",
      href: "/contactus",
    },
  ];
  