import Layout from "../components/Layout"
import RecipeCard from "../components/RecipeCard"
import NewsletterForm from "../components/NewsletterForm"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"

const recipes = [
{
slug: "spanish-paella",
title: {
en: "Spanish Paella",
es: "Paella Española",
fr: "Paëlla Espagnole"
},
image: "/recipe.jpg"
},
{
slug: "french-croissant",
title: {
en: "French Croissant",
es: "Croissant Francés",
fr: "Croissant Français"
},
image: "/food.jpg"
},
{
slug: "italian-pizza",
title: {
en: "Italian Pizza",
es: "Pizza Italiana",
fr: "Pizza Italienne"
},
image: "/pizza.jpg"
}
]

export default function Home() {

const { t } = useTranslation("common")
const { locale } = useRouter()

return (

<Layout>

<h2 className="text-2xl font-bold mb-6">
{t("featured")}
</h2>

<div
data-testid="featured-recipes"
className="grid grid-cols-3 gap-6"
>

{recipes.map((recipe) => (

<RecipeCard
key={recipe.slug}
recipe={{
slug: recipe.slug,
title: recipe.title[locale as keyof typeof recipe.title],
image: recipe.image
}}
/>

))}

</div>

<NewsletterForm />

</Layout>

)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
return {
props: {
...(await serverSideTranslations(locale ?? "en", ["common"]))
}
}
}