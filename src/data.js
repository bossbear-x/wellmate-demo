import riceIcon from './assets/rice.svg'
import breadIcon from './assets/bread.svg'
import saladIcon from './assets/salad.svg'
import coffeeIcon from './assets/coffee.svg'
import eggIcon from './assets/egg.svg'
import bananaIcon from './assets/banana.svg'
import yogurtIcon from './assets/yogurt.svg'
import beerIcon from './assets/beer.svg'
import avocadoIcon from './assets/food-avocado.svg'
import chickenIcon from './assets/food-chicken.svg'

export const mealTypes = [
  { id: 'breakfast', label: '朝ごはん', icon: riceIcon },
  { id: 'lunch', label: '昼ごはん', icon: saladIcon },
  { id: 'dinner', label: '夕ごはん', icon: coffeeIcon },
  { id: 'snack', label: '間食', icon: beerIcon },
]

export const foodCatalog = [
  { id: 'rice', name: 'ごはん', meta: '1杯 / 150g', icon: riceIcon, kcal: 250, protein: 3.8, fat: 0.5, carbs: 55.7 },
  { id: 'bread', name: 'パン', meta: '1枚 / 70g', icon: breadIcon, kcal: 180, protein: 6, fat: 2.5, carbs: 33 },
  { id: 'salad', name: 'サラダ', meta: '1皿', icon: saladIcon, kcal: 90, protein: 2.5, fat: 4, carbs: 10 },
  { id: 'coffee', name: 'コーヒー', meta: '1杯', icon: coffeeIcon, kcal: 20, protein: 0.4, fat: 0.1, carbs: 3.4 },
  { id: 'egg', name: '卵', meta: '1個', icon: eggIcon, kcal: 100, protein: 8, fat: 7, carbs: 0.4 },
  { id: 'banana', name: 'バナナ', meta: '1本', icon: bananaIcon, kcal: 100, protein: 1.1, fat: 0.2, carbs: 26 },
  { id: 'yogurt', name: 'ヨーグルト', meta: '1個', icon: yogurtIcon, kcal: 120, protein: 5, fat: 4, carbs: 16 },
  { id: 'beer', name: 'ビール', meta: '1杯', icon: beerIcon, kcal: 150, protein: 1.5, fat: 0, carbs: 12 },
  { id: 'avocado', name: 'アボカド', meta: '1/2個 / 80g', icon: avocadoIcon, kcal: 160, protein: 2, fat: 14.7, carbs: 8.5 },
  { id: 'chicken', name: 'サラダチキン', meta: '1個', icon: chickenIcon, kcal: 120, protein: 25, fat: 1.5, carbs: 1 },
]

const frequentFoodIds = ['rice', 'bread', 'salad', 'coffee', 'egg', 'banana', 'yogurt', 'beer']
const searchFoodIds = ['rice', 'avocado', 'coffee', 'chicken', 'yogurt', 'banana']

export const foodOptions = frequentFoodIds.map((id) => foodCatalog.find((food) => food.id === id))
export const foodSearchOptions = searchFoodIds.map((id) => foodCatalog.find((food) => food.id === id))
export const getSelectedFoods = (ids) => foodCatalog.filter((food) => ids.includes(food.id))

export const calculateNutrition = (foods) => foods.reduce((totals, food) => ({
  kcal: totals.kcal + food.kcal,
  protein: totals.protein + food.protein,
  fat: totals.fat + food.fat,
  carbs: totals.carbs + food.carbs,
}), { kcal: 0, protein: 0, fat: 0, carbs: 0 })

export const formatNutrition = (value) => {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

export const aiAnswers = {
  weight: {
    question: '体重が減らないのはなぜ？',
    answer: '短期的な変化だけでなく、食事・睡眠・活動量を1週間の傾向で確認してみましょう。',
  },
  breakfast: {
    question: 'おすすめの朝ごはんは？',
    answer: '卵やヨーグルトに、ごはんや果物を組み合わせると、たんぱく質とエネルギーを補いやすくなります。',
  },
  motivation: {
    question: 'モチベーションが続かない…',
    answer: '完璧を目指さず、まずは1日1回の記録から。小さく続けられる行動を選びましょう。',
  },
}
