export const SAAS_NAME = "CaptionIt";

export const SAAS_SLOGAN = "Create unique AI memes with popular prompts";

export const SAAS_DESCRIPTION =
  "You can quickly create some interesting images with captions and share them with others. They can be funny, interesting, heartbreaking, etc.";
// "Give the customers the most concise accurate description of your saas here. Keep it short as well, people have short attention spans nowadays.";

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
  videoLink: "https://www.youtube.com/embed/GyJPzwM__v4?si=1FbXhbPuA8qh5mzh",
  title: "Demo",
  subtitle: "How it works:",
};

export const MAILING_LIST = {
  title: "Join the mailing list",
  description:
    "Receive the latest news about the best things happeneing every Saturday.",
};

export const ANNUAL_DISCOUNT = 0.2;
export const DISCOUNT = 0.1;

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
    size: "1024x1792",
    cost: 10,
  },
  {
    ratio: "portrait",
    size: "1792x1024",
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
    price: 500,
    credits: 50,
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
        isIncluded: true,
      },
      {
        label: "Feature 4",
        isIncluded: true,
      },
    ],
    buttonExtra: "Do this now!",
  },
  {
    _id: 1,
    name: "More Credits",
    description: "A lot more credits :P",
    price: 1200,
    credits: 150,
    bestChoice: true,
    useBadge: false,
    inclusions: [
      {
        label: "Generate 50 Small Images",
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

export const FAQ_QUESTIONS = [
  {
    question: "What is the question?",
    answer: "This is the answer to your question 1!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 2!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 3!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 4!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 5!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 6!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 7!",
  },
  {
    question: "What is the question?",
    answer: "This is the answer to your question 8!",
  },
];
