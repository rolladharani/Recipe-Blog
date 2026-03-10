import Layout from "../../components/Layout"
import { GetStaticPaths, GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"

type Recipe = {
  slug: string
  title: {
    en: string
    es: string
    fr: string
  }
  ingredients: {
    en: string[]
    es: string[]
    fr: string[]
  }
  instructions: {
    en: string
    es: string
    fr: string
  }
}

export default function RecipePage({ recipe }: { recipe: Recipe }) {

  const { locale } = useRouter()

  return (
    <Layout>

      <h1
        data-testid="recipe-title"
        className="text-3xl font-bold mb-6"
      >
        {recipe.title[locale as keyof typeof recipe.title]}
      </h1>

      <h2
        data-testid="ingredients-heading"
        className="text-xl font-semibold mb-3"
      >
        Ingredients
      </h2>

      <ul
        data-testid="recipe-ingredients"
        className="list-disc ml-6 mb-6"
      >
        {recipe.ingredients[locale as keyof typeof recipe.ingredients].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-3">
        Instructions
      </h2>

      <p data-testid="recipe-instructions">
        {recipe.instructions[locale as keyof typeof recipe.instructions]}
      </p>

      <a
        data-testid="social-share-twitter"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent("http://localhost:3000/recipes/" + recipe.slug)}&text=${recipe.title[locale as keyof typeof recipe.title]}`}
        target="_blank"
        className="text-blue-600 mt-4 block"
      >
        Share on Twitter
      </a>

    </Layout>
  )
}

const recipes: Recipe[] = [
  {
    slug: "spanish-paella",
    title: {
      en: "Spanish Paella",
      es: "Paella Española",
      fr: "Paëlla Espagnole"
    },
    ingredients: {
      en: ["Rice", "Seafood", "Saffron"],
      es: ["Arroz", "Mariscos", "Azafrán"],
      fr: ["Riz", "Fruits de mer", "Safran"]
    },
    instructions: {
      en: "Cook rice with seafood and saffron.",
      es: "Cocinar arroz con mariscos y azafrán.",
      fr: "Cuire le riz avec des fruits de mer et du safran."
    }
  },
  {
    slug: "french-croissant",
    title: {
      en: "French Croissant",
      es: "Croissant Francés",
      fr: "Croissant Français"
    },
    ingredients: {
      en: ["Flour", "Butter", "Yeast"],
      es: ["Harina", "Mantequilla", "Levadura"],
      fr: ["Farine", "Beurre", "Levure"]
    },
    instructions: {
      en: "Layer dough with butter and bake.",
      es: "Capas de masa con mantequilla y hornear.",
      fr: "Superposer la pâte avec du beurre et cuire."
    }
  },
  {
    slug: "italian-pizza",
    title: {
      en: "Italian Pizza",
      es: "Pizza Italiana",
      fr: "Pizza Italienne"
    },
    ingredients: {
      en: ["Flour", "Tomato Sauce", "Cheese"],
      es: ["Harina", "Salsa de Tomate", "Queso"],
      fr: ["Farine", "Sauce Tomate", "Fromage"]
    },
    instructions: {
      en: "Bake dough with tomato sauce and cheese.",
      es: "Hornear masa con salsa de tomate y queso.",
      fr: "Cuire la pâte avec sauce tomate et fromage."
    }
  }
]

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

  const paths =
    locales?.flatMap((locale) =>
      recipes.map((recipe) => ({
        params: { slug: recipe.slug },
        locale
      }))
    ) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

  const recipe = recipes.find(r => r.slug === params?.slug)

  if (!recipe) {
    return { notFound: true }
  }

  return {
    props: {
      recipe,
      ...(await serverSideTranslations(locale ?? "en", ["common"]))
    }
  }
}