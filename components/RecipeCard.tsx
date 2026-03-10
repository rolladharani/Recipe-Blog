import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "next-i18next"

type Recipe = {
  title: string
  slug: string
  image: string
}

type Props = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: Props) {

  const { t } = useTranslation("common")

  return (
    <div
      data-testid="recipe-card"
      className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
    >

      <Image
        src={recipe.image}
        width={400}
        height={250}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h2 className="text-xl font-semibold mb-3">
        {recipe.title}
      </h2>

      <Link
        href={`/recipes/${recipe.slug}`}
        className="text-blue-600 font-medium"
      >
        {t("viewRecipe")}
      </Link>

    </div>
  )
}