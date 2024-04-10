export const SAAS_NAME = "CaptionIt";

export const SAAS_SLOGAN = "Create unique AI images with custom captions";

export const SAAS_DESCRIPTION =
  "Quickly generate AI images with styles of your choice. Then add some customizeable captions to share with others.";

export const SAAS_URL = "mysaas.com";

export const SAAS_AUTHOR = "Caleb Wilson";

export const SUPPORT_EMAIL = "cwilsonfun@gmail.com";

export const LOGIN_CALLBACK = "/dashboard";

export const DISCORD_LINK = "";

export const LOGO_LINK = "/dashboard";

export const NAVBAR_BADGE_LINK = "/credits";

export const UPDATE_SUBSCRIPTION_REVALIDATE_PATH = "/credits";

export const MAIL_SUBSCRIBE_DELAY_MS = 120000;

export const SIDE_BY_SIDE_GOOD = {
  title: `With ${SAAS_NAME}`,
  features: [
    "Good feature 1",
    "Good feature 2",
    "Good feature 3",
    "Good feature 4",
    "Good feature 5",
  ],
};

export const SIDE_BY_SIDE_BAD = {
  title: `Without ${SAAS_NAME}`,
  features: [
    "Bad feature 1",
    "Bad feature 2",
    "Bad feature 3",
    "Bad feature 4",
    "Bad feature 5",
  ],
};

export const DEMO = {
  videoLink: "https://www.youtube.com/embed/9DapZ_-stPY?si=gfo210ukSbHIANKl",
  title: "Demo",
  subtitle: "How it works:",
};

export const MAILING_LIST = {
  title: "Join the mailing list",
  description:
    "Receive the latest news about the best things happeneing every Saturday.",
};

export const ANNUAL_DISCOUNT = 0.2;
export const DISCOUNT = 0;

export const IMAGE_RATIOS: {
  ratio: string;
  size:
    | "256x256"
    | "512x512"
    | "1024x1024"
    | "1792x1024"
    | "1024x1792"
    | null
    | undefined;
  cost: number;
}[] = [
  {
    ratio: "square",
    size: "1024x1024",
    cost: 5,
  },
  {
    ratio: "landscape",
    size: "1792x1024",
    cost: 10,
  },
  {
    ratio: "portrait",
    size: "1024x1792",
    cost: 10,
  },
];

export const PRICE_HIERARCHY = ["Free", "Basic", "Pro"];

type ProductType =
  | "subscription"
  | "credits"
  | "one_time"
  | "physical_product"
  | "digital_product";
export const PRODUCT_TYPE: ProductType = "credits";

export const ONE_TIME_PLAN = {
  _id: 1,
  name: "Pro",
  description: "All you need to get started.",
  price: 1999,
  bestChoice: false,
  useBadge: true,
  inclusions: [
    {
      label: "Feature 1",
      isIncluded: true,
    },
    {
      label: "Feature 2",
      isIncluded: true,
    },
    {
      label: "Feature 3",
      isIncluded: true,
    },
    {
      label: "Feature 4",
      isIncluded: true,
    },
  ],
};

export const CREDIT_PLANS = [
  {
    _id: 1,
    name: "Some Credits",
    description: "Some credits for you :)",
    price: 50,
    credits: 200,
    bestChoice: false,
    useBadge: false,
    inclusions: [
      {
        label: "20 Normal Standard Images",
        isIncluded: true,
      },
      {
        label: "~13 Large Standard Images",
        isIncluded: true,
      },
      {
        label: "~13 Normal HD Images",
        isIncluded: true,
      },
      {
        label: "10 Large HD Images",
        isIncluded: true,
      },
      {
        label: "+0 Extra Credits",
        isIncluded: false,
      },
    ],
    buttonExtra: "Do this now!",
  },
  {
    _id: 1,
    name: "More Credits",
    description: "A lot more credits :D",
    price: 4000,
    credits: 1250,
    bestChoice: true,
    useBadge: false,
    inclusions: [
      {
        label: "125 Normal Standard Images",
        isIncluded: true,
      },
      {
        label: "~83 Large Standard",
        isIncluded: true,
      },
      {
        label: "~83 Normal HD Images",
        isIncluded: true,
      },
      {
        label: "~62 Large HD Images",
        isIncluded: true,
      },
      {
        label: "+250 Extra Credits",
        isIncluded: true,
      },
    ],
    buttonExtra: "Do this now!",
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    _id: 1,
    name: "Basic",
    description: "Essential features you need to get started",
    price: 800,
    bestChoice: false,
    useBadge: false,
    inclusions: [
      {
        label: "Feature 1",
        isIncluded: true,
      },
      {
        label: "Feature 2",
        isIncluded: true,
      },
      {
        label: "Feature 3",
        isIncluded: false,
      },
      {
        label: "Feature 4",
        isIncluded: false,
      },
    ],
    buttonExtra: "Do this now!",
  },
  {
    _id: 2,
    name: "Pro",
    description: "Essential features you need to get started",
    price: 2000,
    bestChoice: true,
    useBadge: false,
    inclusions: [
      {
        label: "Feature 1",
        isIncluded: true,
      },
      {
        label: "Feature 2",
        isIncluded: true,
      },
      {
        label: "Feature 3",
        isIncluded: true,
      },
      {
        label: "Feature 4",
        isIncluded: true,
      },
    ],
    buttonExtra: "Do this now!",
  },
];

export const BACK_BUTTON_GOTO = "/dashboard";

export const PRICING_SUBTITLE = "Affordable Image Generations";

export const INFO_BANNER_SUBSCRIPTION = {
  show: true,
  content: "More features on Pro",
  buttonContent: "Go Pro",
  link: "/credits",
};

export const INFO_BANNER_CREDITS = {
  show: true,
  content: "Out of credits?",
  buttonContent: "Get More",
  link: "/credits",
};

export const FAQ_LINKS = {
  twitter: "",
  mailLink: "mailto:cwilsonfun@gmail.com",
};

export const HOME_FEATURES = [
  {
    imageSrc: "/generate_image.jpg",
    imageName: "Step 1",
    imageSubtitle: "Create Image with AI",
    imageDescription:
      "Fill out the simple form to create any AI image you want. Choose the aspect ratio and quality of the image.",
  },
  {
    imageSrc: "/create_caption.jpg",
    imageName: "Step 2",
    imageSubtitle: "Customize Your Caption",
    imageDescription:
      "Create a caption with any text size, positioning, and stroke you want. Make it funny, sad, informative, etc.",
  },
  {
    imageSrc: "/save_image.jpg",
    imageName: "Step 3",
    imageSubtitle: "Share Your Work",
    imageDescription:
      "Share your work with others after creating this masterpiece.",
  },
];

export const FAQ_QUESTIONS = [
  {
    question: "How many images can I generate for free?",
    answer: "Everyone with an account can generate a free standard size image.",
  },
  {
    question: "What styles are there to choose from?",
    answer: "Styles are still being added.",
  },
  // {
  //   question: "What is the question?",
  //   answer: "This is the answer to your question 3!",
  // },
  // {
  //   question: "What is the question?",
  //   answer: "This is the answer to your question 4!",
  // },
  // {
  //   question: "What is the question?",
  //   answer: "This is the answer to your question 5!",
  // },
  // {
  //   question: "What is the question?",
  //   answer: "This is the answer to your question 6!",
  // },
];
