import { useState } from "react"
import Layout from "../../components/Layout"
import RecipeCard from "../../components/RecipeCard"

const allRecipes = [
  {
    title: "Spanish Paella",
    slug: "spanish-paella",
    category: "Spanish",
    image: "/recipe.jpg"
  },
  {
    title: "French Croissant",
    slug: "french-croissant",
    category: "French",
    image: "/food.jpg"
  },
  {
    title: "Italian Pizza",
    slug: "italian-pizza",
    category: "Italian",
    image: "/pizza.jpg"
  }
]
export default function RecipesPage() {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const filteredRecipes = allRecipes.filter(recipe => {

    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === "" || recipe.category === category

    return matchesSearch && matchesCategory
  })

  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-6">
        All Recipes
      </h1>

      <input
        data-testid="search-input"
        type="text"
        placeholder="Search recipes..."
        className="border p-2 mr-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        data-testid="category-filter"
        className="border p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="Italian">Italian</option>
      </select>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>

    </Layout>

  )
}